'use client';

import { useEffect, useState } from 'react';
import { BellIcon, CheckIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import {
  getMyNotifications,
  markNotificationAsRead,
  type DriverNotification,
  createAdminNotification,
} from '@/services/api/notificationApi';

export default function AdminNotificationsPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();

  const [notifications, setNotifications] = useState<DriverNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [targetRole, setTargetRole] = useState<'driver' | 'passenger' | 'owner' | 'admin' | 'all'>('driver');
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState<'info' | 'warning' | 'success'>('info');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!token || !user || user.role !== 'admin') {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        const response = await getMyNotifications(token);
        setNotifications(response.data || []);
      } catch (error) {
        console.error('Failed to load notifications:', error);
        const message = error instanceof Error ? error.message : 'Failed to load notifications';
        showToast({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [mounted, token, user, showToast]);

  const markAsRead = async (id: number) => {
    if (!token) return;
    try {
      await markNotificationAsRead(token, id);
      setNotifications(prev =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read_at: notif.read_at ?? new Date().toISOString() } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      showToast({ type: 'error', message: 'Failed to mark notification as read' });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />;
      case 'success': return <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />;
      default: return <InformationCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />;
    }
  };

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user || user.role !== 'admin') return;

    if (!newTitle.trim() || !newMessage.trim()) {
      showToast({ type: 'error', message: 'Title and message are required' });
      return;
    }

    try {
      setIsSending(true);

      // Build payload
      const payload: {
        target_role?: 'driver' | 'passenger' | 'owner' | 'admin';
        title: string;
        message: string;
        type: 'info' | 'warning' | 'success';
      } = {
        title: newTitle.trim(),
        message: newMessage.trim(),
        type: newType,
      };

      // Only add target_role if not "all"
      if (targetRole !== 'all') {
        payload.target_role = targetRole;
      }

      const response = await createAdminNotification(token, payload);

      // Show success message with recipient count
      const message = response.recipients > 0 
        ? `Notification created successfully and sent to ${response.recipients} recipient(s)`
        : 'Notification created successfully (no recipients found)';
      showToast({ type: 'success', message });
      
      setNewTitle('');
      setNewMessage('');

      // Reload notifications for this admin so they can see what they sent (if relevant)
        const listResponse = await getMyNotifications(token);
      setNotifications(listResponse.data || []);
    } catch (error) {
      console.error('Failed to create notification:', error);
      const message = error instanceof Error ? error.message : 'Failed to create notification';
      showToast({ type: 'error', message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <BellIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-red-600" />
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Admin Notifications</h1>
            <p className="text-sm sm:text-base text-gray-500">All notifications you have created and received</p>
          </div>
        </div>
      </div>

      {/* Create Notification Form */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Create Notification</h2>
        <form onSubmit={handleCreateNotification} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="driver">Drivers</option>
                <option value="passenger">Passengers</option>
                <option value="owner">Owners</option>
                <option value="admin">Admins</option>
                <option value="all">All Users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Notification title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              rows={3}
              placeholder="Detailed message"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send Notification'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No notifications to show.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 sm:p-4 lg:p-6 hover:bg-gray-50 cursor-pointer ${
                  !notification.read_at ? 'bg-red-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-sm sm:text-base font-medium ${
                          !notification.read_at ? 'text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{notification.message}</p>
                    {!notification.read_at && (
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



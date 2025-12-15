'use client';

import { useEffect, useState } from 'react';
import { BellIcon, CheckIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import {
  getMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type DriverNotification,
} from '@/services/api/notificationApi';

export default function OwnerNotificationsPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();

  const [notifications, setNotifications] = useState<DriverNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!token || !user || user.role !== 'owner') {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        const response = await getMyNotifications(token, { only_unread: onlyUnread });
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
  }, [mounted, token, user, onlyUnread, showToast]);

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

  const markAllAsReadHandler = async () => {
    if (!token) return;
    try {
      await markAllNotificationsAsRead(token);
      setNotifications(prev =>
        prev.map((notif) =>
          notif.read_at ? notif : { ...notif, read_at: new Date().toISOString() }
        )
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      showToast({ type: 'error', message: 'Failed to mark all notifications as read' });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />;
      case 'success': return <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />;
      default: return <InformationCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <BellIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" />
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm sm:text-base text-gray-500">{unreadCount} unread notifications</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlyUnread(!onlyUnread)}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-full border ${
              onlyUnread ? 'bg-purple-600 text-white border-purple-600' : 'text-gray-600 border-gray-300'
            }`}
          >
            {onlyUnread ? 'Showing Unread' : 'Showing All'}
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsReadHandler}
              className="text-purple-600 hover:text-purple-800 text-sm sm:text-base font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
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
                  !notification.read_at ? 'bg-purple-50' : ''
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
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
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


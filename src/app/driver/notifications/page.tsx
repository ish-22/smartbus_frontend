'use client';
import { useState } from 'react';
import { BellIcon, CheckIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  time: string;
  read: boolean;
}

export default function DriverNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Trip Assignment',
      message: 'New trip assigned: Route 138 at 2:30 PM',
      type: 'info',
      time: '10 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Route Change',
      message: 'Route 138 has been updated. Check new stops.',
      type: 'warning',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      title: 'Trip Completed',
      message: 'Trip Route 125 completed successfully',
      type: 'success',
      time: '2 hours ago',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case 'success': return <CheckIcon className="h-6 w-6 text-green-500" />;
      default: return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BellIcon className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-green-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                {getIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${
                      !notification.read ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
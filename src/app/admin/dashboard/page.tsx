'use client';
import React, { useState } from 'react';
import { UserGroupIcon, MapIcon, ChartBarIcon, ExclamationTriangleIcon, CogIcon, ShieldCheckIcon, UsersIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'users', label: 'User Management', icon: UserGroupIcon },
    { id: 'routes', label: 'Routes & Buses', icon: MapIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'settings', label: 'System Settings', icon: CogIcon }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-responsive-md">
            <div className="grid-responsive-4 gap-responsive-md">
              <div className="bg-white card-responsive rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <UserGroupIcon className="icon-responsive-md text-blue-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Users</p>
                    <p className="text-responsive-lg font-bold text-gray-900">12,543</p>
                  </div>
                </div>
              </div>
              <div className="bg-white card-responsive rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <MapIcon className="icon-responsive-md text-green-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-responsive-xs font-medium text-gray-600 truncate">Active Routes</p>
                    <p className="text-responsive-lg font-bold text-gray-900">45</p>
                  </div>
                </div>
              </div>
              <div className="bg-white card-responsive rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <ChartBarIcon className="icon-responsive-md text-purple-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-responsive-xs font-medium text-gray-600 truncate">Daily Trips</p>
                    <p className="text-responsive-lg font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              <div className="bg-white card-responsive rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                    <ExclamationTriangleIcon className="icon-responsive-md text-red-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-responsive-xs font-medium text-gray-600 truncate">System Alerts</p>
                    <p className="text-responsive-lg font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white card-responsive rounded-lg shadow">
              <h3 className="text-responsive-lg font-semibold text-gray-900 mb-responsive-md">Recent Activity</h3>
              <div className="space-responsive-sm">
                {[
                  { action: 'New user registration', time: '2 minutes ago' },
                  { action: 'Route 45 reported delay', time: '15 minutes ago' },
                  { action: 'Driver completed trip', time: '1 hour ago' },
                  { action: 'System backup completed', time: '2 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-b-0 space-y-1 sm:space-y-0">
                    <span className="text-responsive-sm text-gray-700 truncate">{activity.action}</span>
                    <span className="text-responsive-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white card-responsive rounded-lg shadow">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">User Management</h3>
            <div className="space-responsive-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 border rounded space-y-2 sm:space-y-0">
                <div className="min-w-0">
                  <p className="text-responsive-sm font-medium truncate">John Passenger</p>
                  <p className="text-responsive-xs text-gray-500 truncate">passenger@example.com</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-responsive-xs self-start sm:self-center flex-shrink-0">Active</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 border rounded space-y-2 sm:space-y-0">
                <div className="min-w-0">
                  <p className="text-responsive-sm font-medium truncate">Driver Silva</p>
                  <p className="text-responsive-xs text-gray-500 truncate">driver@example.com</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-responsive-xs self-start sm:self-center flex-shrink-0">Active</span>
              </div>
            </div>
          </div>
        );
      case 'routes':
        return (
          <div className="bg-white card-responsive rounded-lg shadow">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">Routes & Buses</h3>
            <div className="space-responsive-sm">
              <div className="p-3 sm:p-4 border rounded">
                <p className="text-responsive-sm font-medium">Colombo - Kandy</p>
                <p className="text-responsive-xs text-gray-500">2 buses active</p>
              </div>
              <div className="p-3 sm:p-4 border rounded">
                <p className="text-responsive-sm font-medium">Colombo - Galle</p>
                <p className="text-responsive-xs text-gray-500">1 bus active</p>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="bg-white card-responsive rounded-lg shadow">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">Security & Monitoring</h3>
            <div className="space-responsive-sm">
              <div className="p-3 sm:p-4 border rounded">
                <p className="text-responsive-sm font-medium">Failed Login Attempts</p>
                <p className="text-responsive-xs text-gray-500">3 attempts in last hour</p>
              </div>
              <div className="p-3 sm:p-4 border rounded">
                <p className="text-responsive-sm font-medium">System Health</p>
                <p className="text-responsive-xs text-green-600">All systems operational</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white card-responsive rounded-lg shadow">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">System Settings</h3>
            <div className="space-responsive-sm">
              <div className="p-3 sm:p-4 border rounded">
                <p className="text-responsive-sm font-medium">API Configuration</p>
                <p className="text-responsive-xs text-gray-500">Manage external integrations</p>
              </div>
              <div className="p-3 sm:p-4 border rounded">
                <p className="text-responsive-sm font-medium">Notification Settings</p>
                <p className="text-responsive-xs text-gray-500">Configure system alerts</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-responsive-sm text-gray-600 mt-1">Complete system management</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="overflow-x-auto">
          <nav className="-mb-px flex space-x-1 sm:space-x-4 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const mobileLabels = {
                'overview': 'Home',
                'users': 'Users',
                'routes': 'Routes',
                'security': 'Security',
                'settings': 'Settings'
              };
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 sm:px-3 border-b-2 font-medium text-xs sm:text-sm flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-xs">{mobileLabels[tab.id]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

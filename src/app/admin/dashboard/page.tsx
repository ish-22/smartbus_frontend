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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">12,543</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Routes</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Daily Trips</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">System Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New user registration', time: '2 minutes ago' },
                  { action: 'Route 45 reported delay', time: '15 minutes ago' },
                  { action: 'Driver completed trip', time: '1 hour ago' },
                  { action: 'System backup completed', time: '2 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{activity.action}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">User Management</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-medium">John Passenger</p>
                  <p className="text-sm text-gray-500">passenger@example.com</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <p className="font-medium">Driver Silva</p>
                  <p className="text-sm text-gray-500">driver@example.com</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span>
              </div>
            </div>
          </div>
        );
      case 'routes':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Routes & Buses</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <p className="font-medium">Colombo - Kandy</p>
                <p className="text-sm text-gray-500">2 buses active</p>
              </div>
              <div className="p-4 border rounded">
                <p className="font-medium">Colombo - Galle</p>
                <p className="text-sm text-gray-500">1 bus active</p>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Security & Monitoring</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <p className="font-medium">Failed Login Attempts</p>
                <p className="text-sm text-gray-500">3 attempts in last hour</p>
              </div>
              <div className="p-4 border rounded">
                <p className="font-medium">System Health</p>
                <p className="text-sm text-green-600">All systems operational</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">System Settings</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <p className="font-medium">API Configuration</p>
                <p className="text-sm text-gray-500">Manage external integrations</p>
              </div>
              <div className="p-4 border rounded">
                <p className="font-medium">Notification Settings</p>
                <p className="text-sm text-gray-500">Configure system alerts</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Complete system management</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {renderContent()}
    </div>
  );
}

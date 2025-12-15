'use client';
import React, { useState, useEffect } from 'react';
import { UserGroupIcon, MapIcon, ChartBarIcon, ExclamationTriangleIcon, CogIcon, ShieldCheckIcon, UsersIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { getAdminDashboardStats, type AdminDashboardStats } from '@/services/api/dashboardApi';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !token || !user || user.role !== 'admin') {
      setIsLoading(false);
      return;
    }

    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await getAdminDashboardStats(token);
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [mounted, token, user]);

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
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Users</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.total_users?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <MapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Routes</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.active_routes || '0'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Today's Bookings</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.today_bookings || '0'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending Incidents</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.pending_incidents || '0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Passengers</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.total_passengers || '0'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Drivers</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.total_drivers || '0'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Buses</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.total_buses || '0'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Resolved Incidents</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {isLoading ? '...' : stats?.resolved_incidents || '0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Link href="/admin/incidents" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Incidents</h3>
                </div>
                <p className="text-sm text-gray-600">Manage and resolve incidents</p>
              </Link>
              <Link href="/admin/notifications" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-2">
                  <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <p className="text-sm text-gray-600">Send notifications to users</p>
              </Link>
              <Link href="/admin/users" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-2">
                  <UserGroupIcon className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">User Management</h3>
                </div>
                <p className="text-sm text-gray-600">Manage all system users</p>
              </Link>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">User Management</h3>
            <Link href="/admin/users" className="text-blue-600 hover:text-blue-800 font-medium">
              Go to User Management →
            </Link>
          </div>
        );
      case 'routes':
        return (
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Routes & Buses</h3>
            <Link href="/admin/routes" className="text-blue-600 hover:text-blue-800 font-medium">
              Go to Routes Management →
            </Link>
          </div>
        );
      case 'security':
        return (
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Security & Monitoring</h3>
            <Link href="/admin/security" className="text-blue-600 hover:text-blue-800 font-medium">
              Go to Security Settings →
            </Link>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">System Settings</h3>
            <Link href="/admin/settings" className="text-blue-600 hover:text-blue-800 font-medium">
              Go to System Settings →
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Complete system management</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="overflow-x-auto">
          <nav className="-mb-px flex space-x-1 sm:space-x-4 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const mobileLabels: Record<string, string> = {
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

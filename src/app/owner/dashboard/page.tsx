'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { TruckIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon, WrenchScrewdriverIcon, TagIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { getOwnerDashboardStats, type OwnerDashboardStats } from '@/services/api/dashboardApi';
import Link from 'next/link';

export default function OwnerDashboard() {
  const { user, token } = useAuthStore();
  const [stats, setStats] = useState<OwnerDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !token || !user || user.role !== 'owner') {
      setIsLoading(false);
      return;
    }

    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await getOwnerDashboardStats(token);
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [mounted, token, user]);

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bus Owner Dashboard</h1>
        <p className="text-gray-600">Manage your fleet and business operations</p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.total_buses || '0'}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.active_buses || '0'}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Drivers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.total_drivers || '0'}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Today's Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.today_bookings || '0'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Incidents</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.pending_incidents || '0'}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Resolved Incidents</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.resolved_incidents || '0'}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold ml-3">My Fleet</h2>
            </div>
            <p className="text-gray-600 mb-3 sm:mb-4">Manage your bus fleet</p>
            <Link href="/owner/fleet" className="text-purple-600 hover:text-purple-800 font-medium">
              View Fleet →
            </Link>
          </Card>
          
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold ml-3">Drivers</h2>
            </div>
            <p className="text-gray-600 mb-3 sm:mb-4">Manage your drivers</p>
            <Link href="/owner/drivers" className="text-purple-600 hover:text-purple-800 font-medium">
              View Drivers →
            </Link>
          </Card>
          
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold ml-3">Analytics</h2>
            </div>
            <p className="text-gray-600 mb-3 sm:mb-4">Analyze fleet performance</p>
            <Link href="/owner/analytics" className="text-purple-600 hover:text-purple-800 font-medium">
              View Analytics →
            </Link>
          </Card>
          
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <TagIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold ml-3">Offers & Promotions</h2>
            </div>
            <p className="text-gray-600 mb-3 sm:mb-4">Create promotional campaigns</p>
            <Link href="/owner/offers" className="text-purple-600 hover:text-purple-800 font-medium">
              Manage Offers →
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

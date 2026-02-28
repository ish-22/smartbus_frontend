'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { TruckIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon, WrenchScrewdriverIcon, TagIcon, ExclamationTriangleIcon, CheckCircleIcon, MapPinIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { getOwnerDashboardStats, type OwnerDashboardStats } from '@/services/api/dashboardApi';
import { getBusesAPI, type Bus } from '@/services/api/busApi';
import Link from 'next/link';

export default function OwnerDashboard() {
  const { user, token } = useAuthStore();
  const [stats, setStats] = useState<OwnerDashboardStats | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busesLoading, setBusesLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !token || !user || user.role !== 'owner') {
      setIsLoading(false);
      setBusesLoading(false);
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

    const loadBuses = async () => {
      try {
        setBusesLoading(true);
        const busesData = await getBusesAPI(token);
        setBuses(busesData || []);
      } catch (error) {
        console.error('Failed to load buses:', error);
      } finally {
        setBusesLoading(false);
      }
    };

    loadStats();
    loadBuses();
  }, [mounted, token, user]);

  const getStatusBadge = (status?: string) => {
    const statusColors: Record<string, { bg: string; text: string }> = {
      active: { bg: 'bg-green-100', text: 'text-green-800' },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      inactive: { bg: 'bg-red-100', text: 'text-red-800' },
    };
    const colors = statusColors[status || 'active'] || statusColors.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Active'}
      </span>
    );
  };

  const getTypeBadge = (type?: string) => {
    const isExpressway = type === 'expressway';
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${isExpressway ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
        {isExpressway ? 'Expressway' : 'Normal'}
      </span>
    );
  };

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
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <WrenchScrewdriverIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.maintenance_buses || '0'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">With Drivers</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {isLoading ? '...' : stats?.buses_with_drivers || '0'}
              </p>
            </div>
          </div>
        </Card>

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

      {/* Owner's Buses Table */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">My Buses</h2>
            <p className="text-sm text-gray-600 mt-1">
              {busesLoading ? 'Loading...' : `Total: ${buses.length} bus${buses.length !== 1 ? 'es' : ''}`}
            </p>
          </div>
          <Link 
            href="/owner/registrations" 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Register New Bus
          </Link>
        </div>

        {busesLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading buses...</p>
          </div>
        ) : buses.length === 0 ? (
          <div className="text-center py-8">
            <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No buses registered yet</p>
            <Link 
              href="/owner/registrations" 
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Register your first bus →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Bus Number</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Route</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Capacity</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Assigned Driver</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {buses.map((bus) => (
                  <tr key={bus.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 sm:px-4">
                      <div className="font-semibold text-gray-900">{bus.bus_number || bus.number}</div>
                      {bus.model && (
                        <div className="text-xs text-gray-500">{bus.model}</div>
                      )}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      {getTypeBadge(bus.type)}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      {bus.route ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {bus.route.route_number && (
                              <span className="text-purple-600">[{bus.route.route_number}] </span>
                            )}
                            {bus.route.name || `${bus.route.start_point || ''} - ${bus.route.end_point || ''}`}
                          </div>
                          {(bus.route.start_point || bus.route.end_point) && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {bus.route.start_point} → {bus.route.end_point}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No route assigned</span>
                      )}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <div className="text-sm text-gray-900">{bus.capacity} seats</div>
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      {getStatusBadge(bus.status)}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      {bus.driver ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{bus.driver.name}</div>
                          {bus.driver.phone && (
                            <div className="text-xs text-gray-500">{bus.driver.phone}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No driver assigned</span>
                      )}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link 
                          href={`/owner/fleet?bus=${bus.id}`}
                          className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Schedules & GPS Tracking Section (Future-ready) */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Schedules & Tracking</h2>
            <p className="text-sm text-gray-600 mt-1">View bus schedules and GPS tracking</p>
          </div>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Schedules feature coming soon</p>
          <p className="text-sm text-gray-500">GPS tracking integration will be available here</p>
        </div>
      </Card>
      
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

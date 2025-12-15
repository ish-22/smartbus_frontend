'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card'
import { MagnifyingGlassIcon, TicketIcon, MapPinIcon, GiftIcon, UserIcon, ExclamationTriangleIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore';
import { getPassengerIncidents, type Incident } from '@/services/api/incidentApi';

export default function PassengerDashboard() {
  const { user, token } = useAuthStore();
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [isLoadingIncidents, setIsLoadingIncidents] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token && user?.role === 'passenger') {
      loadRecentIncidents();
    } else if (mounted) {
      setIsLoadingIncidents(false);
      setRecentIncidents([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, token, user?.role]);

  const loadRecentIncidents = async () => {
    if (!token || !user || user.role !== 'passenger') {
      setIsLoadingIncidents(false);
      return;
    }
    try {
      setIsLoadingIncidents(true);
      const response = await getPassengerIncidents(token, { per_page: 5 });
      setRecentIncidents(response.data || []);
    } catch (error) {
      console.error('Error loading incidents:', error);
      setRecentIncidents([]); // Set empty array on error
      // Don't show error toast for passengers - incidents are optional
    } finally {
      setIsLoadingIncidents(false);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      traffic_delay: 'Traffic Delay',
      mechanical_issue: 'Mechanical Issue',
      accident: 'Accident',
      emergency: 'Emergency',
      other: 'Other'
    };
    return labels[type] || type;
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      reported: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If not authenticated as passenger, show basic dashboard without incidents
  // Don't block rendering - just don't show incidents

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Dashboard</h1>
        <p className="text-gray-600">Plan your journey and track buses in real-time</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link href="/passenger/search">
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Find Buses</h3>
              <p className="text-sm sm:text-base text-gray-600">Search routes and schedules</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/booking">
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TicketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Book Tickets</h3>
              <p className="text-sm sm:text-base text-gray-600">Reserve your seat online</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/tracking">
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Buses</h3>
              <p className="text-sm sm:text-base text-gray-600">Real-time bus locations</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/rewards">
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GiftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Rewards</h3>
              <p className="text-sm sm:text-base text-gray-600">Earn points and offers</p>
            </div>
          </Card>
        </Link>

        <Link href="/passenger/profile">
          <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">My Profile</h3>
              <p className="text-sm sm:text-base text-gray-600">View and edit your profile</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Bookings */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Recent Bookings</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { route: 'Route 12A', date: 'Today, 2:30 PM', status: 'Confirmed', seat: 'A12' },
            { route: 'Route 15B', date: 'Yesterday, 9:00 AM', status: 'Completed', seat: 'B08' },
            { route: 'Route 8C', date: 'Dec 18, 5:45 PM', status: 'Completed', seat: 'C15' },
          ].map((booking, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <span className="font-medium text-gray-900">{booking.route}</span>
                <p className="text-sm sm:text-base text-gray-600">{booking.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm sm:text-base text-gray-600">Seat {booking.seat}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bus Incidents */}
      <Card className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Recent Bus Incidents</h3>
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            <Link href="/passenger/incidents" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>
        </div>
        {isLoadingIncidents ? (
          <div className="text-center py-4 text-gray-500">Loading incidents...</div>
        ) : recentIncidents.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">No recent incidents reported</p>
            <p className="text-xs text-gray-500 mt-1">All buses are operating normally</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                        {incident.title || getTypeLabel(incident.type || 'other')}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{incident.description || 'No description available'}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      {(incident.bus || incident.bus_id) && (
                        <div className="flex items-center space-x-1">
                          <TruckIcon className="h-3 w-3" />
                          <span>Bus {incident.bus?.number || incident.bus?.bus_number || `Bus ${incident.bus_id}`}</span>
                        </div>
                      )}
                      {incident.location && (
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{incident.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>{incident.created_at ? new Date(incident.created_at).toLocaleDateString() : 'Unknown date'}</span>
                      </div>
                    </div>
                    {incident.admin_response && (
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                        <p className="font-medium text-blue-900 mb-1">Update:</p>
                        <p className="text-blue-800">{incident.admin_response}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
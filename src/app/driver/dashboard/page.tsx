'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CalendarIcon, UsersIcon, MapPinIcon, QrCodeIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, UserIcon, TruckIcon, BoltIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useDriverStore } from '@/store/driverStore';
import BusSelectionModal from '@/components/driver/BusSelectionModal';
import { getCurrentDriverAssignment } from '@/services/api/driverApi';
import { useUiStore } from '@/store/uiStore';
import { getDriverIncidents } from '@/services/api/incidentApi';

export default function DriverDashboard() {
  const { user, token } = useAuthStore();
  const { session, isSessionActive, clearSession, setDriverSession } = useDriverStore();
  const { showToast } = useUiStore();
  const [showBusModal, setShowBusModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loadingAssignment, setLoadingAssignment] = useState(true);
  const [recentIncidents, setRecentIncidents] = useState<any[]>([]);
  const [incidentCounts, setIncidentCounts] = useState({ total: 0, unresolved: 0 });

  useEffect(() => {
    setMounted(true);
    loadCurrentAssignment();
    if (token && user?.role === 'driver') {
      loadRecentIncidents();
    }
  }, [user, token]);

  const loadRecentIncidents = async () => {
    if (!token) return;
    try {
      const response = await getDriverIncidents(token, { per_page: 5 });
      setRecentIncidents(response.data || []);
      // Count unresolved incidents
      const unresolved = response.data.filter((inc: any) => 
        inc.status === 'reported' || inc.status === 'in_progress'
      ).length;
      setIncidentCounts({
        total: response.total || 0,
        unresolved
      });
    } catch (error) {
      console.error('Error loading recent incidents:', error);
    }
  };

  const loadCurrentAssignment = async () => {
    if (!user?.id || !token || user.role !== 'driver') {
      setLoadingAssignment(false);
      return;
    }

    try {
      const assignment = await getCurrentDriverAssignment(parseInt(user.id), token);
      if (assignment && assignment.bus) {
        // Sync with local store
        setDriverSession(
          assignment.driver_type,
          assignment.bus_id,
          assignment.bus.number || assignment.bus.bus_number || `Bus ${assignment.bus_id}`
        );
      }
    } catch (error) {
      // If no assignment found (404), that's okay - driver needs to assign
      if (error instanceof Error && !error.message.includes('404')) {
        console.error('Error loading assignment:', error);
      }
    } finally {
      setLoadingAssignment(false);
    }
  };

  const handleChangeBus = () => {
    clearSession();
    setShowBusModal(true);
  };

  if (!mounted || loadingAssignment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 sm:space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl sm:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mt-1">Manage your trips and passenger services</p>
      </div>

      {/* Bus Assignment Status Card */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Current Bus Assignment</h2>
            {isSessionActive() && session ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  {session.driverType === 'expressway' ? (
                    <BoltIcon className="h-6 w-6 text-green-600" />
                  ) : (
                    <TruckIcon className="h-6 w-6 text-blue-600" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        Bus {session.busNumber}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        session.driverType === 'expressway'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {session.driverType === 'expressway' ? 'Expressway' : 'Normal Route'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Assigned today at {session.assignedAt ? new Date(session.assignedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="text-gray-700 font-medium">No bus assigned for today</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Please select your driver type and bus to start your shift
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            {isSessionActive() && session ? (
              <Button
                onClick={handleChangeBus}
                variant="secondary"
                size="sm"
              >
                Change Bus
              </Button>
            ) : (
              <Button
                onClick={() => setShowBusModal(true)}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <TruckIcon className="h-4 w-4 mr-2" />
                Assign Bus
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Recent Incidents Widget */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Incidents</h2>
          <Link href="/driver/incidents" className="text-sm text-green-600 hover:text-green-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Total Reports</p>
            <p className="text-xl font-bold text-gray-900">{incidentCounts.total}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-xs text-red-600 mb-1">Unresolved</p>
            <p className="text-xl font-bold text-red-600">{incidentCounts.unresolved}</p>
          </div>
        </div>
        {recentIncidents.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Recent Reports</p>
            {recentIncidents.slice(0, 3).map((incident: any) => (
              <div key={incident.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {incident.title || incident.type.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(incident.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ml-2 ${
                  incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  incident.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No incidents reported yet</p>
        )}
      </Card>
      
      <div className="space-y-3 sm:space-y-4 sm:space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 sm:gap-4 sm:gap-6">
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">My Schedule</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">View today's routes and timings</p>
            <a href="/driver/schedule" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              View Schedule →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">Passengers</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Manage passenger bookings</p>
            <a href="/driver/passengers" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              View Passengers →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">GPS Tracking</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Share live location with passengers</p>
            <a href="/driver/location" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              Start Tracking →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <QrCodeIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">QR Scanner</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Scan passenger tickets</p>
            <a href="/driver/qr-scanner" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              Open Scanner →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <ExclamationTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">Report Incident</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Report issues or emergencies</p>
            <a href="/driver/incidents" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              Report Issue →
            </a>
          </Card>
          
          <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">Lost Items</h2>
            </div>
            <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">Manage lost and found items</p>
            <a href="/driver/lost-found" className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
              View Items →
            </a>
          </Card>
          
          <Link href="/driver/profile">
            <Card className="p-4 sm:p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-3 sm:mb-3 sm:mb-4">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <h2 className="text-sm sm:text-base lg:text-lg sm:text-base sm:text-lg lg:text-xl font-semibold ml-3 truncate">My Profile</h2>
              </div>
              <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-3 sm:mb-4 line-clamp-2">View and edit your profile</p>
              <span className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-green-600 hover:text-green-800 font-medium">
                View Profile →
              </span>
            </Card>
          </Link>
        </div>
      </div>

      {/* Bus Selection Modal */}
      <BusSelectionModal
        isOpen={showBusModal}
        onClose={() => setShowBusModal(false)}
        onSuccess={() => {
          setShowBusModal(false);
          // Refresh will happen automatically via store
        }}
      />
    </div>
  );
}

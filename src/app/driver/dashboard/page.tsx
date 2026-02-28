'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CalendarIcon, UsersIcon, MapPinIcon, QrCodeIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, UserIcon, TruckIcon, BoltIcon, CheckCircleIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useDriverStore } from '@/store/driverStore';
import { getCurrentDriverAssignment } from '@/services/api/driverApi';
import { useUiStore } from '@/store/uiStore';
import { getDriverIncidents } from '@/services/api/incidentApi';
import type { DriverAssignmentResponse } from '@/services/api/driverApi';

export default function DriverDashboard() {
  const { user, token } = useAuthStore();
  const { session, isSessionActive, clearSession, setDriverSession } = useDriverStore();
  const { showToast } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const [loadingAssignment, setLoadingAssignment] = useState(true);
  const [recentIncidents, setRecentIncidents] = useState<any[]>([]);
  const [incidentCounts, setIncidentCounts] = useState({ total: 0, unresolved: 0 });
  const [assignmentDetails, setAssignmentDetails] = useState<DriverAssignmentResponse | null>(null);

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
      const response = await getCurrentDriverAssignment(parseInt(user.id), token);
      if (response && response.assignment) {
        const assignment = response.assignment;
        const busDetails = response.bus_details || assignment.bus;
        
        // Store assignment details for display
        setAssignmentDetails(response);
        
        if (busDetails) {
          // Sync with local store
          setDriverSession(
            assignment.driver_type || 'normal',
            assignment.bus_id,
            busDetails.bus_number || `Bus ${assignment.bus_id}`
          );
        }
      } else {
        setAssignmentDetails(null);
        clearSession();
      }
    } catch (error) {
      // If no assignment found, that's okay - driver hasn't been assigned by owner
      setAssignmentDetails(null);
      clearSession();
      if (error instanceof Error && !error.message.includes('404') && !error.message.includes('No active assignment')) {
        console.error('Error loading assignment:', error);
      }
    } finally {
      setLoadingAssignment(false);
    }
  };

  const handleChangeBus = () => {
    showToast({ type: 'info', message: 'Please contact your bus owner to change your assignment' });
  };

  if (!mounted || loadingAssignment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const busDetails = assignmentDetails?.bus_details || assignmentDetails?.assignment?.bus;
  const assignment = assignmentDetails?.assignment;

  return (
    <div className="space-y-4 sm:space-y-6 sm:space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl sm:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-sm sm:text-base sm:text-sm sm:text-base lg:text-lg text-gray-600 mt-1">Manage your trips and passenger services</p>
      </div>

      {/* Bus Assignment Status Card - Enhanced */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Current Bus Assignment</h2>
            {assignment && (
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            )}
          </div>
          {assignment && (
            <div className="flex space-x-2">
              <Button
                onClick={handleChangeBus}
                variant="secondary"
                size="sm"
              >
                Request Change
              </Button>
            </div>
          )}
        </div>

        {assignment && busDetails ? (
          <div className="space-y-4">
            {/* Main Assignment Info */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {assignment.driver_type === 'expressway' ? (
                    <div className="p-3 bg-green-100 rounded-full">
                      <BoltIcon className="h-8 w-8 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-3 bg-blue-100 rounded-full">
                      <TruckIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Bus {busDetails.bus_number}
                    </h3>
                    <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
                      assignment.driver_type === 'expressway'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {assignment.driver_type === 'expressway' ? 'Expressway' : 'Normal Route'}
                    </span>
                  </div>
                  {assignment.assignment_date && (
                    <p className="text-sm text-gray-600 mb-1">
                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                      Assigned for {new Date(assignment.assignment_date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                  {assignment.assigned_at && (
                    <p className="text-xs text-gray-500">
                      Assigned at {new Date(assignment.assigned_at).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bus Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bus Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Bus Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bus Number:</span>
                    <span className="font-medium text-gray-900">{busDetails.bus_number}</span>
                  </div>
                  {busDetails.model && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium text-gray-900">{busDetails.model}</span>
                    </div>
                  )}
                  {busDetails.capacity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium text-gray-900">{busDetails.capacity} seats</span>
                    </div>
                  )}
                  {busDetails.type && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 capitalize">{busDetails.type}</span>
                    </div>
                  )}
                  {busDetails.status && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${
                        busDetails.status === 'active' ? 'text-green-600' :
                        busDetails.status === 'maintenance' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {busDetails.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Route Information */}
              {busDetails.route && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Route Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    {busDetails.route.name && (
                      <div>
                        <span className="text-gray-600">Route Name:</span>
                        <p className="font-medium text-gray-900">{busDetails.route.name}</p>
                      </div>
                    )}
                    {(busDetails.route.start_point || busDetails.route.end_point) && (
                      <div>
                        <span className="text-gray-600">Route:</span>
                        <p className="font-medium text-gray-900">
                          {busDetails.route.start_point || 'Start'} → {busDetails.route.end_point || 'End'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Owner Information */}
              {busDetails.owner && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 md:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Bus Owner Information
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{busDetails.owner.name}</p>
                      {busDetails.owner.phone && (
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {busDetails.owner.phone}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        if (busDetails.owner?.phone) {
                          window.location.href = `tel:${busDetails.owner.phone}`;
                        }
                      }}
                      disabled={!busDetails.owner?.phone}
                    >
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      Contact Owner
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 py-8">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium">No bus assigned for today</p>
              <p className="text-sm text-gray-600 mt-1">
                Please wait for your bus owner to assign you to a bus. You will receive a notification when assigned.
              </p>
            </div>
          </div>
        )}
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
    </div>
  );
}

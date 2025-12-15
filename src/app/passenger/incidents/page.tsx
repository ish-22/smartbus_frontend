'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { 
  ExclamationTriangleIcon,
  ClockIcon,
  TruckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { 
  getPassengerIncidents,
  type Incident,
  type IncidentStatus
} from '@/services/api/incidentApi';
import Link from 'next/link';

export default function PassengerIncidentsPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token && user?.role === 'passenger') {
      loadIncidents();
    } else if (mounted) {
      setIsLoading(false);
    }
  }, [mounted, token, user?.role, filterStatus, filterSeverity, currentPage]);

  const loadIncidents = async () => {
    if (!token || !user || user.role !== 'passenger') {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const params: any = {
        per_page: 20,
        page: currentPage,
      };

      if (filterStatus !== 'all') {
        params.status = filterStatus;
      }
      if (filterSeverity !== 'all') {
        params.severity = filterSeverity;
      }

      const response = await getPassengerIncidents(token, params);

      // Handle different response formats
      let incidentsData: Incident[] = [];
      let lastPage = 1;

      // Check if response has data property (Laravel pagination format)
      if (response && typeof response === 'object' && 'data' in response) {
        incidentsData = Array.isArray(response.data) ? response.data : [];
        lastPage = response.last_page || 1;
      }
      // Check if response is directly an array
      else if (Array.isArray(response)) {
        incidentsData = response;
      }
      // Check if response has nested structure
      else if (response && (response as any).data && Array.isArray((response as any).data)) {
        incidentsData = (response as any).data;
        lastPage = (response as any).last_page || (response as any).lastPage || 1;
      }

      setIncidents(incidentsData);
      setTotalPages(lastPage);
    } catch (error) {
      console.error('Error loading incidents:', error);
      setIncidents([]);
      // Show error message for passengers
      const errorMessage = error instanceof Error ? error.message : 'Unable to load incidents';
      if (!errorMessage.includes('401') && !errorMessage.includes('403')) {
        showToast({ type: 'error', message: `Failed to load incidents: ${errorMessage}` });
      } else if (errorMessage.includes('401')) {
        showToast({ type: 'error', message: 'Please log in to view incidents' });
      } else if (errorMessage.includes('403')) {
        showToast({ type: 'error', message: 'You do not have permission to view incidents' });
      }
    } finally {
      setIsLoading(false);
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

  // Redirect if not authenticated as passenger
  if (!user || user.role !== 'passenger') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Access denied. Passenger only.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bus Incidents</h1>
          <p className="text-gray-600">View reported incidents and service updates</p>
        </div>
        <Link href="/passenger">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Info Banner */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Public Incident Information</p>
            <p className="text-xs text-blue-700 mt-1">
              This page shows incidents that have been reported and are being addressed. Only resolved, in-progress, or closed incidents are displayed for transparency.
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Statuses</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => {
                setFilterSeverity(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Incidents List */}
      <Card className="p-4 sm:p-6">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            Loading incidents...
          </div>
        ) : !incidents || incidents.length === 0 ? (
          <div className="text-center py-8">
            <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No incidents found</p>
            <p className="text-sm text-gray-500 mt-2">
              {user?.role === 'passenger' 
                ? 'All buses are operating normally. No incidents to display.' 
                : 'Please log in as a passenger to view incidents'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident) => {
              if (!incident || !incident.id) {
                console.warn('Invalid incident data:', incident);
                return null;
              }
              return (
                <div key={incident.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {incident.title || getTypeLabel(incident.type || 'other')}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(incident.severity || 'low')}`}>
                          {incident.severity || 'low'}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(incident.status || 'reported')}`}>
                          {(incident.status || 'reported').replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{incident.description || 'No description available'}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-700">Type:</span>
                          <span>{getTypeLabel(incident.type || 'other')}</span>
                        </div>
                        {incident.bus && (
                          <div className="flex items-center space-x-1">
                            <TruckIcon className="h-4 w-4" />
                            <span>Bus {incident.bus.number || incident.bus.bus_number || `Bus ${incident.bus_id}`}</span>
                          </div>
                        )}
                        {incident.location && (
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{incident.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{incident.created_at ? new Date(incident.created_at).toLocaleString() : 'Unknown date'}</span>
                        </div>
                        {incident.driver && (
                          <div>
                            <span>Driver: {incident.driver.name}</span>
                          </div>
                        )}
                      </div>
                      {incident.admin_response && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm font-medium text-blue-900 mb-1">Admin Update:</p>
                          <p className="text-sm text-blue-800">{incident.admin_response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}


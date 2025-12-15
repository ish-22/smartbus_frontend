'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { 
  getAllIncidents, 
  getIncidentStats,
  updateIncidentStatus,
  deleteIncident,
  type Incident,
  type IncidentStatus
} from '@/services/api/incidentApi';

export default function AdminIncidentsPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');
  const [newStatus, setNewStatus] = useState<IncidentStatus>('reported');
  const [isUpdating, setIsUpdating] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (token && user?.role === 'admin') {
      loadIncidents();
      loadStats();
    }
  }, [token, user, filterStatus, filterSeverity, currentPage]);

  const loadIncidents = async () => {
    if (!token) return;

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

      const response = await getAllIncidents(token, params);
      setIncidents(response.data);
      setTotalPages(response.last_page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load incidents';
      showToast({ type: 'error', message });
      console.error('Error loading incidents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    if (!token) return;

    try {
      const statsData = await getIncidentStats(token);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident);
    setAdminResponse(incident.admin_response || '');
    setNewStatus(incident.status);
    setShowModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!token || !selectedIncident) return;

    try {
      setIsUpdating(true);
      await updateIncidentStatus(
        selectedIncident.id,
        newStatus,
        adminResponse.trim() || undefined,
        token
      );

      showToast({ type: 'success', message: 'Incident status updated successfully!' });
      setShowModal(false);
      setSelectedIncident(null);
      setAdminResponse('');
      loadIncidents();
      loadStats();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update incident status';
      showToast({ type: 'error', message });
      console.error('Error updating incident status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;

    if (!confirm('Are you sure you want to delete this incident?')) {
      return;
    }

    try {
      await deleteIncident(id, token);
      showToast({ type: 'success', message: 'Incident deleted successfully!' });
      loadIncidents();
      loadStats();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete incident';
      showToast({ type: 'error', message });
      console.error('Error deleting incident:', error);
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

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Access denied. Admin only.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Incident Management</h1>
        <p className="text-gray-600">Monitor and manage driver incident reports</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Incidents</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Unresolved</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.unresolved}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Critical</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.by_severity.critical}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Resolved</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.by_status.resolved}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="reported">Reported</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={filterSeverity}
          onChange={(e) => {
            setFilterSeverity(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Incidents List */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading incidents...</div>
      ) : incidents.length === 0 ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No incidents found.</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4">
            {incidents.map((item) => (
              <Card key={item.id} className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2 flex-wrap">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-900">
                        {item.title || getTypeLabel(item.type)}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span>👤 {item.driver?.name || 'Unknown Driver'}</span>
                      {item.bus && <span>🚌 Bus {item.bus.bus_number || item.bus.number || `#${item.bus.id}`}</span>}
                      {item.location && <span>📍 {item.location}</span>}
                      <span>🕐 {new Date(item.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewDetails(item)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal for viewing/updating incident */}
      {showModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Incident Details</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedIncident(null);
                    setAdminResponse('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedIncident.severity)}`}>
                      {selectedIncident.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedIncident.status)}`}>
                      {selectedIncident.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedIncident.title || getTypeLabel(selectedIncident.type)}
                  </h3>
                  <p className="text-gray-700 mb-4">{selectedIncident.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Driver: {selectedIncident.driver?.name} ({selectedIncident.driver?.email || selectedIncident.driver?.phone})</p>
                    {selectedIncident.bus && <p>Bus: {selectedIncident.bus.bus_number || selectedIncident.bus.number || `#${selectedIncident.bus.id}`}</p>}
                    {selectedIncident.location && <p>Location: {selectedIncident.location}</p>}
                    <p>Reported: {new Date(selectedIncident.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {selectedIncident.admin_response && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Previous Admin Response:</p>
                    <p className="text-sm text-blue-800">{selectedIncident.admin_response}</p>
                    {selectedIncident.resolver && (
                      <p className="text-xs text-blue-600 mt-1">
                        - {selectedIncident.resolver.name} ({new Date(selectedIncident.resolved_at || '').toLocaleDateString()})
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as IncidentStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                  >
                    <option value="reported">Reported</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Response
                  </label>
                  <textarea
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your response to this incident..."
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedIncident(null);
                      setAdminResponse('');
                    }}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleUpdateStatus}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Update Status'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserIcon, TruckIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { getAllDrivers } from '@/services/api/userApi';
import { getAllBuses, assignDriverToBus, getOwnerAssignments, endDriverAssignment } from '@/services/api/driverApi';
import { useUiStore } from '@/store/uiStore';
import type { Driver } from '@/services/api/userApi';
import type { DriverAssignment } from '@/services/api/driverApi';

export default function OwnerDriversPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [buses, setBuses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<DriverAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [assignmentDate, setAssignmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const [driversData, busesData, assignmentsData] = await Promise.all([
        getAllDrivers(token),
        getAllBuses(token),
        getOwnerAssignments(token),
      ]);
      
      setDrivers(driversData);
      setBuses(busesData);
      setAssignments(assignmentsData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast({ type: 'error', message: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedDriver || !selectedBus || !token) {
      showToast({ type: 'error', message: 'Please select both driver and bus' });
      return;
    }

    try {
      setSubmitting(true);
      const response = await assignDriverToBus(selectedDriver, selectedBus, assignmentDate, token);
      const driverName = drivers.find(d => d.id === selectedDriver)?.name || 'Driver';
      const busNumber = buses.find(b => b.id === selectedBus)?.number || buses.find(b => b.id === selectedBus)?.bus_number || 'Bus';
      
      showToast({ 
        type: 'success', 
        message: `${driverName} has been successfully assigned to ${busNumber}. The driver has been notified.` 
      });
      setShowAssignModal(false);
      setSelectedDriver(null);
      setSelectedBus(null);
      setAssignmentDate(new Date().toISOString().split('T')[0]);
      await loadData();
    } catch (error: any) {
      showToast({ type: 'error', message: error.message || 'Failed to assign driver' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndAssignment = async (assignmentId: number, driverId: number) => {
    if (!token) return;
    
    if (!confirm('Are you sure you want to end this assignment?')) {
      return;
    }

    try {
      await endDriverAssignment(driverId, assignmentId, token);
      showToast({ type: 'success', message: 'Assignment ended successfully' });
      await loadData();
    } catch (error: any) {
      showToast({ type: 'error', message: error.message || 'Failed to end assignment' });
    }
  };

  const getDriverName = (driverId: number) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver?.name || `Driver #${driverId}`;
  };

  const getBusNumber = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    return bus?.number || bus?.bus_number || `Bus #${busId}`;
  };

  const activeAssignments = assignments.filter(a => !a.ended_at);
  const pastAssignments = assignments.filter(a => a.ended_at);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Driver Assignments</h1>
          <p className="text-gray-600">Manage driver assignments to your buses</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setShowAssignModal(true)}
        >
          Assign Driver to Bus
        </Button>
      </div>

      {/* Active Assignments */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
          Active Assignments
        </h2>
        {activeAssignments.length > 0 ? (
          <div className="space-y-4">
            {activeAssignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <UserIcon className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-gray-900">
                        {getDriverName(assignment.driver_id)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        assignment.driver_type === 'expressway'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {assignment.driver_type === 'expressway' ? 'Expressway' : 'Normal'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <TruckIcon className="h-4 w-4" />
                      <span>{getBusNumber(assignment.bus_id)}</span>
                      {assignment.assignment_date && (
                        <>
                          <CalendarIcon className="h-4 w-4 ml-3" />
                          <span>{new Date(assignment.assignment_date).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                    {assignment.bus?.route && (
                      <div className="mt-2 text-sm text-gray-600">
                        Route: {assignment.bus.route.name || `${assignment.bus.route.start_point} - ${assignment.bus.route.end_point}`}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => assignment.id && handleEndAssignment(assignment.id, assignment.driver_id)}
                  >
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    End Assignment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No active assignments</p>
        )}
      </Card>

      {/* Past Assignments */}
      {pastAssignments.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Assignments</h2>
          <div className="space-y-3">
            {pastAssignments.slice(0, 10).map((assignment) => (
              <div 
                key={assignment.id} 
                className="border border-gray-200 rounded-lg p-3 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900">
                      {getDriverName(assignment.driver_id)}
                    </span>
                    <span className="text-gray-600 ml-2">→ {getBusNumber(assignment.bus_id)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {assignment.assignment_date && new Date(assignment.assignment_date).toLocaleDateString()}
                    {assignment.ended_at && ` (Ended: ${new Date(assignment.ended_at).toLocaleDateString()})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Assign Driver Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Driver to Bus</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Driver <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDriver || ''}
                  onChange={(e) => setSelectedDriver(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose a driver...</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} ({driver.driver_type || 'normal'}) - {driver.phone || driver.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bus <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBus || ''}
                  onChange={(e) => setSelectedBus(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose a bus...</option>
                  {buses.map((bus) => (
                    <option key={bus.id} value={bus.id}>
                      {bus.number || bus.bus_number} ({bus.type || 'normal'}) - {bus.capacity} seats
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={assignmentDate}
                  onChange={(e) => setAssignmentDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={handleAssign}
                  disabled={submitting || !selectedDriver || !selectedBus}
                >
                  {submitting ? 'Assigning...' : 'Assign Driver'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedDriver(null);
                    setSelectedBus(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  TruckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { getBusesAPI, createBusAPI, type Bus } from '@/services/api/busApi';
import { getRoutesAPI } from '@/services/api/routeApi';

type Route = {
  id: number;
  name: string;
  route_number?: string;
  start_point?: string;
  end_point?: string;
  metadata?: {
    type?: 'expressway' | 'normal';
    [key: string]: any;
  };
};

export default function OwnerRegistrationsPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    type: 'normal' as 'expressway' | 'normal',
    route_id: '',
    capacity: '',
    model: '',
    status: 'active' as 'active' | 'maintenance' | 'inactive',
  });

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      // Pass token to ensure backend filters by owner_id
      const busesData = await getBusesAPI(token);
      setBuses(busesData);
      
      // Load routes will be done when type is selected
      if (formData.type) {
        await loadRoutesByType(formData.type);
      } else {
        // Load all routes initially
        const routesData = await getRoutesAPI();
        setRoutes(routesData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showToast({ type: 'error', message: 'Failed to load buses' });
    } finally {
      setLoading(false);
    }
  };

  const loadRoutesByType = async (type: 'expressway' | 'normal') => {
    try {
      const routesData = await getRoutesAPI(type);
      setRoutes(routesData || []);
    } catch (error) {
      console.error('Error loading routes:', error);
      // Fallback: try to load all routes if filtered request fails
      try {
        const allRoutes = await getRoutesAPI();
        // Filter manually on frontend
        const filtered = allRoutes.filter((route) => {
          const routeType = route.metadata?.type;
          return routeType === type;
        });
        setRoutes(filtered || []);
      } catch (fallbackError) {
        console.error('Fallback route loading also failed:', fallbackError);
        setRoutes([]);
        showToast({ 
          type: 'error', 
          message: 'Unable to load routes. You can still register the bus without selecting a route.' 
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      showToast({ type: 'error', message: 'Please log in to register a bus' });
      return;
    }

    if (!formData.number || !formData.capacity) {
      showToast({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    try {
      setSubmitting(true);
      const busData: any = {
        number: formData.number,
        type: formData.type,
        capacity: parseInt(formData.capacity),
        status: formData.status,
      };

      // Only include route_id if it's provided and valid
      if (formData.route_id && formData.route_id !== '') {
        busData.route_id = parseInt(formData.route_id);
      }

      // Only include model if provided
      if (formData.model && formData.model.trim() !== '') {
        busData.model = formData.model;
      }

      await createBusAPI(busData, token);
      showToast({ 
        type: 'success', 
        message: `Bus ${formData.number} has been registered successfully!` 
      });
      
      // Reset form
      setFormData({
        number: '',
        type: 'normal',
        route_id: '',
        capacity: '',
        model: '',
        status: 'active',
      });
      setShowRegisterModal(false);
      await loadData();
    } catch (error: any) {
      showToast({ 
        type: 'error', 
        message: error.message || 'Failed to register bus' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusStats = () => {
    const active = buses.filter(b => b.status === 'active' || !b.status).length;
    const maintenance = buses.filter(b => b.status === 'maintenance').length;
    const inactive = buses.filter(b => b.status === 'inactive').length;
    return { active, maintenance, inactive, total: buses.length };
  };

  const stats = getStatusStats();

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
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bus Registrations</h1>
          <p className="text-gray-600">Manage your registered buses</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setShowRegisterModal(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Register New Bus
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Maintenance</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.maintenance}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Inactive</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Buses</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Buses Table */}
      <Card className="overflow-hidden">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Registered Buses</h3>
        </div>
        {buses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bus Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buses.map((bus) => (
                  <tr key={bus.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900">{bus.number || bus.bus_number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        bus.type === 'expressway'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {bus.type === 'expressway' ? 'Expressway' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {bus.route ? (
                        <div>
                          {bus.route.route_number && (
                            <span className="font-semibold text-purple-600 mr-1">[{bus.route.route_number}]</span>
                          )}
                          {bus.route.name || (bus.route.start_point && bus.route.end_point 
                            ? `${bus.route.start_point} - ${bus.route.end_point}` 
                            : 'Route')}
                        </div>
                      ) : (
                        'No route assigned'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {bus.capacity} seats
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {bus.driver?.name || (
                        <span className="text-gray-400 italic">No driver assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        bus.status === 'active' || !bus.status ? 'bg-green-100 text-green-800' :
                        bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bus.status || 'active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bus.created_at 
                        ? new Date(bus.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })
                        : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No buses registered yet</p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowRegisterModal(true)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Register Your First Bus
            </Button>
          </div>
        )}
      </Card>

      {/* Register Bus Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Register New Bus</h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bus Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="e.g., SB-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bus Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={async (e) => {
                      const newType = e.target.value as 'expressway' | 'normal';
                      setFormData({ ...formData, type: newType, route_id: '' });
                      // Reload routes filtered by type
                      await loadRoutesByType(newType);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="normal">Normal Route</option>
                    <option value="expressway">Expressway/Highway</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.type === 'expressway' 
                      ? 'Select expressway/highway routes'
                      : 'Select normal city/intercity routes'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity (Seats) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g., 50"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., Leyland 2000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Route (Optional)
                  </label>
                  <select
                    value={formData.route_id}
                    onChange={(e) => setFormData({ ...formData, route_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={routes.length === 0}
                  >
                    <option value="">
                      {routes.length === 0 
                        ? `No ${formData.type === 'expressway' ? 'expressway' : 'normal'} routes available. Please create routes first.`
                        : `Select a ${formData.type === 'expressway' ? 'highway/expressway' : 'normal'} route (optional)`
                      }
                    </option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id.toString()}>
                        {route.route_number ? `[${route.route_number}] ` : ''}
                        {route.name || `${route.start_point || 'Start'} - ${route.end_point || 'End'}`}
                      </option>
                    ))}
                  </select>
                  {routes.length === 0 && (
                    <p className="text-xs text-yellow-600 mt-1">
                      No routes found for this type. You can register the bus without a route and assign it later.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'maintenance' | 'inactive' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  disabled={submitting}
                >
                  {submitting ? 'Registering...' : 'Register Bus'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

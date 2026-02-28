'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TruckIcon, MapPinIcon, UserIcon, PlusIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { getBusesAPI, type Bus } from '@/services/api/busApi';
import Link from 'next/link';

export default function OwnerFleetPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadBuses();
    }
  }, [token]);

  const loadBuses = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      // Pass token to ensure backend filters by owner_id
      const busesData = await getBusesAPI(token);
      setBuses(busesData);
    } catch (error: any) {
      console.error('Error loading buses:', error);
      showToast({ type: 'error', message: error.message || 'Failed to load fleet data' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const getStatusIcon = (status?: string) => {
    if (status === 'active' || !status) {
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    } else if (status === 'maintenance') {
      return <ClockIcon className="h-5 w-5 text-yellow-600" />;
    } else {
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Monitor and manage your bus fleet</p>
        </div>
        <Link href="/owner/registrations">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <PlusIcon className="h-4 w-4 mr-2" />
            Register New Bus
          </Button>
        </Link>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Buses</p>
              <p className="text-2xl font-bold text-gray-900">{buses.length}</p>
            </div>
            <TruckIcon className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Buses</p>
              <p className="text-2xl font-bold text-green-600">
                {buses.filter(b => b.status === 'active' || !b.status).length}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Buses with Drivers</p>
              <p className="text-2xl font-bold text-blue-600">
                {buses.filter(b => b.driver_id).length}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Buses List */}
      {buses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {buses.map((bus) => (
            <Card key={bus.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center space-x-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    bus.status === 'active' || !bus.status ? 'bg-green-100' :
                    bus.status === 'maintenance' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <TruckIcon className={`h-6 w-6 ${
                      bus.status === 'active' || !bus.status ? 'text-green-600' :
                      bus.status === 'maintenance' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {bus.number || bus.bus_number}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        bus.type === 'expressway'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {bus.type === 'expressway' ? 'Expressway' : 'Normal'}
                      </span>
                      <div className="flex items-center">
                        {getStatusIcon(bus.status)}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {bus.route && (
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                          <span>
                            {bus.route.route_number && (
                              <span className="font-semibold text-purple-600 mr-1">[{bus.route.route_number}]</span>
                            )}
                            {bus.route.name || `${bus.route.start_point || 'Start'} - ${bus.route.end_point || 'End'}`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span>Capacity: {bus.capacity} seats</span>
                      </div>
                      {bus.model && (
                        <div className="flex items-center">
                          <span>Model: {bus.model}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      {bus.driver ? (
                        <div>
                          <p className="text-sm font-medium text-gray-900">{bus.driver.name}</p>
                          {bus.driver.phone && (
                            <p className="text-xs text-gray-500">{bus.driver.phone}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No driver assigned</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bus.status === 'active' || !bus.status ? 'bg-green-100 text-green-800' :
                      bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bus.status || 'active'}
                    </span>
                    <Link href={`/owner/drivers?busId=${bus.id}`}>
                      <Button variant="secondary" size="sm">
                        {bus.driver ? 'Manage Driver' : 'Assign Driver'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <TruckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No buses in your fleet</h3>
          <p className="text-gray-600 mb-6">Get started by registering your first bus</p>
          <Link href="/owner/registrations">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              Register Your First Bus
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}

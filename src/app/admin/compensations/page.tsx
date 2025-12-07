'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminCompensationAPI, AdminCompensation, CompensationStats } from '@/services/api/adminCompensations';
import { CurrencyDollarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function AdminCompensationsPage() {
  const { user, token } = useAuth();
  const [compensations, setCompensations] = useState<AdminCompensation[]>([]);
  const [stats, setStats] = useState<CompensationStats>({
    total_pending: 0,
    total_paid: 0,
    pending_amount: 0,
    paid_amount: 0,
    total_amount: 0
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchCompensations = async () => {
    if (!token) return;
    try {
      const response = await adminCompensationAPI.getCompensations(token);
      setCompensations(response.data);
    } catch (error) {
      console.error('Failed to fetch compensations:', error);
    }
  };

  const fetchStats = async () => {
    if (!token) return;
    try {
      const response = await adminCompensationAPI.getStats(token);
      setStats(response);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleMarkAsPaid = async (id: number) => {
    if (!token || !confirm('Mark this compensation as paid?')) return;
    
    try {
      await adminCompensationAPI.markAsPaid(token, id);
      alert('Compensation marked as paid!');
      fetchCompensations();
      fetchStats();
    } catch (error) {
      console.error('Failed to mark as paid:', error);
      alert('Failed to update compensation status.');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token) {
      fetchCompensations();
      fetchStats();
      setLoading(false);
    }
  }, [mounted, token]);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token || user.role !== 'admin') {
    return <div className="p-6">Access denied. Admin only.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bus Owner Compensations</h1>
        <p className="text-gray-600 mt-1">Manage payments to bus owners for rewards and offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <div className="text-gray-500 text-sm">Pending</div>
              <div className="text-2xl font-bold">{stats.total_pending}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <div className="text-gray-500 text-sm">Paid</div>
              <div className="text-2xl font-bold">{stats.total_paid}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <div className="text-gray-500 text-sm">Pending Amount</div>
              <div className="text-2xl font-bold">Rs. {stats.pending_amount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <div className="text-gray-500 text-sm">Paid Amount</div>
              <div className="text-2xl font-bold">Rs. {stats.paid_amount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <div className="text-gray-500 text-sm">Total Amount</div>
              <div className="text-2xl font-bold">Rs. {stats.total_amount}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Compensation History</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : compensations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No compensations found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {compensations.map((compensation) => (
                  <tr key={compensation.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium">#{compensation.booking_id}</div>
                      <div className="text-sm text-gray-500">
                        {compensation.booking?.user?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">{compensation.busOwner?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        compensation.type === 'points_discount' ? 'bg-blue-100 text-blue-800' :
                        compensation.type === 'offer_discount' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {compensation.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">Rs. {compensation.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        compensation.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {compensation.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{new Date(compensation.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {compensation.status === 'pending' && (
                        <button
                          onClick={() => handleMarkAsPaid(compensation.id)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How Compensation Works</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• When passengers use reward points, admin compensates bus owners for the discount</li>
          <li>• When passengers earn bonus points, admin pays bus owners for the incentive cost</li>
          <li>• When passengers redeem offers, admin covers the discount amount to bus owners</li>
          <li>• This ensures bus owners don't lose revenue while passengers get benefits</li>
        </ul>
      </div>
    </div>
  );
}
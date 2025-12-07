'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminCompensationAPI, AdminCompensation } from '@/services/api/adminCompensations';

export default function OwnerOffersPage() {
  const { user, token } = useAuth();
  const [compensations, setCompensations] = useState<AdminCompensation[]>([]);
  const [stats, setStats] = useState({ pending_count: 0, paid_count: 0, pending_amount: 0, paid_amount: 0 });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchCompensations = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await adminCompensationAPI.getOwnerCompensations(token);
      setCompensations(response.data || []);
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to fetch compensations:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token) {
      fetchCompensations();
    }
  }, [mounted, token]);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token || user.role !== 'owner') {
    return <div className="p-6">Access denied. Owner only.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Compensations</h1>
        <p className="text-gray-600 mt-1">Track compensation payments from admin for rewards and offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <div className="text-yellow-600 text-sm">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending_count}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-green-600 text-sm">Paid</div>
          <div className="text-2xl font-bold text-green-600">{stats.paid_count}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <div className="text-red-600 text-sm">Pending Amount</div>
          <div className="text-2xl font-bold text-red-600">Rs. {stats.pending_amount}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="text-blue-600 text-sm">Paid Amount</div>
          <div className="text-2xl font-bold text-blue-600">Rs. {stats.paid_amount}</div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {compensations.map((compensation) => (
                  <tr key={compensation.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium">#{compensation.booking_id}</div>
                      <div className="text-sm text-gray-500">{compensation.description}</div>
                    </td>
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
                    <td className="px-6 py-4">{new Date(compensation.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How Admin Compensations Work</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Admin compensates you when passengers use reward points for discounts</li>
          <li>• Admin pays you when passengers earn bonus points on your buses</li>
          <li>• Admin covers offer discounts so you don't lose revenue</li>
          <li>• This ensures you're not financially impacted by the reward system</li>
        </ul>
      </div>
    </div>
  );
}
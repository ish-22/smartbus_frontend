'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ownerPaymentAPI, OwnerPayment } from '@/services/api/offers';

export default function OwnerPayoutsPage() {
  const { user, token } = useAuth();
  const [payments, setPayments] = useState<OwnerPayment[]>([]);
  const [stats, setStats] = useState({
    total_pending: 0,
    total_paid: 0,
    pending_count: 0,
    paid_count: 0
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [paymentsResponse, statsResponse] = await Promise.all([
        ownerPaymentAPI.getPayments(token),
        ownerPaymentAPI.getStats(token)
      ]);
      
      setPayments(paymentsResponse.data || []);
      setStats(statsResponse.data || stats);
    } catch (error) {
      console.error('Failed to fetch payout data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchData();
    }
  }, [token, mounted]);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token || user.role !== 'owner') {
    return <div className="p-6">Access denied. Owner only.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Offer Payouts</h1>
        <p className="text-gray-600 mt-1">Track payments for redeemed offers on your buses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <div className="text-yellow-600 text-sm">Pending Amount</div>
          <div className="text-2xl font-bold text-yellow-600">${stats.total_pending.toFixed(2)}</div>
          <div className="text-sm text-yellow-500">{stats.pending_count} payments</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-green-600 text-sm">Paid Amount</div>
          <div className="text-2xl font-bold text-green-600">${stats.total_paid.toFixed(2)}</div>
          <div className="text-sm text-green-500">{stats.paid_count} payments</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="text-blue-600 text-sm">Total Earnings</div>
          <div className="text-2xl font-bold text-blue-600">
            ${(stats.total_pending + stats.total_paid).toFixed(2)}
          </div>
          <div className="text-sm text-blue-500">All time</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <div className="text-purple-600 text-sm">Total Transactions</div>
          <div className="text-2xl font-bold text-purple-600">
            {stats.pending_count + stats.paid_count}
          </div>
          <div className="text-sm text-purple-500">Offer redemptions</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No offer redemptions yet. Payments will appear here when passengers redeem offers for your buses.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 text-sm">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{payment.offer?.title || 'Unknown Offer'}</div>
                        <div className="text-sm text-gray-500">
                          {payment.offer?.discount_percentage}% discount
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {payment.passenger?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${payment.discount_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        payment.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How Offer Payouts Work</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• When passengers redeem offers for bookings on your buses, you receive compensation</li>
          <li>• The SmartBus system funds these offers, not you</li>
          <li>• Pending payments will be processed by the admin</li>
          <li>• You'll receive the full discount amount that was applied to the passenger's booking</li>
        </ul>
      </div>
    </div>
  );
}
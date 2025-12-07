'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { rewardAPI, RewardTransaction } from '@/services/api/rewards';

function RewardHistorySection({ token }: { token: string }) {
  const [history, setHistory] = useState<RewardTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await rewardAPI.getRewardHistory(token);
        setHistory(response.data.slice(0, 10)); // Show last 10 transactions
      } catch (error) {
        console.error('Failed to fetch reward history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <div className="mt-6 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Reward Transactions</h2>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No reward transactions found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {history.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-2">{transaction.user_id}</td>
                  <td className="px-4 py-2">
                    <span className={`font-medium ${
                      transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      transaction.reason === 'booking' ? 'bg-blue-100 text-blue-800' :
                      transaction.reason === 'feedback' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {transaction.reason.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">{transaction.description}</td>
                  <td className="px-4 py-2 text-sm">{new Date(transaction.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminRewardsPage() {
  const { user, token } = useAuth();
  const [userId, setUserId] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleAddPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userId || !points) return;
    
    setLoading(true);
    try {
      await rewardAPI.addPoints(token, {
        user_id: parseInt(userId),
        points: parseInt(points),
        description
      });
      
      alert('Points added successfully!');
      setUserId('');
      setPoints('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add points:', error);
      alert('Failed to add points. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeductPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userId || !points) return;
    
    setLoading(true);
    try {
      await rewardAPI.deductPoints(token, {
        user_id: parseInt(userId),
        points: parseInt(points),
        description
      });
      
      alert('Points deducted successfully!');
      setUserId('');
      setPoints('');
      setDescription('');
    } catch (error) {
      console.error('Failed to deduct points:', error);
      alert('Failed to deduct points. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token || user.role !== 'admin') {
    return <div className="p-6">Access denied. Admin only.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reward Management</h1>
        <p className="text-gray-600 mt-1">Manage user reward points</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add/Deduct Points</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">User ID *</label>
            <input
              type="number"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter user ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Points *</label>
            <input
              type="number"
              required
              min="1"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter points amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Optional description..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddPoints}
              disabled={loading || !userId || !points}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Add Points'}
            </button>
            
            <button
              type="button"
              onClick={handleDeductPoints}
              disabled={loading || !userId || !points}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Deduct Points'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Automatic Point Rules</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• +10 points per completed booking (passengers only)</li>
          <li>• +5 points per feedback submitted (passengers only)</li>
          <li>• Manual points can be added/deducted by admin</li>
        </ul>
      </div>

      <RewardHistorySection token={token} />
    </div>
  );
}
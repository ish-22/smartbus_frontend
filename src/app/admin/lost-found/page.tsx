'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { lostFoundAPI, LostFoundItem } from '@/services/api/lostFound';
import LostFoundTable from '@/components/lostfound/LostFoundTable';

export default function AdminLostFoundPage() {
  const { user, token } = useAuth();
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [stats, setStats] = useState({ total: 0, lost: 0, found: 0, returned: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const fetchItems = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await lostFoundAPI.getAll(token, filter ? { status: filter } : undefined);
      setItems(response.data || []);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!token) return;
    try {
      const response = await lostFoundAPI.getStats(token);
      setStats(response);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token) {
      fetchItems();
      fetchStats();
    }
  }, [mounted, token, filter]);

  if (!mounted) {
    return <div className="p-6 max-w-7xl mx-auto"><div className="mb-6">Loading...</div></div>;
  }

  if (!user || !token || user.role !== 'admin') {
    return <div className="p-6 max-w-7xl mx-auto"><div className="mb-6">Access denied. Admin only.</div></div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Lost & Found Administration</h1>
        <p className="text-gray-600 mt-1">Manage all lost and found items in the system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Items</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <div className="text-red-600 text-sm">Lost</div>
          <div className="text-2xl font-bold text-red-600">{stats.lost}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <div className="text-yellow-600 text-sm">Found</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.found}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-green-600 text-sm">Returned</div>
          <div className="text-2xl font-bold text-green-600">{stats.returned}</div>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded ${!filter ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('lost')}
          className={`px-4 py-2 rounded ${filter === 'lost' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Lost
        </button>
        <button
          onClick={() => setFilter('found')}
          className={`px-4 py-2 rounded ${filter === 'found' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
        >
          Found
        </button>
        <button
          onClick={() => setFilter('returned')}
          className={`px-4 py-2 rounded ${filter === 'returned' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Returned
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">All Lost & Found Items</h2>
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
        ) : (
          <LostFoundTable 
            items={items} 
            token={token} 
            onUpdate={fetchItems}
            canChangeStatus={true}
            canDelete={true}
          />
        )}
      </div>
    </div>
  );
}

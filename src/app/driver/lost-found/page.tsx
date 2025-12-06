'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { lostFoundAPI, LostFoundItem } from '@/services/api/lostFound';
import LostFoundForm from '@/components/lostfound/LostFoundForm';
import LostFoundTable from '@/components/lostfound/LostFoundTable';

export default function DriverLostFoundPage() {
  const { user, token } = useAuth();
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchItems();
    }
  }, [token, filter, mounted]);

  const handleSuccess = () => {
    setShowForm(false);
    fetchItems();
  };

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token) {
    return <div className="p-6">Please log in to access this page.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lost & Found</h1>
          <p className="text-gray-600 mt-1">Report found items and manage reports</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? 'Cancel' : 'Report Found Item'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <LostFoundForm token={token} onSuccess={handleSuccess} defaultStatus="found" />
        </div>
      )}

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
        <h2 className="text-xl font-semibold mb-4">Lost & Found Items</h2>
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
        ) : (
          <LostFoundTable 
            items={items} 
            token={token} 
            onUpdate={fetchItems}
            canChangeStatus={true}
          />
        )}
      </div>
    </div>
  );
}

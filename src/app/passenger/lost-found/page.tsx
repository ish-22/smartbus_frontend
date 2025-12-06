'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { lostFoundAPI, LostFoundItem } from '@/services/api/lostFound';
import LostFoundForm from '@/components/lostfound/LostFoundForm';
import LostFoundTable from '@/components/lostfound/LostFoundTable';

export default function PassengerLostFoundPage() {
  const { user, token } = useAuth();
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fetchItems = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await lostFoundAPI.getMy(token);
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
  }, [token, mounted]);

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
          <p className="text-gray-600 mt-1">Report and track your lost items</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Report Lost Item'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <LostFoundForm token={token} onSuccess={handleSuccess} defaultStatus="lost" />
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">My Reported Items</h2>
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
        ) : (
          <LostFoundTable 
            items={items} 
            token={token} 
            onUpdate={fetchItems}
            canDelete={true}
          />
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { lostFoundAPI, LostFoundStatus } from '@/services/api/lostFound';

interface LostFoundFormProps {
  token: string;
  onSuccess: () => void;
  defaultStatus?: LostFoundStatus;
}

export default function LostFoundForm({ token, onSuccess, defaultStatus = 'lost' }: LostFoundFormProps) {
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    found_location: '',
    found_date: new Date().toISOString().split('T')[0],
    status: defaultStatus,
    bus_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [buses, setBuses] = useState<any[]>([]);

  useEffect(() => {
    // Fetch available buses
    const fetchBuses = async () => {
      try {
        const response = await fetch('/api/buses', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setBuses(data.data || []);
        }
      } catch (error) {
        console.log('Could not fetch buses');
      }
    };
    fetchBuses();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data: any = { ...formData };
      if (data.bus_id && data.bus_id.trim() !== '') {
        data.bus_id = parseInt(data.bus_id);
      } else {
        delete data.bus_id;
      }

      await lostFoundAPI.create(token, data);
      setFormData({
        item_name: '',
        description: '',
        found_location: '',
        found_date: new Date().toISOString().split('T')[0],
        status: defaultStatus,
        bus_id: '',
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Report {defaultStatus === 'lost' ? 'Lost' : 'Found'} Item</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Item Name *</label>
        <input
          type="text"
          required
          value={formData.item_name}
          onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Black Wallet, Blue Backpack"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Provide detailed description..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location {defaultStatus === 'found' ? 'Found' : 'Lost'} *</label>
        <input
          type="text"
          required
          value={formData.found_location}
          onChange={(e) => setFormData({ ...formData, found_location: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Bus 123, Colombo Station"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date *</label>
        <input
          type="date"
          required
          value={formData.found_date}
          onChange={(e) => setFormData({ ...formData, found_date: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bus (Optional)</label>
        <select
          value={formData.bus_id}
          onChange={(e) => setFormData({ ...formData, bus_id: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a bus (optional)</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              {bus.bus_number} - {bus.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status *</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as LostFoundStatus })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="returned">Returned</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
}

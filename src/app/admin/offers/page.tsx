'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { offerAPI, Offer } from '@/services/api/offers';

export default function AdminOffersPage() {
  const { user, token } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_percentage: '',
    required_points: '',
    start_date: '',
    end_date: '',
    status: 'active' as 'active' | 'expired'
  });

  const fetchOffers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await offerAPI.getActiveOffers(token);
      setOffers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    // Client-side validation
    if (formData.start_date && formData.end_date && formData.end_date <= formData.start_date) {
      alert('End date must be after start date');
      return;
    }
    
    const offerData = {
      title: formData.title,
      description: formData.description,
      discount_percentage: parseInt(formData.discount_percentage),
      required_points: parseInt(formData.required_points),
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status
    };
    
    try {
      if (editingOffer) {
        await offerAPI.updateOffer(token, editingOffer.id, offerData);
        alert('Offer updated successfully!');
      } else {
        await offerAPI.createOffer(token, offerData);
        alert('Offer created successfully!');
      }
      
      resetForm();
      fetchOffers();
    } catch (error) {
      console.error('Failed to save offer:', error);
      alert('Failed to save offer. Please try again.');
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount_percentage: offer.discount_percentage.toString(),
      required_points: offer.required_points.toString(),
      start_date: offer.start_date,
      end_date: offer.end_date,
      status: offer.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Are you sure you want to delete this offer?')) return;
    
    try {
      await offerAPI.deleteOffer(token, id);
      alert('Offer deleted successfully!');
      fetchOffers();
    } catch (error) {
      console.error('Failed to delete offer:', error);
      alert('Failed to delete offer. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discount_percentage: '',
      required_points: '',
      start_date: '',
      end_date: '',
      status: 'active'
    });
    setEditingOffer(null);
    setShowForm(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchOffers();
    }
  }, [token, mounted]);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token || user.role !== 'admin') {
    return <div className="p-6">Access denied. Admin only.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Offer Management</h1>
          <p className="text-gray-600 mt-1">Create and manage discount offers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Create Offer'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingOffer ? 'Edit Offer' : 'Create New Offer'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label htmlFor="discount" className="block text-sm font-medium mb-1">Discount % *</label>
                <input
                  id="discount"
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="points" className="block text-sm font-medium mb-1">Required Points *</label>
                <input
                  id="points"
                  type="number"
                  required
                  min="1"
                  value={formData.required_points}
                  onChange={(e) => setFormData({ ...formData, required_points: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date *</label>
                <input
                  id="startDate"
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date *</label>
                <input
                  id="endDate"
                  type="date"
                  required
                  min={formData.start_date || undefined}
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {editingOffer ? 'Update Offer' : 'Create Offer'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Offers</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : offers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No offers found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td className="px-6 py-4 font-medium">{offer.title}</td>
                    <td className="px-6 py-4">{offer.discount_percentage}%</td>
                    <td className="px-6 py-4">{offer.required_points}</td>
                    <td className="px-6 py-4">{new Date(offer.end_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        offer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {offer.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(offer)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
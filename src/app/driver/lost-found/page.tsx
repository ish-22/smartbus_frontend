'use client';
import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface FoundItem {
  id: string;
  description: string;
  location: string;
  date: string;
  status: 'reported' | 'claimed' | 'returned';
  image?: string;
}

export default function DriverLostFoundPage() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundItems] = useState<FoundItem[]>([
    {
      id: '1',
      description: 'Black leather wallet',
      location: 'Seat 15A',
      date: '2024-01-15',
      status: 'reported'
    },
    {
      id: '2', 
      description: 'Blue smartphone',
      location: 'Under seat 8B',
      date: '2024-01-14',
      status: 'claimed'
    }
  ]);

  const [formData, setFormData] = useState({
    description: '',
    location: '',
    category: 'electronics'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reporting found item:', formData);
    setShowReportForm(false);
    setFormData({ description: '', location: '', category: 'electronics' });
  };

  const filteredItems = foundItems.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Lost & Found</h1>
        <button
          onClick={() => setShowReportForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          Report Found Item
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search found items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Found Items List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Found Items</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-3 sm:p-4 lg:p-6 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">{item.description}</h3>
                <p className="text-sm sm:text-base text-gray-500">Found at: {item.location}</p>
                <p className="text-sm sm:text-base text-gray-500">Date: {item.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'reported' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.status}
                </span>
                <button className="text-green-600 hover:text-green-800 text-sm sm:text-base font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 w-full max-w-md">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Report Found Item</h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Location Found
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="documents">Documents</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <PhotoIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm sm:text-base text-gray-500">Click to upload photo</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Report Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
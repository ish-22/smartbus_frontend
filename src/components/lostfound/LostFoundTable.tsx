'use client';

import { LostFoundItem, LostFoundStatus } from '@/types/lostFound';
import { lostFoundAPI } from '@/services/api/lostFound';
import { useState } from 'react';

interface LostFoundTableProps {
  items: LostFoundItem[];
  token: string;
  onUpdate: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canChangeStatus?: boolean;
}

export default function LostFoundTable({ 
  items, 
  token, 
  onUpdate, 
  canEdit = false, 
  canDelete = false,
  canChangeStatus = false 
}: LostFoundTableProps) {
  const [loading, setLoading] = useState<number | null>(null);

  const getStatusBadge = (status: LostFoundStatus) => {
    const colors = {
      lost: 'bg-red-100 text-red-800',
      found: 'bg-yellow-100 text-yellow-800',
      returned: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const handleStatusChange = async (id: number, newStatus: LostFoundStatus) => {
    setLoading(id);
    try {
      await lostFoundAPI.updateStatus(token, id, newStatus);
      onUpdate();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setLoading(id);
    try {
      await lostFoundAPI.delete(token, id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item');
    } finally {
      setLoading(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
        No items found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported By</th>
              {(canChangeStatus || canDelete) && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.item_name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{item.description}</td>
                <td className="px-4 py-3 text-sm">{item.found_location}</td>
                <td className="px-4 py-3 text-sm">{new Date(item.found_date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">{item.bus?.bus_number || 'N/A'}</td>
                <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                <td className="px-4 py-3 text-sm">{item.user?.name || 'Unknown'}</td>
                {(canChangeStatus || canDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {canChangeStatus && (
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as LostFoundStatus)}
                          disabled={loading === item.id}
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="lost">Lost</option>
                          <option value="found">Found</option>
                          <option value="returned">Returned</option>
                        </select>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={loading === item.id}
                          className="text-red-600 hover:text-red-800 text-xs font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

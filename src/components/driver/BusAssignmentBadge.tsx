'use client';

import { useDriverStore } from '@/store/driverStore';
import { TruckIcon, BoltIcon } from '@heroicons/react/24/outline';

export default function BusAssignmentBadge() {
  const { session, isSessionActive } = useDriverStore();

  if (!isSessionActive() || !session) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
      {session.driverType === 'expressway' ? (
        <BoltIcon className="h-4 w-4 text-green-600" />
      ) : (
        <TruckIcon className="h-4 w-4 text-blue-600" />
      )}
      <div className="text-sm">
        <span className="font-medium text-gray-900">Bus {session.busNumber}</span>
        <span className="text-gray-500 mx-1">•</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${
          session.driverType === 'expressway'
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {session.driverType === 'expressway' ? 'Expressway' : 'Normal'}
        </span>
      </div>
    </div>
  );
}


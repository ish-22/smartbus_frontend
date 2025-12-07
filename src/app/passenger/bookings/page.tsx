'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getBookingsAPI, completeBookingAPI, cancelBookingAPI, Booking } from '@/services/api/bookingApi';
import { rewardAPI } from '@/services/api/rewards';
import { CalendarIcon, TicketIcon, MapPinIcon, ClockIcon, GiftIcon } from '@heroicons/react/24/outline';

export default function PassengerBookingsPage() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const data = await getBookingsAPI(token);
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const fetchPoints = async () => {
    if (!token) return;
    try {
      const response = await rewardAPI.getUserPoints(token);
      setTotalPoints(response.total_points);
    } catch (error) {
      console.error('Failed to fetch points:', error);
    }
  };

  const handleCompleteBooking = async (id: number) => {
    if (!token || !confirm('Mark this booking as completed?')) return;
    
    try {
      const response = await completeBookingAPI(id.toString(), token);
      if (response.total_points_earned > 0) {
        setRewardMessage(response.message);
        setTimeout(() => setRewardMessage(''), 7000);
      }
      fetchBookings();
      fetchPoints();
    } catch (error) {
      console.error('Failed to complete booking:', error);
      alert('Failed to complete booking.');
    }
  };

  const handleCancelBooking = async (id: number) => {
    if (!token || !confirm('Cancel this booking?')) return;
    
    try {
      await cancelBookingAPI(id.toString(), token);
      fetchBookings();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking.');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token) {
      fetchBookings();
      fetchPoints();
      setLoading(false);
    }
  }, [mounted, token]);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || !token) {
    return <div className="p-6">Please log in to access this page.</div>;
  }

  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bookings & Tickets</h1>
        <p className="text-gray-600">Manage your bus bookings and e-tickets</p>
      </div>

      {rewardMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <GiftIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">{rewardMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <TicketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Tickets</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{activeBookings.length}</p>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Bookings</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <GiftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Reward Points</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{totalPoints}</p>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <span className="text-orange-600 text-lg sm:text-xl lg:text-2xl">Rs.</span>
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Spent</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Rs. {bookings.reduce((sum, b) => sum + (b.fare - (b.discount_amount || 0)), 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Active Bookings</h2>
          <div className="space-y-3 sm:space-y-4">
            {loading ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">Loading...</div>
            ) : activeBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <TicketIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No active bookings</p>
              </div>
            ) : (
              activeBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                          <TicketIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Booking #{booking.id}</h3>
                          <p className="text-gray-600">Bus: {booking.bus?.name || 'N/A'}</p>
                          <p className="text-sm text-gray-500">Payment: {booking.payment_method?.replace('_', ' ').toUpperCase()}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{new Date(booking.created_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium">Seat: {booking.seat_number || 'N/A'}</span>
                        </div>
                        {booking.points_used > 0 && (
                          <div className="col-span-2 text-green-600 text-sm">
                            Used {booking.points_used} points (Rs. {booking.discount_amount} discount)
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div>
                        {booking.discount_amount > 0 ? (
                          <>
                            <p className="text-sm text-gray-500 line-through">Rs. {booking.fare}</p>
                            <p className="text-xl font-bold text-gray-900">Rs. {booking.fare - booking.discount_amount}</p>
                          </>
                        ) : (
                          <p className="text-xl font-bold text-gray-900">Rs. {booking.fare}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                        <br />
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.payment_status === 'paid' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {booking.payment_status?.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-3 space-x-2">
                        <button
                          onClick={() => handleCompleteBooking(booking.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Completed Bookings</h2>
          <div className="bg-white rounded-lg shadow">
            {completedBookings.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No completed bookings yet</p>
                <p className="text-sm text-gray-400 mt-2">Complete bookings to earn 10 reward points each!</p>
              </div>
            ) : (
              <div className="divide-y">
                {completedBookings.map((booking) => (
                  <div key={booking.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Booking #{booking.id}</h4>
                      <p className="text-sm text-gray-600">{new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div>
                        {booking.discount_amount > 0 ? (
                          <>
                            <p className="text-sm text-gray-500 line-through">Rs. {booking.fare}</p>
                            <p className="font-bold">Rs. {booking.fare - booking.discount_amount}</p>
                          </>
                        ) : (
                          <p className="font-bold">Rs. {booking.fare}</p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <GiftIcon className="h-4 w-4 mr-1" />
                        +10+ points earned
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

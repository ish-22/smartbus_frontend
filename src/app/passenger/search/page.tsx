'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createBookingAPI } from '@/services/api/bookingApi';
import { rewardAPI } from '@/services/api/rewards';
import { MagnifyingGlassIcon, MapPinIcon, ClockIcon, GiftIcon } from '@heroicons/react/24/outline';

interface Bus {
  id: number;
  name: string;
  route: string;
  from: string;
  to: string;
  time: string;
  duration: string;
  price: number;
}

export default function PassengerSearchPage() {
  const { user, token } = useAuth();
  const [buses] = useState<Bus[]>([
    { id: 1, name: 'Express 12A', route: 'Route 12A', from: 'Colombo Fort', to: 'Kandy', time: '08:30 AM', duration: '3h 30m', price: 250 },
    { id: 2, name: 'Luxury 15B', route: 'Route 15B', from: 'Colombo Fort', to: 'Kandy', time: '10:00 AM', duration: '3h 45m', price: 280 },
  ]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');

  const fetchPoints = async () => {
    if (!token) return;
    try {
      const response = await rewardAPI.getUserPoints(token);
      setTotalPoints(response.total_points);
    } catch (error) {
      console.error('Failed to fetch points:', error);
    }
  };

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit_card' | 'debit_card' | 'digital_wallet'>('cash');
  const [pointsToUse, setPointsToUse] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holderName: ''
  });
  const [walletType, setWalletType] = useState('paypal');

  const handleBookNow = (bus: Bus) => {
    if (!token) {
      alert('Please log in to book a ticket.');
      return;
    }
    setSelectedBus(bus);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedBus || !token) return;

    setLoading(true);
    try {
      const bookingData: any = {
        bus_id: selectedBus.id,
        seat_number: `A${Math.floor(Math.random() * 20) + 1}`,
        fare: selectedBus.price,
        payment_method: paymentMethod
      };

      if (pointsToUse > 0) {
        bookingData.points_to_use = pointsToUse;
      }

      if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
        bookingData.card_number = cardDetails.number;
        bookingData.card_expiry = cardDetails.expiry;
        bookingData.card_cvv = cardDetails.cvv;
        bookingData.card_holder_name = cardDetails.holderName;
      }

      if (paymentMethod === 'digital_wallet') {
        bookingData.wallet_type = walletType;
      }

      const response = await createBookingAPI(bookingData, token);
      
      setBookingMessage(`Booking successful! ${response.points_used > 0 ? `Used ${response.points_used} points. ` : ''}Complete your trip to earn rewards.`);
      setShowBookingForm(false);
      setSelectedBus(null);
      fetchPoints();
      setTimeout(() => setBookingMessage(''), 5000);
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token) {
      fetchPoints();
    }
  }, [mounted, token]);

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Search Buses</h1>
          <p className="text-gray-600">Find buses for your journey</p>
        </div>
        {user && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center">
              <GiftIcon className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-800 font-medium">{totalPoints} Points</span>
            </div>
          </div>
        )}
      </div>

      {bookingMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <GiftIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">{bookingMessage}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              placeholder="Enter departure location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              title="Select travel date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
          <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Search Buses
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Available Buses</h2>
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{bus.name}</h3>
                <p className="text-sm text-gray-600">{bus.route}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {bus.from} → {bus.to}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {bus.time} ({bus.duration})
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">Rs. {bus.price}</p>
                <div className="text-xs text-green-600 mb-2">+10 points on completion</div>
                <button
                  onClick={() => handleBookNow(bus)}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Booking Form Modal */}
      {showBookingForm && selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Book {selectedBus.name}</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Fare: Rs. {selectedBus.price}</p>
                {pointsToUse > 0 && (
                  <p className="text-sm text-green-600">Discount: -Rs. {pointsToUse}</p>
                )}
                <p className="font-semibold">Total: Rs. {selectedBus.price - pointsToUse}</p>
              </div>

              {/* Points Usage */}
              <div>
                <label className="block text-sm font-medium mb-1">Use Reward Points (Available: {totalPoints})</label>
                <input
                  type="number"
                  min="0"
                  max={Math.min(totalPoints, Math.floor(selectedBus.price * 0.5))}
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(parseInt(e.target.value) || 0)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Points to use (1 point = Rs. 1)"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="cash">Cash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="digital_wallet">Digital Wallet</option>
                </select>
              </div>

              {/* Card Details */}
              {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      className="border rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      className="border rounded px-3 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardDetails.holderName}
                    onChange={(e) => setCardDetails({...cardDetails, holderName: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              )}

              {/* Wallet Type */}
              {paymentMethod === 'digital_wallet' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Wallet Type</label>
                  <select
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="paypal">PayPal</option>
                    <option value="google_pay">Google Pay</option>
                    <option value="apple_pay">Apple Pay</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleConfirmBooking}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

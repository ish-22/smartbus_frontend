'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createBookingAPI } from '@/services/api/bookingApi';
import { rewardAPI } from '@/services/api/rewards';
import { bookingRewardAPI, BookingRewardData, DiscountCalculation } from '@/services/api/bookingRewards';
import { busSearchAPI, Bus } from '@/services/api/busSearchApi';
import { busSeatAPI, BusSeatData } from '@/services/api/busSeatApi';
import SeatMap from '@/components/SeatMap';
import QRTicketModal from '@/components/QRTicketModal';
import { sendQRCodeEmail } from '@/services/emailService';
import { MagnifyingGlassIcon, MapPinIcon, ClockIcon, GiftIcon } from '@heroicons/react/24/outline';

export default function PassengerSearchPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });
  const [searchLoading, setSearchLoading] = useState(false);
  const [rewardData, setRewardData] = useState<BookingRewardData | null>(null);
  const [discountCalculation, setDiscountCalculation] = useState<DiscountCalculation | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');

  const fetchBuses = async () => {
    setSearchLoading(true);
    try {
      const data = await busSearchAPI.searchBuses(searchParams);
      setBuses(data);
    } catch (error) {
      console.error('Failed to fetch buses:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchRewardData = async () => {
    if (!token) return;
    try {
      const data = await bookingRewardAPI.getBookingData(token);
      console.log('Reward data received:', data);
      setRewardData(data);
      // Reset points to use if user doesn't have enough
      if (pointsToUse > 0 && data.user_points < pointsToUse) {
        setPointsToUse(0);
      }
    } catch (error) {
      console.error('Failed to fetch reward data:', error);
    }
  };

  const calculateDiscount = async () => {
    if (!token || !selectedBus) return;
    
    try {
      const calculation = await bookingRewardAPI.calculateDiscount(token, {
        fare: selectedBus.price,
        points_to_use: pointsToUse > 0 ? pointsToUse : undefined,
        offer_id: selectedOfferId || undefined
      });
      setDiscountCalculation(calculation);
    } catch (error) {
      console.error('Failed to calculate discount:', error);
    }
  };

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [seatData, setSeatData] = useState<BusSeatData | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seatLoading, setSeatLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit_card' | 'debit_card' | 'digital_wallet'>('cash');
  const [pointsToUse, setPointsToUse] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holderName: ''
  });
  const [walletType, setWalletType] = useState('paypal');
  const [email, setEmail] = useState('');

  const handleBookNow = async (bus: Bus) => {
    if (!token) {
      alert('Please log in to book a ticket.');
      return;
    }
    setSelectedBus(bus);
    setSelectedSeat(null);
    setPointsToUse(0);
    setSelectedOfferId(null);
    setDiscountCalculation(null);
    setEmail(user?.email || '');
    setShowBookingForm(true);
    
    // Fetch available seats
    setSeatLoading(true);
    try {
      const seats = await busSeatAPI.getAvailableSeats(bus.id, searchParams.date, bus.trip_number);
      setSeatData(seats);
    } catch (error) {
      console.error('Failed to fetch seats:', error);
    } finally {
      setSeatLoading(false);
    }
    
    if (rewardData && selectedOfferId && Array.isArray(rewardData.redeemed_offers) && rewardData.redeemed_offers.includes(selectedOfferId)) {
      setSelectedOfferId(null);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedBus || !token || !selectedSeat) {
      alert('Please select a seat before booking.');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate points before submitting
    if (pointsToUse > 0 && rewardData && pointsToUse > rewardData.user_points) {
      alert(`You only have ${rewardData.user_points} points available. Please reduce the points to use.`);
      return;
    }

    // Validate offer before submitting
    if (selectedOfferId && rewardData && Array.isArray(rewardData.redeemed_offers) && rewardData.redeemed_offers.includes(selectedOfferId)) {
      alert('You have already used this offer. Please select a different offer.');
      return;
    }

    setLoading(true);
    try {
      const bookingData: any = {
        bus_id: selectedBus.id,
        seat_number: selectedSeat,
        fare: selectedBus.price,
        trip_number: selectedBus.trip_number,
        payment_method: paymentMethod,
        email: email
      };

      if (pointsToUse > 0) {
        bookingData.points_to_use = pointsToUse;
      }
      
      if (selectedOfferId) {
        bookingData.offer_id = selectedOfferId;
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
      
      const ticketId = `TKT-${String(response.data.id).padStart(6, '0')}`;
      
      // Backend will send email via EmailJS
      // Frontend just shows QR modal
      
      setShowBookingForm(false);
      setSelectedBus(null);
      
      // Show QR code modal
      setBookingResult({
        ticketId: ticketId,
        passengerName: user?.name || 'Passenger',
        busName: selectedBus.name,
        seat: selectedSeat,
        fare: response.final_amount || selectedBus.price
      });
      setShowQRModal(true);
      
      alert('Booking confirmed! QR code has been sent to your email.');
    } catch (error) {
      console.error('Failed to create booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking. Please try again.';
      alert(errorMessage);
      
      // Refresh seat availability if seat was already booked
      if (errorMessage.includes('already booked')) {
        setSeatLoading(true);
        try {
          const seats = await busSeatAPI.getAvailableSeats(selectedBus.id, searchParams.date, selectedBus.trip_number);
          setSeatData(seats);
          setSelectedSeat(null);
        } catch (err) {
          console.error('Failed to refresh seats:', err);
        } finally {
          setSeatLoading(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchBuses();
  }, []);

  useEffect(() => {
    if (mounted && token) {
      fetchRewardData();
    }
  }, [mounted, token]);

  useEffect(() => {
    if (selectedBus && (pointsToUse > 0 || selectedOfferId)) {
      calculateDiscount();
    } else {
      setDiscountCalculation(null);
    }
  }, [pointsToUse, selectedOfferId, selectedBus]);

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
        {user && rewardData && rewardData.user_points !== undefined && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center">
              <GiftIcon className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-800 font-medium">{rewardData.user_points} Points</span>
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
              value={searchParams.from}
              onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              placeholder="Enter destination"
              value={searchParams.to}
              onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              title="Select travel date"
              value={searchParams.date}
              onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button onClick={fetchBuses} disabled={searchLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center disabled:bg-gray-400">
          <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          {searchLoading ? 'Searching...' : 'Search Buses'}
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Available Buses</h2>
        {searchLoading ? (
          <div className="text-center py-8 text-gray-500">Loading buses...</div>
        ) : buses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No buses available</div>
        ) : (
          buses.map((bus) => (
          <div key={`${bus.id}-${bus.trip_number}`} className="bg-white rounded-lg shadow p-4">
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
          ))
        )}
      </div>

      {/* Enhanced Booking Form Modal */}
      {showBookingForm && selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Book {selectedBus.name}</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Original Fare: Rs. {selectedBus.price}</p>
                {discountCalculation && discountCalculation.total_discount > 0 && (
                  <>
                    <p className="text-sm text-green-600">Total Discount: -Rs. {discountCalculation.total_discount}</p>
                    <p className="font-semibold text-lg text-green-700">Final Amount: Rs. {discountCalculation.final_amount}</p>
                  </>
                )}
                {!discountCalculation && (
                  <p className="font-semibold">Total: Rs. {selectedBus.price}</p>
                )}
              </div>

              {/* Seat Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Your Seat</label>
                {seatLoading ? (
                  <div className="text-center py-4 text-gray-500">Loading seats...</div>
                ) : seatData ? (
                  <>
                    <SeatMap
                      capacity={seatData.capacity}
                      bookedSeats={seatData.booked_seats}
                      selectedSeat={selectedSeat}
                      onSeatSelect={setSelectedSeat}
                    />
                    {selectedSeat && (
                      <p className="text-sm text-green-600 mt-2 font-medium">Selected Seat: {selectedSeat}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{seatData.available_count} seats available</p>
                  </>
                ) : (
                  <p className="text-sm text-red-500">Failed to load seats</p>
                )}
              </div>

              {/* Available Offers */}
              {rewardData && rewardData.available_offers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-1">Available Offers</label>
                  <select
                    value={selectedOfferId || ''}
                    onChange={(e) => setSelectedOfferId(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">No offer selected</option>
                    {rewardData.available_offers.map((offer) => (
                      <option key={offer.id} value={offer.id}>
                        {offer.title} - {offer.discount_percentage}% OFF
                      </option>
                    ))}
                  </select>
                  {selectedOfferId && rewardData && Array.isArray(rewardData.redeemed_offers) && rewardData.redeemed_offers.includes(selectedOfferId) && (
                    <p className="text-xs text-red-500 mt-1">This offer has already been used</p>
                  )}
                </div>
              )}

              {/* Points Usage */}
              {rewardData && rewardData.user_points > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-1">Use Reward Points (Available: {rewardData.user_points})</label>
                  <input
                    type="number"
                    min="0"
                    max={Math.min(rewardData.user_points, Math.floor(selectedBus.price * 0.5))}
                    value={pointsToUse}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const maxAllowed = Math.min(rewardData.user_points, Math.floor(selectedBus.price * 0.5));
                      setPointsToUse(Math.min(value, maxAllowed));
                    }}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Points to use (1 point = Rs. 1)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 50% of fare can be paid with points</p>
                  {pointsToUse > rewardData.user_points && (
                    <p className="text-xs text-red-500 mt-1">You only have {rewardData.user_points} points available</p>
                  )}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">QR code will be sent to this email</p>
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

              {/* Discount Breakdown */}
              {discountCalculation && discountCalculation.total_discount > 0 && (
                <div className="bg-green-50 p-3 rounded border">
                  <h4 className="font-medium text-green-800 mb-2">Discount Breakdown:</h4>
                  {discountCalculation.discount_breakdown.points && (
                    <p className="text-sm text-green-700">
                      Points: {discountCalculation.discount_breakdown.points.points_used} points = Rs. {discountCalculation.discount_breakdown.points.discount_amount}
                    </p>
                  )}
                  {discountCalculation.discount_breakdown.offer && (
                    <p className="text-sm text-green-700">
                      Offer: {discountCalculation.discount_breakdown.offer.offer_title} ({discountCalculation.discount_breakdown.offer.discount_percentage}%) = Rs. {discountCalculation.discount_breakdown.offer.discount_amount}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleConfirmBooking}
                  disabled={loading || !selectedSeat ||
                    (pointsToUse > 0 && rewardData && pointsToUse > rewardData.user_points) ||
                    (selectedOfferId && rewardData && Array.isArray(rewardData.redeemed_offers) && rewardData.redeemed_offers.includes(selectedOfferId))
                  }
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : `Confirm Booking${discountCalculation ? ` - Rs. ${discountCalculation.final_amount}` : ''}`}
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

      {/* QR Ticket Modal */}
      {showQRModal && bookingResult && (
        <QRTicketModal
          ticketId={bookingResult.ticketId}
          passengerName={bookingResult.passengerName}
          busName={bookingResult.busName}
          seat={bookingResult.seat}
          fare={bookingResult.fare}
          onClose={() => {
            setShowQRModal(false);
            router.push('/passenger/bookings');
          }}
        />
      )}
    </div>
  );
}

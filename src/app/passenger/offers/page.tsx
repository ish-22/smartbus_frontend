'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { offerAPI, Offer } from '@/services/api/offers';
import { rewardAPI } from '@/services/api/rewards';

export default function PassengerOffersPage() {
  const { user, token } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [offersResponse, pointsResponse] = await Promise.all([
        offerAPI.getActiveOffers(token),
        rewardAPI.getUserPoints(token)
      ]);
      
      setOffers(offersResponse.data || []);
      setUserPoints(pointsResponse.total_points);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (offerId: number) => {
    if (!token) return;
    
    try {
      await offerAPI.redeemOffer(token, { offer_id: offerId });
      alert('Offer redeemed successfully!');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Failed to redeem offer:', error);
      alert('Failed to redeem offer. Please try again.');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchData();
    }
  }, [token, mounted]);

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
          <h1 className="text-3xl font-bold">Available Offers</h1>
          <p className="text-gray-600 mt-1">Redeem your points for great discounts</p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="text-blue-800 font-semibold">Your Points: {userPoints}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading offers...</div>
      ) : offers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No active offers available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const canRedeem = userPoints >= offer.required_points;
            
            return (
              <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{offer.title}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      {offer.discount_percentage}% OFF
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Required Points:</span>
                      <span className="font-semibold">{offer.required_points}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Valid Until:</span>
                      <span>{new Date(offer.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(offer.id)}
                    disabled={!canRedeem}
                    className={`w-full py-2 px-4 rounded font-medium ${
                      canRedeem
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canRedeem ? 'Redeem Offer' : 'Insufficient Points'}
                  </button>
                  
                  {!canRedeem && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      Need {offer.required_points - userPoints} more points
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
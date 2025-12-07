'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { rewardAPI, RewardTransaction } from '@/services/api/rewards';
import { offerAPI, Offer } from '@/services/api/offers';
import { GiftIcon, TagIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function PassengerRewardsPage() {
  const { user, token } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [history, setHistory] = useState<RewardTransaction[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [redeemedOfferIds, setRedeemedOfferIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchRewardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [pointsResponse, historyResponse, offersResponse, redeemedResponse] = await Promise.all([
        rewardAPI.getUserPoints(token),
        rewardAPI.getRewardHistory(token),
        offerAPI.getActiveOffers(token),
        offerAPI.getRedeemedOffers(token)
      ]);
      
      setTotalPoints(pointsResponse.total_points);
      setHistory(historyResponse.data || []);
      setOffers(offersResponse.data || []);
      setRedeemedOfferIds(redeemedResponse.redeemed_offer_ids || []);
    } catch (error) {
      console.error('Failed to fetch reward data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemOffer = async (offer: Offer) => {
    if (!token) return;
    
    if (totalPoints < offer.required_points) {
      alert(`You need ${offer.required_points} points to redeem this offer. You have ${totalPoints} points.`);
      return;
    }

    if (!confirm(`Redeem "${offer.title}" for ${offer.required_points} points?`)) return;

    try {
      await offerAPI.redeemOffer(token, { offer_id: offer.id });
      alert('Offer redeemed successfully! Use it on your next booking.');
      fetchRewardData(); // Refresh data
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
      fetchRewardData();
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Rewards</h1>
        <p className="text-gray-600 mt-1">Earn points and redeem offers</p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Total Points</h2>
          <div className="text-4xl font-bold">{totalPoints}</div>
          <p className="mt-2 opacity-90">Keep booking and giving feedback to earn more!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Booking Rewards</h3>
          <p className="text-green-600">+10 points per completed booking</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Feedback Rewards</h3>
          <p className="text-blue-600">+5 points per feedback submitted</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Payment Bonus</h3>
          <p className="text-purple-600">+3-5 points for digital payments</p>
        </div>
      </div>

      {/* Available Offers Section */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <GiftIcon className="h-6 w-6 mr-2 text-purple-600" />
            Available Offers
          </h2>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">Loading offers...</div>
          ) : offers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No offers available at the moment. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => {
                const canRedeem = totalPoints >= offer.required_points;
                const isExpired = new Date(offer.end_date) < new Date();
                const alreadyRedeemed = redeemedOfferIds.includes(offer.id);
                
                return (
                  <div key={offer.id} className={`border rounded-lg p-4 ${
                    alreadyRedeemed ? 'border-gray-300 bg-gray-100' :
                    canRedeem && !isExpired ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <TagIcon className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-semibold">{offer.title}</h3>
                      </div>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {offer.discount_percentage}% OFF
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Valid until {new Date(offer.end_date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-purple-600">
                        {offer.required_points} points
                      </div>
                      
                      {alreadyRedeemed ? (
                        <span className="text-gray-500 text-sm font-medium">Already Redeemed</span>
                      ) : isExpired ? (
                        <span className="text-red-500 text-sm font-medium">Expired</span>
                      ) : canRedeem ? (
                        <button
                          onClick={() => handleRedeemOffer(offer)}
                          className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
                        >
                          Redeem
                        </button>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Need {offer.required_points - totalPoints} more points
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Points History</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reward history yet. Start booking and giving feedback to earn points!
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.reason} • {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`font-bold ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.points > 0 ? '+' : ''}{transaction.points} points
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function PassengerRewards() {
  return (
    <div className="card-responsive max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-responsive-lg text-gray-800">🎁 My Rewards</h1>
      
      <div className="grid-responsive-3 gap-responsive-md mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 card-responsive rounded-lg text-white">
          <h2 className="text-responsive-lg font-semibold mb-2">Total Points</h2>
          <p className="text-3xl font-bold">2,450</p>
          <p className="text-responsive-sm opacity-90">Earned from 45 trips</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-500 card-responsive rounded-lg text-white">
          <h2 className="text-responsive-lg font-semibold mb-2">Distance Traveled</h2>
          <p className="text-3xl font-bold">1,250 km</p>
          <p className="text-responsive-sm opacity-90">This month</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 card-responsive rounded-lg text-white">
          <h2 className="text-responsive-lg font-semibold mb-2">Savings</h2>
          <p className="text-3xl font-bold">Rs. 850</p>
          <p className="text-responsive-sm opacity-90">From rewards</p>
        </div>
      </div>

      <div className="grid-responsive-1 lg:grid-cols-2 gap-responsive-lg">
        <div className="bg-white rounded-lg shadow card-responsive">
          <h2 className="text-responsive-xl font-semibold mb-responsive-md">🏆 Available Rewards</h2>
          <div className="space-responsive-sm">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">10% Discount</h3>
                <p className="text-responsive-sm text-gray-600">Valid for next booking</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Redeem (500 pts)
              </button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Free Trip</h3>
                <p className="text-responsive-sm text-gray-600">Up to Rs. 200 value</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Redeem (1000 pts)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow card-responsive">
          <h2 className="text-responsive-xl font-semibold mb-responsive-md">📈 Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-responsive-sm">Trip to Kandy</span>
              <span className="text-green-600 font-medium">+50 pts</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-responsive-sm">Trip to Galle</span>
              <span className="text-green-600 font-medium">+75 pts</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-responsive-sm">Redeemed discount</span>
              <span className="text-red-600 font-medium">-500 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

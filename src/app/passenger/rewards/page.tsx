export default function PassengerRewards() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🎁 My Rewards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-lg text-white">
          <h2 className="text-lg font-semibold mb-2">Total Points</h2>
          <p className="text-3xl font-bold">2,450</p>
          <p className="text-sm opacity-90">Earned from 45 trips</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-lg text-white">
          <h2 className="text-lg font-semibold mb-2">Distance Traveled</h2>
          <p className="text-3xl font-bold">1,250 km</p>
          <p className="text-sm opacity-90">This month</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-lg text-white">
          <h2 className="text-lg font-semibold mb-2">Savings</h2>
          <p className="text-3xl font-bold">Rs. 850</p>
          <p className="text-sm opacity-90">From rewards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">🏆 Available Rewards</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">10% Discount</h3>
                <p className="text-sm text-gray-600">Valid for next booking</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Redeem (500 pts)
              </button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Free Trip</h3>
                <p className="text-sm text-gray-600">Up to Rs. 200 value</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Redeem (1000 pts)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📈 Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Trip to Kandy</span>
              <span className="text-green-600 font-medium">+50 pts</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Trip to Galle</span>
              <span className="text-green-600 font-medium">+75 pts</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Redeemed discount</span>
              <span className="text-red-600 font-medium">-500 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

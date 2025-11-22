import Link from 'next/link'

export default function PassengerDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Passenger Dashboard</h1>
        <p className="text-gray-600">Manage your travel experience with ease</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/passenger/search" className="group">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">🔍</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Track Buses</h2>
                <p className="text-gray-600 mb-3 sm:mb-4">Find and track buses in real-time with GPS precision</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Start Tracking</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/passenger/booking" className="group">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">🎫</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Book Seats</h2>
                <p className="text-gray-600 mb-3 sm:mb-4">Reserve your seat online with instant confirmation</p>
                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Book Now</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/passenger/tickets" className="group">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">📱</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">My Tickets</h2>
                <p className="text-gray-600 mb-3 sm:mb-4">View your booking history and active tickets</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Tickets</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/passenger/rewards" className="group">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">🎁</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Rewards</h2>
                <p className="text-gray-600 mb-3 sm:mb-4">Earn points and redeem exclusive offers</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Rewards</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/lost-found" className="group">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">🔍</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Lost & Found</h2>
                <p className="text-gray-600 mb-3 sm:mb-4">Report or claim lost items from your journey</p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Report Item</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/feedback" className="group">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">💬</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Feedback</h2>
                <p className="text-gray-600 mb-3 sm:mb-4">Share your experience and help us improve</p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Give Feedback</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
      </div>
    </div>
  )
}

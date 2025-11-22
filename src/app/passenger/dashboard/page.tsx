import Link from 'next/link'

export default function PassengerDashboard() {
  return (
    <div className="space-responsive-lg no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Passenger Dashboard</h1>
        <p className="text-gray-600">Manage your travel experience with ease</p>
      </div>
      
      <div className="grid-responsive-2 lg:grid-cols-3 gap-responsive-md">
            <Link href="/passenger/search" className="group">
              <div className="bg-white card-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-responsive-md group-hover:scale-110 transition-transform">
                  <span className="text-white text-responsive-xl">🔍</span>
                </div>
                <h2 className="text-responsive-xl font-bold text-gray-800 mb-2">Track Buses</h2>
                <p className="text-gray-600 mb-responsive-md">Find and track buses in real-time with GPS precision</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Start Tracking</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/passenger/booking" className="group">
              <div className="bg-white card-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-responsive-md group-hover:scale-110 transition-transform">
                  <span className="text-white text-responsive-xl">🎫</span>
                </div>
                <h2 className="text-responsive-xl font-bold text-gray-800 mb-2">Book Seats</h2>
                <p className="text-gray-600 mb-responsive-md">Reserve your seat online with instant confirmation</p>
                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Book Now</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/passenger/tickets" className="group">
              <div className="bg-white card-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-responsive-md group-hover:scale-110 transition-transform">
                  <span className="text-white text-responsive-xl">📱</span>
                </div>
                <h2 className="text-responsive-xl font-bold text-gray-800 mb-2">My Tickets</h2>
                <p className="text-gray-600 mb-responsive-md">View your booking history and active tickets</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Tickets</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/passenger/rewards" className="group">
              <div className="bg-white card-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-responsive-md group-hover:scale-110 transition-transform">
                  <span className="text-white text-responsive-xl">🎁</span>
                </div>
                <h2 className="text-responsive-xl font-bold text-gray-800 mb-2">Rewards</h2>
                <p className="text-gray-600 mb-responsive-md">Earn points and redeem exclusive offers</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Rewards</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/lost-found" className="group">
              <div className="bg-white card-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-responsive-md group-hover:scale-110 transition-transform">
                  <span className="text-white text-responsive-xl">🔍</span>
                </div>
                <h2 className="text-responsive-xl font-bold text-gray-800 mb-2">Lost & Found</h2>
                <p className="text-gray-600 mb-responsive-md">Report or claim lost items from your journey</p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Report Item</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
            
            <Link href="/feedback" className="group">
              <div className="bg-white card-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-responsive-md group-hover:scale-110 transition-transform">
                  <span className="text-white text-responsive-xl">💬</span>
                </div>
                <h2 className="text-responsive-xl font-bold text-gray-800 mb-2">Feedback</h2>
                <p className="text-gray-600 mb-responsive-md">Share your experience and help us improve</p>
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

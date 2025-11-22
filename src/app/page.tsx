import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center transition-transform hover:scale-[1.02] duration-300">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl sm:text-2xl lg:text-3xl">🚌</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">SmartBus Tracker</h1>
        <p className="mt-3 text-gray-500 text-base sm:text-lg lg:text-xl">
          Track buses in real-time, plan your journey, and travel smarter.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/passenger"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Find Buses
            <span className="ml-2">→</span>
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
          >
            Login
          </Link>
        </div>
        <p className="mt-6 text-sm sm:text-base text-gray-400">
          New to SmartBus?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

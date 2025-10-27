
import { ArrowRight, Bus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center transition-transform hover:scale-[1.02] duration-300">
        <div className="flex justify-center mb-4">
          <Bus className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">SmartBus Tracker</h1>
        <p className="mt-3 text-gray-500 text-lg">
          Track buses in real-time, plan your journey, and travel smarter.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/passenger/search"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Find Buses
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          {!isAuthenticated && (
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
            >
              Login
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 border border-red-600"
            >
              Logout {user?.name}
            </button>
          )}
        </div>
        <p className="mt-6 text-sm text-gray-400">
          New to SmartBus?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
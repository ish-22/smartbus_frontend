import PassengerLayout from '@/layouts/MainLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import Link from 'next/link';

export default function BookingConfirmation() {
  return (
    <AuthGuard>
      <RoleGuard roles={['PASSENGER']}>
        <PassengerLayout title="Booking Confirmation">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8 text-center">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Booking Confirmed!</h2>
            <p className="mb-4">Your bus booking has been successfully confirmed.</p>
            <Link href="/passenger/tickets" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">View My Tickets</Link>
          </div>
        </PassengerLayout>
      </RoleGuard>
    </AuthGuard>
  );
}

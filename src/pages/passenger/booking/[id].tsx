import PassengerLayout from '@/layouts/MainLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import { useRouter } from 'next/router';

export default function BookingDetails() {
  const router = useRouter();
  const { id } = router.query;
  // Simulate fetching booking details
  const booking = id ? {
    id,
    bus: '1234',
    date: '2025-09-28',
    seats: 2,
    status: 'Confirmed',
  } : null;

  return (
    <AuthGuard>
      <RoleGuard roles={['PASSENGER']}>
        <PassengerLayout title="Booking Details">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Booking Details</h2>
            {booking ? (
              <div className="space-y-2">
                <div><span className="font-semibold">Ticket ID:</span> {booking.id}</div>
                <div><span className="font-semibold">Bus:</span> {booking.bus}</div>
                <div><span className="font-semibold">Date:</span> {booking.date}</div>
                <div><span className="font-semibold">Seats:</span> {booking.seats}</div>
                <div><span className="font-semibold">Status:</span> {booking.status}</div>
              </div>
            ) : (
              <div className="text-red-600">Booking not found.</div>
            )}
          </div>
        </PassengerLayout>
      </RoleGuard>
    </AuthGuard>
  );
}

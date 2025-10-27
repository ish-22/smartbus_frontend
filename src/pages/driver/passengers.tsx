import DriverLayout from '@/layouts/DriverLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';

export default function DriverPassengers() {
  return (
    <AuthGuard>
      <RoleGuard roles={['DRIVER']}>
        <DriverLayout title="Passenger List">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Passenger List</h2>
            <ul className="space-y-2">
              <li className="border-b pb-2">John Doe</li>
              <li className="border-b pb-2">Jane Smith</li>
              <li className="border-b pb-2">Michael Lee</li>
            </ul>
          </div>
        </DriverLayout>
      </RoleGuard>
    </AuthGuard>
  );
}

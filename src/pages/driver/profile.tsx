import DriverLayout from '@/layouts/DriverLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import { useAuth } from '@/hooks/useAuth';

export default function DriverProfile() {
  const { user } = useAuth();
  return (
    <AuthGuard>
      <RoleGuard roles={['DRIVER']}>
        <DriverLayout title="Driver Profile">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Profile</h2>
            <div className="space-y-2">
              <div><span className="font-semibold">Name:</span> {user?.name}</div>
              <div><span className="font-semibold">Email:</span> {user?.email}</div>
              <div><span className="font-semibold">Role:</span> {user?.role}</div>
            </div>
          </div>
        </DriverLayout>
      </RoleGuard>
    </AuthGuard>
  );
}

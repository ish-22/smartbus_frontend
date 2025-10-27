import DriverLayout from '@/layouts/DriverLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';

export default function DriverSettings() {
  return (
    <AuthGuard>
      <RoleGuard roles={['DRIVER']}>
        <DriverLayout title="Driver Settings">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Notification Preferences</label>
                <select className="w-full border rounded px-2 py-1" title="Notification Preferences">
                  <option>Email</option>
                  <option>SMS</option>
                  <option>Push Notification</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Language</label>
                <select className="w-full border rounded px-2 py-1" title="Language">
                  <option>English</option>
                  <option>Sinhala</option>
                  <option>Tamil</option>
                </select>
              </div>
            </div>
          </div>
        </DriverLayout>
      </RoleGuard>
    </AuthGuard>
  );
}

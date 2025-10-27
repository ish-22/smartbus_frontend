import DriverLayout from '@/layouts/DriverLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';

export default function DriverLocation() {
	return (
		<AuthGuard>
			<RoleGuard roles={['DRIVER']}>
				<DriverLayout title="Location Update">
					<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
						<h2 className="text-xl font-bold mb-4 text-blue-700">Update Location</h2>
						<form className="space-y-4">
							<div>
								<label className="block font-semibold mb-1">Current Location</label>
								<input type="text" className="w-full border rounded px-2 py-1" title="Current Location" placeholder="Enter your location..." />
							</div>
							<button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Update</button>
						</form>
					</div>
				</DriverLayout>
			</RoleGuard>
		</AuthGuard>
	);
}

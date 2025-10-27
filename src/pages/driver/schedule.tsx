import DriverLayout from '@/layouts/DriverLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';

export default function DriverSchedule() {
	return (
		<AuthGuard>
			<RoleGuard roles={['DRIVER']}>
				<DriverLayout title="Driver Schedule">
					<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
						<h2 className="text-xl font-bold mb-4 text-blue-700">Today&apos;s Schedule</h2>
						<div className="space-y-2">
							<div className="font-semibold">Bus No: 1234</div>
							<div>Route: Main City - Suburb</div>
							<div>Departure: 8:00 AM</div>
							<div>Arrival: 9:30 AM</div>
						</div>
					</div>
				</DriverLayout>
			</RoleGuard>
		</AuthGuard>
	);
}

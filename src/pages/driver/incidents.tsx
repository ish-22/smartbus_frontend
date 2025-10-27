import DriverLayout from '@/layouts/DriverLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';

export default function DriverIncidents() {
	return (
		<AuthGuard>
			<RoleGuard roles={['DRIVER']}>
				<DriverLayout title="Incident Reports">
					<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
						<h2 className="text-xl font-bold mb-4 text-blue-700">Report an Incident</h2>
						<form className="space-y-4">
							<div>
								<label className="block font-semibold mb-1">Type</label>
								<select className="w-full border rounded px-2 py-1" title="Incident Type">
									<option>Accident</option>
									<option>Delay</option>
									<option>Other</option>
								</select>
							</div>
							<div>
								<label className="block font-semibold mb-1">Description</label>
								<textarea className="w-full border rounded px-2 py-1" rows={3} title="Incident Description" placeholder="Describe the incident..." />
							</div>
							<button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Submit</button>
						</form>
					</div>
				</DriverLayout>
			</RoleGuard>
		</AuthGuard>
	);
}

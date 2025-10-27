import AdminLayout from '@/layouts/AdminLayout';
export default function AdminSettings() {
	return (
		<AdminLayout title="System Settings">
			<div className="max-w-3xl mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4 text-blue-700">System Settings</h1>
				<p className="mb-6 text-gray-500">Configure system settings and preferences.</p>
				<div className="bg-white rounded-xl shadow p-4 w-full flex flex-col gap-4">
					{/* Example settings placeholder */}
					<div className="flex flex-col gap-2">
						<label className="font-semibold">Site Title</label>
						<input className="border rounded px-3 py-2" placeholder="SmartBus" />
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-semibold">Theme</label>
						<select className="border rounded px-3 py-2" title="Theme">
							<option>Light</option>
							<option>Dark</option>
						</select>
					</div>
					<button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full">Save Settings</button>
				</div>
			</div>
			</AdminLayout>
		);
	}

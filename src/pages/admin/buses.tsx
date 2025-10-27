import AdminLayout from '@/layouts/AdminLayout';
export default function AdminBuses() {
	return (
		<AdminLayout title="Manage Buses">
			<div className="max-w-3xl mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4 text-blue-700">Buses Management</h1>
				<p className="mb-6 text-gray-500">Add, edit, and track all buses in the system.</p>
				<div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="bg-blue-50">
								<th className="p-2 text-left">Bus Number</th>
								<th className="p-2 text-left">Capacity</th>
								<th className="p-2 text-left">Status</th>
								<th className="p-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* Example row, replace with dynamic data */}
							<tr>
								<td className="p-2">NB-1234</td>
								<td className="p-2">50</td>
								<td className="p-2">Active</td>
								<td className="p-2">
									<button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-2">Edit</button>
									<button className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			</AdminLayout>
		);
	}

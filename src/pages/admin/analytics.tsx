import AdminLayout from '@/layouts/AdminLayout';
export default function AdminAnalytics() {
	return (
		<AdminLayout title="System Analytics">
			<div className="max-w-3xl mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4 text-blue-700">System Analytics</h1>
				<p className="mb-6 text-gray-500">View system analytics and performance charts.</p>
				<div className="bg-white rounded-xl shadow p-4 w-full flex flex-col items-center">
					{/* Example chart placeholder */}
					<div className="w-full h-40 bg-blue-100 rounded flex items-center justify-center text-blue-700 font-semibold">
						Analytics Chart Placeholder
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

import AdminLayout from '@/layouts/AdminLayout';

export default function AdminFeedback() {
  return (
    <AdminLayout title="Manage Feedback">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Feedback Management</h1>
        <p className="mb-6 text-gray-500">Review and respond to user feedback.</p>
        <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Message</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row, replace with dynamic data */}
              <tr>
                <td className="p-2">Jane Smith</td>
                <td className="p-2">Great service!</td>
                <td className="p-2">2025-09-26</td>
                <td className="p-2">
                  <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-2">Reply</button>
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

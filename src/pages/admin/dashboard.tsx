import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import AdminLayout from '@/layouts/AdminLayout';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

export default function AdminDashboard() {
	const { lang } = useLangStore();
	 return (
		<AuthGuard>
			<RoleGuard roles={['ADMIN']}>
				<AdminLayout title={t('admin', lang) + ' ' + t('dashboard', lang)}>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-2 sm:px-4 w-full max-w-full">
						{/* Users Management */}
						<div className="bg-white rounded-xl shadow p-4 w-full max-w-full flex flex-col items-center">
							<h2 className="text-lg font-bold mb-2 text-blue-700">{t('users', lang)}</h2>
							<p className="text-gray-500 mb-4 text-center">Manage all users, view details, and update roles.</p>
							<Link href="/admin/users" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full text-center">Go to Users</Link>
						</div>
						{/* Buses Management */}
						<div className="bg-white rounded-xl shadow p-4 w-full max-w-full flex flex-col items-center">
							<h2 className="text-lg font-bold mb-2 text-blue-700">{t('buses', lang)}</h2>
							<p className="text-gray-500 mb-4 text-center">Add, edit, and track all buses in the system.</p>
							<Link href="/admin/buses" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full text-center">Go to Buses</Link>
						</div>
						{/* Routes Management */}
						<div className="bg-white rounded-xl shadow p-4 w-full max-w-full flex flex-col items-center">
							<h2 className="text-lg font-bold mb-2 text-blue-700">{t('routes', lang)}</h2>
							<p className="text-gray-500 mb-4 text-center">Create and manage bus routes and stops.</p>
							<Link href="/admin/routes" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full text-center">Go to Routes</Link>
						</div>
						{/* Analytics */}
						<div className="bg-white rounded-xl shadow p-4 w-full max-w-full flex flex-col items-center">
							<h2 className="text-lg font-bold mb-2 text-blue-700">{t('analytics', lang)}</h2>
							<p className="text-gray-500 mb-4 text-center">View system analytics and performance charts.</p>
							<Link href="/admin/analytics" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full text-center">View Analytics</Link>
						</div>
						{/* Feedback Management */}
						<div className="bg-white rounded-xl shadow p-4 w-full max-w-full flex flex-col items-center">
							<h2 className="text-lg font-bold mb-2 text-blue-700">{t('feedback', lang)}</h2>
							<p className="text-gray-500 mb-4 text-center">Review and respond to user feedback.</p>
							<Link href="/admin/feedback" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full text-center">Manage Feedback</Link>
						</div>
						{/* System Settings */}
						<div className="bg-white rounded-xl shadow p-4 w-full max-w-full flex flex-col items-center">
							<h2 className="text-lg font-bold mb-2 text-blue-700">{t('settings', lang)}</h2>
							<p className="text-gray-500 mb-4 text-center">Configure system settings and preferences.</p>
							<Link href="/admin/settings" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 w-full text-center">System Settings</Link>
						</div>
					</div>
				</AdminLayout>
			</RoleGuard>
		</AuthGuard>
	 );
}


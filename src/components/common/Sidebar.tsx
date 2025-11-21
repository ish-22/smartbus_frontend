import Link from 'next/link';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
	const { lang } = useLangStore();
	const { logout } = useAuth();
	const router = useRouter();
	const handleLogout = () => {
		logout();
		router.push('/');
	};
	return (
		<aside className="w-64 border-r p-4 space-y-2 bg-blue-50/40">
			<div className="font-semibold mb-2 text-blue-700">{t('admin_menu', lang)}</div>
			<nav className="flex flex-col gap-2 text-sm">
				<Link href="/admin/dashboard">{t('dashboard', lang)}</Link>
				<Link href="/admin/users">{t('users', lang)}</Link>
				<Link href="/admin/buses">{t('buses', lang)}</Link>
				<Link href="/admin/routes">{t('routes', lang)}</Link>
				<Link href="/admin/analytics">{t('analytics', lang)}</Link>
				<Link href="/admin/feedback">{t('feedback', lang)}</Link>
				<Link href="/admin/admins">Admins</Link>
				<Link href="/admin/settings">{t('settings', lang)}</Link>
				<button onClick={handleLogout} className="mt-4 px-3 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600">Logout</button>
			</nav>
		</aside>
	);
}


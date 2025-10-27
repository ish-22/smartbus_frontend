import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const { isAuthenticated, user, logout } = useAuth();
	const router = useRouter();
	const handleLogout = () => {
		logout();
		router.push('/');
	};
	return (
		<header className="w-full bg-white/80 backdrop-blur border-b p-3 md:p-4 flex items-center justify-between sticky top-0 z-20">
			<div className="font-semibold text-blue-700">
				<Link href="/">SmartBus</Link>
			</div>
			<nav className="flex items-center gap-3 md:gap-4 text-sm">
				{!isAuthenticated && (
					<>
						<Link href="/passenger/dashboard">Passenger</Link>
						<Link href="/driver/dashboard">Driver</Link>
						<Link href="/admin/dashboard">Admin</Link>
						<Link href="/feedback">Feedback</Link>
						<Link href="/lost-found">Lost & Found</Link>
						<Link href="/auth/login">Login</Link>
						<Link href="/auth/register">Register</Link>
					</>
				)}
				{isAuthenticated && user?.role === 'PASSENGER' && (
					<>
						<Link href="/passenger/dashboard">Passenger</Link>
						<Link href="/feedback">Feedback</Link>
						<Link href="/lost-found">Lost & Found</Link>
						<button onClick={handleLogout} className="px-2 py-1 border rounded hover:bg-blue-50">Logout {user?.name}</button>
					</>
				)}
				{isAuthenticated && user?.role === 'DRIVER' && (
					<>
						<Link href="/driver/dashboard">Driver</Link>
						<Link href="/feedback">Feedback</Link>
						<Link href="/lost-found">Lost & Found</Link>
						<button onClick={handleLogout} className="px-2 py-1 border rounded hover:bg-blue-50">Logout {user?.name}</button>
					</>
				)}
				{isAuthenticated && user?.role === 'ADMIN' && (
					<>
						<Link href="/admin/dashboard">Admin</Link>
						<Link href="/feedback">Feedback</Link>
						<Link href="/lost-found">Lost & Found</Link>
						<button onClick={logout} className="px-2 py-1 border rounded hover:bg-blue-50">Logout {user?.name}</button>
					</>
				)}
			</nav>
		</header>
	);
}


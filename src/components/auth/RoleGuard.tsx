import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/store/authStore';

export default function RoleGuard({ roles, children }: { roles: UserRole[]; children: React.ReactNode }){
	const router = useRouter();
	const { isAuthenticated, user } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/auth/login');
			return;
		}
		if (user && !roles.includes(user.role)) {
			router.replace('/');
		}
	}, [isAuthenticated, user, roles, router]);

	if (!isAuthenticated || (user && !roles.includes(user.role))) return null;
	return <>{children}</>;
}


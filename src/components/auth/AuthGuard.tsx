import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthGuard({ children }: { children: React.ReactNode }){
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/auth/login');
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) return null;
	return <>{children}</>;
}


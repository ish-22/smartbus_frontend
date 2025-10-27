import { useAuthStore } from '@/store/authStore';
import { performLogout } from '@/services/authService';

export function useAuth(){
	const { user, token, isAuthenticated, login } = useAuthStore();
	
	// Use async logout from authService which calls API
	const logout = async () => {
		await performLogout();
	};
	
	return { user, token, isAuthenticated, login, logout };
}


import { useAuthStore, type AuthUser, type UserRole } from '@/store/authStore';
import { registerAPI, loginAPI, logoutAPI, type RegisterRequest, type LoginRequest } from '@/services/api/authApi';
import { useUiStore } from '@/store/uiStore';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

// Convert backend role to frontend UserRole
function convertRole(role: 'passenger' | 'driver' | 'admin'): UserRole {
	return role.toUpperCase() as UserRole;
}

// Convert frontend UserRole to backend role
function convertRoleToBackend(role: UserRole): 'passenger' | 'driver' | 'admin' {
	return role.toLowerCase() as 'passenger' | 'driver' | 'admin';
}

/**
 * Register a new user via API
 */
export async function registerUser(
	name: string, 
	emailOrPhone: string, 
	password: string, 
	role: Exclude<UserRole, 'ADMIN'>,
	phone?: string
): Promise<AuthUser> {
	try {
		const isEmail = emailOrPhone.includes('@');
		
		const requestData: RegisterRequest = {
			name,
			password,
			role: convertRoleToBackend(role),
		};

		if (isEmail) {
			requestData.email = emailOrPhone;
			if (phone) requestData.phone = phone;
		} else {
			requestData.phone = emailOrPhone;
		}

		const response = await registerAPI(requestData);
		
		const authUser: AuthUser = {
			id: response.user.id.toString(),
			name: response.user.name,
			email: response.user.email || response.user.phone || '',
			role: convertRole(response.user.role),
			phone: response.user.phone || undefined,
		};

		// Auto login after successful registration
		useAuthStore.getState().login(authUser, response.token);
		
		return authUser;
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Registration failed';
		useUiStore.getState().showToast({ type: 'error', message });
		throw error;
	}
}

/**
 * Login user with email or phone
 */
export async function loginWithEmail(emailOrPhone: string, password: string): Promise<AuthUser | null> {
	try {
		// Admin backdoor for testing
		if (emailOrPhone === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
			const adminUser: AuthUser = { 
				id: 'admin', 
				name: 'Administrator', 
				email: ADMIN_EMAIL, 
				role: 'ADMIN' 
			};
			useAuthStore.getState().login(adminUser, 'admin-token');
			return adminUser;
		}

		const isEmail = emailOrPhone.includes('@');
		
		const requestData: LoginRequest = {
			password,
		};

		if (isEmail) {
			requestData.email = emailOrPhone;
		} else {
			requestData.phone = emailOrPhone;
		}

		const response = await loginAPI(requestData);
		
		const authUser: AuthUser = {
			id: response.user.id.toString(),
			name: response.user.name,
			email: response.user.email || response.user.phone || '',
			role: convertRole(response.user.role),
			phone: response.user.phone || undefined,
		};

		useAuthStore.getState().login(authUser, response.token);
		
		return authUser;
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Login failed';
		useUiStore.getState().showToast({ type: 'error', message });
		return null;
	}
}

/**
 * Logout current user
 */
export async function performLogout() {
	try {
		const token = useAuthStore.getState().token;
		
		if (token && token !== 'admin-token') {
			await logoutAPI(token);
		}
		
		useAuthStore.getState().logout();
		useUiStore.getState().showToast({ type: 'success', message: 'Logged out successfully' });
	} catch (error) {
		// Logout locally even if API call fails
		useAuthStore.getState().logout();
		console.error('Logout error:', error);
	}
}

/**
 * Legacy function for backward compatibility
 */
export function performLogin(user: AuthUser, token?: string) {
	useAuthStore.getState().login(user, token || 'local');
}

// Simulated password reset function (kept for backward compatibility)
export function sendPasswordResetEmail(email: string): Promise<void> {
	return new Promise((resolve, reject) => {
		// In a real app, this would call the API
		setTimeout(() => {
			resolve();
		}, 1000);
	});
}

// Legacy localStorage functions (kept for backward compatibility with old code)
type StoredUser = { id: string; name: string; email: string; password: string; role: UserRole };
const USERS_KEY = 'sb-users';

export function getUsers(): StoredUser[] {
	if (typeof window === 'undefined') return [];
	try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}

export function setUsers(users: StoredUser[]) {
	if (typeof window === 'undefined') return;
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


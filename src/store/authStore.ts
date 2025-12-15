import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'passenger' | 'driver' | 'admin' | 'owner';

export type AuthUser = {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	lang?: 'en' | 'si' | 'ta';
	phone?: string | null;
	driver_type?: 'expressway' | 'normal' | null;
};

type AuthState = {
	user: AuthUser | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (user: AuthUser, token: string) => void;
	logout: () => void;
	updateUser: (user: Partial<AuthUser>) => void;
};

// Load initial state from localStorage if available
const loadInitialState = (): Partial<AuthState> => {
	if (typeof window === 'undefined') {
		return { user: null, token: null, isAuthenticated: false };
	}

	try {
		const storedUser = localStorage.getItem('sb-user');
		const storedToken = localStorage.getItem('sb-token');
		
		if (storedUser && storedToken) {
			const user = JSON.parse(storedUser);
			return {
				user,
				token: storedToken,
				isAuthenticated: true,
			};
		}
	} catch (error) {
		console.error('Error loading auth state:', error);
	}

	return { user: null, token: null, isAuthenticated: false };
};

const initialState = loadInitialState();

export const useAuthStore = create<AuthState>((set) => ({
	user: initialState.user || null,
	token: initialState.token || null,
	isAuthenticated: initialState.isAuthenticated || false,
	login: (user: AuthUser, token: string) => {
		// Store in localStorage
		if (typeof window !== 'undefined') {
			localStorage.setItem('sb-user', JSON.stringify(user));
			localStorage.setItem('sb-token', token);
			localStorage.setItem('sb-user-id', user.id);
			localStorage.setItem('sb-user-role', user.role);
			localStorage.setItem('sb-user-name', user.name);
			
			// Also set cookie for middleware compatibility
			document.cookie = `userRole=${user.role}; path=/; max-age=86400`;
		}
		
		set({ user, token, isAuthenticated: true });
		
		if (user.lang) {
			localStorage.setItem('lang-demo', user.lang);
		}
	},
	logout: () => {
		// Clear localStorage
		if (typeof window !== 'undefined') {
			localStorage.removeItem('sb-user');
			localStorage.removeItem('sb-token');
			localStorage.removeItem('sb-user-id');
			localStorage.removeItem('sb-user-role');
			localStorage.removeItem('sb-user-name');
			localStorage.removeItem('lang-demo');
			document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
		}
		
		set({ user: null, token: null, isAuthenticated: false });
	},
	updateUser: (updatedUser: Partial<AuthUser>) => {
		set((state) => {
			if (!state.user) return state;
			
			const newUser = { ...state.user, ...updatedUser };
			
			// Update localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem('sb-user', JSON.stringify(newUser));
				if (updatedUser.id) localStorage.setItem('sb-user-id', updatedUser.id);
				if (updatedUser.role) localStorage.setItem('sb-user-role', updatedUser.role);
				if (updatedUser.name) localStorage.setItem('sb-user-name', updatedUser.name);
			}
			
			return { user: newUser };
		});
	},
}));


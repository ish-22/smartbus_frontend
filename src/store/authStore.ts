import { create } from 'zustand';

export type UserRole = 'PASSENGER' | 'DRIVER' | 'ADMIN';

export type AuthUser = {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	lang?: 'en' | 'si' | 'ta';
};

type AuthState = {
	user: AuthUser | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (user: AuthUser, token: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	login: (user: AuthUser, token: string) => {
		set({ user, token, isAuthenticated: true });
		if (user.lang) {
			localStorage.setItem('lang-demo', user.lang);
		}
	},
	logout: () => {
		set({ user: null, token: null, isAuthenticated: false });
		localStorage.removeItem('lang-demo');
	},
}));


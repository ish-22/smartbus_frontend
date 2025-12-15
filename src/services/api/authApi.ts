import { API_BASE_URL } from '@/config/api';

// Types matching Laravel backend response
export type RegisterRequest = {
	name: string;
	email?: string;
	phone?: string;
	password: string;
	role?: 'passenger' | 'driver' | 'admin';
	driver_type?: 'expressway' | 'normal';
};

export type LoginRequest = {
	email?: string;
	phone?: string;
	password: string;
};

export type AuthResponse = {
	user: {
		id: number;
		name: string;
		email: string | null;
		phone: string | null;
		role: 'passenger' | 'driver' | 'admin';
		driver_type?: 'expressway' | 'normal' | null;
	};
	token: string;
	token_type: string;
};

// Helper to get auth headers
function getAuthHeaders(token?: string | null): HeadersInit {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};
	
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	
	return headers;
}

/**
 * Register a new user
 */
export async function registerAPI(data: RegisterRequest): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/auth/register`, {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Registration failed' }));
		throw new Error(error.message || `Registration failed with status ${response.status}`);
	}

	return response.json();
}

/**
 * Login user with email or phone
 */
export async function loginAPI(data: LoginRequest): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/auth/login`, {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Login failed' }));
		throw new Error(error.message || 'Invalid credentials');
	}

	return response.json();
}

/**
 * Logout user (requires authentication token)
 */
export async function logoutAPI(token: string): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/auth/logout`, {
		method: 'POST',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Logout failed' }));
		throw new Error(error.message || 'Logout failed');
	}
}

/**
 * Get current authenticated user
 */
export async function getCurrentUserAPI(token: string): Promise<AuthResponse['user']> {
	const response = await fetch(`${API_BASE_URL}/user`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to get user info');
	}

	return response.json();
}


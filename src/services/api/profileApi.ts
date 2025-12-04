import { API_BASE_URL } from '@/config/api';

export type UserProfile = {
	id: number;
	name: string;
	email: string | null;
	phone: string | null;
	role: 'passenger' | 'driver' | 'admin' | 'owner';
	created_at?: string;
	updated_at?: string;
};

export type UpdateProfileRequest = {
	name?: string;
	email?: string | null;
	phone?: string | null;
	password?: string;
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
 * Get user profile by user_id
 * GET /api/profile/{user_id}
 */
export async function getProfileAPI(userId: string, token: string): Promise<UserProfile> {
	const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch profile' }));
		throw new Error(error.message || `Failed to fetch profile: ${response.status}`);
	}

	const data = await response.json();
	return data.user;
}

/**
 * Update user profile
 * PUT /api/profile/update/{user_id}
 */
export async function updateProfileAPI(
	userId: string,
	data: UpdateProfileRequest,
	token: string
): Promise<UserProfile> {
	const response = await fetch(`${API_BASE_URL}/profile/update/${userId}`, {
		method: 'PUT',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to update profile' }));
		throw new Error(error.message || `Failed to update profile: ${response.status}`);
	}

	const result = await response.json();
	return result.user;
}


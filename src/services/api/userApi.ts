import { API_BASE_URL } from '@/config/api';

export type Driver = {
	id: number;
	name: string;
	email?: string | null;
	phone?: string | null;
	driver_type?: 'expressway' | 'normal' | null;
	created_at: string;
};

function getAuthHeaders(token: string): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	};
}

// Get all drivers (for owners/admins)
export async function getAllDrivers(token: string): Promise<Driver[]> {
	const response = await fetch(`${API_BASE_URL}/users/drivers`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch drivers');
	}

	return response.json();
}


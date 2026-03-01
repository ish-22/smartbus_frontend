import { API_BASE_URL } from '@/config/api';

export type Driver = {
	id: number;
	name: string;
	email?: string | null;
	phone?: string | null;
	driver_type?: 'expressway' | 'normal' | null;
	created_at: string;
};

export type Owner = {
	id: number;
	name: string;
	email?: string | null;
	phone?: string | null;
	created_at: string;
};

export type Admin = {
	id: number;
	name: string;
	email: string;
	role: string;
	status: 'active' | 'inactive';
	last_login: string | null;
	permissions: string[];
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

export async function getAllOwners(token: string): Promise<Owner[]> {
	const response = await fetch(`${API_BASE_URL}/users/owners`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch owners');
	}

	return response.json();
}

export async function getAllAdmins(token: string): Promise<Admin[]> {
	const response = await fetch(`${API_BASE_URL}/users/admins`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.text();
		console.error('Admin fetch error:', response.status, error);
		throw new Error(`Failed to fetch admins: ${response.status}`);
	}

	return response.json();
}


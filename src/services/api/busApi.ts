import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Bus = {
	id: number;
	number: string;
	type: 'expressway' | 'normal';
	route_id?: number;
	capacity: number;
	driver_id?: number;
	route?: {
		id: number;
		name: string;
		start_point?: string;
		end_point?: string;
	};
	driver?: {
		id: number;
		name: string;
		email?: string;
		phone?: string;
	};
};

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

export async function getBusesAPI(): Promise<Bus[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BUSES.LIST}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch buses');
	}

	return response.json();
}

export async function getBusAPI(id: string): Promise<Bus> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BUSES.DETAIL(id)}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch bus');
	}

	return response.json();
}

export async function createBusAPI(data: Omit<Bus, 'id'>, token: string): Promise<Bus> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BUSES.CREATE}`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to create bus' }));
		throw new Error(error.message || 'Failed to create bus');
	}

	return response.json();
}
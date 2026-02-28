import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Bus = {
	id: number;
	number: string;
	bus_number?: string;
	type: 'expressway' | 'normal';
	route_id?: number;
	capacity: number;
	driver_id?: number;
	owner_id?: number;
	model?: string;
	status?: 'active' | 'maintenance' | 'inactive';
	route?: {
		id: number;
		name: string;
		route_number?: string;
		start_point?: string;
		end_point?: string;
	};
	driver?: {
		id: number;
		name: string;
		email?: string;
		phone?: string;
	};
	owner?: {
		id: number;
		name: string;
	};
	created_at?: string;
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

export async function getBusesAPI(token?: string | null): Promise<Bus[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BUSES.LIST}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch buses' }));
		throw new Error(error.message || 'Failed to fetch buses');
	}

	return response.json();
}

export async function getBusAPI(id: string, token?: string | null): Promise<Bus> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BUSES.DETAIL(id)}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch bus' }));
		throw new Error(error.message || 'Failed to fetch bus');
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
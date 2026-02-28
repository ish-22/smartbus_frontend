import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Route = {
	id: number;
	name: string;
	route_number?: string;
	start_point?: string;
	end_point?: string;
	metadata?: any;
	stops?: Stop[];
	buses?: any[];
};

export type Stop = {
	id: number;
	route_id: number;
	name: string;
	lat?: number;
	lng?: number;
	sequence: number;
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

export async function getRoutesAPI(type?: 'expressway' | 'normal'): Promise<Route[]> {
	try {
		const url = type 
			? `${API_BASE_URL}${API_ENDPOINTS.ROUTES.LIST}?type=${type}`
			: `${API_BASE_URL}${API_ENDPOINTS.ROUTES.LIST}`;
		
		const response = await fetch(url, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ message: 'Failed to fetch routes' }));
			throw new Error(errorData.message || `Failed to fetch routes: ${response.status}`);
		}

		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error fetching routes:', error);
		throw error instanceof Error ? error : new Error('Failed to fetch routes');
	}
}

export async function getRouteAPI(id: string): Promise<Route> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ROUTES.DETAIL(id)}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch route');
	}

	return response.json();
}

export async function getStopsAPI(): Promise<Stop[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.STOPS.LIST}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch stops');
	}

	return response.json();
}

export async function getStopsByRouteAPI(routeId: string): Promise<Stop[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.STOPS.BY_ROUTE(routeId)}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch stops');
	}

	return response.json();
}
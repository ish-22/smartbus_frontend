import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export type Route = {
	id: number;
	name: string;
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

export async function getRoutesAPI(): Promise<Route[]> {
	const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ROUTES.LIST}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch routes');
	}

	return response.json();
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
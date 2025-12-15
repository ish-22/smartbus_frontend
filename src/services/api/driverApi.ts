import { API_BASE_URL } from '@/config/api';
import type { Bus } from './busApi';

export type DriverType = 'expressway' | 'normal';

export type DriverAssignment = {
	id?: number;
	driver_id: number;
	bus_id: number;
	driver_type: DriverType;
	assigned_at: string;
	ended_at?: string | null;
	bus?: {
		id: number;
		bus_number?: string;
		number?: string;
	} | null;
};

function getAuthHeaders(token: string): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	};
}

// Get available buses for driver (filtered by type)
export async function getAvailableBusesForDriver(
	driverType: DriverType,
	token: string
): Promise<Bus[]> {
	const response = await fetch(`${API_BASE_URL}/buses?type=${driverType}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch available buses');
	}

	return response.json();
}

// Get all buses (for driver selection)
export async function getAllBusesForDriver(token: string): Promise<Bus[]> {
	const response = await fetch(`${API_BASE_URL}/buses`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch buses');
	}

	const data = await response.json();
	// Handle both array and object with data property
	return Array.isArray(data) ? data : (data.data || []);
}

// Assign driver to bus
export async function assignDriverToBus(
	driverId: number,
	busId: number,
	driverType: DriverType,
	token: string
): Promise<DriverAssignment> {
	const response = await fetch(`${API_BASE_URL}/drivers/${driverId}/assign-bus`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify({
			bus_id: busId,
			driver_type: driverType,
		}),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to assign bus' }));
		throw new Error(error.message || 'Failed to assign bus');
	}

	const data = await response.json();
	return data.assignment || data;
}

// Get current driver assignment
export async function getCurrentDriverAssignment(
	driverId: number,
	token: string
): Promise<DriverAssignment | null> {
	const response = await fetch(`${API_BASE_URL}/drivers/${driverId}/current-assignment`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		if (response.status === 404) {
			return null; // No current assignment
		}
		throw new Error('Failed to fetch current assignment');
	}

	return response.json();
}

// End current driver assignment
export async function endDriverAssignment(
	driverId: number,
	assignmentId: number,
	token: string
): Promise<void> {
	const response = await fetch(
		`${API_BASE_URL}/drivers/${driverId}/assignments/${assignmentId}/end`,
		{
			method: 'POST',
			headers: getAuthHeaders(token),
		}
	);

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to end assignment' }));
		throw new Error(error.message || 'Failed to end assignment');
	}
}


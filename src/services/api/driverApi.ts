import { API_BASE_URL } from '@/config/api';
import type { Bus } from './busApi';

export type DriverType = 'expressway' | 'normal';

export type DriverAssignment = {
	id?: number;
	driver_id: number;
	bus_id: number;
	driver_type: DriverType;
	assigned_at: string;
	assignment_date?: string;
	ended_at?: string | null;
	assigned_by?: number;
	bus?: {
		id: number;
		bus_number?: string;
		number?: string;
		model?: string;
		capacity?: number;
		type?: string;
		status?: string;
		route?: any;
		owner?: {
			id: number;
			name: string;
			phone?: string;
		} | null;
	} | null;
	driver?: {
		id: number;
		name: string;
		email?: string;
		phone?: string;
	};
	assignedBy?: {
		id: number;
		name: string;
	};
	bus_details?: {
		id: number;
		bus_number: string;
		model?: string;
		capacity?: number;
		type?: string;
		status?: string;
		route?: any;
		owner?: {
			id: number;
			name: string;
			phone?: string;
		} | null;
	};
};

export type DriverAssignmentResponse = {
	assignment: DriverAssignment;
	bus_details?: DriverAssignment['bus_details'];
};

function getAuthHeaders(token: string): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	};
}

// Get all buses (for owner to assign to drivers)
export async function getAllBuses(token: string): Promise<Bus[]> {
	const response = await fetch(`${API_BASE_URL}/buses`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch buses');
	}

	const data = await response.json();
	return Array.isArray(data) ? data : (data.data || []);
}

// Assign driver to bus (Owner/Admin only)
export async function assignDriverToBus(
	driverId: number,
	busId: number,
	assignmentDate?: string,
	token: string
): Promise<DriverAssignmentResponse> {
	const body: any = {
		driver_id: driverId,
		bus_id: busId,
	};

	if (assignmentDate) {
		body.assignment_date = assignmentDate;
	}

	const response = await fetch(`${API_BASE_URL}/driver-assignments`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to assign driver to bus' }));
		throw new Error(error.message || 'Failed to assign driver to bus');
	}

	return response.json();
}

// Get current driver assignment (Driver can view their own)
export async function getCurrentDriverAssignment(
	driverId: number,
	token: string
): Promise<DriverAssignmentResponse | null> {
	const response = await fetch(`${API_BASE_URL}/drivers/${driverId}/current-assignment`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		if (response.status === 404 || response.status === 200) {
			const data = await response.json().catch(() => null);
			return data?.assignment ? data : null;
		}
		throw new Error('Failed to fetch current assignment');
	}

	const data = await response.json();
	return data.assignment ? data : { assignment: data };
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

// Get assignment history for a driver
export async function getDriverAssignmentHistory(
	driverId: number,
	token: string
): Promise<{ data: DriverAssignment[] }> {
	const response = await fetch(`${API_BASE_URL}/drivers/${driverId}/assignments`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch assignment history');
	}

	return response.json();
}

// Get all assignments for owner's buses
export async function getOwnerAssignments(token: string): Promise<{ data: DriverAssignment[] }> {
	const response = await fetch(`${API_BASE_URL}/driver-assignments/owner/all`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch owner assignments');
	}

	return response.json();
}

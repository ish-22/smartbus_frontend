import { API_BASE_URL } from '@/config/api';

export type IncidentType = 'traffic_delay' | 'mechanical_issue' | 'accident' | 'emergency' | 'other';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'reported' | 'in_progress' | 'resolved' | 'closed';

export type Incident = {
	id: number;
	driver_id: number;
	bus_id?: number | null;
	type: IncidentType;
	title?: string | null;
	description: string;
	location?: string | null;
	severity: IncidentSeverity;
	status: IncidentStatus;
	admin_response?: string | null;
	resolved_by?: number | null;
	resolved_at?: string | null;
	created_at: string;
	updated_at: string;
	driver?: {
		id: number;
		name: string;
		email?: string;
		phone?: string;
	};
	bus?: {
		id: number;
		bus_number?: string;
		number?: string;
	} | null;
	resolver?: {
		id: number;
		name: string;
	};
};

export type IncidentStats = {
	total: number;
	by_status: {
		reported: number;
		in_progress: number;
		resolved: number;
		closed: number;
	};
	by_severity: {
		low: number;
		medium: number;
		high: number;
		critical: number;
	};
	by_type: {
		traffic_delay: number;
		mechanical_issue: number;
		accident: number;
		emergency: number;
		other: number;
	};
	unresolved: number;
};

export type CreateIncidentRequest = {
	type: IncidentType;
	title?: string;
	description: string;
	location?: string;
	severity: IncidentSeverity;
	bus_id?: number;
};

function getAuthHeaders(token: string): HeadersInit {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`,
	};
}

// Get driver's incidents
export async function getDriverIncidents(
	token: string,
	params?: { status?: IncidentStatus; severity?: IncidentSeverity; per_page?: number; page?: number }
): Promise<{ data: Incident[]; current_page: number; last_page: number; total: number }> {
	const queryParams = new URLSearchParams();
	if (params?.status) queryParams.append('status', params.status);
	if (params?.severity) queryParams.append('severity', params.severity);
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/incidents?${queryParams}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch incidents' }));
		throw new Error(error.message || 'Failed to fetch incidents');
	}

	const data = await response.json();
	// Handle Laravel pagination format
	if (data.data && Array.isArray(data.data)) {
		return {
			data: data.data,
			current_page: data.current_page || 1,
			last_page: data.last_page || 1,
			total: data.total || data.data.length
		};
	}
	// If not paginated, return as array
	return {
		data: Array.isArray(data) ? data : [],
		current_page: 1,
		last_page: 1,
		total: Array.isArray(data) ? data.length : 0
	};
}

// Get all incidents (admin only)
export async function getAllIncidents(
	token: string,
	params?: { status?: IncidentStatus; severity?: IncidentSeverity; driver_id?: number; per_page?: number; page?: number }
): Promise<{ data: Incident[]; current_page: number; last_page: number; total: number }> {
	const queryParams = new URLSearchParams();
	if (params?.status) queryParams.append('status', params.status);
	if (params?.severity) queryParams.append('severity', params.severity);
	if (params?.driver_id) queryParams.append('driver_id', params.driver_id.toString());
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/incidents/admin/all?${queryParams}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch incidents' }));
		throw new Error(error.message || 'Failed to fetch incidents');
	}

	const data = await response.json();
	// Handle Laravel pagination format
	if (data.data) {
		return {
			data: data.data,
			current_page: data.current_page || 1,
			last_page: data.last_page || 1,
			total: data.total || data.data.length
		};
	}
	// If not paginated, return as array
	return {
		data: Array.isArray(data) ? data : [],
		current_page: 1,
		last_page: 1,
		total: Array.isArray(data) ? data.length : 0
	};
}

// Get incident statistics (admin only)
export async function getIncidentStats(token: string): Promise<IncidentStats> {
	const response = await fetch(`${API_BASE_URL}/incidents/admin/stats`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch stats' }));
		throw new Error(error.message || 'Failed to fetch stats');
	}

	return response.json();
}

// Create a new incident
export async function createIncident(
	data: CreateIncidentRequest,
	token: string
): Promise<{ message: string; incident: Incident }> {
	// Remove undefined values
	const cleanData: any = {};
	if (data.type) cleanData.type = data.type;
	if (data.description) cleanData.description = data.description;
	if (data.severity) cleanData.severity = data.severity;
	if (data.title) cleanData.title = data.title;
	if (data.location) cleanData.location = data.location;
	if (data.bus_id) cleanData.bus_id = data.bus_id;

	const response = await fetch(`${API_BASE_URL}/incidents`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(cleanData),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({ message: 'Failed to create incident' }));
		// Handle validation errors
		if (errorData.errors) {
			const errorMessages = Object.values(errorData.errors).flat().join(', ');
			throw new Error(errorMessages || errorData.message || 'Validation failed');
		}
		throw new Error(errorData.message || 'Failed to create incident');
	}

	return response.json();
}

// Get a specific incident
export async function getIncident(id: number, token: string): Promise<Incident> {
	const response = await fetch(`${API_BASE_URL}/incidents/${id}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch incident' }));
		throw new Error(error.message || 'Failed to fetch incident');
	}

	return response.json();
}

// Update incident status (admin only)
export async function updateIncidentStatus(
	id: number,
	status: IncidentStatus,
	adminResponse?: string,
	token?: string
): Promise<{ message: string; incident: Incident }> {
	if (!token) throw new Error('Token is required');

	const response = await fetch(`${API_BASE_URL}/incidents/${id}/status`, {
		method: 'PATCH',
		headers: getAuthHeaders(token),
		body: JSON.stringify({
			status,
			admin_response: adminResponse,
		}),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to update incident' }));
		throw new Error(error.message || 'Failed to update incident');
	}

	return response.json();
}

// Delete an incident (admin only)
export async function deleteIncident(id: number, token: string): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/incidents/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to delete incident' }));
		throw new Error(error.message || 'Failed to delete incident');
	}
}

// Get incidents for bus owner
export async function getOwnerIncidents(
	token: string,
	params?: { status?: IncidentStatus; severity?: IncidentSeverity; bus_id?: number; per_page?: number; page?: number }
): Promise<{ data: Incident[]; current_page: number; last_page: number; total: number }> {
	const queryParams = new URLSearchParams();
	if (params?.status) queryParams.append('status', params.status);
	if (params?.severity) queryParams.append('severity', params.severity);
	if (params?.bus_id) queryParams.append('bus_id', params.bus_id.toString());
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/incidents/owner/all?${queryParams}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch incidents' }));
		throw new Error(error.message || 'Failed to fetch incidents');
	}

	const data = await response.json();
	// Handle Laravel pagination format
	if (data.data) {
		return {
			data: data.data,
			current_page: data.current_page || 1,
			last_page: data.last_page || 1,
			total: data.total || data.data.length
		};
	}
	// If not paginated, return as array
	return {
		data: Array.isArray(data) ? data : [],
		current_page: 1,
		last_page: 1,
		total: Array.isArray(data) ? data.length : 0
	};
}

// Get incidents for passengers (public view)
export async function getPassengerIncidents(
	token: string,
	params?: { status?: IncidentStatus; severity?: IncidentSeverity; bus_id?: number; per_page?: number; page?: number }
): Promise<{ data: Incident[]; current_page: number; last_page: number; total: number }> {
	const queryParams = new URLSearchParams();
	if (params?.status) queryParams.append('status', params.status);
	if (params?.severity) queryParams.append('severity', params.severity);
	if (params?.bus_id) queryParams.append('bus_id', params.bus_id.toString());
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/incidents/passenger/all?${queryParams}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch incidents' }));
		throw new Error(error.message || 'Failed to fetch incidents');
	}

	const data = await response.json();
	// Handle Laravel pagination format
	if (data.data) {
		return {
			data: data.data,
			current_page: data.current_page || 1,
			last_page: data.last_page || 1,
			total: data.total || data.data.length
		};
	}
	// If not paginated, return as array
	return {
		data: Array.isArray(data) ? data : [],
		current_page: 1,
		last_page: 1,
		total: Array.isArray(data) ? data.length : 0
	};
}


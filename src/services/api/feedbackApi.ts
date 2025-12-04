import { API_BASE_URL } from '@/config/api';

export type FeedbackType = 'complaint' | 'suggestion' | 'praise' | 'general';
export type FeedbackStatus = 'pending' | 'reviewed' | 'resolved' | 'rejected';

export type Feedback = {
	id: number;
	user_id: number;
	bus_id?: number | null;
	route_id?: number | null;
	subject: string;
	message: string;
	type: FeedbackType;
	rating?: number | null;
	status: FeedbackStatus;
	admin_response?: string | null;
	responded_by?: number | null;
	responded_at?: string | null;
	created_at: string;
	updated_at: string;
	user?: {
		id: number;
		name: string;
		email?: string;
		phone?: string;
	};
	bus?: {
		id: number;
		number: string;
		type?: string;
	};
	route?: {
		id: number;
		name: string;
	};
	responder?: {
		id: number;
		name: string;
	};
};

export type CreateFeedbackRequest = {
	subject: string;
	message: string;
	type: FeedbackType;
	bus_id?: number | null;
	route_id?: number | null;
	rating?: number | null;
};

export type UpdateFeedbackRequest = {
	subject?: string;
	message?: string;
	type?: FeedbackType;
	bus_id?: number | null;
	route_id?: number | null;
	rating?: number | null;
};

export type UpdateFeedbackStatusRequest = {
	status: FeedbackStatus;
	admin_response?: string;
};

export type FeedbackStats = {
	total: number;
	pending: number;
	resolved: number;
	reviewed: number;
	rejected: number;
	by_type: {
		complaint: number;
		suggestion: number;
		praise: number;
		general: number;
	};
	average_rating: number | null;
	with_rating: number;
};

export type FeedbackListResponse = {
	data: Feedback[];
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
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
 * Get all feedback (with optional filters)
 * GET /api/feedback
 */
export async function getFeedbackAPI(
	token: string,
	params?: {
		type?: FeedbackType;
		status?: FeedbackStatus;
		user_id?: number;
		bus_id?: number;
		route_id?: number;
		per_page?: number;
		page?: number;
	}
): Promise<FeedbackListResponse> {
	const queryParams = new URLSearchParams();
	if (params?.type) queryParams.append('type', params.type);
	if (params?.status) queryParams.append('status', params.status);
	if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
	if (params?.bus_id) queryParams.append('bus_id', params.bus_id.toString());
	if (params?.route_id) queryParams.append('route_id', params.route_id.toString());
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/feedback?${queryParams.toString()}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch feedback' }));
		throw new Error(error.message || `Failed to fetch feedback: ${response.status}`);
	}

	return response.json();
}

/**
 * Get all feedback for admin (with full user details)
 * GET /api/feedback/admin/list
 */
export async function getAdminFeedbackAPI(
	token: string,
	params?: {
		type?: FeedbackType;
		status?: FeedbackStatus;
		user_id?: number;
		bus_id?: number;
		route_id?: number;
		per_page?: number;
		page?: number;
	}
): Promise<FeedbackListResponse> {
	const queryParams = new URLSearchParams();
	if (params?.type) queryParams.append('type', params.type);
	if (params?.status) queryParams.append('status', params.status);
	if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
	if (params?.bus_id) queryParams.append('bus_id', params.bus_id.toString());
	if (params?.route_id) queryParams.append('route_id', params.route_id.toString());
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/feedback/admin/list?${queryParams.toString()}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch admin feedback' }));
		throw new Error(error.message || `Failed to fetch admin feedback: ${response.status}`);
	}

	return response.json();
}

/**
 * Get single feedback by ID
 * GET /api/feedback/{id}
 */
export async function getFeedbackByIdAPI(id: number, token: string): Promise<Feedback> {
	const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch feedback' }));
		throw new Error(error.message || `Failed to fetch feedback: ${response.status}`);
	}

	return response.json();
}

/**
 * Create new feedback
 * POST /api/feedback
 */
export async function createFeedbackAPI(
	data: CreateFeedbackRequest,
	token: string
): Promise<Feedback> {
	const response = await fetch(`${API_BASE_URL}/feedback`, {
		method: 'POST',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to create feedback' }));
		throw new Error(error.message || `Failed to create feedback: ${response.status}`);
	}

	return response.json();
}

/**
 * Update feedback
 * PUT /api/feedback/{id}
 */
export async function updateFeedbackAPI(
	id: number,
	data: UpdateFeedbackRequest,
	token: string
): Promise<Feedback> {
	const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
		method: 'PUT',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to update feedback' }));
		throw new Error(error.message || `Failed to update feedback: ${response.status}`);
	}

	return response.json();
}

/**
 * Update feedback status (Admin only)
 * PUT /api/feedback/{id}/status
 */
export async function updateFeedbackStatusAPI(
	id: number,
	data: UpdateFeedbackStatusRequest,
	token: string
): Promise<Feedback> {
	const response = await fetch(`${API_BASE_URL}/feedback/${id}/status`, {
		method: 'PUT',
		headers: getAuthHeaders(token),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to update feedback status' }));
		throw new Error(error.message || `Failed to update feedback status: ${response.status}`);
	}

	return response.json();
}

/**
 * Delete feedback
 * DELETE /api/feedback/{id}
 */
export async function deleteFeedbackAPI(id: number, token: string): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to delete feedback' }));
		throw new Error(error.message || `Failed to delete feedback: ${response.status}`);
	}
}

/**
 * Get user's own feedback
 * GET /api/feedback/my/list
 */
export async function getMyFeedbackAPI(
	token: string,
	params?: {
		per_page?: number;
		page?: number;
	}
): Promise<FeedbackListResponse> {
	const queryParams = new URLSearchParams();
	if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
	if (params?.page) queryParams.append('page', params.page.toString());

	const response = await fetch(`${API_BASE_URL}/feedback/my/list?${queryParams.toString()}`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch your feedback' }));
		throw new Error(error.message || `Failed to fetch your feedback: ${response.status}`);
	}

	return response.json();
}

/**
 * Get feedback statistics (Admin only)
 * GET /api/feedback/stats
 */
export async function getFeedbackStatsAPI(token: string): Promise<FeedbackStats> {
	const response = await fetch(`${API_BASE_URL}/feedback/stats`, {
		method: 'GET',
		headers: getAuthHeaders(token),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Failed to fetch feedback stats' }));
		throw new Error(error.message || `Failed to fetch feedback stats: ${response.status}`);
	}

	return response.json();
}

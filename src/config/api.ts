// API base URL for the SmartBus frontend
export const API_BASE_URL = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE
	? process.env.NEXT_PUBLIC_API_BASE
	: 'http://127.0.0.1:8000/api';

// API endpoints
export const API_ENDPOINTS = {
	// Auth
	AUTH: {
		REGISTER: '/auth/register',
		LOGIN: '/auth/login',
		LOGOUT: '/auth/logout',
		USER: '/user'
	},
	// Buses
	BUSES: {
		LIST: '/buses',
		DETAIL: (id: string) => `/buses/${id}`,
		CREATE: '/buses'
	},
	// Routes
	ROUTES: {
		LIST: '/routes',
		DETAIL: (id: string) => `/routes/${id}`,
		CREATE: '/routes'
	},
	// Stops
	STOPS: {
		LIST: '/stops',
		BY_ROUTE: (routeId: string) => `/stops/route/${routeId}`,
		CREATE: '/stops'
	},
	// Bookings
	BOOKINGS: {
		LIST: '/bookings',
		CREATE: '/bookings',
		DETAIL: (id: string) => `/bookings/${id}`,
		CANCEL: (id: string) => `/bookings/${id}/cancel`
	},
	// Feedback
	FEEDBACK: {
		LIST: '/feedback',
		CREATE: '/feedback'
	},
	// Payments
	PAYMENTS: {
		CREATE: '/payments',
		DETAIL: (id: string) => `/payments/${id}`,
		UPDATE_STATUS: (id: string) => `/payments/${id}/status`
	},
	
	PROFILE: {
		GET: (userId: string) => `/profile/${userId}`,
		UPDATE: (userId: string) => `/profile/update/${userId}`
	}
};

export default API_BASE_URL;

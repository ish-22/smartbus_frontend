// API base URL for the SmartBus frontend
// Uses environment variable NEXT_PUBLIC_API_BASE when available (set in .env.local)
export const API_BASE_URL = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE
	? process.env.NEXT_PUBLIC_API_BASE
	: 'http://127.0.0.1:8000/api';

export default API_BASE_URL;

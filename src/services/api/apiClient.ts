import { API_BASE_URL } from '@/config/api';

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		...init,
	});
	if (!res.ok) throw new Error(`GET ${path} failed ${res.status}`);
	return res.json();
}

export async function apiPost<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
		...init,
	});
	if (!res.ok) throw new Error(`POST ${path} failed ${res.status}`);
	return res.json();
}


import type { Bus, Route, EtaAtStop } from '@/types/bus';
import { apiGet } from './apiClient';

export function fetchBuses(query?: { route?: string; number?: string; from?: string; to?: string }){
	const params = new URLSearchParams();
	if (query?.route) params.set('route', query.route);
	if (query?.number) params.set('number', query.number);
	if (query?.from) params.set('from', query.from);
	if (query?.to) params.set('to', query.to);
	const qs = params.toString() ? `?${params.toString()}` : '';
	return apiGet<Bus[]>(`/buses${qs}`).catch(() => {
		// Fallback mock data for local dev when API not ready
		const demo: Bus[] = [
			{ id: 'b1', number: '120-Colombo-Galle', routeId: 'r1', capacity: 50, seatsAvailable: 12, currentLocation: { lat: 6.9271, lng: 79.8612 }, lastUpdatedAt: new Date().toISOString() },
			{ id: 'b2', number: '02-Kandy-Colombo', routeId: 'r2', capacity: 45, seatsAvailable: 5, currentLocation: { lat: 7.2906, lng: 80.6337 }, lastUpdatedAt: new Date().toISOString() },
		];
		return demo;
	});
}

export function fetchRoutes(){
	return apiGet<Route[]>(`/routes`).catch(() => {
		const demo: Route[] = [
			{ id: 'r1', name: 'Colombo → Galle', start: 'Colombo', end: 'Galle', stops: [] },
			{ id: 'r2', name: 'Kandy → Colombo', start: 'Kandy', end: 'Colombo', stops: [] },
		];
		return demo;
	});
}

export function fetchBusEtas(routeId: string){
	return apiGet<EtaAtStop[]>(`/routes/${routeId}/etas`).catch(() => {
		const demo: EtaAtStop[] = [];
		return demo;
	});
}


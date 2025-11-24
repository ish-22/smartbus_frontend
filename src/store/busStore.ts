import { create } from 'zustand';
import type { Bus, Route } from '@/types/bus';
import { getBusesAPI } from '@/services/api/busApi';
import { getRoutesAPI } from '@/services/api/routeApi';

type BusState = {
	buses: Bus[];
	routes: Route[];
	isLoading: boolean;
	query: { route?: string; number?: string; from?: string; to?: string };
	setQuery: (q: Partial<BusState['query']>) => void;
	loadRoutes: () => Promise<void>;
	search: () => Promise<void>;
};

export const useBusStore = create<BusState>((set, get) => ({
	buses: [],
	routes: [],
	isLoading: false,
	query: {},
	setQuery: (q) => set({ query: { ...get().query, ...q } }),
	loadRoutes: async () => {
		set({ isLoading: true });
		try {
			const routes = await getRoutesAPI();
			set({ routes });
		} catch (error) {
			console.error('Failed to load routes:', error);
		} finally {
			set({ isLoading: false });
		}
	},
	search: async () => {
		set({ isLoading: true });
		try {
			const buses = await getBusesAPI();
			// Filter buses based on query
			const { route, number, from, to } = get().query;
			let filteredBuses = buses;
			
			if (route) {
				filteredBuses = filteredBuses.filter(bus => 
					bus.route?.name.toLowerCase().includes(route.toLowerCase())
				);
			}
			
			if (number) {
				filteredBuses = filteredBuses.filter(bus => 
					bus.number.toLowerCase().includes(number.toLowerCase())
				);
			}
			
			if (from) {
				filteredBuses = filteredBuses.filter(bus => 
					bus.route?.start_point?.toLowerCase().includes(from.toLowerCase())
				);
			}
			
			if (to) {
				filteredBuses = filteredBuses.filter(bus => 
					bus.route?.end_point?.toLowerCase().includes(to.toLowerCase())
				);
			}
			
			set({ buses: filteredBuses });
		} catch (error) {
			console.error('Failed to search buses:', error);
		} finally {
			set({ isLoading: false });
		}
	},
}));


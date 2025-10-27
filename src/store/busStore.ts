import { create } from 'zustand';
import type { Bus, Route } from '@/types/bus';
import { fetchBuses, fetchRoutes } from '@/services/api/busApi';

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
			const routes = await fetchRoutes();
			set({ routes });
		} finally {
			set({ isLoading: false });
		}
	},
	search: async () => {
		set({ isLoading: true });
		try {
			const buses = await fetchBuses(get().query);
			set({ buses });
		} finally {
			set({ isLoading: false });
		}
	},
}));


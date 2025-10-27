import { useEffect } from 'react';
import { useBusStore } from '@/store/busStore';

export function useBusTracking() {
	const { search } = useBusStore();

	useEffect(() => {
		// simple polling for demo; replace with websockets later
		search();
		const id = setInterval(() => search(), 10000);
		return () => clearInterval(id);
	}, [search]);

	return useBusStore();
}


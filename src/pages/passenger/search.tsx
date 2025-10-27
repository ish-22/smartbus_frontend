import MainLayout from '@/layouts/MainLayout';
import BusSearch from '@/components/passenger/BusSearch';
import BusList from '@/components/passenger/BusList';
import BusMap from '@/components/passenger/BusMap';
import { useEffect } from 'react';
import { useBusStore } from '@/store/busStore';

export default function PassengerSearchPage(){
	const { loadRoutes } = useBusStore();
	useEffect(() => { loadRoutes(); }, [loadRoutes]);
		return (
			<MainLayout title="Search Buses">
				<div className="mx-auto max-w-5xl">
					<div className="mb-3 text-blue-700 text-sm text-center font-semibold">
						Note: Normal route buses are tracking-only. You cannot book them in this system.
					</div>
					<BusSearch />
					<BusList />
					<BusMap />
				</div>
			</MainLayout>
		);
}


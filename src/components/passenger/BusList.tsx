import { useBusStore } from '@/store/busStore';
import Card from '@/components/common/Card';

export default function BusList(){
	const { buses, isLoading } = useBusStore();
	if (isLoading && buses.length === 0) return <div className="mt-4">Loading...</div>;
	if (buses.length === 0) return <div className="mt-4">No buses found.</div>;
		return (
			<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-full">
			{buses.map((b: any) => (
				<Card key={b.id}>
					<div className="font-semibold">{b.number}</div>
					<div className="text-sm text-gray-600">Capacity: {b.capacity} | Seats: {b.seatsAvailable ?? '-'}</div>
					{b.currentLocation && (
						<div className="text-xs text-gray-500">lat {b.currentLocation.lat}, lng {b.currentLocation.lng}</div>
					)}
				</Card>
			))}
		</div>
	);
}


import { useBusStore } from '@/store/busStore';

export default function BusMap(){
	const { buses } = useBusStore();
		return (
			<div className="mt-4 h-56 sm:h-72 w-full border rounded flex items-center justify-center text-sm text-gray-600">
			{/* Placeholder for Google Maps. Integrate maps next */}
			Map placeholder - plotting {buses.filter((b: any) => b.currentLocation).length} buses
		</div>
	);
}


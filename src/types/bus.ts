export type LatLng = { lat: number; lng: number };

export type Bus = {
	id: string;
	number: string;
	routeId: string;
	capacity: number;
	seatsAvailable?: number;
	currentLocation?: LatLng;
	lastUpdatedAt?: string;
};

export type RouteStop = {
	id: string;
	name: string;
	location: LatLng;
};

export type Route = {
	id: string;
	name: string;
	start: string;
	end: string;
	stops: RouteStop[];
};

export type EtaAtStop = {
	busId: string;
	stopId: string;
	etaMinutes: number;
};


import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DriverType = 'expressway' | 'normal';

export type DriverSession = {
	driverType: DriverType | null;
	busId: number | null;
	busNumber: string | null;
	assignedAt: string | null; // ISO date string
};

type DriverState = {
	session: DriverSession | null;
	setDriverSession: (type: DriverType, busId: number, busNumber: string) => void;
	clearSession: () => void;
	isSessionActive: () => boolean;
	isTodaySession: () => boolean;
};

// Check if session is from today
const isToday = (dateString: string | null): boolean => {
	if (!dateString) return false;
	const sessionDate = new Date(dateString);
	const today = new Date();
	return (
		sessionDate.getDate() === today.getDate() &&
		sessionDate.getMonth() === today.getMonth() &&
		sessionDate.getFullYear() === today.getFullYear()
	);
};

export const useDriverStore = create<DriverState>()(
	persist(
		(set, get) => ({
			session: null,
			setDriverSession: (type: DriverType, busId: number, busNumber: string) => {
				set({
					session: {
						driverType: type,
						busId,
						busNumber,
						assignedAt: new Date().toISOString(),
					},
				});
			},
			clearSession: () => {
				set({ session: null });
			},
			isSessionActive: () => {
				const session = get().session;
				if (!session) return false;
				// If session is not from today, clear it
				if (!isToday(session.assignedAt)) {
					set({ session: null });
					return false;
				}
				return true;
			},
			isTodaySession: () => {
				const session = get().session;
				return session !== null && isToday(session.assignedAt);
			},
		}),
		{
			name: 'driver-session-storage',
		}
	)
);


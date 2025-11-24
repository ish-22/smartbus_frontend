import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { 
	getBookingsAPI, 
	createBookingAPI, 
	cancelBookingAPI,
	type Booking,
	type CreateBookingRequest 
} from '@/services/api/bookingApi';
import { useAuthenticatedApi } from './useApi';

export function useBookings() {
	return useAuthenticatedApi(getBookingsAPI);
}

export function useBookingActions() {
	const { token } = useAuthStore();
	const { showToast } = useUiStore();
	const [loading, setLoading] = useState(false);

	const createBooking = async (data: CreateBookingRequest): Promise<Booking | null> => {
		if (!token) {
			showToast({ type: 'error', message: 'Please login to book a ticket' });
			return null;
		}

		try {
			setLoading(true);
			const booking = await createBookingAPI(data, token);
			showToast({ type: 'success', message: 'Booking created successfully' });
			return booking;
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to create booking';
			showToast({ type: 'error', message });
			return null;
		} finally {
			setLoading(false);
		}
	};

	const cancelBooking = async (id: string): Promise<boolean> => {
		if (!token) {
			showToast({ type: 'error', message: 'Please login to cancel booking' });
			return false;
		}

		try {
			setLoading(true);
			await cancelBookingAPI(id, token);
			showToast({ type: 'success', message: 'Booking cancelled successfully' });
			return true;
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to cancel booking';
			showToast({ type: 'error', message });
			return false;
		} finally {
			setLoading(false);
		}
	};

	return {
		createBooking,
		cancelBooking,
		loading
	};
}
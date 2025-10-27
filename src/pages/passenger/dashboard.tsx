import FeedbackForm from '@/components/passenger/FeedbackForm';
import Link from 'next/link';

import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import MainLayout from '@/layouts/MainLayout';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';
import BusSearch from '@/components/passenger/BusSearch';
import BusList from '@/components/passenger/BusList';
import BookingHistory from '@/components/passenger/BookingHistory';

export default function PassengerDashboard() {

	const { lang } = useLangStore();
	 // Simulate latest booking data
	 const latestBooking = {
		 id: 'TCKT003',
		 bus: '4321',
		 date: '2025-10-01',
		 seats: 1,
		 status: 'Confirmed',
	 };
	 return (
		 <AuthGuard>
			 <RoleGuard roles={["PASSENGER"]}>
				 <MainLayout title={t("passenger", lang) + " " + t("dashboard", lang)}>
					 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 sm:px-4 max-w-full w-full">
						 <div>
							 {/* Bus Search */}
									 <h2 className="text-xl font-bold mb-2">{t('plan_bus_journey', lang) || 'Plan Your Bus Journey'}</h2>
									 <div className="mb-4 w-full max-w-full">
												 <div className="bg-white rounded-xl shadow p-4 w-full max-w-full">
													 <div className="mb-2 text-blue-700 text-xs font-semibold">
														 {t('normal_buses_tracking_only', lang) || 'Note: Normal route buses are tracking-only. You cannot book them in this system.'}
													 </div>
											 <BusSearch />
								 </div>
							 </div>
											 {/* Booking Button */}
															 <div className="mb-4 w-full max-w-full flex justify-end">
																 <Link href="/passenger/booking" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Book Tickets</Link>
															 </div>
											 {/* Latest Booking Details */}
											 <h2 className="text-xl font-bold mb-2">{t('latest_booking', lang) || 'Latest Booking'}</h2>
											 <div className="mb-4 w-full max-w-full">
												 <div className="bg-white rounded-xl shadow p-4 w-full max-w-full">
													 {latestBooking ? (
														 <div className="space-y-2">
															 <div><span className="font-semibold">Ticket ID:</span> {latestBooking.id}</div>
															 <div><span className="font-semibold">Bus:</span> {latestBooking.bus}</div>
															 <div><span className="font-semibold">Date:</span> {latestBooking.date}</div>
															 <div><span className="font-semibold">Seats:</span> {latestBooking.seats}</div>
															 <div><span className="font-semibold">Status:</span> {latestBooking.status}</div>
														 </div>
													 ) : <span>{t('no_bookings', lang) || 'No bookings yet.'}</span>}
												 </div>
											 </div>
											 {/* Booking History */}
											 <h2 className="text-xl font-bold mb-2">{t('booking_history', lang) || 'Booking History'}</h2>
											 <div className="mb-4 w-full max-w-full">
														 <div className="bg-white rounded-xl shadow p-4 w-full max-w-full">
															 {BookingHistory ? <BookingHistory /> : <span>{t('no_bookings', lang) || 'No bookings yet.'}</span>}
													 </div>
											 </div>
						 </div>
						 <div>
							 {/* Bus List */}
							 <h2 className="text-xl font-bold mb-2">{t('buses', lang) || 'Buses'}</h2>
							 <div className="mb-4 w-full max-w-full">
								   <div className="bg-white rounded-xl shadow p-4 w-full max-w-full">
									 <BusList />
								 </div>
							 </div>
							 {/* Feedback Form */}
							 <h2 className="text-xl font-bold mb-2">{t('feedback', lang) || 'Feedback'}</h2>
							 <div className="mb-4 w-full max-w-full">
								   <div className="bg-white rounded-xl shadow p-4 w-full max-w-full">
									 {FeedbackForm ? <FeedbackForm /> : <span>{t('no_feedback', lang) || 'No feedback form.'}</span>}
								 </div>
							 </div>
						 </div>
					 </div>
				 </MainLayout>
			 </RoleGuard>
		 </AuthGuard>
	 );
}


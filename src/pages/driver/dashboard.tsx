
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import DriverLayout from '@/layouts/DriverLayout';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DriverDashboard() {
	const { lang } = useLangStore();
	const { logout, user } = useAuth();
	const router = useRouter();
	// Add bus type state: 'expressway' or 'normal'
		const [busType, setBusType] = useState<'expressway' | 'normal'>(() => {
			// Load last bus type from localStorage if available
			if (typeof window !== 'undefined') {
				return (localStorage.getItem('driver-bus-type') as 'expressway' | 'normal') || 'normal';
			}
			return 'normal';
		});
		useEffect(() => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('driver-bus-type', busType);
			}
		}, [busType]);
		const [pendingType, setPendingType] = useState<'expressway' | 'normal' | null>(null);
		const [showConfirm, setShowConfirm] = useState(false);
	const handleLogout = () => {
		logout();
		router.push('/');
	};
	return (
			<AuthGuard>
				<RoleGuard roles={['DRIVER']}>
					<DriverLayout title={t('driver', lang) + ' ' + t('dashboard', lang)}>
						<div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center p-4">
										<div className="w-full max-w-2xl mx-auto">
											{/* Bus Type Selection */}
											<div className="mb-6 p-4 bg-blue-50 rounded-xl shadow flex flex-col items-center">
												<span className="font-semibold text-blue-700 mb-2">{t('bus_type', lang) || 'Bus Type'}</span>
																<div className="flex gap-4">
																	<button
																		className={`px-4 py-2 rounded-lg font-semibold border ${busType === 'expressway' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border-blue-600'}`}
																		onClick={() => {
																			if (busType !== 'expressway') {
																				setPendingType('expressway');
																				setShowConfirm(true);
																			}
																		}}
																	>
																		{t('expressway_bus', lang) || 'Expressway Bus'}
																	</button>
																	<button
																		className={`px-4 py-2 rounded-lg font-semibold border ${busType === 'normal' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border-blue-600'}`}
																		onClick={() => {
																			if (busType !== 'normal') {
																				setPendingType('normal');
																				setShowConfirm(true);
																			}
																		}}
																	>
																		{t('normal_bus', lang) || 'Normal Route Bus'}
																	</button>
																</div>
																{/* Confirmation Dialog */}
																{showConfirm && (
																	<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
																		<div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
																			<div className="mb-4 text-blue-700 font-semibold">
																				{t('confirm_bus_type_change', lang) || 'Are you sure you want to change your bus type for this session?'}
																			</div>
																			<div className="flex gap-4 justify-center">
																				<button
																					className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
																					onClick={() => {
																						if (pendingType) setBusType(pendingType);
																						setShowConfirm(false);
																					}}
																				>
																					{t('yes', lang) || 'Yes'}
																				</button>
																				<button
																					className="px-4 py-2 rounded bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300"
																					onClick={() => setShowConfirm(false)}
																				>
																					{t('no', lang) || 'No'}
																				</button>
																			</div>
																		</div>
																	</div>
																)}
												<div className="mt-2 text-xs text-gray-600">
													{busType === 'expressway'
														? (t('expressway_driver_note', lang) || 'You are driving an expressway bus. Passengers can book and track this bus.')
														: (t('normal_driver_note', lang) || 'You are driving a normal route bus. Passengers can only track this bus, not book.')}
												</div>
											</div>
								<h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 text-center">{t('welcome', lang)}, {t('driver', lang)}!</h1>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<div className="p-6 flex flex-col items-center justify-center shadow-lg rounded-xl bg-white hover:scale-[1.02] transition-transform">
										<span className="text-lg font-semibold text-gray-700 mb-2">{t('schedule', lang) || "Today's Schedule"}</span>
															<Link href="/driver/schedule" className="mt-2 w-full">
																<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">{t('view_schedule', lang) || 'View Schedule'}</button>
															</Link>
									</div>
									<div className="p-6 flex flex-col items-center justify-center shadow-lg rounded-xl bg-white hover:scale-[1.02] transition-transform">
										<span className="text-lg font-semibold text-gray-700 mb-2">{t('passenger_list', lang) || 'Passenger List'}</span>
															<Link href="/driver/passengers" className="mt-2 w-full">
																<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">{t('view_passengers', lang) || 'View Passengers'}</button>
															</Link>
									</div>
									<div className="p-6 flex flex-col items-center justify-center shadow-lg rounded-xl bg-white hover:scale-[1.02] transition-transform">
										<span className="text-lg font-semibold text-gray-700 mb-2">{t('incident_reports', lang) || 'Incident Reports'}</span>
															<Link href="/driver/incidents" className="mt-2 w-full">
																<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">{t('report_incident', lang) || 'Report Incident'}</button>
															</Link>
									</div>
									<div className="p-6 flex flex-col items-center justify-center shadow-lg rounded-xl bg-white hover:scale-[1.02] transition-transform">
										<span className="text-lg font-semibold text-gray-700 mb-2">{t('location_update', lang) || 'Location Update'}</span>
															<Link href="/driver/location" className="mt-2 w-full">
																<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">{t('update_location', lang) || 'Update Location'}</button>
															</Link>
									</div>
								</div>
								<div className="flex flex-col md:flex-row gap-4 justify-center">
									<Link href="/driver/profile" className="w-full md:w-auto">
										<button className="w-full md:w-auto px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold hover:bg-gray-200 transition">{t('profile', lang) || 'Profile'}</button>
									</Link>
									<Link href="/driver/settings" className="w-full md:w-auto">
										<button className="w-full md:w-auto px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold hover:bg-gray-200 transition">{t('settings', lang) || 'Settings'}</button>
									</Link>
									<button onClick={handleLogout} className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">Logout {user?.name}</button>
								</div>
							</div>
						</div>
					</DriverLayout>
				</RoleGuard>
			</AuthGuard>
		);
}


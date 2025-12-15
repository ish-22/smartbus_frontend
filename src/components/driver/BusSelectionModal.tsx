'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { XMarkIcon, TruckIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useDriverStore } from '@/store/driverStore';
import { getAllBusesForDriver, assignDriverToBus, type DriverType } from '@/services/api/driverApi';
import { useUiStore } from '@/store/uiStore';
import type { Bus } from '@/services/api/busApi';

interface BusSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export default function BusSelectionModal({
	isOpen,
	onClose,
	onSuccess,
}: BusSelectionModalProps) {
	const { user, token } = useAuthStore();
	const { setDriverSession } = useDriverStore();
	const { showToast } = useUiStore();

	const [driverType, setDriverType] = useState<DriverType | null>(null);
	const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
	const [buses, setBuses] = useState<Bus[]>([]);
	const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isOpen && token) {
			// Pre-select driver type from user profile if available
			if (user?.driver_type && !driverType) {
				setDriverType(user.driver_type as DriverType);
			}
			loadBuses();
		}
	}, [isOpen, token, user]);

	useEffect(() => {
		if (driverType && buses.length > 0) {
			const filtered = buses.filter((bus) => bus.type === driverType);
			setFilteredBuses(filtered);
			setSelectedBusId(null); // Reset selection when type changes
		} else {
			setFilteredBuses([]);
		}
	}, [driverType, buses]);

	const loadBuses = async () => {
		if (!token) return;

		try {
			setIsLoading(true);
			const allBuses = await getAllBusesForDriver(token);
			setBuses(allBuses);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to load buses';
			showToast({ type: 'error', message });
			console.error('Error loading buses:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!user?.id || !token || !driverType || !selectedBusId) {
			showToast({ type: 'error', message: 'Please select driver type and bus' });
			return;
		}

		try {
			setIsSubmitting(true);
			const selectedBus = buses.find((b) => b.id === selectedBusId);
			
			// Assign via API
			const assignment = await assignDriverToBus(parseInt(user.id), selectedBusId, driverType, token);
			
			// Store in local session
			const busNumber = selectedBus?.number || assignment?.bus?.number || assignment?.bus?.bus_number || `Bus ${selectedBusId}`;
			setDriverSession(driverType, selectedBusId, busNumber);

			showToast({
				type: 'success',
				message: `Successfully assigned to ${busNumber}`,
			});

			onSuccess();
			onClose();
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to assign bus';
			showToast({ type: 'error', message });
			console.error('Error assigning bus:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-start mb-6">
						<div>
							<h2 className="text-2xl font-bold text-gray-900">Select Your Bus Assignment</h2>
							<p className="text-gray-600 mt-1">
								Choose your driver type and the bus you'll be driving today
							</p>
						</div>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<XMarkIcon className="h-6 w-6" />
						</button>
					</div>

					{/* Driver Type Selection */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Select Driver Type *
						</label>
						<div className="grid grid-cols-2 gap-4">
							<button
								type="button"
								onClick={() => setDriverType('expressway')}
								className={`p-4 border-2 rounded-lg transition-all ${
									driverType === 'expressway'
										? 'border-green-600 bg-green-50'
										: 'border-gray-300 hover:border-green-400'
								}`}
							>
								<div className="flex items-center justify-center mb-2">
									<BoltIcon className="h-8 w-8 text-green-600" />
								</div>
								<div className="font-semibold text-gray-900">Expressway Driver</div>
								<div className="text-sm text-gray-600 mt-1">
									For expressway routes
								</div>
							</button>

							<button
								type="button"
								onClick={() => setDriverType('normal')}
								className={`p-4 border-2 rounded-lg transition-all ${
									driverType === 'normal'
										? 'border-blue-600 bg-blue-50'
										: 'border-gray-300 hover:border-blue-400'
								}`}
							>
								<div className="flex items-center justify-center mb-2">
									<TruckIcon className="h-8 w-8 text-blue-600" />
								</div>
								<div className="font-semibold text-gray-900">Normal Route Driver</div>
								<div className="text-sm text-gray-600 mt-1">
									For normal city routes
								</div>
							</button>
						</div>
					</div>

					{/* Bus Selection */}
					{driverType && (
						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-3">
								Select Bus *
							</label>
							{isLoading ? (
								<div className="text-center py-8 text-gray-500">Loading buses...</div>
							) : filteredBuses.length === 0 ? (
								<div className="text-center py-8 text-gray-500 border rounded-lg">
									<p>No {driverType} buses available</p>
									<p className="text-sm text-gray-400 mt-2">
										Please contact admin to add buses for this route type
									</p>
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
									{filteredBuses.map((bus) => (
										<button
											key={bus.id}
											type="button"
											onClick={() => setSelectedBusId(bus.id)}
											className={`p-4 border-2 rounded-lg text-left transition-all ${
												selectedBusId === bus.id
													? 'border-green-600 bg-green-50'
													: 'border-gray-300 hover:border-green-400'
											}`}
										>
											<div className="flex items-center justify-between">
												<div>
													<div className="font-semibold text-gray-900">
														Bus {bus.number}
													</div>
													{bus.route && (
														<div className="text-sm text-gray-600 mt-1">
															Route: {bus.route.name}
														</div>
													)}
													<div className="text-xs text-gray-500 mt-1">
														Capacity: {bus.capacity} seats
													</div>
												</div>
												{selectedBusId === bus.id && (
													<div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
														<svg
															className="w-4 h-4 text-white"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M5 13l4 4L19 7"
															/>
														</svg>
													</div>
												)}
											</div>
										</button>
									))}
								</div>
							)}
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
						<Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							disabled={!driverType || !selectedBusId || isSubmitting}
							className="bg-green-600 hover:bg-green-700"
						>
							{isSubmitting ? 'Assigning...' : 'Assign Bus'}
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}


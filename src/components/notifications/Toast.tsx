import { useEffect } from 'react';
import { useUiStore } from '@/store/uiStore';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Toast() {
	const { toast, showToast } = useUiStore();

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => {
				showToast(undefined);
			}, 5000); // Auto-dismiss after 5 seconds

			return () => clearTimeout(timer);
		}
	}, [toast, showToast]);

	if (!toast) return null;

	const bgColorMap = {
		success: 'bg-green-500 dark:bg-green-600',
		error: 'bg-red-500 dark:bg-red-600',
		info: 'bg-blue-500 dark:bg-blue-600',
	};
	const bgColorValue = bgColorMap[toast.type as keyof typeof bgColorMap];

	const iconMap = {
		success: CheckCircleIcon,
		error: ExclamationCircleIcon,
		info: InformationCircleIcon,
	};
	const Icon = iconMap[toast.type as keyof typeof iconMap];

	return (
		<div className="fixed top-4 right-4 z-50 animate-animate-slide-in-right">
			<div className={`${bgColorValue} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
				<Icon className="w-6 h-6 flex-shrink-0" />
				<p className="flex-1 text-sm font-medium">{toast.message}</p>
				<button
					onClick={() => showToast(undefined)}
					className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
					aria-label="Close"
				>
					<XMarkIcon className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
}


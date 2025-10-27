import React from 'react';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

export default function FeedbackForm() {
	const { lang } = useLangStore();
	return (
		<form className="flex flex-col gap-2 w-full max-w-full">
			<textarea
				className="border rounded p-2 w-full"
				placeholder={t('your_feedback', lang) || 'Your feedback...'}
				rows={3}
			/>
			<button type="submit" className="bg-sky-500 text-white rounded px-4 py-2 w-full">
				{t('submit', lang) || 'Submit'}
			</button>
		</form>
	);
}

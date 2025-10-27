import MainLayout from '@/layouts/MainLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

export default function FeedbackPage(){
	const { lang } = useLangStore();
	const [busId, setBusId] = useState('');
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState('');
	function submit(e: React.FormEvent){ e.preventDefault(); alert(t('thanks_feedback', lang) || 'Thanks for the feedback!'); setComment(''); }
	return (
		<MainLayout title={t('feedback', lang) || 'Feedback'}>
			<div className="mx-auto max-w-xl space-y-3">
				<Input placeholder={t('bus_id_number', lang) || 'Bus ID/Number'} value={busId} onChange={(e) => setBusId(e.target.value)} />
						<select
							className="border rounded px-3 py-2 w-full"
							value={rating}
							onChange={(e) => setRating(Number(e.target.value))}
							aria-label={t('rating', lang) || 'Rating'}
						>
							{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {t('star', lang) || 'star'}{n>1 ? 's' : ''}</option>)}
						</select>
				<textarea className="border rounded px-3 py-2 w-full" rows={4} placeholder={t('your_comments', lang) || 'Your comments'} value={comment} onChange={(e) => setComment(e.target.value)} />
			<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => submit(e as unknown as React.FormEvent)}>{t('submit', lang) || 'Submit'}</Button>
			</div>
		</MainLayout>
	);
}


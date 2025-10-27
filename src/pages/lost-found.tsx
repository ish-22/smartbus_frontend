import MainLayout from '@/layouts/MainLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

type Item = { id: string; title: string; description: string; contact: string; status: 'LOST'|'FOUND' };

export default function LostFoundPage() {
	const [items, setItems] = useState<Item[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [contact, setContact] = useState('');
	const [status, setStatus] = useState<'LOST'|'FOUND'>('LOST');
	const { lang } = useLangStore();

	function addItem(e: React.FormEvent) {
		e.preventDefault();
		setItems([{ id: 'i-' + Date.now(), title, description, contact, status }, ...items]);
		setTitle(''); setDescription(''); setContact(''); setStatus('LOST');
	}

	return (
		<MainLayout title={t('lost_found', lang)}>
			<div className="mx-auto max-w-3xl grid gap-4">
				<form onSubmit={addItem} className="grid gap-2">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						<Input placeholder={t('title', lang)} value={title} onChange={(e) => setTitle(e.target.value)} />
						<label>
							<span className="sr-only">{t('lost_found', lang)}</span>
							<select className="border rounded px-3 py-2 w-full" value={status} onChange={(e) => setStatus(e.target.value as 'LOST'|'FOUND')}>
								<option value="LOST">{t('lost', lang)}</option>
								<option value="FOUND">{t('found', lang) || 'Found'}</option>
							</select>
						</label>
					</div>
					<textarea className="border rounded px-3 py-2 w-full" rows={3} placeholder={t('description', lang)} value={description} onChange={(e) => setDescription(e.target.value)} />
					<Input placeholder={t('contact', lang)} value={contact} onChange={(e) => setContact(e.target.value)} />
					<Button type="submit">{t('post', lang)}</Button>
				</form>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{items.map(i => (
						<div key={i.id} className="border rounded-xl p-3 bg-white/90">
							<div className="text-xs text-slate-500">{i.status === 'LOST' ? t('lost', lang) : t('found', lang) || 'Found'}</div>
							<div className="font-semibold">{i.title}</div>
							<div className="text-sm text-slate-600">{i.description}</div>
							<div className="text-xs text-slate-500 mt-2">{t('contact', lang)}: {i.contact}</div>
						</div>
					))}
				</div>
			</div>
		</MainLayout>
	);
}


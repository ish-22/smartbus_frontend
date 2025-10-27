import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { loginWithEmail } from '@/services/authService';
import { t } from '@/utils/i18n';
import { useLangStore } from '@/store/langStore';
import { useUiStore } from '@/store/uiStore';

export default function LoginPage() {
	const router = useRouter();
	const { } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { lang } = useLangStore();
	const { showToast } = useUiStore();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		
		if (!email.trim()) {
			showToast({ type: 'error', message: t('email_required', lang) || 'Email or phone is required' });
			return;
		}
		
		if (!password) {
			showToast({ type: 'error', message: t('password_required', lang) || 'Password is required' });
			return;
		}
		
		setLoading(true);
		
		try {
			const user = await loginWithEmail(email, password);
			if (!user) {
				showToast({ type: 'error', message: 'Invalid credentials' });
				return;
			}
			
			showToast({ type: 'success', message: t('login_success', lang) || 'Login successful!' });
			
			// Redirect based on role
			router.replace(
				user.role === 'ADMIN' ? '/admin/dashboard' : 
				user.role === 'DRIVER' ? '/driver/dashboard' : 
				'/passenger/dashboard'
			);
		} catch (error) {
			// Error already shown in authService via toast
			console.error('Login error:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-700 flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
				<h1 className="text-white text-2xl font-semibold mb-6 text-center">{t('login', lang)}</h1>
				<form onSubmit={handleSubmit} className="space-y-3">
					<Input placeholder={t('email', lang)} value={email} onChange={(e) => setEmail(e.target.value)} />
					<div className="relative">
						<Input
							placeholder={t('password', lang)}
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							className="absolute right-2 top-2 text-xs bg-gray-200 px-2 py-1 rounded"
							onClick={() => setShowPassword((v) => !v)}
						>
							{showPassword ? 'Hide' : 'Show'}
						</button>
					</div>
					<div className="flex items-center justify-between text-xs text-white/80">
						<label className="inline-flex items-center gap-2"><input type="checkbox" className="accent-blue-500" /> Remember me</label>
						<button
							type="button"
							className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer"
							onClick={() => router.push({ pathname: '/auth/forgot-password', query: { lang } })}
						>
							{t('forgot_password', lang)}
						</button>
					</div>
					<Button type="submit" disabled={loading}>
						{loading ? t('logging_in', lang) || 'Logging in...' : t('login', lang)}
					</Button>
				</form>
			</div>
		</div>
	);
}



import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { registerUser } from '@/services/authService';
import { useUiStore } from '@/store/uiStore';

export default function RegisterPage(){
	const router = useRouter();
	const { } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<'PASSENGER'|'DRIVER'>('PASSENGER');
	const [loading, setLoading] = useState(false);
	const { showToast } = useUiStore();

	async function handleSubmit(e: React.FormEvent){
		e.preventDefault();
		
		// Validation
		if (!name.trim()) {
			showToast({ type: 'error', message: 'Please enter your name' });
			return;
		}
		
		if (!email.trim() && !phone.trim()) {
			showToast({ type: 'error', message: 'Please enter either email or phone number' });
			return;
		}
		
		if (password.length < 6) {
			showToast({ type: 'error', message: 'Password must be at least 6 characters' });
			return;
		}
		
		setLoading(true);
		
		try {
			// Use email as primary identifier, fallback to phone
			const primaryIdentifier = email.trim() || phone.trim();
			
			await registerUser(
				name.trim(), 
				primaryIdentifier, 
				password, 
				role,
				phone.trim() || undefined
			);
			
			showToast({ type: 'success', message: 'Registration successful!' });
			
			// Redirect based on role
			router.replace(role === 'DRIVER' ? '/driver/dashboard' : '/passenger/dashboard');
		} catch (e) {
			// Error already shown in authService via toast
			console.error('Registration error:', e);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-700 flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
				<h1 className="text-white text-2xl font-semibold mb-6 text-center">Create account</h1>
				<form onSubmit={handleSubmit} className="space-y-3">
					<Input 
						placeholder="Full name *" 
						value={name} 
						onChange={(e) => setName(e.target.value)} 
						required
					/>
					<Input 
						placeholder="Email" 
						type="email"
						value={email} 
						onChange={(e) => setEmail(e.target.value)} 
					/>
					<Input 
						placeholder="Phone number" 
						type="tel"
						value={phone} 
						onChange={(e) => setPhone(e.target.value)} 
					/>
					<p className="text-xs text-white/70 -mt-2">* Provide at least email or phone number</p>
					<Input 
						placeholder="Password *" 
						type="password" 
						value={password} 
						onChange={(e) => setPassword(e.target.value)} 
						required
					/>
					<select 
						className="border rounded px-3 py-2 w-full bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
						value={role} 
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as 'PASSENGER' | 'DRIVER')} 
						title="User Role"
					>
						<option value="PASSENGER">Passenger</option>
						<option value="DRIVER">Driver</option>
					</select>
					<Button type="submit" disabled={loading}>
						{loading ? 'Registering...' : 'Register'}
					</Button>
				</form>
			</div>
		</div>
	);
}


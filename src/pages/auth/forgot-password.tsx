import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getUsers, setUsers } from '@/services/authService';
import { t } from '@/utils/i18n';
import { useLangStore } from '@/store/langStore';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { lang } = useLangStore();
  const [showPassword, setShowPassword] = useState(false);

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const users = getUsers();
  const user = users.find((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      setError(t('password_reset_failed', lang));
      setLoading(false);
      return;
    }
    setStep('reset');
    setLoading(false);
  }

  function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }
    const users = getUsers();
  const idx = users.findIndex((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) {
      setError(t('password_reset_failed', lang));
      setLoading(false);
      return;
    }
    users[idx].password = newPassword;
    setUsers(users);
    setMessage('Password reset successful!');
    setLoading(false);
    setTimeout(() => {
      router.push({ pathname: '/auth/login', query: { lang } });
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-700 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">{t('forgot_password', lang)}</h2>
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-white/80 text-black focus:outline-none"
              placeholder={t('email', lang)}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="w-full py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
              {loading ? '...' : t('forgot_password', lang)}
            </button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 rounded bg-white/80 text-black focus:outline-none"
                placeholder={t('password', lang)}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xs bg-gray-200 px-2 py-1 rounded"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition">
              {loading ? '...' : 'Reset Password'}
            </button>
          </form>
        )}
        {message && <p className="text-green-200 text-center mt-4">{message}</p>}
        {error && <p className="text-red-200 text-center mt-4">{error}</p>}
        <button
          className="mt-6 w-full py-2 rounded bg-gray-600 text-white font-bold hover:bg-gray-700 transition"
          onClick={() => router.push({ pathname: '/auth/login', query: { lang } })}
        >
          {t('back_to_login', lang)}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;

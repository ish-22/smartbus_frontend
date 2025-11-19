'use client'; // For Next.js client-side interactivity

import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // For icons
import { Button } from '@/components/ui/Button';
import Input from '@/components/common/Input';
import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login API call
    try {
      // Add your login logic here (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      console.log('Login attempted with:', { email, password });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center transition-transform hover:scale-[1.02] duration-300">
        {/* Icon and Heading */}
        <div className="flex justify-center mb-4">
          <LockClosedIcon className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Login to SmartBus</h1>
        <p className="mt-3 text-gray-500 text-lg">
          Access your account to track buses and plan your journey.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Additional Links */}
        <p className="mt-6 text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up now
          </Link>
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Forgot your password?{' '}
          <Link href="/auth/reset-password" className="text-blue-600 hover:underline">
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
}

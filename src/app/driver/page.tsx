'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useDriverStore } from '@/store/driverStore';

export default function DriverPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { isSessionActive } = useDriverStore();

  useEffect(() => {
    // Only redirect if user is authenticated as driver
    if (user?.role === 'driver') {
      router.replace('/driver/dashboard');
    } else {
      router.replace('/auth/login');
    }
  }, [router, user]);

  return null;
}
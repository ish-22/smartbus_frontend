'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function OwnerPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Only redirect if user is authenticated as owner
    if (user?.role === 'owner') {
      router.replace('/owner/dashboard');
    } else {
      router.replace('/auth/login');
    }
  }, [router, user]);

  return null;
}

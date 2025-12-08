'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PassengerBooking() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to search page for unified booking experience
    router.push('/passenger/search');
  }, [router]);
  
  return (
    <div className="p-6 text-center">
      <p>Redirecting to booking page...</p>
    </div>
  );
}

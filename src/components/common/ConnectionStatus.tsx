'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

export default function ConnectionStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/buses`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          setStatus('connected');
        } else {
          setStatus('error');
          setError(`Backend API error: ${response.status}`);
        }
      } catch (err) {
        setStatus('error');
        setError('Cannot connect to backend server');
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') return null;
  if (status === 'connected') return null;

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="text-sm">
        <strong>Connection Error</strong>
        <br />
        {error}
      </div>
    </div>
  );
}
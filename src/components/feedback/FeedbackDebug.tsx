'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { API_BASE_URL } from '@/config/api';

export default function FeedbackDebug() {
  const { token, user } = useAuthStore();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // Test basic connection
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      const text = await response.text();
      setResult({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: text.substring(0, 500) + (text.length > 500 ? '...' : '')
      });
    } catch (error: any) {
      setResult({ connectionError: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Test Feedback',
          message: 'This is a test message',
          type: 'general',
          rating: 5
        }),
      });
      
      const text = await response.text();
      setResult({
        status: response.status,
        statusText: response.statusText,
        body: text.substring(0, 1000) + (text.length > 1000 ? '...' : '')
      });
    } catch (error: any) {
      setResult({ feedbackError: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testDirectDB = async () => {
    setLoading(true);
    try {
      // Test with raw SQL approach
      const response = await fetch(`${API_BASE_URL}/feedback/debug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ test: 'debug' }),
      });
      
      const text = await response.text();
      setResult({
        debugStatus: response.status,
        debugBody: text.substring(0, 1000)
      });
    } catch (error: any) {
      setResult({ debugError: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-4">Feedback Debug Panel</h3>
      
      <div className="mb-4 space-y-2">
        <p><strong>User:</strong> {user?.name || 'Not logged in'}</p>
        <p><strong>Token:</strong> {token ? 'Present' : 'Missing'}</p>
        <p><strong>API URL:</strong> {API_BASE_URL}</p>
        <button 
          onClick={async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/api/test.php');
              const data = await response.json();
              setResult({ serverTest: data });
            } catch (error: any) {
              setResult({ serverError: error.message });
            }
          }}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
        >
          Test PHP Server
        </button>
      </div>

      <div className="space-x-2 mb-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
        <button 
          onClick={testDirectDB}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Test Debug Route
        </button>
        <button 
          onClick={testFeedback}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Test Feedback
        </button>
      </div>

      {result && (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useLangStore } from '@/store/langStore';
import Toast from '@/components/notifications/Toast';

export default function App({ Component, pageProps }: AppProps) {
  // hydrate auth and language from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('auth-demo');
      if (saved) {
        const { user, token } = JSON.parse(saved);
        if (user && token) useAuthStore.getState().login(user, token);
      }
      const savedLang = localStorage.getItem('lang-demo');
      if (savedLang) useLangStore.getState().setLang(savedLang as 'en' | 'si' | 'ta');
      const unsubAuth = useAuthStore.subscribe((s) => {
        if (s.isAuthenticated) {
          localStorage.setItem('auth-demo', JSON.stringify({ user: s.user, token: s.token }));
        } else {
          localStorage.removeItem('auth-demo');
        }
      });
      const unsubLang = useLangStore.subscribe((s) => {
        localStorage.setItem('lang-demo', s.lang);
      });
      return () => { unsubAuth(); unsubLang(); };
  } catch {} 
  }, []);
  
  return (
    <>
      <Component {...pageProps} />
      <Toast />
    </>
  );
}

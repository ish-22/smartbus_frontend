// Combined integration hook
import { useEffect, useState } from 'react';
import { api } from '@/services/api/realApi';
import { wsService } from '@/services/websocket';
import { mapsService } from '@/services/maps';
import { stripePayment, payHerePayment } from '@/services/payment';

export function useIntegrations() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize all services
    const initServices = async () => {
      try {
        // Connect WebSocket
        wsService.connect();
        
        // Initialize payment gateways
        await stripePayment.initialize();
        
        setIsConnected(true);
      } catch (error) {
        console.error('Integration initialization failed:', error);
      }
    };

    initServices();

    return () => {
      wsService.disconnect();
    };
  }, []);

  return {
    isConnected,
    api,
    wsService,
    mapsService,
    stripePayment,
    payHerePayment,
  };
}

// Real-time bus tracking hook
export function useBusTracking(busId?: string) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!busId) return;

    const handleLocationUpdate = (event: CustomEvent) => {
      if (event.detail.busId === busId) {
        setLocation(event.detail.location);
      }
    };

    window.addEventListener('busLocationUpdate', handleLocationUpdate as EventListener);
    
    return () => {
      window.removeEventListener('busLocationUpdate', handleLocationUpdate as EventListener);
    };
  }, [busId]);

  return location;
}

// Payment processing hook
export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (amount: number, method: 'stripe' | 'payhere' = 'payhere') => {
    setIsProcessing(true);
    
    try {
      if (method === 'stripe') {
        const { clientSecret } = await stripePayment.createPaymentIntent(amount);
        // Handle Stripe payment flow
        return { success: true, clientSecret };
      } else {
        // Use PayHere for Sri Lankan payments
        const orderId = `ORDER_${Date.now()}`;
        await payHerePayment.initializePayment({
          amount,
          currency: 'LKR',
          orderId,
          description: 'Bus Ticket Payment',
        });
        return { success: true, orderId };
      }
    } catch (error) {
      console.error('Payment failed:', error);
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  return { processPayment, isProcessing };
}
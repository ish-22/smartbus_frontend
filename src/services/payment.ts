// Payment gateway integration (Stripe + PayHere for Sri Lanka)

// Stripe integration
export class StripePayment {
  private stripe: any;

  async initialize() {
    if (typeof window !== 'undefined') {
      const { loadStripe } = await import('@stripe/stripe-js');
      this.stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    }
  }

  async createPaymentIntent(amount: number, currency = 'lkr') {
    const response = await fetch('/api/payment/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    });
    return response.json();
  }

  async confirmPayment(clientSecret: string, paymentMethod: any) {
    return this.stripe.confirmCardPayment(clientSecret, { payment_method: paymentMethod });
  }
}

// PayHere integration (Sri Lankan payment gateway)
export class PayHerePayment {
  async initializePayment(paymentData: {
    amount: number;
    currency: string;
    orderId: string;
    description: string;
  }) {
    return new Promise((resolve, reject) => {
      const payment = {
        sandbox: process.env.NODE_ENV !== 'production',
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
        return_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        notify_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/notify`,
        order_id: paymentData.orderId,
        items: paymentData.description,
        amount: paymentData.amount.toFixed(2),
        currency: paymentData.currency,
        hash: '', // Generate hash on backend
        first_name: 'Customer',
        last_name: 'Name',
        email: 'customer@example.com',
        phone: '+94771234567',
        address: 'Colombo',
        city: 'Colombo',
        country: 'Sri Lanka',
      };

      // @ts-ignore
      payhere.startPayment(payment);

      // @ts-ignore
      payhere.onCompleted = (orderId: string) => resolve(orderId);
      // @ts-ignore
      payhere.onDismissed = () => reject('Payment dismissed');
      // @ts-ignore
      payhere.onError = (error: any) => reject(error);
    });
  }
}

export const stripePayment = new StripePayment();
export const payHerePayment = new PayHerePayment();
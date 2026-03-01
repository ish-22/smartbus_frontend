import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_gqhomxf';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_f2ytysg';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'mvIhLYuKrURwzPYG_';

export interface EmailParams {
  passenger_name: string;
  to_email: string;
  qr_code: string;
  route: string;
  bus_number: string;
  travel_date: string;
  departure_time: string;
}

export const sendQRCodeEmail = async (params: EmailParams): Promise<void> => {
  try {
    console.log('Sending email with params:', params);
    console.log('EmailJS Config:', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
    
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      params,
      PUBLIC_KEY
    );
    console.log('Email sent successfully:', response);
  } catch (error: any) {
    console.error('Failed to send email:', error);
    console.error('Error details:', error.text || error.message);
    throw error;
  }
};

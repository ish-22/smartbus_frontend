import PassengerLayout from '@/layouts/MainLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';
import { useState } from 'react';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

export default function PassengerBooking() {
  const { lang, setLang } = useLangStore();
  const [bus, setBus] = useState('');
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [adultTickets, setAdultTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);
  const [success, setSuccess] = useState(false);
  type Ticket = { id: string; category: 'Adult' | 'Child'; price: number };
  type BookingSummary = {
    bus: string;
    route: string;
    date: string;
    tickets: Ticket[];
    totalPrice: number;
    status: string;
  };
  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null);

  const ADULT_PRICE = 150;
  const CHILD_PRICE = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking multiple tickets
    const ticketList: Ticket[] = [];
    for (let i = 0; i < adultTickets; i++) {
      ticketList.push({
        id: 'TCKT' + Math.floor(Math.random() * 10000) + '-A',
        category: 'Adult',
        price: ADULT_PRICE,
      });
    }
    for (let i = 0; i < childTickets; i++) {
      ticketList.push({
        id: 'TCKT' + Math.floor(Math.random() * 10000) + '-C',
        category: 'Child',
        price: CHILD_PRICE,
      });
    }
    const totalPrice = ticketList.reduce((sum, t) => sum + t.price, 0);
    setBookingSummary({
      bus,
      route,
      date,
      tickets: ticketList,
      totalPrice,
      status: 'Booked',
    });
    setSuccess(true);
    // Simulate sending booking details via email
    // (No state needed, just show info in UI)
  };



  return (
    <AuthGuard>
      <RoleGuard roles={['PASSENGER']}>
        <PassengerLayout title={t('book_bus_ticket', lang) || 'Book a Bus Ticket'}>
          <div className="mb-4 flex justify-end">
            <select
              value={lang}
              onChange={e => setLang(e.target.value as 'en' | 'si' | 'ta')}
              className="border rounded px-2 py-1"
              title="Language Switcher"
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">{t('book_bus_ticket', lang) || 'Book a Bus Ticket'}</h2>
            {!success && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-semibold mb-1">{t('express_bus_number', lang) || 'Expressway Bus Number'}</label>
                  <select className="w-full border rounded px-2 py-1" value={bus} onChange={e => setBus(e.target.value)} required title="Expressway Bus Number">
                    <option value="">{t('select_express_bus_number', lang) || 'Select expressway bus number'}</option>
                    <option value="EX1001">EX1001</option>
                    <option value="EX2002">EX2002</option>
                    <option value="EX3003">EX3003</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('express_bus_route', lang) || 'Expressway Route'}</label>
                  <select className="w-full border rounded px-2 py-1" value={route} onChange={e => setRoute(e.target.value)} required title="Expressway Route">
                    <option value="">{t('select_express_bus_route', lang) || 'Select expressway route'}</option>
                    <option value="Colombo - Galle">{t('route_colombo_galle', lang) || 'Colombo - Galle (Expressway)'}</option>
                    <option value="Colombo - Matara">{t('route_colombo_matara', lang) || 'Colombo - Matara (Expressway)'}</option>
                    <option value="Colombo - Kandy">{t('route_colombo_kandy', lang) || 'Colombo - Kandy (Expressway)'}</option>
                  </select>
                </div>
                <div className="text-blue-700 text-xs mb-2">
                  {t('only_expressway_booking', lang) || 'Note: Only expressway buses can be booked. Normal route buses are tracking-only.'}
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t('date', lang) || 'Date'}</label>
                  <input type="date" className="w-full border rounded px-2 py-1" value={date} onChange={e => setDate(e.target.value)} required title="Booking Date" placeholder={t('select_date', lang) || 'Select date'} />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold mb-1">{t('adult_tickets', lang) || 'Adult Tickets'}</label>
                    <input type="number" className="w-full border rounded px-2 py-1" min={1} max={10} value={adultTickets} onChange={e => setAdultTickets(Number(e.target.value))} required title="Number of Adult Tickets" placeholder={t('enter_adult_tickets', lang) || 'Enter number of adult tickets'} />
                  </div>
                  <div className="flex-1">
                    <label className="block font-semibold mb-1">{t('child_tickets', lang) || 'Child Tickets'}</label>
                    <input type="number" className="w-full border rounded px-2 py-1" min={0} max={10} value={childTickets} onChange={e => setChildTickets(Number(e.target.value))} required title="Number of Child Tickets" placeholder={t('enter_child_tickets', lang) || 'Enter number of child tickets'} />
                  </div>
                </div>
                <div className="text-gray-600 text-sm mb-2">{t('after_booking_email', lang) || 'After booking, your ticket details will be sent to your email. Please pay at the bus.'}</div>
                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">{t('book_tickets', lang) || 'Book Tickets'}</button>
              </form>
            )}
            {success && bookingSummary && (
              <div className="mt-6">
                <div className="bg-blue-50 rounded-lg shadow p-4 mb-4">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">{t('booking_summary', lang) || 'Booking Summary'}</h3>
                  <div className="space-y-1">
                    <div><span className="font-semibold">{t('bus', lang) || 'Bus'}:</span> {bookingSummary.bus}</div>
                    <div><span className="font-semibold">{t('route', lang) || 'Route'}:</span> {bookingSummary.route}</div>
                    <div><span className="font-semibold">{t('date', lang) || 'Date'}:</span> {bookingSummary.date}</div>
                    <div><span className="font-semibold">{t('tickets', lang) || 'Tickets'}:</span></div>
                    <ul className="ml-4">
                      {bookingSummary.tickets.map((ticket) => (
                        <li key={ticket.id} className="mb-1">{ticket.category} {ticket.category === 'Adult' ? t('ticket_adult', lang) || 'Ticket' : t('ticket_child', lang) || 'Ticket'} - <span className="font-semibold">{t('id', lang) || 'ID'}:</span> {ticket.id} - <span className="font-semibold">{t('price', lang) || 'Price'}:</span> Rs. {ticket.price}</li>
                      ))}
                    </ul>
                    <div><span className="font-semibold">{t('total_price', lang) || 'Total Price'}:</span> Rs. {bookingSummary.totalPrice}</div>
                    <div className="mt-2 text-green-700 font-semibold">{t('booking_email_sent', lang) || 'Your booking details have been sent to your email.'}</div>
                    <div className="mt-2 text-blue-700 font-semibold">{t('pay_at_bus_info', lang) || 'Please pay the ticket price at the bus.'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PassengerLayout>
      </RoleGuard>
    </AuthGuard>
  );
}

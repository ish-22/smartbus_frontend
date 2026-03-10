# 🚌 SmartBus Tracker

A real-time bus tracking and management system built with Next.js, providing seamless transportation solutions for passengers, drivers, and administrators.

**Made by Ishan Chinthaka**

## 🚀 Features

### For Passengers
- 🗺️ Real-time bus tracking with interactive maps
- 🎫 Online ticket booking with QR code generation
- 💺 Seat selection and reservation
- 🔔 Live notifications for bus arrivals
- 💳 Secure payment integration (Stripe)
- 🌐 Multi-language support (English, Sinhala, Tamil)
- 📱 Lost & found item reporting
- ⭐ Feedback and rating system

### For Drivers
- 📍 GPS-based location tracking
- 🚦 Route management and navigation
- 👥 Passenger manifest viewing
- 📊 Trip history and analytics

### For Administrators
- 📈 Dashboard with analytics
- 🚌 Bus fleet management
- 🛣️ Route configuration
- 👤 User management
- 💰 Payment tracking

### For Bus Owners
- 📊 Revenue analytics
- 🚌 Fleet monitoring
- 📋 Driver management

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.4 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Maps:** Leaflet, MapLibre GL, AWS Location Service
- **Real-time:** Socket.IO
- **Payments:** Stripe
- **Email:** EmailJS
- **QR Codes:** qrcode library
- **Icons:** Heroicons

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## 🔧 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd smartbus_frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables (create `.env.local`)
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
NEXT_PUBLIC_AWS_REGION=your_aws_region
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run convert-tailwind` - Convert Tailwind classes

## 📁 Project Structure

```
smartbus_frontend/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── driver/       # Driver interface
│   │   ├── passenger/    # Passenger interface
│   │   ├── owner/        # Bus owner interface
│   │   └── auth/         # Authentication pages
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and external services
│   ├── store/            # Zustand state stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files
│   ├── locales/          # Translation files
│   └── middleware.ts     # Next.js middleware
├── public/               # Static assets
└── package.json
```

## 🌍 Internationalization

The application supports three languages:
- English (en)
- Sinhala (si)
- Tamil (ta)

Translation files are located in `src/locales/`

## 🔐 Authentication

Multi-role authentication system supporting:
- Passengers
- Drivers
- Administrators
- Bus Owners

## 🗺️ Maps Integration

- **Leaflet** for interactive maps
- **MapLibre GL** for vector tiles
- **AWS Location Service** for geocoding and routing

## 💳 Payment Integration

Secure payment processing via Stripe for:
- Ticket purchases
- Seat reservations
- Subscription payments

## 📡 Real-time Features

WebSocket integration using Socket.IO for:
- Live bus location updates
- Real-time notifications
- Instant booking confirmations

## 📄 License

See [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Ishan Chinthaka**

---

Built with ❤️ using Next.js and modern web technologies

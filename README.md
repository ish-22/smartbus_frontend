# SmartBus Tracker - Frontend

A modern, responsive web application for public transport tracking and management with role-based access for Admin, Bus Owner, Driver, and Passenger users.

## 🚀 Features

### Role-Based Panels
- **Admin Panel**: Complete system management and oversight
- **Bus Owner Panel**: Fleet management and business operations  
- **Driver Panel**: Trip management and passenger services
- **Passenger Panel**: Booking, tracking, and travel services

### Key Capabilities
- Real-time bus tracking with GPS integration
- Online seat booking and e-ticketing system
- QR code-based ticket validation
- Lost & found item management
- Rewards and loyalty program
- Multi-language support (English, Sinhala, Tamil)
- Mobile-responsive design with PWA support

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Context + Hooks
- **Authentication**: JWT-based with role-based access control

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages (14 pages)
│   ├── owner/             # Bus owner pages (10 pages)
│   ├── driver/            # Driver pages (8 pages)
│   ├── passenger/         # Passenger pages (8 pages)
│   └── auth/              # Authentication pages
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── [role]/           # Role-specific components
├── config/               # Configuration files
│   └── navigation.ts     # Centralized navigation config
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── providers/            # React context providers
├── services/             # API services
├── styles/               # CSS and styling
├── types/                # TypeScript type definitions
└── middleware.ts         # Route protection middleware
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartbus_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_WS_URL=ws://localhost:8000
   NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication & Roles

### Test Accounts
```
Admin:     admin@smartbus.com / admin123
Owner:     owner@smartbus.com / owner123  
Driver:    driver@smartbus.com / driver123
Passenger: passenger@smartbus.com / passenger123
```

### Role-Based Access
- **Route Protection**: Middleware enforces role-based access
- **Navigation**: Each role sees only relevant menu items
- **Features**: Role-appropriate functionality and data access

## 📱 User Interfaces

### Admin Panel
Complete system oversight with 14 specialized pages:
- User management across all roles
- Bus and route administration
- Analytics and reporting
- Security and system settings
- Lost & found moderation

### Bus Owner Panel  
Business management tools with 10 focused pages:
- Fleet management and monitoring
- Driver assignments and scheduling
- Revenue analytics and reporting
- Promotional offers management

### Driver Panel
Operational tools with 8 essential pages:
- Trip start/stop controls
- Real-time location sharing
- QR code ticket scanning
- Found items reporting
- Trip history and performance

### Passenger Panel
Travel services with 8 user-friendly pages:
- Bus search and booking
- Real-time tracking
- E-ticket management
- Rewards and offers
- Feedback and support

## 🎨 Design System

### Color Scheme
- **Admin**: Red theme (#dc2626) for authority
- **Owner**: Purple theme (#9333ea) for business
- **Passenger**: Blue theme (#2563eb) for trust
- **Driver**: Green theme (#059669) for operations

### Layout
- **Sidebar Navigation**: Fixed left sidebar (240px width)
- **No Top Headers**: Clean, maximized content area
- **Responsive**: Mobile-first with collapsible navigation
- **Consistent Spacing**: 4px grid system (8/12/16/24/32px)

### Components
- **Cards**: Consistent styling with shadows and rounded corners
- **Buttons**: Primary/secondary variants with hover states
- **Forms**: Proper validation and focus states
- **Tables**: Sortable with pagination and actions
- **Modals**: Accessible overlays for complex interactions

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Standards
- **ESLint**: Configured for Next.js and TypeScript
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled
- **Conventional Commits**: Standardized commit messages

### Adding New Pages
1. Create page in appropriate role directory
2. Add route to `config/navigation.ts`
3. Implement proper TypeScript types
4. Follow existing component patterns
5. Test responsive behavior

## 🧪 Testing

### Test Structure
```bash
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode
```

### Test Coverage
- Component unit tests
- Hook testing
- API integration tests
- End-to-end user flows
- Accessibility testing

## 📦 Deployment

### Build Process
```bash
npm run build        # Creates optimized production build
npm run start        # Serves production build
```

### Environment Setup
- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Optimized build with CDN integration

### Performance Optimization
- Code splitting by route
- Image optimization with Next.js
- Lazy loading for non-critical components
- Service worker for offline functionality
- Bundle analysis and optimization

## 🔍 Monitoring & Analytics

### Error Tracking
- Client-side error boundaries
- API error handling
- User action logging
- Performance monitoring

### Analytics
- User behavior tracking
- Feature usage metrics
- Performance monitoring
- Conversion tracking

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes following code standards
3. Add tests for new functionality
4. Update documentation as needed
5. Submit pull request with clear description

### Code Review Process
- Automated checks (linting, tests, build)
- Peer review for code quality
- Design review for UI changes
- Security review for sensitive changes

## 📚 Documentation

### API Documentation
- OpenAPI/Swagger specifications
- Endpoint documentation
- Authentication flows
- Error handling guides

### User Guides
- Role-specific user manuals
- Feature documentation
- Troubleshooting guides
- FAQ and support

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**TypeScript Errors**
```bash
# Check types
npm run type-check
```

**Styling Issues**
```bash
# Rebuild Tailwind
npm run build:css
```

### Support
- Check existing issues in repository
- Review documentation and guides
- Contact development team for assistance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful icon set
- All contributors and testers

---

**SmartBus Tracker** - Making public transport smarter, one journey at a time.
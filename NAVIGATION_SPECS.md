# SmartBus Navigation System Specifications

## Overview
Fixed left sidebar navigation system with role-based panels, mobile responsiveness, and persistent layout across all pages.

## Component Architecture

### 1. Sidebar Component (`/components/layout/Sidebar.tsx`)
- **Width**: 256px (16rem) on desktop
- **Position**: Fixed left, full height
- **Background**: White with gray-200 border
- **Mobile**: Slides in from left with overlay

### 2. AppLayout Component (`/components/layout/AppLayout.tsx`)
- **Purpose**: Wrapper that conditionally shows sidebar
- **Logic**: Detects role from pathname
- **Layout**: Flexbox with sidebar + main content

## Role-Based Navigation

### Admin Panel (Red Theme)
- Dashboard (`/admin`)
- Users (`/admin/users`)
- Routes (`/admin/routes`)
- Lost & Found (`/admin/lost-found`)
- System Logs (`/admin/logs`)
- Settings (`/admin/settings`)

### Owner Panel (Purple Theme)
- Dashboard (`/owner`)
- Fleet Management (`/owner/fleet`)
- Routes & Timetables (`/owner/routes`)
- Analytics (`/owner/analytics`)
- Offers & Rewards (`/owner/offers`)
- Reports (`/owner/reports`)
- Lost & Found (`/owner/lost-found`)

### Passenger Panel (Blue Theme)
- Home (`/passenger`)
- Search (`/passenger/search`)
- Live Tracking (`/passenger/tracking`)
- Bookings (`/passenger/bookings`)
- Rewards (`/passenger/rewards`)
- Lost & Found (`/passenger/lost-found`)
- Profile (`/passenger/profile`)

### Driver Panel (Green Theme)
- Dashboard (`/driver`)
- Start Trip (`/driver/trip`)
- QR Scanner (`/driver/scanner`)
- Found Items (`/driver/found-items`)
- Notifications (`/driver/notifications`)
- Profile (`/driver/profile`)

## Design Specifications

### Header Section
- **Height**: 80px
- **Padding**: 24px
- **Logo**: 40px circle with bus emoji
- **Title**: "SmartBus" (18px, semibold)
- **Subtitle**: Role name (14px, gray-500)

### Navigation Items
- **Height**: 40px per item
- **Padding**: 12px horizontal, 10px vertical
- **Icon Size**: 20px (Heroicons outline)
- **Font**: 14px medium weight
- **Spacing**: 12px between icon and text
- **Border Radius**: 8px
- **Gap**: 8px between items

### Active State
- **Background**: Role color light variant (e.g., blue-50)
- **Text Color**: Role color dark variant (e.g., blue-700)
- **Left Border**: 4px solid role color
- **Animation**: 200ms slide-in effect

### Hover State
- **Background**: gray-50
- **Text Color**: gray-900
- **Transform**: translateX(2px)
- **Transition**: 150ms ease-out

### Footer Section
- **Border Top**: gray-200
- **Padding**: 16px
- **Items**: Notifications, Settings, Logout
- **Logout Color**: red-600 with red-50 hover

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 1024px (lg breakpoint)
- **Desktop**: ≥ 1024px

### Mobile Behavior
- **Trigger**: Hamburger button (top-left, fixed)
- **Button Size**: 40px with 8px padding
- **Overlay**: Black 50% opacity with blur
- **Animation**: 300ms slide transition
- **Close**: Tap overlay or X button

### Desktop Behavior
- **Position**: Static sidebar, always visible
- **Main Content**: 256px left margin
- **No Overlay**: Direct navigation

## Color System

### Role Colors
```css
Admin:     #dc2626 (red-600)
Owner:     #9333ea (purple-600)
Passenger: #2563eb (blue-600)
Driver:    #059669 (green-600)
```

### Light Variants
```css
Admin:     #fef2f2 (red-50)
Owner:     #faf5ff (purple-50)
Passenger: #eff6ff (blue-50)
Driver:    #f0fdf4 (green-50)
```

## Icons (Heroicons 24/outline)

### Common Icons
- Dashboard: HomeIcon
- Settings: CogIcon
- Notifications: BellIcon
- Logout: ArrowRightOnRectangleIcon
- Menu: Bars3Icon / XMarkIcon

### Role-Specific Icons
- Users: UserGroupIcon
- Routes: MapIcon
- Analytics: ChartBarIcon
- Fleet: TruckIcon
- Search: MagnifyingGlassIcon
- Tracking: MapPinIcon
- Bookings: CalendarIcon
- Rewards: StarIcon
- Profile: UserIcon
- Scanner: QrCodeIcon
- Trip: PlayIcon

## Animation Specifications

### Sidebar Transitions
- **Duration**: 300ms
- **Easing**: ease-in-out
- **Transform**: translateX(-100% to 0)

### Active Item Animation
- **Duration**: 200ms
- **Easing**: ease-out
- **Effect**: slideIn keyframe

### Hover Effects
- **Duration**: 150ms
- **Easing**: ease-out
- **Transform**: translateX(2px)

## Implementation Notes

### React Components
- Uses Next.js 13+ app directory
- TypeScript with proper interfaces
- Heroicons for consistent iconography
- Tailwind CSS for styling

### State Management
- Local state for mobile menu toggle
- usePathname for active route detection
- Role detection from URL pathname

### Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility

### Performance
- CSS transforms for animations
- Minimal re-renders
- Efficient icon loading
- Responsive images

## File Structure
```
src/
├── components/
│   └── layout/
│       ├── Sidebar.tsx
│       └── AppLayout.tsx
├── styles/
│   └── navigation.css
└── app/
    ├── layout.tsx (integrated)
    ├── admin/
    ├── owner/
    ├── passenger/
    └── driver/
```

This navigation system provides a professional, accessible, and responsive foundation for the SmartBus Tracker application with clear role separation and consistent user experience across all panels.
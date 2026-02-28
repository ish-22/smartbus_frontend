import { 
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  BuildingOfficeIcon,
  TruckIcon,
  MapIcon,
  GiftIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  QrCodeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const navigationConfig = {
  admin: [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Passengers', href: '/admin/passengers', icon: UserGroupIcon },
    { name: 'Drivers', href: '/admin/drivers', icon: UserIcon },
    { name: 'Bus Owners', href: '/admin/owners', icon: BuildingOfficeIcon },
    { name: 'Buses', href: '/admin/buses', icon: TruckIcon },
    { name: 'Routes', href: '/admin/routes', icon: MapIcon },
    { name: 'Offers', href: '/admin/offers', icon: GiftIcon },
    { name: 'Approvals', href: '/admin/approvals', icon: ShieldCheckIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Lost & Found', href: '/admin/lost-found', icon: ArchiveBoxIcon },
    { name: 'Incidents', href: '/admin/incidents', icon: ExclamationTriangleIcon },
    { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
    { name: 'Reports', href: '/admin/reports', icon: DocumentTextIcon },
    { name: 'Security', href: '/admin/security', icon: ShieldCheckIcon },
    { name: 'Manage Admins', href: '/admin/admins', icon: ShieldCheckIcon },
    { name: 'Profile', href: '/admin/profile', icon: UserIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
  ],
  owner: [
    { name: 'Dashboard', href: '/owner/dashboard', icon: HomeIcon },
    { name: 'Fleet Management', href: '/owner/fleet', icon: TruckIcon },
    { name: 'Bus Registrations', href: '/owner/registrations', icon: DocumentTextIcon },
    { name: 'Driver Assignments', href: '/owner/drivers', icon: UserIcon },
    { name: 'Routes & Timetables', href: '/owner/routes', icon: MapIcon },
    { name: 'Revenue & Analytics', href: '/owner/analytics', icon: ChartBarIcon },
    { name: 'Offers & Promotions', href: '/owner/offers', icon: GiftIcon },
    { name: 'Lost & Found Verification', href: '/owner/lost-found', icon: ArchiveBoxIcon },
    { name: 'Incidents', href: '/owner/incidents', icon: ExclamationTriangleIcon },
    { name: 'Notifications', href: '/owner/notifications', icon: BellIcon },
    { name: 'Reports', href: '/owner/reports', icon: DocumentTextIcon },
    { name: 'Profile', href: '/owner/profile', icon: UserIcon },
  ],
  passenger: [
    { name: 'Home', href: '/passenger', icon: HomeIcon },
    { name: 'Search Buses', href: '/passenger/search', icon: MagnifyingGlassIcon },
    { name: 'Live Tracking', href: '/passenger/tracking', icon: MapPinIcon },
    { name: 'Bookings & Tickets', href: '/passenger/bookings', icon: CalendarIcon },
    { name: 'Rewards & Offers', href: '/passenger/rewards', icon: StarIcon },
    { name: 'Feedback', href: '/passenger/feedback', icon: ChatBubbleLeftRightIcon },
    { name: 'Lost & Found', href: '/passenger/lost-found', icon: ArchiveBoxIcon },
    { name: 'Bus Incidents', href: '/passenger/incidents', icon: ExclamationTriangleIcon },
    { name: 'Notifications', href: '/passenger/notifications', icon: BellIcon },
    { name: 'Profile', href: '/passenger/profile', icon: UserIcon },
  ],
  driver: [
    { name: 'Dashboard', href: '/driver/dashboard', icon: HomeIcon },
    { name: 'Schedule', href: '/driver/schedule', icon: CalendarIcon },
    { name: 'Passengers', href: '/driver/passengers', icon: UserGroupIcon },
    { name: 'QR Scanner', href: '/driver/qr-scanner', icon: QrCodeIcon },
    { name: 'Lost & Found', href: '/driver/lost-found', icon: ArchiveBoxIcon },
    { name: 'Incidents', href: '/driver/incidents', icon: ShieldCheckIcon },
    { name: 'Notifications', href: '/driver/notifications', icon: BellIcon },
    { name: 'Profile', href: '/driver/profile', icon: UserIcon },
  ]
} as const

export type UserRole = keyof typeof navigationConfig

export const roleColors = {
  admin: { bg: 'bg-slate-900', accent: 'bg-red-600', light: 'bg-red-50 text-red-700' },
  owner: { bg: 'bg-slate-900', accent: 'bg-purple-600', light: 'bg-purple-50 text-purple-700' },
  passenger: { bg: 'bg-slate-900', accent: 'bg-blue-600', light: 'bg-blue-50 text-blue-700' },
  driver: { bg: 'bg-slate-900', accent: 'bg-green-600', light: 'bg-green-50 text-green-700' }
} as const

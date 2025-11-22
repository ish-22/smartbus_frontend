'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BellIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  UserIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [location, setLocation] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and app preferences</p>
      </div>

      {/* Account Settings */}
      <Card className="card-responsive">
        <div className="flex items-center space-x-3 mb-responsive-md">
          <UserIcon className="icon-responsive-sm text-gray-600" />
          <h3 className="text-responsive-lg font-semibold text-gray-900">Account</h3>
        </div>
        <div className="space-responsive-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Profile Information</p>
              <p className="text-responsive-sm text-gray-600">Update your personal details</p>
            </div>
            <Button variant="secondary" size="sm">Edit</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-responsive-sm text-gray-600">Update your account password</p>
            </div>
            <Button variant="secondary" size="sm">Change</Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="card-responsive">
        <div className="flex items-center space-x-3 mb-responsive-md">
          <BellIcon className="icon-responsive-sm text-gray-600" />
          <h3 className="text-responsive-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        <div className="space-responsive-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-responsive-sm text-gray-600">Receive alerts about your trips</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Updates</p>
              <p className="text-responsive-sm text-gray-600">Get updates via email</p>
            </div>
            <Button variant="secondary" size="sm">Configure</Button>
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="card-responsive">
        <div className="flex items-center space-x-3 mb-responsive-md">
          <ShieldCheckIcon className="icon-responsive-sm text-gray-600" />
          <h3 className="text-responsive-lg font-semibold text-gray-900">Privacy & Security</h3>
        </div>
        <div className="space-responsive-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Location Sharing</p>
              <p className="text-responsive-sm text-gray-600">Share location for tracking</p>
            </div>
            <button
              onClick={() => setLocation(!location)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                location ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                location ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Data Privacy</p>
              <p className="text-responsive-sm text-gray-600">Manage your data preferences</p>
            </div>
            <Button variant="secondary" size="sm">Manage</Button>
          </div>
        </div>
      </Card>

      {/* App Preferences */}
      <Card className="card-responsive">
        <div className="flex items-center space-x-3 mb-responsive-md">
          <DevicePhoneMobileIcon className="icon-responsive-sm text-gray-600" />
          <h3 className="text-responsive-lg font-semibold text-gray-900">App Preferences</h3>
        </div>
        <div className="space-responsive-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Language</p>
              <p className="text-responsive-sm text-gray-600">English</p>
            </div>
            <Button variant="secondary" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-responsive-sm text-gray-600">Switch to dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </Card>

      {/* Support */}
      <Card className="card-responsive">
        <div className="flex items-center space-x-3 mb-responsive-md">
          <GlobeAltIcon className="icon-responsive-sm text-gray-600" />
          <h3 className="text-responsive-lg font-semibold text-gray-900">Support</h3>
        </div>
        <div className="space-responsive-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Help Center</p>
              <p className="text-responsive-sm text-gray-600">Get help and support</p>
            </div>
            <Button variant="secondary" size="sm">Visit</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Contact Us</p>
              <p className="text-responsive-sm text-gray-600">Reach out to our team</p>
            </div>
            <Button variant="secondary" size="sm">Contact</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  KeyIcon
} from '@heroicons/react/24/outline'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: CogIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'api', label: 'API Settings', icon: KeyIcon },
    { id: 'payment', label: 'Payment', icon: CurrencyDollarIcon },
    { id: 'localization', label: 'Localization', icon: GlobeAltIcon }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <Card className="card-responsive">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">General Settings</h3>
            <div className="space-responsive-sm">
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">System Name</label>
                <input type="text" defaultValue="SmartBus Tracker" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <input type="email" defaultValue="admin@smartbus.lk" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Disabled</option>
                  <option>Enabled</option>
                </select>
              </div>
            </div>
          </Card>
        )
      case 'notifications':
        return (
          <Card className="card-responsive">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">Notification Settings</h3>
            <div className="space-responsive-sm">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </Card>
        )
      case 'security':
        return (
          <Card className="card-responsive">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">Security Settings</h3>
            <div className="space-responsive-sm">
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input type="number" defaultValue="30" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Login Attempt Limit</span>
                <input type="number" defaultValue="5" className="w-20 border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>
          </Card>
        )
      case 'api':
        return (
          <Card className="card-responsive">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">API Configuration</h3>
            <div className="space-responsive-sm">
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
                <input type="password" placeholder="Enter API key" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Firebase Server Key</label>
                <input type="password" placeholder="Enter server key" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Rate Limit (requests/minute)</label>
                <input type="number" defaultValue="100" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>
          </Card>
        )
      case 'payment':
        return (
          <Card className="card-responsive">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">Payment Settings</h3>
            <div className="space-responsive-sm">
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">PayHere Merchant ID</label>
                <input type="text" placeholder="Enter merchant ID" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label>
                <input type="password" placeholder="Enter publishable key" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="flex items-center justify-between">
                <span>Enable Online Payments</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </Card>
        )
      case 'localization':
        return (
          <Card className="card-responsive">
            <h3 className="text-responsive-lg font-semibold mb-responsive-md">Localization Settings</h3>
            <div className="space-responsive-sm">
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Default Language</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>English</option>
                  <option>Sinhala</option>
                  <option>Tamil</option>
                </select>
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Currency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>LKR (Sri Lankan Rupee)</option>
                  <option>USD (US Dollar)</option>
                </select>
              </div>
              <div>
                <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Asia/Colombo</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-responsive-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="icon-responsive-sm" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {renderContent()}

      <div className="flex justify-end space-x-3">
        <Button variant="secondary">Reset</Button>
        <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
      </div>
    </div>
  )
}
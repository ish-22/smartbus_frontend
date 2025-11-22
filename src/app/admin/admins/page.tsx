'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ShieldCheckIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'Super Admin',
      email: 'admin@smartbus.lk',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2024-01-15 10:30 AM',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'John Admin',
      email: 'john.admin@smartbus.lk',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-14 02:15 PM',
      createdAt: '2024-01-05'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin'
  })

  const addAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.password) {
      const admin = {
        id: Date.now(),
        ...newAdmin,
        status: 'Active',
        lastLogin: 'Never',
        createdAt: new Date().toISOString().split('T')[0]
      }
      setAdmins([...admins, admin])
      setNewAdmin({ name: '', email: '', password: '', role: 'Admin' })
      setShowAddForm(false)
    }
  }

  const deleteAdmin = (id: number) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id))
    }
  }

  return (
    <div className="space-responsive-md no-scroll-x">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-responsive-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600">Manage system administrators</p>
        </div>
        <Button 
          className="bg-red-600 hover:bg-red-700"
          onClick={() => setShowAddForm(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </div>

      <div className="grid-responsive-3 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <ShieldCheckIcon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Total Admins</p>
              <p className="text-responsive-lg font-bold text-gray-900">{admins.length}</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <ShieldCheckIcon className="icon-responsive-md text-green-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Active</p>
              <p className="text-responsive-lg font-bold text-gray-900">{admins.filter(a => a.status === 'Active').length}</p>
            </div>
          </div>
        </Card>
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ShieldCheckIcon className="icon-responsive-md text-purple-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Super Admins</p>
              <p className="text-responsive-lg font-bold text-gray-900">{admins.filter(a => a.role === 'Super Admin').length}</p>
            </div>
          </div>
        </Card>
      </div>

      {showAddForm && (
        <Card className="card-responsive">
          <h3 className="text-responsive-lg font-semibold mb-responsive-md">Add New Admin</h3>
          <div className="grid-responsive-2 gap-responsive-sm">
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={addAdmin}>
              Add Admin
            </Button>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{admin.name}</div>
                    <div className="text-responsive-sm text-gray-500">ID: {admin.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      admin.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm text-gray-900">
                    {admin.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-responsive-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {admin.role !== 'Super Admin' && (
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteAdmin(admin.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
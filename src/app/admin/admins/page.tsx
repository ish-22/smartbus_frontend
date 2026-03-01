'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon,
  ShieldCheckIcon,
  PlusIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { getAllAdmins, type Admin } from '@/services/api/userApi'

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'view' | 'edit'>('add')
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissions: [] as string[],
    status: 'active' as 'active' | 'inactive'
  })

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          setLoading(false)
          return
        }
        
        console.log('Fetching admins with token:', token.substring(0, 20) + '...')
        const data = await getAllAdmins(token)
        console.log('Admins fetched:', data)
        setAdmins(data)
      } catch (error) {
        console.error('Failed to fetch admins:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  const activeAdmins = admins.filter(a => a.status === 'active').length
  const superAdmins = admins.filter(a => {
    const perms = Array.isArray(a.permissions) ? a.permissions : []
    return perms.includes('All Access')
  }).length

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return 'Never'
    return new Date(lastLogin).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleAddAdmin = () => {
    setModalMode('add')
    setFormData({ name: '', email: '', password: '', permissions: [], status: 'active' })
    setShowModal(true)
  }

  const handleViewAdmin = (admin: Admin) => {
    setModalMode('view')
    setSelectedAdmin(admin)
    setShowModal(true)
  }

  const handleEditAdmin = (admin: Admin) => {
    setModalMode('edit')
    setSelectedAdmin(admin)
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '',
      permissions: Array.isArray(admin.permissions) ? admin.permissions : [],
      status: admin.status
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      if (modalMode === 'add') {
        const response = await fetch('http://127.0.0.1:8000/api/users/admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          const data = await getAllAdmins(token)
          setAdmins(data)
          setShowModal(false)
        }
      } else if (modalMode === 'edit' && selectedAdmin) {
        const response = await fetch(`http://127.0.0.1:8000/api/users/admins/${selectedAdmin.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          const data = await getAllAdmins(token)
          setAdmins(data)
          setShowModal(false)
        }
      }
    } catch (error) {
      console.error('Failed to save admin:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600">Manage system administrators and their permissions</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddAdmin}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{activeAdmins}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Super Admins</p>
              <p className="text-2xl font-bold text-gray-900">{superAdmins}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Administrator Accounts</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{admin.role}</div>
                      <div className="text-sm text-gray-500">
                        {Array.isArray(admin.permissions) 
                          ? admin.permissions.join(', ') 
                          : admin.permissions || 'No permissions'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatLastLogin(admin.last_login)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="secondary" size="sm" onClick={() => handleViewAdmin(admin)}>
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleEditAdmin(admin)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {modalMode === 'add' ? 'Add Admin' : modalMode === 'edit' ? 'Edit Admin' : 'View Admin'}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {modalMode === 'view' && selectedAdmin ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedAdmin.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedAdmin.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="text-gray-900">{selectedAdmin.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Permissions</label>
                  <p className="text-gray-900">
                    {Array.isArray(selectedAdmin.permissions) 
                      ? selectedAdmin.permissions.join(', ') 
                      : selectedAdmin.permissions}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {modalMode === 'add' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="space-y-2">
                    {['All Access', 'User Management', 'Reports', 'View Only', 'Customer Support'].map((perm) => (
                      <label key={perm} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(perm)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, permissions: [...formData.permissions, perm] })
                            } else {
                              setFormData({ ...formData, permissions: formData.permissions.filter(p => p !== perm) })
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button onClick={handleSubmit} className="flex-1 bg-red-600 hover:bg-red-700">
                    {modalMode === 'add' ? 'Create' : 'Update'}
                  </Button>
                  <Button onClick={() => setShowModal(false)} variant="secondary" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
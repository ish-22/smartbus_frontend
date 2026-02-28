'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_BASE_URL } from '@/config/api'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'passenger' as 'passenger' | 'driver' | 'owner',
    driver_type: '' as 'expressway' | 'normal' | '',
    // Driver-specific detailed fields
    license_number: '',
    license_expiry_date: '',
    address: '',
    nic_number: '',
    date_of_birth: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    experience_years: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!formData.name || (!formData.email && !formData.phone) || !formData.password) {
        throw new Error('Please fill in all required fields')
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Validate driver-specific fields if role is driver
      if (formData.role === 'driver') {
        if (!formData.driver_type) {
          throw new Error('Please select your driver type (Expressway/Highway or Normal Route)')
        }
        if (!formData.license_number) {
          throw new Error('License number is required for driver registration')
        }
        if (!formData.license_expiry_date) {
          throw new Error('License expiry date is required for driver registration')
        }
        if (!formData.nic_number) {
          throw new Error('NIC number is required for driver registration')
        }
        if (!formData.date_of_birth) {
          throw new Error('Date of birth is required for driver registration')
        }
        if (!formData.address) {
          throw new Error('Address is required for driver registration')
        }
        if (!formData.emergency_contact_name || !formData.emergency_contact_phone) {
          throw new Error('Emergency contact name and phone are required for driver registration')
        }
      }
      
      // Prepare request body
      const requestBody: any = {
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        password: formData.password,
        role: formData.role,
      }

      // Add driver-specific fields only if role is driver
      if (formData.role === 'driver') {
        requestBody.driver_type = formData.driver_type
        requestBody.license_number = formData.license_number
        requestBody.license_expiry_date = formData.license_expiry_date
        requestBody.address = formData.address
        requestBody.nic_number = formData.nic_number
        requestBody.date_of_birth = formData.date_of_birth
        requestBody.emergency_contact_name = formData.emergency_contact_name
        requestBody.emergency_contact_phone = formData.emergency_contact_phone
        if (formData.experience_years) {
          requestBody.experience_years = parseInt(formData.experience_years)
        }
      }
      
      // Call the backend API
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }
      
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const updated = { ...prev, [name]: value }
      // Reset driver-specific fields when role changes away from driver
      if (name === 'role' && value !== 'driver') {
        updated.driver_type = ''
        updated.license_number = ''
        updated.license_expiry_date = ''
        updated.address = ''
        updated.nic_number = ''
        updated.date_of_birth = ''
        updated.emergency_contact_name = ''
        updated.emergency_contact_phone = ''
        updated.experience_years = ''
      }
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className={`w-full ${formData.role === 'driver' ? 'max-w-2xl' : 'max-w-md'}`}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">Join SmartBus today</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">Account created successfully! Redirecting to login...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {success ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-lg font-semibold text-green-600">Registration Successful!</p>
                <p className="text-sm text-gray-600 mt-2">Redirecting you to login page...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    title="Select your role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="passenger">Passenger</option>
                    <option value="driver">Driver</option>
                    <option value="owner">Bus Owner</option>
                  </select>
                </div>

                {formData.role === 'driver' && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Driver Information</h3>
                      <p className="text-sm text-gray-600">Please provide detailed driver information</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Driver Type <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, driver_type: 'expressway' }))}
                          className={`p-4 border-2 rounded-lg transition-all text-left ${
                            formData.driver_type === 'expressway'
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.driver_type === 'expressway'
                                ? 'border-green-600 bg-green-600'
                                : 'border-gray-400'
                            }`}>
                              {formData.driver_type === 'expressway' && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Highway/Expressway Driver</div>
                              <div className="text-xs text-gray-600">For expressway/highway routes</div>
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, driver_type: 'normal' }))}
                          className={`p-4 border-2 rounded-lg transition-all text-left ${
                            formData.driver_type === 'normal'
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.driver_type === 'normal'
                                ? 'border-blue-600 bg-blue-600'
                                : 'border-gray-400'
                            }`}>
                              {formData.driver_type === 'normal' && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Normal Route Driver</div>
                              <div className="text-xs text-gray-600">For normal city routes</div>
                            </div>
                          </div>
                        </button>
                      </div>
                      {!formData.driver_type && (
                        <p className="mt-1 text-xs text-red-600">Please select your driver type</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="license_number"
                        placeholder="Enter your driving license number"
                        value={formData.license_number}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={formData.role === 'driver'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="license_expiry_date"
                        value={formData.license_expiry_date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={formData.role === 'driver'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIC Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nic_number"
                        placeholder="Enter your NIC number"
                        value={formData.nic_number}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={formData.role === 'driver'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={formData.role === 'driver'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        placeholder="Enter your full address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={formData.role === 'driver'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        name="experience_years"
                        placeholder="Years of driving experience"
                        value={formData.experience_years}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Emergency Contact</h4>
                      
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="emergency_contact_name"
                          placeholder="Enter emergency contact name"
                          value={formData.emergency_contact_name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={formData.role === 'driver'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="emergency_contact_phone"
                          placeholder="Enter emergency contact phone"
                          value={formData.emergency_contact_phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={formData.role === 'driver'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

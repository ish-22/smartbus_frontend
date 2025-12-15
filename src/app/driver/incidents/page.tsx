'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ExclamationTriangleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { useDriverStore } from '@/store/driverStore'
import { useUiStore } from '@/store/uiStore'
import { 
  getDriverIncidents, 
  createIncident, 
  type Incident, 
  type IncidentType,
  type IncidentSeverity 
} from '@/services/api/incidentApi'

export default function DriverIncidentsPage() {
  const { user, token } = useAuthStore()
  const { session } = useDriverStore()
  const { showToast } = useUiStore()
  
  const [showForm, setShowForm] = useState(false)
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [incident, setIncident] = useState({
    type: '' as IncidentType | '',
    title: '',
    description: '',
    location: '',
    severity: 'low' as IncidentSeverity,
    bus_id: session?.busId || undefined
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && token && user?.role === 'driver') {
      loadIncidents()
    }
  }, [mounted, token, user])

  // Update bus_id when session changes
  useEffect(() => {
    if (session?.busId) {
      setIncident(prev => ({ ...prev, bus_id: session.busId || undefined }))
    }
  }, [session])

  const loadIncidents = async () => {
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const response = await getDriverIncidents(token, { per_page: 50 })
      setIncidents(response.data || [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load incidents'
      showToast({ type: 'error', message })
      console.error('Error loading incidents:', error)
      setIncidents([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const submitIncident = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!token) {
      showToast({ type: 'error', message: 'You must be logged in to report an incident' })
      return
    }

    if (!incident.type || !incident.description) {
      showToast({ type: 'error', message: 'Please fill in all required fields (Type and Description)' })
      return
    }

    if (incident.description.trim().length < 10) {
      showToast({ type: 'error', message: 'Description must be at least 10 characters' })
      return
    }

    try {
      setIsSubmitting(true)
      const result = await createIncident({
        type: incident.type as IncidentType,
        title: incident.title.trim() || undefined,
        description: incident.description.trim(),
        location: incident.location.trim() || undefined,
        severity: incident.severity,
        bus_id: incident.bus_id || undefined,
      }, token)

      showToast({ type: 'success', message: result.message || 'Incident reported successfully' })
      setShowForm(false)
      setIncident({ 
        type: '' as IncidentType | '', 
        title: '',
        description: '', 
        location: '', 
        severity: 'low' as IncidentSeverity,
        bus_id: session?.busId || undefined
      })
      // Reload incidents after successful submission
      await loadIncidents()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to report incident'
      showToast({ type: 'error', message })
      console.error('Error reporting incident:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      traffic_delay: 'Traffic Delay',
      mechanical_issue: 'Mechanical Issue',
      accident: 'Accident',
      emergency: 'Emergency',
      other: 'Other'
    }
    return labels[type] || type
  }

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return colors[severity] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      reported: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  // Helper to check if form is valid
  const isFormValid = () => {
    return !!(
      incident.type && 
      incident.description && 
      incident.description.trim().length >= 10
    )
  }

  // Show loading during hydration
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  // Redirect if not authenticated as driver
  if (!user || user.role !== 'driver') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Access denied. Driver only.</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-600">Report issues and emergencies</p>
        </div>
        <Button 
          className="bg-red-600 hover:bg-red-700"
          onClick={() => setShowForm(true)}
          disabled={!token}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {showForm && (
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Report New Incident</h3>
            <button
              onClick={() => {
                setShowForm(false)
                setIncident({ 
                  type: '' as IncidentType | '', 
                  title: '',
                  description: '', 
                  location: '', 
                  severity: 'low' as IncidentSeverity,
                  bus_id: session?.busId || undefined
                })
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={submitIncident}>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Incident Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={incident.type}
                  onChange={(e) => setIncident({...incident, type: e.target.value as IncidentType})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select type</option>
                  <option value="traffic_delay">Traffic Delay</option>
                  <option value="mechanical_issue">Mechanical Issue</option>
                  <option value="accident">Accident</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={incident.title}
                  onChange={(e) => setIncident({...incident, title: e.target.value})}
                  placeholder="Brief title for the incident"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={incident.description}
                  onChange={(e) => setIncident({...incident, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={4}
                  placeholder="Provide detailed description of the incident (minimum 10 characters)"
                  required
                  minLength={10}
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={incident.location}
                  onChange={(e) => setIncident({...incident, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Severity <span className="text-red-500">*</span>
                </label>
                <select
                  value={incident.severity}
                  onChange={(e) => setIncident({...incident, severity: e.target.value as IncidentSeverity})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              {session?.busId && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Current Bus:</strong> Bus {session.busNumber} (will be linked to this incident)
                  </p>
                </div>
              )}
              <div className="flex flex-col items-end space-y-2 mt-4">
                <div className="flex justify-end space-x-3 w-full">
                  <Button 
                    type="button"
                    variant="secondary" 
                    onClick={() => {
                      setShowForm(false)
                      setIncident({ 
                        type: '' as IncidentType | '', 
                        title: '',
                        description: '', 
                        location: '', 
                        severity: 'low' as IncidentSeverity,
                        bus_id: session?.busId || undefined
                      })
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={isSubmitting || !isFormValid()}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>
                {!isFormValid() && !isSubmitting && (
                  <div className="text-xs text-red-600 text-right w-full">
                    {!incident.type && <span className="block">⚠️ Please select incident type</span>}
                    {!incident.description && <span className="block">⚠️ Please enter description</span>}
                    {incident.description && incident.description.trim().length < 10 && (
                      <span className="block">⚠️ Description must be at least 10 characters (currently {incident.description.trim().length}/10)</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading incidents...</div>
      ) : incidents.length === 0 ? (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No incidents reported yet.</p>
            <p className="text-sm mt-2">Click "Report Incident" to report an issue or emergency.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {incidents.map((item) => (
            <Card key={item.id} className="p-3 sm:p-4 lg:p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.title || getTypeLabel(item.type)}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                      {item.location && <span>📍 {item.location}</span>}
                      {item.bus && (
                        <span>🚌 Bus {item.bus.bus_number || item.bus.number || `#${item.bus.id}`}</span>
                      )}
                      <span>🕐 {new Date(item.created_at).toLocaleString()}</span>
                    </div>
                    {item.admin_response && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                        <p className="text-sm text-blue-800">{item.admin_response}</p>
                        {item.resolver && (
                          <p className="text-xs text-blue-600 mt-1">
                            - {item.resolver.name} ({new Date(item.resolved_at || '').toLocaleDateString()})
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
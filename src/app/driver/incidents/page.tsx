'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function DriverIncidentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [incident, setIncident] = useState({
    type: '',
    description: '',
    location: '',
    severity: 'Low'
  })

  const incidents = [
    {
      id: 1,
      type: 'Traffic Delay',
      description: 'Heavy traffic on Kandy Road',
      location: 'Kelaniya Junction',
      severity: 'Medium',
      time: '10:30 AM',
      status: 'Reported'
    }
  ]

  const submitIncident = () => {
    if (incident.type && incident.description) {
      setShowForm(false)
      setIncident({ type: '', description: '', location: '', severity: 'Low' })
    }
  }

  return (
    <div className="space-responsive-md no-scroll-x">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-responsive-2xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-600">Report issues and emergencies</p>
        </div>
        <Button 
          className="bg-red-600 hover:bg-red-700"
          onClick={() => setShowForm(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {showForm && (
        <Card className="card-responsive">
          <h3 className="text-responsive-lg font-semibold mb-responsive-md">Report New Incident</h3>
          <div className="space-responsive-sm">
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Incident Type</label>
              <select
                value={incident.type}
                onChange={(e) => setIncident({...incident, type: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select type</option>
                <option value="Traffic Delay">Traffic Delay</option>
                <option value="Mechanical Issue">Mechanical Issue</option>
                <option value="Accident">Accident</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={incident.description}
                onChange={(e) => setIncident({...incident, description: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={incident.location}
                onChange={(e) => setIncident({...incident, location: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-responsive-sm font-medium text-gray-700 mb-2">Severity</label>
              <select
                value={incident.severity}
                onChange={(e) => setIncident({...incident, severity: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={submitIncident}>
              Submit Report
            </Button>
          </div>
        </Card>
      )}

      <div className="space-responsive-sm">
        {incidents.map((item) => (
          <Card key={item.id} className="card-responsive">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                  <ExclamationTriangleIcon className="icon-responsive-md text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.type}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-responsive-sm text-gray-500">
                    <span>Location: {item.location}</span>
                    <span>Time: {item.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                  item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                  item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.severity}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {item.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
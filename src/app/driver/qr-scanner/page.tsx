'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { validateTicket, confirmBoarding, getRecentScans, type ScanResult, type RecentScan } from '@/services/api/qrScanApi'

export default function DriverQRScannerPage() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [recentScans, setRecentScans] = useState<RecentScan[]>([])
  const [ticketInput, setTicketInput] = useState('')
  const { token } = useAuthStore()

  useEffect(() => {
    loadRecentScans()
  }, [])

  const loadRecentScans = async () => {
    if (!token) return
    try {
      const scans = await getRecentScans(token)
      setRecentScans(scans)
    } catch (error) {
      console.error('Failed to load recent scans:', error)
    }
  }

  const handleScan = async () => {
    if (!ticketInput.trim() || !token) return
    
    setIsScanning(true)
    try {
      const result = await validateTicket(ticketInput, token)
      setScanResult(result)
      setTicketInput('')
    } catch (error: any) {
      setScanResult({
        valid: false,
        ticket_id: ticketInput,
        passenger: 'Unknown',
        seat: '-',
        route: '-',
        message: error.message
      })
    } finally {
      setIsScanning(false)
    }
  }

  const handleConfirmBoarding = async () => {
    if (!scanResult?.booking_id || !token) return
    
    try {
      await confirmBoarding(scanResult.booking_id, token)
      setScanResult(null)
      loadRecentScans()
    } catch (error) {
      console.error('Failed to confirm boarding:', error)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">QR Code Scanner</h1>
        <p className="text-gray-600">Scan passenger tickets for validation</p>
      </div>

      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          {!scanResult ? (
            <>
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <QrCodeIcon className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">Ready to Scan</h3>
              <p className="text-gray-600 mb-4">Enter ticket ID to validate</p>
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                placeholder="Enter Ticket ID"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              />
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleScan}
                disabled={isScanning || !ticketInput.trim()}
              >
                {isScanning ? 'Validating...' : 'Validate Ticket'}
              </Button>
            </>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                scanResult.valid ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {scanResult.valid ? (
                  <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-red-600" />
                )}
              </div>
              <h3 className={`text-base sm:text-lg lg:text-xl font-semibold ${
                scanResult.valid ? 'text-green-600' : 'text-red-600'
              }`}>
                {scanResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="space-y-2 text-sm sm:text-base">
                  <div><span className="font-medium">Ticket ID:</span> {scanResult.ticket_id}</div>
                  <div><span className="font-medium">Passenger:</span> {scanResult.passenger}</div>
                  <div><span className="font-medium">Seat:</span> {scanResult.seat}</div>
                  <div><span className="font-medium">Route:</span> {scanResult.route}</div>
                  {scanResult.message && (
                    <div className="text-red-600"><span className="font-medium">Error:</span> {scanResult.message}</div>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" onClick={() => setScanResult(null)}>
                  Scan Another
                </Button>
                {scanResult.valid && (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirmBoarding}>
                    Confirm Boarding
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Recent Scans</h3>
        <div className="space-y-3">
          {recentScans.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent scans</p>
          ) : (
            recentScans.map((scan, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="font-medium">{scan.id}</span>
                  <span className="text-gray-500 ml-2">{scan.passenger}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm sm:text-base text-gray-500">{scan.time}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    scan.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {scan.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function DriverQRScannerPage() {
  const [scanResult, setScanResult] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const mockScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setScanResult({
        ticketId: 'SB001',
        passenger: 'John Doe',
        seat: '15A',
        route: 'Colombo - Kandy',
        valid: true
      })
      setIsScanning(false)
    }, 2000)
  }

  const confirmTicket = () => {
    setScanResult(null)
  }

  return (
    <div className="space-responsive-md no-scroll-x">
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">QR Code Scanner</h1>
        <p className="text-gray-600">Scan passenger tickets for validation</p>
      </div>

      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          {!scanResult ? (
            <>
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-responsive-lg">
                <QrCodeIcon className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-responsive-lg font-semibold mb-2">Ready to Scan</h3>
              <p className="text-gray-600 mb-responsive-lg">Position the QR code within the camera frame</p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={mockScan}
                disabled={isScanning}
              >
                {isScanning ? 'Scanning...' : 'Start Scanning'}
              </Button>
            </>
          ) : (
            <div className="space-responsive-sm">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                scanResult.valid ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {scanResult.valid ? (
                  <CheckCircleIcon className="icon-responsive-lg text-green-600" />
                ) : (
                  <XCircleIcon className="icon-responsive-lg text-red-600" />
                )}
              </div>
              <h3 className={`text-responsive-lg font-semibold ${
                scanResult.valid ? 'text-green-600' : 'text-red-600'
              }`}>
                {scanResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="space-y-2 text-responsive-sm">
                  <div><span className="font-medium">Ticket ID:</span> {scanResult.ticketId}</div>
                  <div><span className="font-medium">Passenger:</span> {scanResult.passenger}</div>
                  <div><span className="font-medium">Seat:</span> {scanResult.seat}</div>
                  <div><span className="font-medium">Route:</span> {scanResult.route}</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" onClick={() => setScanResult(null)}>
                  Scan Another
                </Button>
                {scanResult.valid && (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={confirmTicket}>
                    Confirm Boarding
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="card-responsive">
        <h3 className="text-responsive-lg font-semibold mb-responsive-md">Recent Scans</h3>
        <div className="space-y-3">
          {[
            { id: 'SB001', passenger: 'John Doe', time: '10:30 AM', status: 'Valid' },
            { id: 'SB002', passenger: 'Sarah Wilson', time: '10:28 AM', status: 'Valid' },
            { id: 'SB003', passenger: 'Mike Johnson', time: '10:25 AM', status: 'Invalid' }
          ].map((scan, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <span className="font-medium">{scan.id}</span>
                <span className="text-gray-500 ml-2">{scan.passenger}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-responsive-sm text-gray-500">{scan.time}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  scan.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {scan.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
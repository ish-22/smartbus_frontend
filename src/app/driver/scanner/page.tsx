import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { QrCodeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function DriverScannerPage() {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">QR Scanner</h1>
        <p className="text-gray-600">Scan passenger tickets and validate bookings</p>
      </div>

      <Card className="p-8">
        <div className="text-center">
          <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <div className="text-center">
              <QrCodeIcon className="h-16 w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500">QR Code Scanner</p>
              <p className="text-sm sm:text-base text-gray-400">Camera view would appear here</p>
            </div>
          </div>
          
          <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">
            <QrCodeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Start Scanning
          </Button>
        </div>
      </Card>

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Recent Scans</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { 
              ticketId: 'TKT-001234', 
              passenger: 'John Doe', 
              status: 'Valid', 
              time: '2 minutes ago',
              seat: 'A12'
            },
            { 
              ticketId: 'TKT-001235', 
              passenger: 'Sarah Wilson', 
              status: 'Valid', 
              time: '5 minutes ago',
              seat: 'B08'
            },
            { 
              ticketId: 'TKT-001236', 
              passenger: 'Mike Johnson', 
              status: 'Invalid', 
              time: '8 minutes ago',
              seat: 'C15'
            },
          ].map((scan, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  scan.status === 'Valid' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {scan.status === 'Valid' ? (
                    <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{scan.ticketId}</h4>
                  <p className="text-sm sm:text-base text-gray-600">{scan.passenger} • Seat {scan.seat}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  scan.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {scan.status}
                </span>
                <p className="text-sm sm:text-base text-gray-500 mt-1">{scan.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

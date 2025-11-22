export default function PassengerTickets() {
  return (
    <div className="card-responsive">
      <h1 className="text-responsive-2xl font-bold mb-responsive-md">📱 My Tickets</h1>
      <div className="space-responsive-sm">
        <div className="bg-white rounded-lg shadow card-responsive">
          <div className="flex justify-between items-start mb-responsive-md">
            <div>
              <h3 className="font-semibold">Ticket #TK001</h3>
              <p className="text-responsive-sm text-gray-600">Colombo → Kandy</p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Confirmed</span>
          </div>
          <div className="grid grid-cols-2 gap-responsive-sm text-responsive-sm">
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-medium">2024-01-20</p>
            </div>
            <div>
              <p className="text-gray-600">Time</p>
              <p className="font-medium">08:30 AM</p>
            </div>
            <div>
              <p className="text-gray-600">Bus</p>
              <p className="font-medium">NB-1234</p>
            </div>
            <div>
              <p className="text-gray-600">Seat</p>
              <p className="font-medium">A12</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded text-center">
            <div className="text-responsive-2xl mb-2">📱</div>
            <p className="text-xs text-gray-600">QR Code for validation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

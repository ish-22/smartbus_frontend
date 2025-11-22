export default function PassengerTickets() {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">📱 My Tickets</h1>
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div>
              <h3 className="font-semibold">Ticket #TK001</h3>
              <p className="text-sm sm:text-base text-gray-600">Colombo → Kandy</p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Confirmed</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
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
            <div className="text-xl sm:text-2xl lg:text-3xl mb-2">📱</div>
            <p className="text-xs text-gray-600">QR Code for validation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

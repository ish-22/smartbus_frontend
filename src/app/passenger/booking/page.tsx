export default function PassengerBooking() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎫 Book Seats</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <select className="w-full p-2 border rounded">
              <option>Colombo</option>
              <option>Kandy</option>
              <option>Galle</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <select className="w-full p-2 border rounded">
              <option>Kandy</option>
              <option>Galle</option>
              <option>Colombo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Passengers</label>
            <input type="number" min="1" max="4" defaultValue="1" className="w-full p-2 border rounded" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Search Buses
          </button>
        </form>
      </div>
    </div>
  )
}

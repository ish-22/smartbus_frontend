import React from 'react';

interface SeatMapProps {
  capacity: number;
  bookedSeats: string[];
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
}

export default function SeatMap({ capacity, bookedSeats, selectedSeat, onSeatSelect }: SeatMapProps) {
  const rows = Math.ceil(capacity / 4);
  const seats: string[] = [];
  
  // Generate seat layout (A, B, C, D columns)
  for (let row = 1; row <= rows; row++) {
    ['A', 'B', 'C', 'D'].forEach(col => {
      const seatNumber = `${col}${row}`;
      if (seats.length < capacity) {
        seats.push(seatNumber);
      }
    });
  }

  const getSeatStatus = (seat: string) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeat === seat) return 'selected';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-red-600 text-white cursor-not-allowed border-red-700';
      case 'selected': return 'bg-green-500 text-white border-green-600';
      case 'available': return 'bg-blue-100 hover:bg-blue-200 cursor-pointer border-blue-300';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 border rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 border rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 border-2 border-red-700 rounded"></div>
            <span className="font-medium">Booked</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-center mb-4 pb-2 border-b-2 border-gray-400">
          <span className="text-sm font-semibold">🚗 Driver</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          {seats.map((seat, index) => {
            const status = getSeatStatus(seat);
            const isAisle = index % 4 === 1;
            
            return (
              <React.Fragment key={seat}>
                <button
                  onClick={() => status === 'available' && onSeatSelect(seat)}
                  disabled={status === 'booked'}
                  className={`
                    w-12 h-12 rounded-md border-2 font-bold text-xs transition-all
                    ${getSeatColor(status)}
                    ${isAisle ? 'mr-4' : ''}
                    ${status === 'booked' ? 'opacity-90' : ''}
                  `}
                >
                  {seat}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

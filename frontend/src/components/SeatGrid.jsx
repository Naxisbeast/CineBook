// frontend/src/components/SeatGrid.jsx
// Renders a grid of cinema seats.
// Green  = available (clickable to select/deselect)
// Red    = booked (not clickable)
// Blue   = currently selected by the user
// Shows a summary line with the count of selected seats.

import React from 'react';

export default function SeatGrid({ seats, selected, onToggle }) {
  // Group seats by row label for display
  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.seat_row]) acc[seat.seat_row] = [];
    acc[seat.seat_row].push(seat);
    return acc;
  }, {});

  return (
    <div>
      {/* Screen indicator */}
      <div className="w-3/4 mx-auto h-3 bg-indigo-500 rounded-b-3xl mb-8 text-center text-xs text-white pt-0.5">
        SCREEN
      </div>

      {/* Seat rows */}
      <div className="space-y-2">
        {Object.entries(rows).map(([rowLabel, rowSeats]) => (
          <div key={rowLabel} className="flex items-center gap-2">
            <span className="w-5 text-sm text-gray-400 font-medium">{rowLabel}</span>
            <div className="flex gap-2 flex-wrap">
              {rowSeats.map((seat) => {
                const isBooked   = seat.status === 'booked';
                const isSelected = selected.includes(seat.seat_id);

                return (
                  <button
                    key={seat.seat_id}
                    onClick={() => !isBooked && onToggle(seat.seat_id)}
                    disabled={isBooked}
                    title={`${seat.seat_row}${seat.seat_number} (${seat.seat_type})`}
                    className={`w-8 h-8 rounded text-xs font-semibold transition
                      ${isBooked   ? 'bg-red-700 text-red-300 cursor-not-allowed opacity-60' :
                        isSelected ? 'bg-blue-500 text-white scale-110'                       :
                                     'bg-green-600 hover:bg-green-500 text-white'}`}
                  >
                    {seat.seat_number}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend & count */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
        <span><span className="inline-block w-4 h-4 bg-green-600 rounded mr-1 align-middle" />Available</span>
        <span><span className="inline-block w-4 h-4 bg-red-700 rounded mr-1 align-middle opacity-60" />Booked</span>
        <span><span className="inline-block w-4 h-4 bg-blue-500 rounded mr-1 align-middle" />Selected ({selected.length})</span>
      </div>
    </div>
  );
}

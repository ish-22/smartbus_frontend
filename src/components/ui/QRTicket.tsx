'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'

interface TicketData {
  id: string
  route: string
  from: string
  to: string
  seat: string
  date: string
  time: string
  price: number
  qrCode: string
  status: 'active' | 'used' | 'expired'
}

interface QRTicketProps {
  ticketData: TicketData
  className?: string
}

export const QRTicket: React.FC<QRTicketProps> = ({ ticketData, className }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'used': return 'text-gray-600 bg-gray-50'
      case 'expired': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <Card className={`max-w-sm mx-auto ${className}`} hover={false}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Bus Ticket</CardTitle>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(ticketData.status)}`}>
            {ticketData.status}
          </span>
        </div>
        <p className="text-sm text-gray-500">#{ticketData.id}</p>
      </CardHeader>

      <CardContent>
        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-center">
          <div className="w-44 h-44 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">QR Code</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Route</span>
            <span className="font-semibold">{ticketData.route}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">From → To</span>
            <span className="font-semibold">{ticketData.from} → {ticketData.to}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Seat</span>
            <span className="font-semibold">{ticketData.seat}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Date & Time</span>
            <span className="font-semibold">{ticketData.date} at {ticketData.time}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-500 text-sm">Price</span>
            <span className="font-bold text-blue-600">${ticketData.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            Show this QR code to the driver when boarding
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

interface TicketListProps {
  tickets: TicketData[]
  className?: string
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, className }) => {
  if (tickets.length === 0) {
    return (
      <Card className={className}>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎫</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No tickets yet</h3>
            <p className="text-gray-500">Your booked tickets will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{ticket.route}</h4>
              <p className="text-sm text-gray-500">{ticket.from} → {ticket.to}</p>
              <p className="text-xs text-gray-400">{ticket.date} at {ticket.time}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
              <p className="text-sm font-bold text-blue-600 mt-1">${ticket.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50'
    case 'used': return 'text-gray-600 bg-gray-50'
    case 'expired': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PassengerPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/passenger/dashboard')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  )
}

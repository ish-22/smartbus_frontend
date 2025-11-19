'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'passenger' | 'driver' | 'admin' | 'owner'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Determine role based on email
    let role: 'passenger' | 'driver' | 'admin' | 'owner' = 'passenger'
    let name = 'User'
    
    if (email === 'admin@gmail.com' && password === 'admin123') {
      role = 'admin'
      name = 'Admin User'
    } else if (email === 'driver@gmail.com') {
      role = 'driver'
      name = 'Driver User'
    } else if (email === 'owner@gmail.com') {
      role = 'owner'
      name = 'Owner User'
    } else {
      name = 'Passenger User'
    }
    
    // Set cookie for middleware
    document.cookie = `userRole=${role}; path=/; max-age=86400`
    
    setUser({
      id: '1',
      name,
      email,
      role
    })
    setIsLoading(false)
  }

  const logout = () => {
    // Clear cookie
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

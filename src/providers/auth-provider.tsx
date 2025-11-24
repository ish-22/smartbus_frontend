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
  login: (emailOrPhone: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (emailOrPhone: string, password: string) => {
    setIsLoading(true)
    
    try {
      // Determine if input is email or phone
      const isEmail = emailOrPhone.includes('@')
      const loginData = isEmail 
        ? { email: emailOrPhone, password: password }
        : { phone: emailOrPhone, password: password }
      
      // Call the backend API
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }
      
      // Store token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Set cookie for middleware
      document.cookie = `userRole=${data.user.role}; path=/; max-age=86400`
      
      setUser({
        id: data.user.id.toString(),
        name: data.user.name,
        email: data.user.email,
        role: data.user.role
      })
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear localStorage and cookie
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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

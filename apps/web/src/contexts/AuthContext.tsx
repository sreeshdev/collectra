import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import api from '../utils/api'

interface User {
  id: string
  role: 'ADMIN' | 'EMPLOYEE'
  name: string
  mobile: string
  email: string
  address?: string
  displayPictureUrl?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (mobile: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      refreshUser()
    } else {
      setLoading(false)
    }
  }, [])

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (mobile: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { mobile, password })
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      navigate('/')
      message.success('Login successful')
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Login failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
    message.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
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


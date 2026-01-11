import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Packages from './pages/Packages'
import Customers from './pages/Customers'
import CustomerDetails from './pages/CustomerDetails'
import InitiatePayment from './pages/InitiatePayment'
import ManualPayment from './pages/ManualPayment'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  if (user?.role !== 'ADMIN') {
    return <div>Not Authorized - Admin Only</div>
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="employees"
          element={
            <AdminRoute>
              <Employees />
            </AdminRoute>
          }
        />
        <Route path="packages" element={<Packages />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route
          path="initiate-payment"
          element={
            <AdminRoute>
              <InitiatePayment />
            </AdminRoute>
          }
        />
        <Route path="manual-payment" element={<ManualPayment />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


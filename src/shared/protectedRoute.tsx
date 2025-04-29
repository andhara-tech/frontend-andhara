import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../app/stores/authStore.ts'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/auth/auth-context'

const PrivateRoute = () => {
  const { state, dispatch } = useAuthContext()

  return state.user ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute

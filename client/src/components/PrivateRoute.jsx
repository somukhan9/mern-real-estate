import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/auth/auth-context'
import { useEffect } from 'react'
import { FETCH_USER_DETAILS } from '../reducer/actions/action-types'

const fetchUserDetails = async () => {
  const res = await fetch(`/api/v1/auth/get-user-details`, {
    method: 'GET',
    credentials: 'include',
  })

  const data = await res.json()

  return data.user
}

const PrivateRoute = () => {
  const { state, dispatch } = useAuthContext()

  useEffect(() => {
    fetchUserDetails()
      .then((user) => {
        dispatch({ type: FETCH_USER_DETAILS, payload: user })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  console.log(state.user)

  return state.user ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute

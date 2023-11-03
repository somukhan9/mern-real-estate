import { useEffect, useReducer, useState } from 'react'
import { authReducer } from '../../reducer/auth/auth-reducer'
import { AuthContext } from './auth-context'
import { FETCH_USER_DETAILS } from '../../reducer/actions/action-types'

const authState = {
  user: null,
  error: '',
  loading: false,
}

const fetchUserDetails = async () => {
  const res = await fetch(`/api/v1/auth/get-user-details`, {
    method: 'GET',
    credentials: 'include',
  })

  const data = await res.json()

  return data.user
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authState)

  useEffect(() => {
    fetchUserDetails()
      .then((user) => {
        dispatch({ type: FETCH_USER_DETAILS, payload: user })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

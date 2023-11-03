import { useEffect, useReducer, useState } from 'react'
import { authReducer } from '../../reducer/auth/auth-reducer'
import { AuthContext } from './auth-context'
import {
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
} from './../../reducer/actions/action-types'

const authState = {
  user: JSON.parse(localStorage.getItem('user')),
  error: '',
  loading: false,
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authState)

  useEffect(() => {
    // const currentUser = JSON.parse(localStorage.getItem('user'))

    const fetchUserDetails = async () => {
      const res = await fetch('/api/v1/auth/get-user-details', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const data = await res.json()

      if (data.success) {
        dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: data.user })
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log('success', typeof state.user, state.user)
      } else {
        dispatch({ type: FETCH_USER_DETAILS_FAILURE, payload: data.user })
        localStorage.setItem('user', JSON.stringify(null))
        console.log('failure', typeof state.user, state.user)
      }
    }

    const interval = setInterval(
      () => {
        fetchUserDetails()
      },
      1 * 60 * 60 * 1000
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

/**
 * 
      // if (currentUser) {
      //   dispatch({
      //     type: FETCH_USER_DETAILS_SUCCESS,
      //     payload: currentUser,
      //   })
      //   // localStorage.setItem('user', JSON.stringify(data.user))
      // } else {
      //   dispatch({ type: FETCH_USER_DETAILS_FAILURE, payload: null })
      //   localStorage.setItem('user', JSON.stringify(null))
      //   navigate('/login')
      // }
 */

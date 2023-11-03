import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth/auth-context'
import {
  SIGN_UP_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from '../reducer/actions/action-types'

const SignUp = () => {
  const navigate = useNavigate()
  const {
    state: { loading, error },
    dispatch,
  } = useAuthContext()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: SIGN_UP_START })

    if (formData.password !== formData.confirmPassword) {
      dispatch({ type: SIGN_UP_FAILURE, payload: 'Password did not matched!' })
      return
    }

    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success === false) {
        dispatch({ type: SIGN_UP_FAILURE, payload: data.message })
        return
      }

      dispatch({ type: SIGN_UP_SUCCESS, payload: data.user })
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      navigate('/')
    } catch (error) {
      dispatch({ type: SIGN_UP_FAILURE, payload: error.message })

      console.log(error.message)
    }
  }

  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'loading...' : 'sign up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </section>
  )
}
export default SignUp

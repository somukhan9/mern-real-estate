import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log(formData)

    try {
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return
      }

      // console.log(data)

      setLoading(false)
      setError('')
      setFormData({
        emailOrUsername: '',
        password: '',
      })
      navigate('/')
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In Here</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="emailOrUsername"
          id="emailOrUsername"
          placeholder="Email or Username"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.emailOrUsername}
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
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 hover:opacity-95 rounded-lg uppercase disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'sign in'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </section>
  )
}
export default SignIn

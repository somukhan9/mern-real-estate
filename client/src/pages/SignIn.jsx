import { useState } from 'react'

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <section>
      <h1>Sign In Here</h1>
      <form className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
export default SignIn

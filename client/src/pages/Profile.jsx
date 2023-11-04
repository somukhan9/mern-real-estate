import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../context/auth/auth-context'

const Profile = () => {
  const imgRef = useRef(null)
  const [imageFile, setImageFile] = useState()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
  })

  const {
    state: { user },
    dispatch,
  } = useAuthContext()

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    setFormData(user)
    console.log(user)
  }, [])

  console.log(user)
  return (
    <section className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setImageFile(e.target.files[0])}
          ref={imgRef}
          type="file"
          accept="image/*"
          hidden
        />
        <img
          src={formData.avatar || user.avatar}
          alt="Profile Picture"
          onClick={() => imgRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          id="name"
          // defaultValue={user.name}
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          id="username"
          // defaultValue={user.username}
          value={formData.username}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          id="email"
          // defaultValue={user.email}
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <p className="text-red-700 hover:cursor-pointer hover:opacity-90">
          Delete account
        </p>
        <p className="text-red-700 hover:cursor-pointer hover:opacity-90">
          Sign out
        </p>
      </div>
    </section>
  )
}
export default Profile

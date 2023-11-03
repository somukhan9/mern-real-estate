import { useEffect } from 'react'
import { useAuthContext } from '../context/auth/auth-context'
import { FETCH_USER_DETAILS } from '../reducer/actions/action-types'

const Profile = () => {
  const { state, dispatch } = useAuthContext()

  return (
    <section className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="name"
          // defaultValue={state.user.name}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          id="username"
          // defaultValue={state.user.name}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          id="email"
          // defaultValue={state.user.name}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          id="password"
          // defaultValue={state.user.name}
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

import app from '../firebase'

const OAuth = ({ btnText }) => {
  const handleClick = () => {
    console.log('btn clicked!')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-3 rounded-lg bg-red-500 text-white uppercase hover:opacity-95 disabled:opacity-80"
    >
      {btnText}
    </button>
  )
}
export default OAuth

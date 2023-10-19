import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index={true} element={<Home />} />
        <Route path="/about" index={true} element={<About />} />
        <Route path="/sign-in" index={true} element={<SignIn />} />
        <Route path="/sign-up" index={true} element={<SignUp />} />
        <Route path="/profile" index={true} element={<Profile />} />
      </Routes>
    </>
  )
}
export default App

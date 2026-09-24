import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Host from './Pages/Actions/Host'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import Visitor from './Pages/Actions/Visitor'


export default function App() {

  const {user} = useContext(AppContext)
  return (
  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
<Route index element={<Home />} />
<Route path='/login' element={user?<Home/>:<Login />} />
<Route path='/register' element={user?<Home/>:<Register />} />
<Route path='/visitors' element={user?<Visitor/>: <Login/>}></Route>
<Route path='/hosts' element={user?<Host/>: <Login/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
  )
}



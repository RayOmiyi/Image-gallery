import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup'
import { AuthProvider } from './context/auth.jsx'
import PublicRoutes from './routes/PublicRoutes.jsx'
import PrivateRoutes from './routes/PrivateRoutes.jsx'
const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path='/' element={<PrivateRoutes><Home/></PrivateRoutes>}/>
      <Route path='/signup' element={<PublicRoutes>
        <Signup/>
      </PublicRoutes>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
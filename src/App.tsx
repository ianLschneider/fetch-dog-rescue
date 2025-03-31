import { Route, Routes } from 'react-router'

import PrivateRoute from "./components/app/PrivateRoute";

import LoginPage from './pages/LoginPage'

import HomePage from './pages/HomePage'
import Dog from './pages/DogPage'

import Error404 from './pages/Error404Page'


import './App.css'

function App() {

  
  return (
        <Routes>

          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/your-match/:id" element={<Dog />} />
          </Route>
          
          <Route path="*" element={<Error404 />} />

        </Routes>
  )
}

export default App

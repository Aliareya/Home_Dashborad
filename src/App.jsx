import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css'; 
import '@fontsource/roboto/700.css'; 
import { BrowserRouter ,Route , Routes } from 'react-router-dom'
import Home from './dashboard/Home'
import Login from './auth/Login'
import Signup from './auth/Signup';
import { set } from 'react-hook-form';
function App() {
  const [userStatus  , setUserStatus] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home login={userStatus}/>}></Route>
        <Route path='/login' element={<Login setUserStatus={setUserStatus} />}></Route>
        <Route path='/singup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
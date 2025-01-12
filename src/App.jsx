import React from 'react';
import SignUp from './auth/SignUp';
import { BrowserRouter , Route , Routes } from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css'; 
import '@fontsource/roboto/700.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './dashboard/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Profile from './dashboard/content/Profile';

function App() {
  const [userStatus, setUserStatus] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home login={userStatus} />}>
          {/* Nested routes */}
          <Route index element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login setUserStatus={setUserStatus} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

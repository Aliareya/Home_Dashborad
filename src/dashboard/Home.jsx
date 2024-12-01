import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ login }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  if (!login) {
    return null;
  }

  return (
    <div className='w-full h-screen bg-slate-500 flex justify-center items-center'>
      <h1 className='text-6xl text-white'>Home</h1>
    </div>
  );
}

export default Home;

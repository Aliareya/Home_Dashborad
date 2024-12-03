import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
const [data , setdata] = useState( "");
const [data1 ,setdata1] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost/api.php')
      .then((res) => {
        setdata(res.data[0].create_at);
        setdata1(res.data[0].username)
        console.log('Response:', res.data[0]);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }, []);

  return (
    <div className='w-full h-screen bg-slate-500 flex justify-center items-center'>
      <h1 className='text-6xl text-white'>{data} , {data1}</h1>
    </div>
  );
}

export default Home;

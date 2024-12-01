import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useState } from 'react';


function Login({ setUserStatus }) {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const [isloading ,setisloding] = useState(false);

  const loginData = (data) => {
    console.log(data)
    setUserStatus(true);
    setisloding(true)
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }


  const GotoSignup = () => {
    navigate('/singup');
  }


  return (
    <div className='w-[27%] h-[450px] bg-white mx-auto my-32 shadow-xl rounded-lg flex flex-col items-center'>
      <div className='w-full h-20 bg-btn-gradient rounded-t-lg flex justify-center items-center'>
        <h1 className='text-4xl text-white font-bold font-sans '>Login</h1>
      </div>
      <p className='text-base text-center font-medium pt-3 text-[#2e5c5b]'>Login to Continue</p>

      <form onSubmit={handleSubmit(loginData)} className='w-full flex flex-col items-center'>
        <div className='flex w-[90%] flex-col pt-7'>
          <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Username/Email</label>
          <input {...register('username')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
        </div>
        <div className='flex w-[90%] flex-col pt-6'>
          <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Password</label>
          <input {...register('password')} type="text" className='h-9 bg-[#e7edf1b8] text-[#2e5c5b] rounded-md font-semibold text-base pl-1 outline-none' />
        </div>
        <div className='flex w-[90%] flex-col pt-9'>
          <button className='text-lg font-semibold bg-btn-gradient text-white p-1.5 rounded-lg'>Login</button>
        </div>
        <p className='pt-4 font-medium'> I don`t have an account?
          <b onClick={GotoSignup} className='cursor-pointer hover:text-[#2d7d91]'>signup</b>
        </p>
        {isloading &&
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" style={{ color: '#2e5c5b' }} />
        }
      </form>
    </div>
  )
}

export default Login;
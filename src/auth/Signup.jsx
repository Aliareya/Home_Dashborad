import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';

function Signup() {
    const navigate = useNavigate();
    const {register , handleSubmit} = useForm();
    const [isloading ,setisloding] = useState(false);

    const singupData =(data)=>{
      console.log(data)
      setisloding(true); 
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

    const GotoLogin = () => {
        navigate('/login')
    }

    return (
        <div className='w-[31%] h-[560px] bg-white mx-auto my-20 shadow-xl rounded-lg flex flex-col items-center'>
            <div className='w-full h-20 bg-btn-gradient rounded-t-lg flex justify-center items-center'>
                <h1 className='text-4xl text-white font-bold font-sans ' >Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit(singupData)} className='w-full flex flex-col items-center'>
                <div className='flex w-[90%] pt-5 gap-14'>
                    <div className='w-[40%] pr-0.5'>
                        <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Name</label>
                        <input {...register('name')} type="text" className='w-52 h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                    </div>
                    <div className='w-[40%]' >
                        <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Last Name</label>
                        <input {...register('lastName')} type="text" className='w-52 h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                    </div>
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Username</label>
                    <input {...register('username')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Email</label>
                    <input {...register('email')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Password</label>
                    <input {...register('password')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-8'>
                    <button className='text-lg font-semibold bg-btn-gradient text-white p-1.5 rounded-lg'>SignUp</button>
                </div>
                <p className='pt-4 font-medium '> Already have an account?
                    <b onClick={GotoLogin} className='cursor-pointer hover:text-[#2d7d91]'> Login</b>
                </p>
                {isloading &&
                    <Icon icon="eos-icons:bubble-loading" width="24" height="24"  style={{color: '#2e5c5b'}} />
                }
            </form>
        </div>
    )
}

export default Signup
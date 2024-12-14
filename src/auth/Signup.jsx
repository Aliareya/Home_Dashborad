import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastNotification from '../Common/ToastNotification';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const signupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        username: Yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });
    const { register, handleSubmit } = useForm({resolver: yupResolver(signupSchema)});

    const signupData = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost/Barq_Backend/adduser.php', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const responseData = response.data;
                if (typeof responseData === "string" && responseData.startsWith("ok")) {
                    const parsedData = JSON.parse(responseData.replace(/^ok/, ''));
                    if (parsedData.status === "success") {
                        toast.success("You Signup successfully!");
                        setTimeout(() => {
                            sessionStorage.removeItem('user');
                            navigate('/login');
                        }, 3000)
                    } else {
                        toast.error("Network Error Please try again");
                    }
                }
            } else {
                toast.error(`Error during signup Please try agian`);
            }
        } catch (error) {
            toast.error("Failed to connect to the server. Please try again.");
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
    };

    const GotoLogin = () => {
        navigate('/login');
    };

    return (
        <div className='w-[31%] h-[560px] bg-white mx-auto my-20 shadow-xl rounded-lg flex flex-col items-center'>
            <ToastNotification />
            <div className='w-full h-20 bg-btn-gradient rounded-t-lg flex justify-center items-center'>
                <h1 className='text-4xl text-white font-bold font-sans'>Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit(signupData)} className='w-full flex flex-col items-center'>
                <div className='flex w-[90%] pt-5 gap-14'>
                    <div className='w-[40%] pr-0.5'>
                        <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="name">Name</label>
                        <input placeholder='Name...' {...register('name')} type="text" className='w-52 h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none ' />
                    </div>
                    <div className='w-[40%]'>
                        <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="lastName">Last Name</label>
                        <input placeholder='Last name...' {...register('lastName')} type="text" className='w-52 h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                    </div>
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Username</label>
                    <input placeholder='Username...' {...register('username')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="email">Email</label>
                    <input placeholder='Email...' {...register('email')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="password">Password</label>
                    <input placeholder='Password...' {...register('password')} type="password" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-8'>
                    <button type="submit" className='text-lg font-semibold bg-btn-gradient text-white p-1.5 rounded-lg'>
                        {isLoading ? 'loding...' : 'Sign Up'}
                    </button>
                </div>
                <p className='pt-4 font-medium '> Already have an account?
                    <b onClick={GotoLogin} className='cursor-pointer hover:text-[#2d7d91]'> Login</b>
                </p>
                {isLoading &&
                    <Icon icon="eos-icons:bubble-loading" width="24" height="24" style={{ color: '#2e5c5b' }} />
                }
            </form>
        </div>
    );
}

export default Signup;

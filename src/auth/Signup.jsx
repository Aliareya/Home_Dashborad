import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Icon } from '@iconify/react';

function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const signupData = async (data) => {
        console.log("Form data:", data);  // Log the data being sent to the backend

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost/insert.php',{
                method :'POST',
                body:data
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from backend:", response); // Log the response from the backend

            // Check if the response data is correct
            if (response.data.message === 'Data inserted successfully') {
                // Redirect to login page after successful signup
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                console.error('Error:', response.data.message);
                alert('Error: ' + response.data.message);  // Show any errors from the server
            }
        } catch (error) {
            console.error('Error occurred during signup:', error); // Log any errors
            alert('An error occurred: ' + error.message);  // Display the error message
        } finally {
            setIsLoading(false);
        }
    };

    const GotoLogin = () => {
        navigate('/login');
    };

    return (
        <div className='w-[31%] h-[560px] bg-white mx-auto my-20 shadow-xl rounded-lg flex flex-col items-center'>
            <div className='w-full h-20 bg-btn-gradient rounded-t-lg flex justify-center items-center'>
                <h1 className='text-4xl text-white font-bold font-sans'>Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit(signupData)} className='w-full flex flex-col items-center'>
                <div className='flex w-[90%] pt-5 gap-14'>
                    <div className='w-[40%] pr-0.5'>
                        <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Name</label>
                        <input placeholder='Name...' {...register('name')} type="text" className='w-52 h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                    </div>
                    <div className='w-[40%]'>
                        <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Last Name</label>
                        <input placeholder='last name...' {...register('lastName')} type="text" className='w-52 h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                    </div>
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Username</label>
                    <input placeholder='username...' {...register('username')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="username">Email</label>
                    <input placeholder='Email...' {...register('email')} type="text" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-4'>
                    <label className='text-lg font-semibold pb-1 text-[#2e5c5b]' htmlFor="password">Password</label>
                    <input placeholder='password...' {...register('password')} type="password" className='h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none' />
                </div>
                <div className='flex w-[90%] flex-col pt-8'>
                    <button className='text-lg font-semibold bg-btn-gradient text-white p-1.5 rounded-lg'>SignUp</button>
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

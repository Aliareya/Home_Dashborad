import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';

function Login({ setUserStatus }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');

  const loginData = (data) => {
    console.log(data);
    setUserStatus(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="w-[27%] h-[450px] bg-white mx-auto my-32 shadow-xl rounded-lg flex flex-col items-center">
      <div className="w-full h-20 bg-btn-gradient rounded-t-lg flex justify-center items-center">
        <h1 className="text-4xl text-white font-bold font-sans">Login</h1>
      </div>
      <p className="pt-4 font-medium">
        I don&apos;t have an account?{' '}
        <b onClick={goToSignup} className="cursor-pointer hover:text-[#2d7d91]">
          Signup
        </b>
      </p>
      <form onSubmit={handleSubmit(loginData)} className="w-full flex flex-col items-center">
        <div className="flex w-[90%] flex-col pt-7">
          <label className="text-lg font-semibold pb-1 text-[#2e5c5b]" htmlFor="username">
            Username/Email
          </label>
          <input
            {...register('username')}
            type="text"
            className="h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex w-[90%] flex-col pt-6">
          <label className="text-lg font-semibold pb-1 text-[#2e5c5b]" htmlFor="password">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            className="h-9 bg-[#e7edf1b8] text-[#2e5c5b] rounded-md font-semibold text-base pl-1 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex w-[90%] flex-col pt-9">
          <button
            type="submit"
            className="text-lg font-semibold bg-btn-gradient text-white p-1.5 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
        <p className="pt-4 font-normal">
          <b onClick={goToSignup} className="cursor-pointer hover:text-[#2d7d91]">
            Forget Password?
          </b>
        </p>
        {isLoading && (
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" style={{ color: '#2e5c5b' }} />
        )}
      </form>
    </div>
  );
}

export default Login;

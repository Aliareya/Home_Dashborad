import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import ToastNotification from '../Common/ToastNotification';

function Login({ setUserStatus }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost/api.php');
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, []);

  const loginData = (data) => {
    const matchedUser = user.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!matchedUser) {
      toast.error('Invalid username or password');
      return;
    }

    // Store user data in sessionStorage
    sessionStorage.setItem('user', JSON.stringify(matchedUser));

    toast.success('Login successful!');
    setUserStatus(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const goToSignup = () => navigate('/signup');

  return (
    <div className="w-[27%] h-[450px] bg-white mx-auto my-32 shadow-xl rounded-lg flex flex-col items-center">
      <div className="w-full h-20 bg-btn-gradient rounded-t-lg flex justify-center items-center">
        <h1 className="text-4xl text-white font-bold font-sans">Login</h1>
        <ToastNotification/>
      </div>
      <p className="pt-4 font-medium">
        Don’t have an account?{' '}
        <b onClick={goToSignup} className="cursor-pointer hover:text-[#2d7d91]">
          Sign up
        </b>
      </p>
      <form onSubmit={handleSubmit(loginData)} className="w-full flex flex-col items-center">
        <div className="flex w-[90%] flex-col pt-7">
          <label className="text-lg font-semibold pb-1 text-[#2e5c5b]" htmlFor="username">
            Username / Email
          </label>
          <input
            {...register('username', { required: "Username is required" })}
            type="text"
            className="h-9 text-[#2e5c5b] bg-[#e7edf1b8] rounded-md font-semibold text-base pl-1 outline-none"
          />
          {errors.username && <p className="text-red-500 pt-2">{errors.username.message}</p>}
        </div>
        <div className="flex w-[90%] flex-col pt-6">
          <label className="text-lg font-semibold pb-1 text-[#2e5c5b]" htmlFor="password">
            Password
          </label>
          <input
            {...register('password', { required: "Password is required" })}
            type="password"
            className="h-9 bg-[#e7edf1b8] text-[#2e5c5b] rounded-md font-semibold text-base pl-1 outline-none"
          />
          {errors.password && <p className="text-red-500 pt-2">{errors.password.message}</p>}
        </div>
        {error && <p className="text-red-500 pt-2">{error}</p>}
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
            Forgot password?
          </b>
        </p>
      </form>
    </div>
  );
}

export default Login;

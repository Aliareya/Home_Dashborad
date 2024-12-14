import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import Topbar from '../components/Topbar';
import Profile from './content/Profile';

function Home() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    const loginuser = sessionStorage.getItem('user');
    if (!loginuser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(loginuser);
    const userId = parsedUser?.id;

    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost/Barq_Backend/Userdata.php',
          { id: userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = response.data;
        if (responseData && typeof responseData === 'string' && responseData.startsWith('ok')) {
          const jsonString = responseData.slice(2);
          const parsedData = JSON.parse(jsonString);
          setUserData(parsedData);
        } else {
          console.error("Invalid API response:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchData();
    } else {
      toast.error("Invalid user data. Please log in again.");
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Topbar />
      <Profile />
    </div>
  );
}

export default Home;

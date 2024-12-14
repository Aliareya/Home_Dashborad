import { createContext, useState, useContext, useEffect } from "react";
import React from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Parse user data from sessionStorage
  const storedUser = sessionStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  // Set initial user ID
  const [userid, setUserid] = useState(parsedUser?.id || null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userid) {
      // Fetch user data from backend
      axios
        .post(
          "http://localhost/Barq_Backend/Userdata.php",
          { id: userid }, // Send user ID as request body
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch user data");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userid]);

  return (
    <UserContext.Provider
      value={{ userData, userid, setUserid, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

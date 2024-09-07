import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  

  // Check if a user is already logged in from localStorage or API
  useEffect(() => { 
    const loggedInUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (loggedInUser) {
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);

      setUser(JSON.parse(loggedInUser)); 
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


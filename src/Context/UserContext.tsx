"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
  email?: string;
}

interface UserContextType {
  user: CustomJwtPayload | null;
  setUser: React.Dispatch<React.SetStateAction<CustomJwtPayload | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);

  useEffect(() => {
    const checkAndSetUser = () => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const decodedUser = jwtDecode<CustomJwtPayload>(accessToken);
        setUser(decodedUser);
      } else {
        setUser(null);
      }
    };

    checkAndSetUser(); // Check immediately on mount

    // Set up an interval to check periodically
    const intervalId = setInterval(checkAndSetUser, 200);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

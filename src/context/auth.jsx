import { createContext, useEffect, useState } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase/config'
// create context
export const AuthContext = createContext({
    user:null,
    isLoading: false,
});

// create provider
// AuthProvider.js
// ... (other imports)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize as true
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setIsLoading(false); // Set isLoading to false when user is authenticated
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    isLoading,
    error, // Pass the error state to handle authentication errors
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('pokemonUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simple login for demo (no backend yet)
    try {
      // For demo, accept any email/password
      const userData = {
        id: 1,
        email: email,
        username: email.split('@')[0],
        wins: 0,
        losses: 0
      };
      setUser(userData);
      localStorage.setItem('pokemonUser', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (username, email, password) => {
    // Simple register for demo
    try {
      const userData = {
        id: Date.now(),
        email: email,
        username: username,
        wins: 0,
        losses: 0
      };
      setUser(userData);
      localStorage.setItem('pokemonUser', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pokemonUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

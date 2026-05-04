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
    try {
      // For demo, accept any credentials and create a user
      const username = email.split('@')[0];
      const userData = {
        id: Date.now(),
        email: email,
        username: username,
        wins: Math.floor(Math.random() * 50),
        losses: Math.floor(Math.random() * 30),
        joinedDate: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${username}&background=EF4444&color=fff&bold=true`
      };
      setUser(userData);
      localStorage.setItem('pokemonUser', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const userData = {
        id: Date.now(),
        email: email,
        username: username,
        wins: 0,
        losses: 0,
        joinedDate: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${username}&background=3B82F6&color=fff&bold=true`
      };
      setUser(userData);
      localStorage.setItem('pokemonUser', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateUserStats = (wins, losses) => {
    if (user) {
      const updatedUser = { ...user, wins: user.wins + wins, losses: user.losses + losses };
      setUser(updatedUser);
      localStorage.setItem('pokemonUser', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pokemonUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserStats }}>
      {children}
    </AuthContext.Provider>
  );
};

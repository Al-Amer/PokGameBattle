import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiBattleGear } from 'react-icons/gi';
import { FaHome, FaInfoCircle, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaPizzaSlice } from 'react-icons/fa';
import { MdOutlineSportsScore } from 'react-icons/md';
import { SiPokemon } from 'react-icons/si';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', name: 'Home', icon: <FaHome className="mr-2" /> },
    { path: '/battle', name: 'Battle', icon: <GiBattleGear className="mr-2" /> },
    { path: '/battle-result', name: 'Results', icon: <MdOutlineSportsScore className="mr-2" /> },
    { path: '/about-pokemon', name: 'Pokédex', icon: <SiPokemon className="mr-2" /> },
    { path: '/about-me', name: 'About Me', icon: <FaInfoCircle className="mr-2" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-blue-600 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-bold">
            <SiPokemon className="text-yellow-400 text-3xl" />
            <span className="hidden sm:inline">PokGameBattle</span>
            <span className="sm:hidden">PGB</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-yellow-500 hover:text-gray-900 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-2 ml-2">
                <span className="text-white flex items-center">
                  <FaUserCircle className="mr-1" />
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaSignOutAlt className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition ml-2"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-yellow-500 hover:text-gray-900 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="px-4 py-3 text-white">
                  <FaUserCircle className="inline mr-2" />
                  {user.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

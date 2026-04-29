import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiPikeman, GiBattleGear } from 'react-icons/gi';
import { FaHome, FaInfoCircle, FaUser, FaSignInAlt, FaPizzaSlice } from 'react-icons/fa';
import { MdOutlineSportsScore } from 'react-icons/md';
import { SiPokemon } from 'react-icons/si';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home', icon: <FaHome className="mr-2" /> },
    { path: '/battle', name: 'Battle', icon: <GiBattleGear className="mr-2" /> },
    { path: '/battle-result', name: 'Results', icon: <MdOutlineSportsScore className="mr-2" /> },
    { path: '/about-pokemon', name: 'Pokédex', icon: <SiPokemon className="mr-2" /> },
    { path: '/about-me', name: 'About Me', icon: <FaInfoCircle className="mr-2" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-red-600 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-bold">
            <SiPokemon className="text-yellow-400 text-3xl" />
            <span className="hidden sm:inline">PokGameBattle</span>
            <span className="sm:hidden">PGB</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'text-white hover:bg-yellow-500 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 bg-green-500 text-white hover:bg-green-600 ml-2"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'text-white hover:bg-yellow-500 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 bg-green-500 text-white hover:bg-green-600"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

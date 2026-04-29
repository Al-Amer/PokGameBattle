import React from 'react';
import { Link } from 'react-router-dom';
import { GiBattleGear, GiTrophy, GiSwordman } from 'react-icons/gi';
import { FaHeartbeat } from 'react-icons/fa';
import { SiPokemon } from 'react-icons/si';

const Home = () => {
  const features = [
    {
      icon: <SiPokemon className="text-5xl text-red-500" />,
      title: "Catch Pokémon",
      description: "Browse and learn about all your favorite Pokémon from the official PokéAPI"
    },
    {
      icon: <GiBattleGear className="text-5xl text-blue-500" />,
      title: "Battle System",
      description: "Challenge other trainers in exciting turn-based battles"
    },
    {
      icon: <FaHeartbeat className="text-5xl text-green-500" />,
      title: "Health System",
      description: "Strategic battles with HP, attacks, and special moves"
    },
    {
      icon: <GiTrophy className="text-5xl text-yellow-500" />,
      title: "Battle Results",
      description: "Track your victories and improve your battle strategy"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-red-600">PokGameBattle</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The ultimate Pokémon battle experience!
        </p>
        <div className="space-x-4">
          <Link to="/battle" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition transform hover:scale-105">
            Start Battle
          </Link>
          <Link to="/about-pokemon" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
            Explore Pokédex
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Battle?</h2>
        <p className="text-lg mb-6">Choose your Pokémon and start your journey to become a champion!</p>
        <Link to="/battle" className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition font-semibold">
          Battle Now!
        </Link>
      </div>
    </div>
  );
};

export default Home;

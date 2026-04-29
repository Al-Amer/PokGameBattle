// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Battle from './pages/Battle';
import BattleResult from './pages/BattleResult';
import AboutPokemon from './pages/AboutPokemon';
import AboutMe from './pages/AboutMe';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/battle-result" element={<BattleResult />} />
            <Route path="/about-pokemon" element={<AboutPokemon />} />
            <Route path="/about-me" element={<AboutMe />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white mt-16 py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 PokGameBattle - Created with ❤️ for Pokémon fans</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

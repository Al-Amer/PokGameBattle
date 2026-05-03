import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiSwordman, GiHealthNormal, GiTrophy, GiMedal, GiCrown } from 'react-icons/gi';
import { FaStar, FaFire, FaTrophy } from 'react-icons/fa';

const BattleResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerPokemon, opponentPokemon } = location.state || {};
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [battleAnimation, setBattleAnimation] = useState('');

  useEffect(() => {
    if (playerPokemon && opponentPokemon) {
      simulateBattle();
    }
  }, []);

  const simulateBattle = () => {
    const logs = [];
    
    // Calculate type effectiveness
    const typeEffectiveness = {
      fire: { grass: 2, ice: 2, bug: 2, steel: 2, water: 0.5, rock: 0.5, dragon: 0.5 },
      water: { fire: 2, ground: 2, rock: 2, grass: 0.5, electric: 0.5 },
      grass: { water: 2, ground: 2, rock: 2, fire: 0.5, ice: 0.5, poison: 0.5, flying: 0.5, bug: 0.5 },
      electric: { water: 2, flying: 2, grass: 0.5, electric: 0.5, ground: 0 },
    };
    
    const playerType = playerPokemon.types[0];
    const opponentType = opponentPokemon.types[0];
    const advantage = typeEffectiveness[playerType]?.[opponentType] || 1;
    const disadvantage = typeEffectiveness[opponentType]?.[playerType] || 1;
    
    // Calculate battle stats with type effectiveness
    let playerPower = (playerPokemon.stats.attack + playerPokemon.stats.speed + playerPokemon.stats.defense) / 3;
    let opponentPower = (opponentPokemon.stats.attack + opponentPokemon.stats.speed + opponentPokemon.stats.defense) / 3;
    
    playerPower *= advantage;
    opponentPower *= disadvantage;
    
    // Add random factor
    const playerScore = playerPower * (0.7 + Math.random() * 0.6);
    const opponentScore = opponentPower * (0.7 + Math.random() * 0.6);
    
    // Battle log with animations
    logs.push({ text: `⭐ ${playerPokemon.name.toUpperCase()} appears!`, type: 'info' });
    logs.push({ text: `⚡ ${opponentPokemon.name.toUpperCase()} appears!`, type: 'info' });
    
    setTimeout(() => setBattleAnimation('shake'), 100);
    
    if (advantage > 1) {
      logs.push({ text: `✨ Type advantage! ${playerPokemon.name}'s ${playerType} moves are super effective against ${opponentType}!`, type: 'advantage' });
    } else if (advantage < 1) {
      logs.push({ text: `⚠️ Type disadvantage! ${playerPokemon.name}'s ${playerType} moves are not very effective...`, type: 'disadvantage' });
    }
    
    if (playerScore > opponentScore) {
      setWinner('player');
      logs.push({ text: `💥 ${playerPokemon.name} lands a critical hit!`, type: 'damage' });
      logs.push({ text: `🏆 ${opponentPokemon.name} is defeated!`, type: 'victory' });
      logs.push({ text: `✨ ${playerPokemon.name} WINS the battle! ✨`, type: 'win' });
    } else {
      setWinner('opponent');
      logs.push({ text: `💥 ${opponentPokemon.name} lands a devastating blow!`, type: 'damage' });
      logs.push({ text: `💔 ${playerPokemon.name} is defeated!`, type: 'defeat' });
      logs.push({ text: `🏆 ${opponentPokemon.name} WINS the battle!`, type: 'win' });
    }
    
    setBattleLog(logs);
  };

  if (!playerPokemon || !opponentPokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">No Battle Data</h1>
          <button
            onClick={() => navigate('/battle')}
            className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Go to Battle
          </button>
        </div>
      </div>
    );
  }

  const isWinner = winner === 'player';
  const bgGradient = isWinner 
    ? 'bg-gradient-to-br from-green-600 to-emerald-700' 
    : 'bg-gradient-to-br from-red-600 to-orange-700';

  return (
    <div className={`min-h-screen ${bgGradient} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-8">
        {/* Winner Banner */}
        <div className="text-center mb-12 animate-bounce">
          <div className="inline-block bg-white/20 backdrop-blur-lg rounded-2xl p-8">
            {isWinner ? (
              <>
                <GiTrophy className="text-7xl text-yellow-400 mx-auto mb-4 animate-pulse" />
                <h1 className="text-5xl font-bold text-white mb-2">VICTORY!</h1>
                <p className="text-2xl text-white/90">
                  {playerPokemon.name} defeated {opponentPokemon.name}!
                </p>
              </>
            ) : (
              <>
                <GiMedal className="text-7xl text-gray-300 mx-auto mb-4" />
                <h1 className="text-5xl font-bold text-white mb-2">DEFEAT!</h1>
                <p className="text-2xl text-white/90">
                  {opponentPokemon.name} defeated {playerPokemon.name}!
                </p>
              </>
            )}
          </div>
        </div>

        {/* Battle Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Player Pokemon */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
              <GiCrown className="text-yellow-400" /> Your Pokémon
            </h3>
            <div className="text-center">
              <img 
                src={playerPokemon.sprite} 
                alt={playerPokemon.name}
                className="w-40 h-40 mx-auto object-contain"
              />
              <p className="text-xl font-bold text-white capitalize mt-4">{playerPokemon.name}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-white">
                <div>❤️ HP: {playerPokemon.stats.hp}</div>
                <div>⚔️ ATK: {playerPokemon.stats.attack}</div>
                <div>🛡️ DEF: {playerPokemon.stats.defense}</div>
                <div>⚡ SPD: {playerPokemon.stats.speed}</div>
              </div>
            </div>
          </div>

          {/* Opponent Pokemon */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
              <FaFire className="text-red-400" /> Opponent
            </h3>
            <div className="text-center">
              <img 
                src={opponentPokemon.sprite} 
                alt={opponentPokemon.name}
                className="w-40 h-40 mx-auto object-contain"
              />
              <p className="text-xl font-bold text-white capitalize mt-4">{opponentPokemon.name}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-white">
                <div>❤️ HP: {opponentPokemon.stats.hp}</div>
                <div>⚔️ ATK: {opponentPokemon.stats.attack}</div>
                <div>🛡️ DEF: {opponentPokemon.stats.defense}</div>
                <div>⚡ SPD: {opponentPokemon.stats.speed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Battle Log
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {battleLog.map((log, index) => (
              <div 
                key={index} 
                className={`battle-log-entry animate-slide-left border-${log.type === 'win' ? 'yellow' : log.type === 'victory' ? 'green' : log.type === 'defeat' ? 'red' : 'blue'}-500`}
              >
                <p className={`text-sm font-mono ${
                  log.type === 'win' ? 'text-yellow-300 font-bold' :
                  log.type === 'victory' ? 'text-green-300' :
                  log.type === 'defeat' ? 'text-red-300' :
                  log.type === 'advantage' ? 'text-green-300' :
                  log.type === 'disadvantage' ? 'text-orange-300' :
                  'text-white/80'
                }`}>
                  {log.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate('/battle')}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-bold overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">⚔️ Battle Again</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
          <button
            onClick={() => navigate('/about-pokemon')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            📖 View Pokédex
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattleResult;

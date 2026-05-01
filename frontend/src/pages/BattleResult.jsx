import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiSwordman, GiHealthNormal, GiTrophy } from 'react-icons/gi';

const BattleResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerPokemon, opponentPokemon } = location.state || {};
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  useEffect(() => {
    if (playerPokemon && opponentPokemon) {
      simulateBattle();
    }
  }, []);

  const simulateBattle = () => {
    const logs = [];
    
    // Calculate battle stats
    const playerPower = (playerPokemon.stats.attack + playerPokemon.stats.speed) / 2;
    const opponentPower = (opponentPokemon.stats.attack + opponentPokemon.stats.speed) / 2;
    
    // Add random factor
    const playerScore = playerPower * (0.8 + Math.random() * 0.4);
    const opponentScore = opponentPower * (0.8 + Math.random() * 0.4);
    
    logs.push(`${playerPokemon.name} appears!`);
    logs.push(`${opponentPokemon.name} appears!`);
    logs.push(`Battle begins!`);
    
    if (playerScore > opponentScore) {
      setWinner('player');
      logs.push(`${playerPokemon.name} attacks with power!`);
      logs.push(`${opponentPokemon.name} is defeated!`);
      logs.push(`✨ ${playerPokemon.name} wins the battle! ✨`);
    } else {
      setWinner('opponent');
      logs.push(`${opponentPokemon.name} launches a powerful attack!`);
      logs.push(`${playerPokemon.name} is defeated!`);
      logs.push(`💔 ${opponentPokemon.name} wins the battle! 💔`);
    }
    
    setBattleLog(logs);
  };

  if (!playerPokemon || !opponentPokemon) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">No Battle Data</h1>
        <button
          onClick={() => navigate('/battle')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Battle
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Battle Results</h1>
        <p className="text-gray-600">The battle has concluded!</p>
      </div>

      {/* Winner Display */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 mb-8 text-center">
        <GiTrophy className="text-6xl text-white mx-auto mb-4" />
        {winner === 'player' ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">Victory!</h2>
            <p className="text-xl text-white">
              {playerPokemon.name} defeated {opponentPokemon.name}!
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">Defeat!</h2>
            <p className="text-xl text-white">
              {opponentPokemon.name} defeated {playerPokemon.name}!
            </p>
          </>
        )}
      </div>

      {/* Battle Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-3">Your Pokémon</h3>
          <img src={playerPokemon.sprite} alt={playerPokemon.name} className="w-32 h-32 mx-auto object-contain" />
          <p className="text-lg font-bold capitalize mt-2">{playerPokemon.name}</p>
          <div className="mt-3 text-left">
            <p>HP: {playerPokemon.stats.hp}</p>
            <p>Attack: {playerPokemon.stats.attack}</p>
            <p>Defense: {playerPokemon.stats.defense}</p>
            <p>Speed: {playerPokemon.stats.speed}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-3">Opponent Pokémon</h3>
          <img src={opponentPokemon.sprite} alt={opponentPokemon.name} className="w-32 h-32 mx-auto object-contain" />
          <p className="text-lg font-bold capitalize mt-2">{opponentPokemon.name}</p>
          <div className="mt-3 text-left">
            <p>HP: {opponentPokemon.stats.hp}</p>
            <p>Attack: {opponentPokemon.stats.attack}</p>
            <p>Defense: {opponentPokemon.stats.defense}</p>
            <p>Speed: {opponentPokemon.stats.speed}</p>
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div className="bg-gray-800 text-white rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-3">Battle Log</h3>
        <div className="space-y-2">
          {battleLog.map((log, index) => (
            <p key={index} className="text-sm font-mono">
              {index + 1}. {log}
            </p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate('/battle')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Battle Again
        </button>
        <button
          onClick={() => navigate('/about-pokemon')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Pokédex
        </button>
      </div>
    </div>
  );
};

export default BattleResult;

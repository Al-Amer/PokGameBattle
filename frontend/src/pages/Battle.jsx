import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemonApi from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';
import BattleService, { moves } from '../services/battleService';
import soundService from '../services/soundService';

const Battle = () => {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [step, setStep] = useState('select');
  const [battleService, setBattleService] = useState(null);
  const [battleState, setBattleState] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [animations, setAnimations] = useState({ playerShake: false, opponentShake: false, flash: false });
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    loadPokemon();
    loadOpponent();
    
    // Initialize sounds on first click
    const initSound = () => {
      soundService.init();
      document.removeEventListener('click', initSound);
    };
    document.addEventListener('click', initSound);
    
    return () => document.removeEventListener('click', initSound);
  }, []);

  const loadPokemon = async () => {
    setLoading(true);
    const result = await pokemonApi.getPokemonList(50, 0);
    if (result.success) {
      setPokemonList(result.data.results);
    }
    setLoading(false);
  };

  const loadOpponent = async () => {
    const result = await pokemonApi.getRandomPokemon();
    if (result.success) {
      setOpponentPokemon(result.data);
    }
  };

  const handlePokemonSelect = async (pokemon) => {
    soundService.playSelectSound();
    const result = await pokemonApi.getPokemon(pokemon.name);
    if (result.success) {
      setSelectedPokemon(result.data);
      setStep('battle');
    }
  };

  const startBattle = () => {
    const service = new BattleService(selectedPokemon, opponentPokemon);
    setBattleService(service);
    setBattleState(service.getBattleState());
    setBattleLog(service.getBattleLog());
    setIsPlayerTurn(true);
    soundService.playSelectSound();
  };

  const handleMove = async (moveName) => {
    if (!battleService || battleState?.battleEnded || !isPlayerTurn) return;
    
    // Play attack sound
    if (soundEnabled) soundService.playAttackSound();
    
    // Trigger attack animation
    setAnimations({ playerShake: true, opponentShake: false, flash: true });
    setTimeout(() => setAnimations({ playerShake: false, opponentShake: false, flash: false }), 300);
    
    // Execute player attack
    const result = battleService.playerAttack(moveName);
    
    // Update battle state
    setBattleState(battleService.getBattleState());
    setBattleLog([...battleService.getBattleLog()]);
    setIsPlayerTurn(false);
    
    // Play hit sound if damage dealt
    if (result.hit && result.damage > 0 && soundEnabled) {
      soundService.playHitSound();
    }
    
    // Check if battle ended
    if (battleService.battleEnded) {
      if (soundEnabled) {
        if (battleService.winner === 'player') {
          soundService.playVictorySound();
        } else {
          soundService.playDefeatSound();
        }
      }
      
      // Save battle history
      const history = JSON.parse(localStorage.getItem('battleHistory') || '[]');
      history.push({
        player: selectedPokemon.name,
        opponent: opponentPokemon.name,
        winner: battleService.winner,
        date: new Date().toLocaleString()
      });
      localStorage.setItem('battleHistory', JSON.stringify(history.slice(-10)));
    }
  };

  // Watch for enemy turn
  useEffect(() => {
    if (battleService && !isPlayerTurn && !battleState?.battleEnded && battleState?.turn === 'opponent') {
      const timer = setTimeout(() => {
        // Trigger opponent attack animation
        setAnimations({ playerShake: false, opponentShake: true, flash: true });
        if (soundEnabled) soundService.playAttackSound();
        
        // Force refresh of battle state after opponent's turn
        setBattleState({ ...battleService.getBattleState() });
        setBattleLog([...battleService.getBattleLog()]);
        setIsPlayerTurn(true);
        
        setTimeout(() => setAnimations({ playerShake: false, opponentShake: false, flash: false }), 300);
        
        if (battleService.battleEnded && soundEnabled) {
          if (battleService.winner === 'player') {
            soundService.playVictorySound();
          } else {
            soundService.playDefeatSound();
          }
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, battleState, battleService, soundEnabled]);

  const getAvailableMoves = () => {
    const playerType = selectedPokemon?.types[0];
    let available = ['tackle', 'quickAttack'];
    
    if (playerType === 'fire') available.push('ember');
    else if (playerType === 'water') available.push('waterGun');
    else if (playerType === 'grass') available.push('vineWhip');
    else if (playerType === 'electric') available.push('thunderShock');
    else available.push('bite');
    
    return available;
  };

  const toggleSound = () => {
    const enabled = soundService.toggle();
    setSoundEnabled(enabled);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-blue-600">
        <button
          onClick={toggleSound}
          className="fixed top-20 right-4 bg-white/20 backdrop-blur-lg p-3 rounded-full hover:bg-white/30 transition z-50"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h1 className="text-5xl font-bold text-white mb-2">⚔️ CHOOSE YOUR FIGHTER</h1>
              <p className="text-xl text-white/90">Select a Pokémon to begin the battle!</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemonList.map((pokemon) => (
              <div key={pokemon.id} onClick={() => handlePokemonSelect(pokemon)}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!battleState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <button
          onClick={startBattle}
          className="bg-yellow-500 text-gray-900 px-12 py-4 rounded-xl font-bold text-2xl hover:bg-yellow-400 transition transform hover:scale-105"
        >
          START BATTLE!
        </button>
      </div>
    );
  }

  const playerHpPercent = (battleState.playerHp / battleState.playerMaxHp) * 100;
  const opponentHpPercent = (battleState.opponentHp / battleState.opponentMaxHp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <button
        onClick={toggleSound}
        className="fixed top-20 right-4 bg-white/20 backdrop-blur-lg p-3 rounded-full hover:bg-white/30 transition z-50"
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/50 rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            {!battleState.battleEnded && isPlayerTurn ? '⚔️ YOUR TURN ⚔️' : 
             !battleState.battleEnded && !isPlayerTurn ? '🤖 OPPONENT TURN 🤖' : 
             battleState.winner === 'player' ? '🏆 VICTORY! 🏆' : '💔 DEFEAT! 💔'}
          </h1>
          
          {/* Opponent */}
          <div className={`mb-8 transition-all ${animations.opponentShake ? 'animate-shake' : ''}`}>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white capitalize">{opponentPokemon.name}</h2>
                <span className="text-white">{battleState.opponentHp}/{battleState.opponentMaxHp} HP</span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${opponentHpPercent}%` }}
                ></div>
              </div>
              <img 
                src={opponentPokemon.sprite} 
                alt={opponentPokemon.name}
                className="w-32 h-32 mx-auto mt-4 object-contain"
              />
            </div>
          </div>

          {/* VS */}
          <div className={`text-center text-4xl font-bold text-yellow-400 my-4 ${animations.flash ? 'animate-flash' : ''}`}>
            VS
          </div>

          {/* Player */}
          <div className={`mb-8 transition-all ${animations.playerShake ? 'animate-shake' : ''}`}>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white capitalize">{selectedPokemon.name}</h2>
                <span className="text-white">{battleState.playerHp}/{battleState.playerMaxHp} HP</span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${playerHpPercent}%` }}
                ></div>
              </div>
              <img 
                src={selectedPokemon.sprite} 
                alt={selectedPokemon.name}
                className="w-32 h-32 mx-auto mt-4 object-contain"
              />
            </div>
          </div>

          {/* Battle Log */}
          <div className="bg-black/50 rounded-xl p-4 mb-6 max-h-40 overflow-y-auto">
            {battleLog.map((log, index) => (
              <p key={index} className={`text-sm py-1 ${
                log.type === 'critical' ? 'text-red-400 font-bold' :
                log.type === 'advantage' ? 'text-green-400' :
                log.type === 'disadvantage' ? 'text-orange-400' :
                log.type === 'win' ? 'text-yellow-400 font-bold' :
                log.type === 'lose' ? 'text-red-400 font-bold' :
                'text-white/80'
              }`}>
                {log.text}
              </p>
            ))}
          </div>

          {/* Moves - Only show if battle not ended and player's turn */}
          {!battleState.battleEnded && isPlayerTurn && (
            <div className="grid grid-cols-2 gap-3">
              {getAvailableMoves().map((moveName) => {
                const move = moves[moveName];
                return (
                  <button
                    key={moveName}
                    onClick={() => handleMove(moveName)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
                  >
                    <div className="text-lg font-bold">{move.name}</div>
                    <div className="text-xs opacity-75">Power: {move.power} | {move.type}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Waiting for opponent message */}
          {!battleState.battleEnded && !isPlayerTurn && (
            <div className="text-center py-4">
              <div className="inline-block bg-yellow-500/20 backdrop-blur-lg rounded-lg px-6 py-3">
                <p className="text-yellow-400 font-semibold">🤖 Opponent is thinking... 🤖</p>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Battle Result Buttons */}
          {battleState.battleEnded && (
            <div className="text-center mt-6">
              <div className={`text-3xl font-bold mb-4 ${battleState.winner === 'player' ? 'text-green-400' : 'text-red-400'}`}>
                {battleState.winner === 'player' ? '✨ VICTORY! ✨' : '💔 DEFEAT! 💔'}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Battle Again
                </button>
                <button
                  onClick={() => navigate('/about-pokemon')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                  View Pokédex
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes flash {
          0%, 100% { opacity: 1; text-shadow: 0 0 0px yellow; }
          50% { opacity: 0.7; text-shadow: 0 0 20px yellow; }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .animate-flash {
          animation: flash 0.2s ease-in-out 3;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Battle;

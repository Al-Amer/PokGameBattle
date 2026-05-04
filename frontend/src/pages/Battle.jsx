import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemonApi from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';
import BattleService, { moves } from '../services/battleService';

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
  const [attacking, setAttacking] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadPokemon();
    loadOpponent();
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
    setGameOver(false);
    setWinner(null);
  };

  const handleMove = (moveName) => {
    if (!battleService || battleState?.battleEnded) return;
    
    setAttacking(true);
    
    // Player attack
    const result = battleService.playerAttack(moveName);
    setBattleState(battleService.getBattleState());
    setBattleLog([...battleService.getBattleLog()]);
    
    setTimeout(() => {
      setAttacking(false);
      
      // Check if battle ended
      if (battleService.battleEnded) {
        setWinner(battleService.winner);
        setGameOver(true);
        return;
      }
      
      // Opponent attacks back
      if (!battleService.battleEnded && battleService.turn === 'opponent') {
        setAttacking(true);
        setTimeout(() => {
          battleService.opponentAttack();
          setBattleState(battleService.getBattleState());
          setBattleLog([...battleService.getBattleLog()]);
          setAttacking(false);
          
          if (battleService.battleEnded) {
            setWinner(battleService.winner);
            setGameOver(true);
          }
        }, 800);
      }
    }, 500);
  };

  const resetBattle = () => {
    setGameOver(false);
    setWinner(null);
    startBattle();
  };

  const getAvailableMoves = () => {
    const playerType = selectedPokemon?.types?.[0];
    let available = ['tackle', 'quickAttack', 'growl'];
    
    if (playerType === 'fire') available.push('ember');
    else if (playerType === 'water') available.push('waterGun');
    else if (playerType === 'grass') available.push('vineWhip');
    else if (playerType === 'electric') available.push('thunderShock');
    
    return available;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
      </div>
    );
  }

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Choose Your Fighter</h1>
            <p className="text-white/80">Select a Pokémon to begin!</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={handlePokemonSelect} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!battleState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <button onClick={startBattle} className="bg-yellow-500 text-gray-900 px-12 py-4 rounded-xl font-bold text-2xl hover:scale-105 transition">
          START BATTLE!
        </button>
      </div>
    );
  }

  const playerHpPercent = (battleState.playerHp / battleState.playerMaxHp) * 100;
  const opponentHpPercent = (battleState.opponentHp / battleState.opponentMaxHp) * 100;

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">{winner === 'player' ? '🏆' : '💔'}</div>
          <h1 className={`text-4xl font-bold mb-4 ${winner === 'player' ? 'text-green-400' : 'text-red-400'}`}>
            {winner === 'player' ? 'VICTORY!' : 'DEFEAT!'}
          </h1>
          <p className="text-white/80 mb-6">
            {winner === 'player' 
              ? `${selectedPokemon.name} defeated ${opponentPokemon.name}!` 
              : `${opponentPokemon.name} defeated ${selectedPokemon.name}!`}
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={resetBattle} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Battle Again
            </button>
            <button onClick={() => navigate('/about-pokemon')} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              View Pokédex
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Opponent */}
          <div className={`bg-black/50 rounded-2xl p-6 mb-8 transition-all ${attacking ? 'animate-shake' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white capitalize">{opponentPokemon.name}</h2>
              <span className="text-white">{battleState.opponentHp}/{battleState.opponentMaxHp} HP</span>
            </div>
            <div className="bg-gray-700 rounded-full h-4 mb-4">
              <div className="bg-red-500 h-4 rounded-full transition-all duration-300" style={{ width: `${opponentHpPercent}%` }}></div>
            </div>
            <img src={opponentPokemon.sprite} alt={opponentPokemon.name} className="w-32 h-32 mx-auto object-contain" />
          </div>

          {/* VS */}
          <div className="text-center text-4xl font-bold text-yellow-400 my-4">VS</div>

          {/* Player */}
          <div className={`bg-black/50 rounded-2xl p-6 mb-8 transition-all ${attacking ? 'animate-shake' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white capitalize">{selectedPokemon.name}</h2>
              <span className="text-white">{battleState.playerHp}/{battleState.playerMaxHp} HP</span>
            </div>
            <div className="bg-gray-700 rounded-full h-4 mb-4">
              <div className="bg-green-500 h-4 rounded-full transition-all duration-300" style={{ width: `${playerHpPercent}%` }}></div>
            </div>
            <img src={selectedPokemon.sprite} alt={selectedPokemon.name} className="w-32 h-32 mx-auto object-contain" />
          </div>

          {/* Battle Log */}
          <div className="bg-black/50 rounded-xl p-4 mb-6 h-32 overflow-y-auto">
            {battleLog.slice(-5).map((log, index) => (
              <p key={index} className={`text-sm ${
                log.type === 'win' ? 'text-yellow-400 font-bold' :
                log.type === 'critical' ? 'text-red-400' :
                log.type === 'advantage' ? 'text-green-400' :
                'text-white/80'
              }`}>
                {log.text}
              </p>
            ))}
          </div>

          {/* Move Buttons - Only show if battle not ended and player's turn */}
          {!battleState.battleEnded && battleState.turn === 'player' && (
            <div className="grid grid-cols-2 gap-3">
              {getAvailableMoves().map((moveName) => {
                const move = moves[moveName];
                return (
                  <button
                    key={moveName}
                    onClick={() => handleMove(moveName)}
                    disabled={attacking}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50"
                  >
                    <div>{move.name}</div>
                    <div className="text-xs opacity-75">Power: {move.power}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Waiting for opponent */}
          {!battleState.battleEnded && battleState.turn === 'opponent' && (
            <div className="text-center py-6">
              <div className="bg-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold">Opponent is thinking...</p>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                </div>
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
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 0.5s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

export default Battle;

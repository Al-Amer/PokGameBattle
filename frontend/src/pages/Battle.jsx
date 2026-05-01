import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemonApi from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';
import { GiSwordman, GiHealthNormal } from 'react-icons/gi';

const Battle = () => {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [step, setStep] = useState('select');

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
    navigate('/battle-result', { 
      state: { 
        playerPokemon: selectedPokemon,
        opponentPokemon: opponentPokemon 
      } 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (step === 'select') {
    return (
      <div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Choose Your Pokémon</h1>
          <p className="text-gray-600">Select a Pokémon to start the battle!</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={() => handlePokemonSelect(pokemon)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Battle Arena</h1>
        <p className="text-gray-600">Prepare for battle!</p>
      </div>

      <div className="bg-gradient-to-r from-red-100 to-blue-100 rounded-2xl p-8">
        {/* Opponent */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Opponent</h2>
          {opponentPokemon && (
            <div>
              <img 
                src={opponentPokemon.sprite} 
                alt={opponentPokemon.name}
                className="w-32 h-32 mx-auto object-contain"
              />
              <h3 className="text-xl font-bold capitalize mt-2">{opponentPokemon.name}</h3>
              
              <div className="max-w-xs mx-auto mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1"><GiHealthNormal /> HP</span>
                  <span>{opponentPokemon.stats?.hp || 100}</span>
                </div>
                <div className="bg-gray-300 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-4xl font-bold text-yellow-500 my-4">VS</div>

        {/* Player */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Pokémon</h2>
          {selectedPokemon && (
            <div>
              <img 
                src={selectedPokemon.sprite} 
                alt={selectedPokemon.name}
                className="w-32 h-32 mx-auto object-contain"
              />
              <h3 className="text-xl font-bold capitalize mt-2">{selectedPokemon.name}</h3>
              
              <div className="max-w-xs mx-auto mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1"><GiHealthNormal /> HP</span>
                  <span>{selectedPokemon.stats?.hp || 100}</span>
                </div>
                <div className="bg-gray-300 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <button
                onClick={startBattle}
                className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition transform hover:scale-105 font-bold"
              >
                <GiSwordman className="inline mr-2" />
                Start Battle!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Battle;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemonApi from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';

const AboutPokemon = () => {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await pokemonApi.getPokemonList(151, 0);
      if (result.success && result.data && result.data.results) {
        setPokemonList(result.data.results);
      } else {
        setError('Failed to load Pokémon. Please try again.');
      }
    } catch (err) {
      setError('Error loading Pokémon: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonClick = async (pokemon) => {
    try {
      const result = await pokemonApi.getPokemon(pokemon.name);
      if (result.success) {
        setSelectedPokemon(result.data);
      }
    } catch (err) {
      console.error('Error loading Pokémon details:', err);
    }
  };

  const handleSelectForBattle = () => {
    if (selectedPokemon) {
      // Get a random opponent
      const randomId = Math.floor(Math.random() * 151) + 1;
      pokemonApi.getPokemon(randomId).then(opponent => {
        if (opponent.success) {
          // Navigate to battle with selected pokemon and random opponent
          navigate('/battle-result', {
            state: {
              playerPokemon: selectedPokemon,
              opponentPokemon: opponent.data
            }
          });
        }
      });
    }
    closeModal();
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pokédex...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <button 
            onClick={loadPokemon} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pokédex</h1>
          <p className="text-gray-600">Browse and discover all Pokémon</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pokémon Grid */}
        {filteredPokemon.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Pokémon found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onSelect={handlePokemonClick}
              />
            ))}
          </div>
        )}

        {/* Pokémon Detail Modal */}
        {selectedPokemon && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold capitalize">{selectedPokemon.name}</h2>
                <button 
                  onClick={closeModal} 
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="p-6">
                <img 
                  src={selectedPokemon.sprite} 
                  alt={selectedPokemon.name}
                  className="w-48 h-48 mx-auto mb-4 object-contain"
                  onError={(e) => {
                    e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
                  }}
                />
                
                <div className="space-y-4">
                  {/* Types */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Types</h3>
                    <div className="flex gap-2">
                      {selectedPokemon.types?.map((type, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Abilities */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Abilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPokemon.abilities?.map((ability, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                          {ability.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Stats</h3>
                    <div className="space-y-2">
                      {selectedPokemon.stats && Object.entries(selectedPokemon.stats).map(([stat, value]) => (
                        <div key={stat}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">{stat.replace('special', 'Sp. ')}</span>
                            <span>{value}</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(value / 255) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Measurements */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Measurements</h3>
                    <p className="text-gray-600">Height: {(selectedPokemon.height / 10) || 0} m</p>
                    <p className="text-gray-600">Weight: {(selectedPokemon.weight / 10) || 0} kg</p>
                  </div>
                </div>

                <button
                  onClick={handleSelectForBattle}
                  className="mt-6 w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition transform"
                >
                  ⚔️ Select for Battle ⚔️
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPokemon;

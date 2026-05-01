import React, { useState, useEffect } from 'react';
import pokemonApi from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';
import { FaSearch } from 'react-icons/fa';

const AboutPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pokemonList.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemonList);
    }
  }, [searchTerm, pokemonList]);

  const loadPokemon = async () => {
    setLoading(true);
    const result = await pokemonApi.getPokemonList(150, 0);
    if (result.success) {
      setPokemonList(result.data.results);
      setFilteredPokemon(result.data.results);
    }
    setLoading(false);
  };

  const handlePokemonClick = async (pokemon) => {
    const result = await pokemonApi.getPokemon(pokemon.name);
    if (result.success) {
      setSelectedPokemon(result.data);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pokédex</h1>
        <p className="text-gray-600">Browse and discover all Pokémon</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={() => handlePokemonClick(pokemon)}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredPokemon.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Pokémon found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Pokémon Detail Modal */}
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold capitalize">{selectedPokemon.name}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            
            <div className="p-6">
              <img 
                src={selectedPokemon.sprite} 
                alt={selectedPokemon.name}
                className="w-48 h-48 mx-auto mb-4 object-contain"
              />
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-700">Types</h3>
                  <div className="flex gap-2 mt-1">
                    {selectedPokemon.types.map((type, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Abilities</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPokemon.abilities.map((ability, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                        {ability.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Stats</h3>
                  <div className="space-y-2 mt-2">
                    {Object.entries(selectedPokemon.stats).map(([stat, value]) => (
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

                <div>
                  <h3 className="font-semibold text-gray-700">Measurements</h3>
                  <p className="text-gray-600">Height: {selectedPokemon.height / 10}m</p>
                  <p className="text-gray-600">Weight: {selectedPokemon.weight / 10}kg</p>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Select ${selectedPokemon.name} for battle? Battle system coming soon!`);
                  closeModal();
                }}
                className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Select for Battle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPokemon;

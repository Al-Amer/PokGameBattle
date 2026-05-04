import React from 'react';

const PokemonCard = ({ pokemon, onSelect, isSelected = false }) => {
  // Handle missing pokemon data
  if (!pokemon) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 text-center">
        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mt-2"></div>
      </div>
    );
  }

  // Ensure we have a valid sprite URL
  const spriteUrl = pokemon.sprite || 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id || 1}.png`;

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-2xl ${
        isSelected ? 'ring-4 ring-yellow-400 shadow-2xl' : ''
      }`}
      onClick={() => onSelect && onSelect(pokemon)}
    >
      <div className="flex justify-center mb-4">
        <img 
          src={spriteUrl} 
          alt={pokemon.name || 'Pokemon'}
          className="w-32 h-32 object-contain"
          loading="lazy"
          onError={(e) => {
            // Fallback image if sprite fails to load
            e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
          }}
        />
      </div>
      <h3 className="text-xl font-bold text-center capitalize mb-2">
        {pokemon.name || 'Unknown Pokemon'}
      </h3>
      {pokemon.types && pokemon.types.length > 0 && (
        <div className="flex justify-center gap-2 mb-2">
          {pokemon.types.map((type, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
              {type}
            </span>
          ))}
        </div>
      )}
      <div className="text-center">
        <span className="text-xs text-gray-500">#{String(pokemon.id || '???').padStart(3, '0')}</span>
      </div>
    </div>
  );
};

export default PokemonCard;

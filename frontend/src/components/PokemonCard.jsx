import React from 'react';
import { GiSwordman, GiHealthNormal } from 'react-icons/gi';
import { FaBolt } from 'react-icons/fa';

const PokemonCard = ({ pokemon, onSelect, isSelected = false, isBattleMode = false }) => {
  if (!pokemon) return null;

  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-orange-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-stone-500',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  };

  const getTypeColor = (type) => {
    return typeColors[type?.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
        isSelected ? 'ring-4 ring-yellow-400 shadow-2xl' : ''
      }`}
      onClick={() => onSelect && onSelect(pokemon)}
    >
      {/* Pokémon Image */}
      <div className="flex justify-center mb-4">
        <img 
          src={pokemon.sprite} 
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
          onError={(e) => {
            e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
          }}
        />
      </div>

      {/* Pokémon Name */}
      <h3 className="text-xl font-bold text-center capitalize mb-2">
        {pokemon.name}
      </h3>

      {/* Types */}
      <div className="flex justify-center gap-2 mb-3">
        {pokemon.types && pokemon.types.map((type, index) => (
          <span 
            key={index}
            className={`${getTypeColor(type)} text-white text-xs px-2 py-1 rounded-full capitalize`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Stats in Battle Mode */}
      {isBattleMode && pokemon.stats && (
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <GiHealthNormal className="text-red-500" />
              <span>HP</span>
            </div>
            <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${(pokemon.stats.hp / 255) * 100}%` }}
              ></div>
            </div>
            <span>{pokemon.stats.hp}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <GiSwordman className="text-orange-500" />
              <span>ATK</span>
            </div>
            <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: `${(pokemon.stats.attack / 255) * 100}%` }}
              ></div>
            </div>
            <span>{pokemon.stats.attack}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaBolt className="text-yellow-500" />
              <span>DEF</span>
            </div>
            <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(pokemon.stats.defense / 255) * 100}%` }}
              ></div>
            </div>
            <span>{pokemon.stats.defense}</span>
          </div>
        </div>
      )}

      {/* ID Badge */}
      <div className="mt-3 text-center">
        <span className="text-xs text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
      </div>
    </div>
  );
};

export default PokemonCard;

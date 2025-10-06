import React from 'react'

interface PokemonCardProps {
  name: string;
  image: string;
  power: number;
}
const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, power }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-48 text-center hover:scale-105 transition-transform">
      <img src={image} alt={name} className="mx-auto w-24 h-24" />
      <h3 className="text-lg font-semibold mt-2 capitalize">{name}</h3>
      <p className="text-sm text-gray-600">Power: {power}</p>
    </div>
  );
};

export default PokemonCard;

'use client'

import PokemonCard from '@/components/PokemonCard';
import React, { useEffect, useState } from 'react'

interface Pokemon{
  name:string;
  image: string;
  power: number;
}

export default function PokemonsCards() : React.FC {
// const PokemonsCards: React.FC = () => {
const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[] | null>(null);


const getPokemon = async () => {
  try{
    //fetch 
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!res.ok) {
    console.error(`Error fetching Pokemon: ${res.statusText}`);
    return 
    }
    const pokemones = await res.json();
    const detailed = await Promise.all(
        pokemones.results.map(async (p: Pokemon) => {
          const res = await fetch(p.url);
          const details = await res.json();
          return {
            name: p.name,
            image: details.sprites.other["official-artwork"].front_default,
            power: details.base_experience,
          };
        })
      );

      setSelectedPokemon(detailed);
  // Error catching and handling
  }catch(error){
      console.error("Fetch failed:", error);
  }
};
  useEffect(()=>{
    getPokemon();
  },[]);
  
  return (
    <div className="p-8">
        <h1  className="text-3xl font-bold mb-6 text-center">Pokémon List</h1>
      {selectedPokemon ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
          {selectedPokemon.map((p) => (
           <PokemonCard
              key={p.name}
              name={p.name}
              image={p.image}
              power={p.power}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
// export default PokemonsCards;



    // https://pokeapi.co/api/v2
    // https://pokeapi.co/api/v2/pokemon/ditto

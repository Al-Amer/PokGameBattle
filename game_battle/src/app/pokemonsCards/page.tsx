'use client'

import React, { useEffect, useState } from 'react'

interface Pokemon{
  name:string;
  url:string;
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
  setSelectedPokemon(pokemones.results);
  // Error catching and handling
  }catch(error){
      console.error("Fetch failed:", error);
  }
};
  useEffect(()=>{
    getPokemon();
  },[]);
  
  return (
    <div>
        <h1>Pokémon List</h1>
      {selectedPokemon ? (
        <ul>
          {selectedPokemon.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
// export default PokemonsCards;



    // https://pokeapi.co/api/v2
    // https://pokeapi.co/api/v2/pokemon/ditto

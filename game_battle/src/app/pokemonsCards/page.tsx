'use client'

import React, { useState } from 'react'






export default function PokemonsCards() {
const [selectedPokemon, setSelectedPokemon] = useState(null)

const getPokemon = async () => {
  const res = await fetch("https://pokeapi.co/api/v2");
  if (!res.ok) {
    console.error(`Error fetching Pokemon: ${res.statusText}`);
    return 
  }
  const poke = await res.json();
  setSelectedPokemon(poke);
}

console.log(getPokemon);  return (
    <div>
      

    </div>
  )
}



    // https://pokeapi.co/api/v2
    // https://pokeapi.co/api/v2/pokemon/ditto

import React from 'react'

const getPokemon = async() => {
  const res = await fetch("https://pokeapi.co/api/v2");
  if (!res.ok) throw new Error("Failed to fetch ");
  const poke = await res.json();
  console.log(poke);
  return poke;
}

console.log(getPokemon);


export default function PokemonsCards() {
  return (
    <div>
      <h1>Pokemon</h1>

    </div>
  )
}



    // https://pokeapi.co/api/v2
    // https://pokeapi.co/api/v2/pokemon/ditto

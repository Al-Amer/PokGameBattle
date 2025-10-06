'use client'

import PokemonCard from '@/components/PokemonCard';
import React, { useEffect, useState } from 'react'

interface Pokemon{
  name:string;
  image: string;
  power: number;
  url?:string;
}

export default function PokemonsCards() : React.FC {
// const PokemonsCards: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [computerPokemon, setComputerPokemon] = useState<Pokemon | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

const getPokemon = async () => {
  try{
    //fetch 
    // const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    // if (!res.ok) {
    // console.error(`Error fetching Pokemon: ${res.statusText}`);
    // return 
    // }
    // const pokemones = await res.json();
    // const detailed = await Promise.all(
    //     pokemones.results.map(async (p: Pokemon) => {
    //       const res = await fetch(p.url);
    //       const details = await res.json();
    //       return {
    //         name: p.name,
    //         image: details.sprites.other["official-artwork"].front_default,
    //         power: details.base_experience,
    //       };
    //     })
    //   );
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await res.json();
    const detailed = await Promise.all(
      data.results.map(async (p: any) => {
        const res = await fetch(p.url);
        const details = await res.json();
        return {
          name: p.name,
          image: details.sprites.other["official-artwork"].front_default,
          power: details.base_experience,
        };
      })
    );
      setPokemons(detailed);
  // Error catching and handling
  }catch(error){
      console.error("Fetch failed:", error);
  }
};
  useEffect(()=>{
    getPokemon();
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  },[]);
  const handleChoosePokemon = async (pokemon: Pokemon) => {
    setUserPokemon(pokemon);

    // Computer randomly chooses one Pokémon
    const random = pokemons[Math.floor(Math.random() * pokemons.length)];
    setComputerPokemon(random);

    // Determine winner
    let result = "It's a tie!";
    if (pokemon.power > random.power) result = `${username} wins! 🎉`;
    else if (pokemon.power < random.power) result = "Computer wins! 💥";

    setWinner(result);
    // Important 
        // Send result to API
    await fetch("/api/battle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        userPokemon: pokemon.name,
        computerPokemon: random.name,
        result,
      }),
    });
  };
  // buttom hidden or show 
   const handlePlayAgain = () => {
    setWinner(null);
    setUserPokemon(null);
    setComputerPokemon(null);
    getPokemon(); // fetch new Pokémon list
  };

  return (
    <div className="p-8">
        <h1  className="text-3xl font-bold mb-6 text-center">Pokémon List</h1>
        {!userPokemon && (
        <>
          <h2 className="text-xl mb-4">Choose your Pokémon, {username}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
            {pokemons.map((p) => (
              <div key={p.name} onClick={() => handleChoosePokemon(p)}>
                <PokemonCard name={p.name} image={p.image} power={p.power} />
              </div>
            ))}
          </div>
        </>
      )}
      {userPokemon && computerPokemon && (
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div>
            <h2 className="font-semibold mb-2">{username}</h2>
            <PokemonCard
              name={userPokemon.name}
              image={userPokemon.image}
              power={userPokemon.power}
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Computer</h2>
            <PokemonCard
              name={computerPokemon.name}
              image={computerPokemon.image}
              power={computerPokemon.power}
            />
          </div>
        </div>
      )}

      {winner && (
         <div className="flex flex-col items-center mt-8">      
      <h2 className="text-2xl font-bold mt-8">{winner}</h2>
      <button
            onClick={handlePlayAgain}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Play Again 🔁
          </button>
             </div>
          )}
    </div>
  )
}
// export default PokemonsCards;



    // https://pokeapi.co/api/v2
    // https://pokeapi.co/api/v2/pokemon/ditto

import axios from 'axios';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  sprite: string;
}

class PokemonService {
  async getPokemonList(limit: number = 20, offset: number = 0) {
    try {
      console.log(`Fetching ${limit} Pokémon from offset ${offset}`);
      const response = await axios.get(`${POKEMON_API_URL}/pokemon`, {
        params: { limit, offset }
      });
      
      // Just return basic info for list to avoid too many API calls
      const pokemonList = response.data.results.map((pokemon: any, index: number) => ({
        id: offset + index + 1,
        name: pokemon.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${offset + index + 1}.png`,
        types: []
      }));
      
      return {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: pokemonList
      };
    } catch (error: any) {
      console.error('Error fetching Pokémon list:', error.message);
      throw new Error('Failed to fetch Pokémon list');
    }
  }

  async getPokemonByName(nameOrId: string | number): Promise<Pokemon> {
    try {
      console.log(`Fetching Pokémon: ${nameOrId}`);
      const response = await axios.get(`${POKEMON_API_URL}/pokemon/${nameOrId}`);
      
      const pokemon: Pokemon = {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        types: response.data.types.map((t: any) => t.type.name),
        abilities: response.data.abilities.map((a: any) => a.ability.name),
        stats: {
          hp: response.data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
          attack: response.data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
          defense: response.data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
          specialAttack: response.data.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
          specialDefense: response.data.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
          speed: response.data.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
        },
        sprite: response.data.sprites.other?.['official-artwork']?.front_default || 
                response.data.sprites.front_default ||
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`
      };
      
      return pokemon;
    } catch (error: any) {
      console.error(`Error fetching Pokémon ${nameOrId}:`, error.message);
      throw new Error(`Pokémon ${nameOrId} not found`);
    }
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const randomId = Math.floor(Math.random() * 151) + 1; // Gen 1 only for better performance
    return this.getPokemonByName(randomId.toString());
  }

  async getPokemonTypes() {
    try {
      const response = await axios.get(`${POKEMON_API_URL}/type`);
      return response.data.results;
    } catch (error: any) {
      console.error('Error fetching Pokémon types:', error.message);
      throw new Error('Failed to fetch Pokémon types');
    }
  }

  async searchPokemon(query: string) {
    try {
      const response = await axios.get(`${POKEMON_API_URL}/pokemon?limit=1000`);
      const filtered = response.data.results.filter((pokemon: any) =>
        pokemon.name.includes(query.toLowerCase())
      );
      return filtered.slice(0, 20);
    } catch (error: any) {
      console.error('Error searching Pokémon:', error.message);
      throw new Error('Search failed');
    }
  }
}

export default new PokemonService();

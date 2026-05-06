// Use production URL from Render
const API_URL = 'https://pokgamebattle-backend.onrender.com/api';

export const pokemonApi = {
  getPokemonList: async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      return { success: false, error: error.message };
    }
  },

  getPokemon: async (nameOrId) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/${nameOrId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokémon ${nameOrId}:`, error);
      return { success: false, error: error.message };
    }
  },

  getRandomPokemon: async () => {
    try {
      const response = await fetch(`${API_URL}/pokemon/random`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
      return { success: false, error: error.message };
    }
  },

  searchPokemon: async (query) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/search?q=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching Pokémon:', error);
      return { success: false, error: error.message };
    }
  }
};

export default pokemonApi;

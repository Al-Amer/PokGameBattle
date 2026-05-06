// Direct connection to backend (CORS is now fixed)
const API_URL = 'https://pokgamebattle-backend.onrender.com/api';

export const pokemonApi = {
  getPokemonList: async (limit = 20, offset = 0) => {
    try {
      console.log('Fetching Pokémon from:', `${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
      const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Pokémon data received:', data.success ? 'Success' : 'Failed');
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      return { success: false, error: error.message };
    }
  },

  getPokemon: async (nameOrId) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/${nameOrId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokémon ${nameOrId}:`, error);
      return { success: false, error: error.message };
    }
  },

  getRandomPokemon: async () => {
    try {
      console.log('Fetching random Pokémon...');
      const response = await fetch(`${API_URL}/pokemon/random`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Random Pokémon received:', data.data?.name);
      return data;
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
      return { success: false, error: error.message };
    }
  },

  searchPokemon: async (query) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/search?q=${query}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching Pokémon:', error);
      return { success: false, error: error.message };
    }
  }
};

export default pokemonApi;

// Use CORS proxy to bypass CORS issues
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const BACKEND_URL = 'https://pokgamebattle-backend.onrender.com/api';

const API_URL = `${PROXY_URL}${BACKEND_URL}`;

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
  // ... other methods
};

export default pokemonApi;

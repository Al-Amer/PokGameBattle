const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://*.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', server: 'running', port: PORT, timestamp: new Date().toISOString() });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Backend is working!' });
});

// Random Pokémon endpoint
app.get('/api/pokemon/random', async (req, res) => {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = response.data;
    
    const pokemon = {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      sprite: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
      stats: {
        hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 100,
        attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 50,
        defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 50,
        speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 50,
      }
    };
    
    res.json({ success: true, data: pokemon });
  } catch (error) {
    console.error('Random Pokémon error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch random Pokémon' });
  }
});

// Pokémon list
app.get('/api/pokemon', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    
    const results = response.data.results.map((pokemon, index) => ({
      id: offset + index + 1,
      name: pokemon.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${offset + index + 1}.png`
    }));
    
    res.json({ success: true, data: { count: response.data.count, results } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch Pokémon' });
  }
});

// Single Pokémon
app.get('/api/pokemon/:nameOrId', async (req, res) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.nameOrId}`);
    const data = response.data;
    
    res.json({
      success: true,
      data: {
        id: data.id,
        name: data.name,
        types: data.types.map(t => t.type.name),
        sprite: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
        stats: {
          hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
          attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
          defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
          speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
        }
      }
    });
  } catch (error) {
    res.status(404).json({ success: false, error: 'Pokémon not found' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`🎲 Random Pokémon: http://localhost:${PORT}/api/pokemon/random`);
});

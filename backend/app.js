const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - Allow all origins for now (for testing)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://pokemonbattel.netlify.app',
  'https://*.netlify.app',
  'https://pokgamebattle.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.some(allowed => origin.includes(allowed.replace('*', '')))) {
      return callback(null, true);
    }
    
    // For development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    callback(new Error('CORS not allowed from this origin'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Logging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    server: 'running',
    port: PORT,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!'
  });
});

// Pokémon list endpoint
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
    
    res.json({
      success: true,
      data: {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: results
      }
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch Pokémon' });
  }
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

// Single Pokémon endpoint
app.get('/api/pokemon/:nameOrId', async (req, res) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.nameOrId}`);
    const data = response.data;
    
    const pokemon = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name),
      stats: {
        hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
        attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
        defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
        specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
        specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
        speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
      },
      sprite: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default
    };
    
    res.json({ success: true, data: pokemon });
  } catch (error) {
    res.status(404).json({ success: false, error: 'Pokémon not found' });
  }
});

// Search Pokémon endpoint
app.get('/api/pokemon/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }
    
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const filtered = response.data.results.filter(pokemon =>
      pokemon.name.includes(query.toLowerCase())
    ).slice(0, 20);
    
    res.json({ success: true, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 PokGameBattle Backend`);
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`📝 Health: http://0.0.0.0:${PORT}/api/health`);
  console.log(`🎲 Random Pokémon: http://0.0.0.0:${PORT}/api/pokemon/random`);
});

// This is a simplified entry point for Render
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import the compiled app
try {
  // Try to load the compiled TypeScript app
  const appModule = require('./dist/app');
  
  // If the app exports a function, call it
  if (typeof appModule === 'function') {
    appModule();
  }
} catch (error) {
  console.error('Error loading compiled app:', error.message);
  
  // Fallback: Start a simple server
  const app = express();
  const PORT = process.env.PORT || 5001;
  
  app.use(cors());
  app.use(express.json());
  
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      server: 'running',
      message: 'PokGameBattle API is running',
      timestamp: new Date().toISOString()
    });
  });
  
  app.get('/api/test', (req, res) => {
    res.json({ success: true, message: 'Backend is working!' });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

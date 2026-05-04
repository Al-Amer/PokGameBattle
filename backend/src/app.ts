import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { testDatabaseConnection } from './config/database';
import syncDatabase from './utils/syncDatabase';
import pokemonRoutes from './routes/pokemonRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

// Dynamic CORS for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://pokgamebattle.netlify.app',
  'https://pokgamebattle.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  let dbStatus = 'disconnected';
  try {
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'disconnected';
  }
  
  res.json({ 
    status: 'OK',
    server: 'running',
    database: dbStatus,
    port: PORT,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    data: {
      frontend: process.env.FRONTEND_URL || 'http://localhost:5173',
      backend: `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost'}`
    }
  });
});

// Pokémon routes
app.use('/api/pokemon', pokemonRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with database
const startServer = async () => {
  const dbConnected = await testDatabaseConnection();
  
  if (dbConnected && process.env.NODE_ENV !== 'production') {
    await syncDatabase();
  }
  
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Health: http://localhost:${PORT}/api/health`);
    console.log(`🎮 Pokémon API: http://localhost:${PORT}/api/pokemon`);
    console.log(`💾 Database: ${dbConnected ? 'Connected ✅' : 'Disconnected ❌'}\n`);
  });
};

startServer();

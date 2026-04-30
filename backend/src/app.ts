import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { testDatabaseConnection } from './config/database';
import syncDatabase from './utils/syncDatabase';
import pokemonRoutes from './routes/pokemonRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

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
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    data: {
      frontend: 'http://localhost:5173',
      backend: `http://localhost:${PORT}`
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
  
  if (dbConnected) {
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

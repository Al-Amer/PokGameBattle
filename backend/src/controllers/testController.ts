import { Request, Response } from 'express';

export const testConnection = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Backend is connected!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      test: '/api/test',
      pokemon: '/api/pokemon (coming soon)',
      battle: '/api/battle (coming soon)'
    }
  });
};

export const getServerInfo = (req: Request, res: Response) => {
  res.json({
    name: 'PokGameBattle API',
    version: '1.0.0',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
};

# Deployment Guide for PokGameBattle

## Deploy Backend to Railway (Recommended - Free)

1. Push code to GitHub
2. Go to https://railway.app
3. Connect GitHub repository
4. Select backend directory
5. Add environment variables:
   - PORT=5001
   - DB_NAME=pokgamebattle
   - DB_USER=...
   - DB_PASSWORD=...
   - JWT_SECRET=...
   - POKEMON_API_URL=https://pokeapi.co/api/v2
6. Deploy!

## Deploy Frontend to Vercel (Free)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import frontend directory from GitHub
4. Add environment variable:
   - VITE_API_URL=your_backend_url/api
5. Deploy!

## Deploy PostgreSQL to Supabase (Free)

1. Sign up at https://supabase.com
2. Create new project
3. Get connection string
4. Update backend DATABASE_URL

## Alternative: Deploy everything on Render

1. Backend: Create Web Service
2. Frontend: Create Static Site
3. Database: Use Render PostgreSQL

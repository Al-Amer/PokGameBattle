# 🎮 PokGameBattle

A full-stack Pokémon battle game built with React, Node.js, TypeScript, and PostgreSQL.

 Live Project URLs:**

- 🌐 **Frontend:** [https://pokemonbattel.netlify.app](https://pokemonbattel.netlify.app/)
    
- 🔧 **Backend API:** [https://pokgamebattle-backend.onrender.com](https://pokgamebattle-backend.onrender.com/)
    
- 📝 **Health Check:** [https://pokgamebattle-backend.onrender.com/api/health](https://pokgamebattle-backend.onrender.com/api/health)

## Features

- 🎯 **Pokémon API Integration** - Real Pokémon data from PokeAPI
- ⚔️ **Battle System** - Turn-based Pokémon battles
- 👤 **User Authentication** - Register/Login with JWT
- 💾 **Database** - PostgreSQL with user profiles and battle history
- 🎨 **Modern UI** - Tailwind CSS with responsive design
- 🚀 **Full Stack** - React frontend + Node.js/TypeScript backend

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Icons

**Backend:**
- Node.js with TypeScript
- Express.js
- PostgreSQL with Sequelize
- JWT Authentication
- Bcrypt for passwords

**APIs:**
- PokeAPI (https://pokeapi.co/)

API Endpoints

GET /api/health - Health check
GET /api/pokemon - List Pokémon
GET /api/pokemon/:name - Get Pokémon details
GET /api/pokemon/random - Random Pokémon
POST /api/auth/register - User registration
POST /api/auth/login - User login

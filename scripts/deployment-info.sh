#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "🚀 PokGameBattle - Live Deployment"
echo "========================================="

echo -e "\n${GREEN}✅ Backend (Render):${NC}"
echo "   URL: https://pokgamebattle-backend.onrender.com"
echo "   Health: https://pokgamebattle-backend.onrender.com/api/health"
echo "   Pokémon: https://pokgamebattle-backend.onrender.com/api/pokemon?limit=5"

echo -e "\n${GREEN}✅ Frontend (Netlify):${NC}"
echo "   URL: https://YOUR-SITE.netlify.app (replace with your actual URL)"

echo -e "\n${BLUE}📝 Next Steps:${NC}"
echo "   1. Update your Netlify site name to something memorable"
echo "   2. Add custom domain if you have one"
echo "   3. Update the About Me page with your live URLs"
echo "   4. Add the project to your CV/Portfolio"

echo "========================================="

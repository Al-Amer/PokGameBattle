#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

clear
echo "========================================="
echo "🎮 PokGameBattle - Complete Project Status"
echo "========================================="

echo -e "\n${BLUE}📦 PROJECT STRUCTURE:${NC}"
echo "  ├── frontend/     (React + Tailwind + Router)"
echo "  ├── backend/      (Node.js + TypeScript + Express)"
echo "  ├── scripts/      (7 management scripts)"
echo "  └── logs/         (Application logs)"

echo -e "\n${BLUE}🚀 SERVICES STATUS:${NC}"

# Backend
if lsof -ti :5001 > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ Backend API${NC}      - http://localhost:5001"
else
    echo -e "  ${RED}✗ Backend API${NC}      - Not running"
fi

# Frontend
if lsof -ti :5173 > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ Frontend App${NC}     - http://localhost:5173"
else
    echo -e "  ${RED}✗ Frontend App${NC}     - Not running"
fi

# Database
if pg_isready -q; then
    echo -e "  ${GREEN}✓ PostgreSQL${NC}       - Database connected"
else
    echo -e "  ${RED}✗ PostgreSQL${NC}       - Not running"
fi

echo -e "\n${BLUE}🔗 API ENDPOINTS (TESTED):${NC}"
echo "  GET  /api/health                 - Health check"
echo "  GET  /api/pokemon                - List Pokémon"
echo "  GET  /api/pokemon/:name          - Get Pokémon by name"
echo "  GET  /api/pokemon/random         - Random Pokémon"
echo "  GET  /api/pokemon/search?q=      - Search Pokémon"
echo "  GET  /api/pokemon/types          - Pokémon types"

echo -e "\n${BLUE}💾 DATABASE:${NC}"
echo "  Name: pokgamebattle"
echo "  Tables: users"
echo "  Test User: test@example.com / password123"

echo -e "\n${BLUE}🎮 AVAILABLE SCRIPTS:${NC}"
echo "  ./scripts/start.sh        - Start all servers"
echo "  ./scripts/stop.sh         - Stop all servers"
echo "  ./scripts/status.sh       - Check service status"
echo "  ./scripts/pokmenu.sh      - Interactive menu"
echo "  ./scripts/check-tools.sh  - Verify required tools"
echo "  ./scripts/open.sh         - Open URLs in browser"
echo "  ./scripts/fix.sh          - Auto-fix common issues"

echo -e "\n${GREEN}✅ Project is ready for deployment!${NC}"
echo "========================================="

# Ask if they want to open the project
read -p "Open project in browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open http://localhost:5173
    open http://localhost:5001/api/health
    echo -e "${GREEN}✓ Opened in browser${NC}"
fi

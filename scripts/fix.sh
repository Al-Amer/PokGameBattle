#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "🔧 PokGameBattle - Auto Fix Tool"
echo "========================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Stop all servers
echo -e "${BLUE}1. Stopping all servers...${NC}"
./scripts/stop.sh

# Clear logs
echo -e "${BLUE}2. Clearing logs...${NC}"
rm -f "$PROJECT_ROOT/logs/"*.log
mkdir -p "$PROJECT_ROOT/logs"

# Check and install dependencies
echo -e "${BLUE}3. Checking dependencies...${NC}"

if [ ! -d "$PROJECT_ROOT/frontend/node_modules" ]; then
    echo -e "${YELLOW}   Installing frontend dependencies...${NC}"
    cd "$PROJECT_ROOT/frontend" && npm install
else
    echo -e "${GREEN}   Frontend dependencies OK${NC}"
fi

if [ ! -d "$PROJECT_ROOT/backend/node_modules" ]; then
    echo -e "${YELLOW}   Installing backend dependencies...${NC}"
    cd "$PROJECT_ROOT/backend" && npm install
else
    echo -e "${GREEN}   Backend dependencies OK${NC}"
fi

# Clean ports
echo -e "${BLUE}4. Cleaning ports...${NC}"
lsof -ti :5173 | xargs kill -9 2>/dev/null
lsof -ti :5001 | xargs kill -9 2>/dev/null

# Create .env files if missing
if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
    echo -e "${YELLOW}   Creating backend .env file...${NC}"
    cat > "$PROJECT_ROOT/backend/.env" << 'ENVEOF'
PORT=5001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
POKEMON_API_URL=https://pokeapi.co/api/v2
ENVEOF
fi

if [ ! -f "$PROJECT_ROOT/frontend/.env" ]; then
    echo -e "${YELLOW}   Creating frontend .env file...${NC}"
    echo "VITE_API_URL=http://localhost:5001/api" > "$PROJECT_ROOT/frontend/.env"
fi

# Check if ports are now available
echo -e "${BLUE}5. Verifying ports...${NC}"
if lsof -i :5001 > /dev/null 2>&1; then
    echo -e "${RED}   Port 5001 still in use${NC}"
else
    echo -e "${GREEN}   Port 5001 is free${NC}"
fi

if lsof -i :5173 > /dev/null 2>&1; then
    echo -e "${RED}   Port 5173 still in use${NC}"
else
    echo -e "${GREEN}   Port 5173 is free${NC}"
fi

echo ""
echo -e "${GREEN}✅ Fix complete! You can now run: ./scripts/start.sh${NC}"
echo "========================================="

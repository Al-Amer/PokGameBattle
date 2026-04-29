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

# Check node_modules
echo -e "${BLUE}3. Checking dependencies...${NC}"

if [ ! -d "$PROJECT_ROOT/frontend/node_modules" ]; then
    echo -e "${YELLOW}   Installing frontend dependencies...${NC}"
    cd "$PROJECT_ROOT/frontend" && npm install
fi

if [ ! -d "$PROJECT_ROOT/backend/node_modules" ]; then
    echo -e "${YELLOW}   Installing backend dependencies...${NC}"
    cd "$PROJECT_ROOT/backend" && npm install
fi

# Check ports
echo -e "${BLUE}4. Checking ports...${NC}"
lsof -ti :5173 | xargs kill -9 2>/dev/null
lsof -ti :5000 | xargs kill -9 2>/dev/null

# Create .env files if missing
if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
    echo -e "${YELLOW}   Creating backend .env file...${NC}"
    echo "PORT=5000" > "$PROJECT_ROOT/backend/.env"
    echo "NODE_ENV=development" >> "$PROJECT_ROOT/backend/.env"
    echo "JWT_SECRET=test-secret" >> "$PROJECT_ROOT/backend/.env"
fi

if [ ! -f "$PROJECT_ROOT/frontend/.env" ]; then
    echo -e "${YELLOW}   Creating frontend .env file...${NC}"
    echo "VITE_API_URL=http://localhost:5000/api" > "$PROJECT_ROOT/frontend/.env"
fi

echo -e "${GREEN}✅ Fix complete! You can now run: ./start.sh${NC}"
echo "========================================="

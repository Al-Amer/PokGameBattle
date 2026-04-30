#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "🎮 PokGameBattle - Starting Project"
echo "========================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Create logs directory
mkdir -p "$PROJECT_ROOT/logs"

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to kill process on a port
kill_port() {
    if check_port $1; then
        echo -e "${YELLOW}⚠️  Port $1 is in use. Killing process...${NC}"
        lsof -ti :$1 | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

# Kill existing processes
echo -e "${BLUE}🔧 Cleaning up ports...${NC}"
kill_port 5173
kill_port 5001

# Start Backend
echo -e "${BLUE}🚀 Starting Backend Server...${NC}"
cd "$PROJECT_ROOT/backend"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    npm install
fi

npm run dev > "$PROJECT_ROOT/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}✓ Backend running on http://localhost:5001${NC}"

sleep 5

if ! check_port 5001; then
    echo -e "${RED}❌ Backend failed to start. Check logs/backend.log${NC}"
    exit 1
fi

# Start Frontend
echo -e "${BLUE}🎨 Starting Frontend Server...${NC}"
cd "$PROJECT_ROOT/frontend"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    npm install
fi

npm run dev > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo -e "${GREEN}✓ Frontend running on http://localhost:5173${NC}"

sleep 5

if ! check_port 5173; then
    echo -e "${RED}❌ Frontend failed to start. Check logs/frontend.log${NC}"
    exit 1
fi

# Save PIDs
echo "$BACKEND_PID" > "$PROJECT_ROOT/.pids"
echo "$FRONTEND_PID" >> "$PROJECT_ROOT/.pids"

echo ""
echo "========================================="
echo -e "${GREEN}✅ Both servers are running!${NC}"
echo "========================================="
echo -e "${BLUE}📡 Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}🔧 Backend:${NC}  http://localhost:5001"
echo -e "${BLUE}📝 Health:${NC}   http://localhost:5001/api/health"
echo ""
echo -e "${YELLOW}📋 Logs: logs/frontend.log | logs/backend.log${NC}"
echo -e "${YELLOW}🛑 Stop: ./scripts/stop.sh${NC}"
echo "========================================="

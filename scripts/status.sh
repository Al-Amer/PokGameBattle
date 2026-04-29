#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "📊 PokGameBattle - Project Status"
echo "========================================="

# Check backend (port 5001)
if lsof -ti :5001 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend:${NC} Running on http://localhost:5001"
    if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}  └─ Health check: OK${NC}"
    else
        echo -e "${YELLOW}  └─ Health check: Not responding${NC}"
    fi
else
    echo -e "${RED}✗ Backend:${NC} Not running"
fi

# Check frontend (port 5173)
if lsof -ti :5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend:${NC} Running on http://localhost:5173"
else
    echo -e "${RED}✗ Frontend:${NC} Not running"
fi

echo "========================================="

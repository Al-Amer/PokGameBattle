#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "📊 PokGameBattle - Project Status"
echo "========================================="

# Check backend
if lsof -ti :5001 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend: Running on port 5001${NC}"
    if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
        DB_STATUS=$(curl -s http://localhost:5001/api/health | grep -o '"database":"[^"]*"' | cut -d'"' -f4)
        echo -e "${GREEN}  └─ Database: ${DB_STATUS}${NC}"
    fi
else
    echo -e "${RED}✗ Backend: Not running${NC}"
fi

# Check frontend
if lsof -ti :5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend: Running on port 5173${NC}"
else
    echo -e "${RED}✗ Frontend: Not running${NC}"
fi

echo "========================================="

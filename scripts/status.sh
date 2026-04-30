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
        # Get backend info
        BACKEND_INFO=$(curl -s http://localhost:5001/api/health)
        echo -e "${BLUE}  └─ Info:${NC} $(echo $BACKEND_INFO | grep -o '"status":"[^"]*"' | cut -d'"' -f4)"
    else
        echo -e "${YELLOW}  └─ Health check: Not responding${NC}"
    fi
else
    echo -e "${RED}✗ Backend:${NC} Not running"
fi

echo ""

# Check frontend (port 5173)
if lsof -ti :5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend:${NC} Running on http://localhost:5173"
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo -e "${GREEN}  └─ Status: OK${NC}"
    else
        echo -e "${YELLOW}  └─ Status: Not responding${NC}"
    fi
else
    echo -e "${RED}✗ Frontend:${NC} Not running"
fi

echo ""

# Show PIDs if running
if [ -f "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.pids" ]; then
    echo -e "${BLUE}📋 Saved PIDs:${NC}"
    cat "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.pids"
fi

echo "========================================="

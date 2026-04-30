#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "🌐 Opening PokGameBattle URLs"
echo "========================================="

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}📡 Opening frontend...${NC}"
    open http://localhost:5173
    
    sleep 1
    
    echo -e "${BLUE}🔧 Opening backend health check...${NC}"
    open http://localhost:5001/api/health
    
    echo -e "${GREEN}✅ URLs opened in browser!${NC}"
else
    echo -e "${BLUE}📡 Frontend: http://localhost:5173${NC}"
    echo -e "${BLUE}🔧 Backend: http://localhost:5001${NC}"
    echo -e "${BLUE}📝 Health: http://localhost:5001/api/health${NC}"
fi

echo "========================================="

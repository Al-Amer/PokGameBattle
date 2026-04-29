#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "🛑 PokGameBattle - Stopping Project"
echo "========================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Kill by PID file
if [ -f "$PROJECT_ROOT/.pids" ]; then
    echo -e "${BLUE}📋 Stopping processes from PID file...${NC}"
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${YELLOW}🔴 Killing PID: $pid${NC}"
            kill -9 $pid 2>/dev/null
        fi
    done < "$PROJECT_ROOT/.pids"
    rm "$PROJECT_ROOT/.pids"
fi

# Clean up ports
echo -e "${BLUE}🔧 Cleaning up ports...${NC}"
lsof -ti :5173 | xargs kill -9 2>/dev/null
lsof -ti :5001 | xargs kill -9 2>/dev/null

echo -e "${GREEN}✅ All servers stopped!${NC}"
echo "========================================="

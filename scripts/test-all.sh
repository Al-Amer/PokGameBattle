#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================="
echo "🧪 PokGameBattle - Complete System Test"
echo "========================================="

# Test 1: Backend Health
echo -e "\n${BLUE}Test 1: Backend Health Check${NC}"
if curl -s http://localhost:5001/api/health | grep -q "connected"; then
    echo -e "${GREEN}✓ Backend is healthy${NC}"
else
    echo -e "${RED}✗ Backend health check failed${NC}"
fi

# Test 2: Database Connection
echo -e "\n${BLUE}Test 2: Database Connection${NC}"
DB_STATUS=$(curl -s http://localhost:5001/api/health | grep -o '"database":"[^"]*"' | cut -d'"' -f4)
if [ "$DB_STATUS" = "connected" ]; then
    echo -e "${GREEN}✓ Database is connected${NC}"
else
    echo -e "${RED}✗ Database connection failed${NC}"
fi

# Test 3: Frontend
echo -e "\n${BLUE}Test 3: Frontend Check${NC}"
if curl -s http://localhost:5173 > /dev/null; then
    echo -e "${GREEN}✓ Frontend is running${NC}"
else
    echo -e "${RED}✗ Frontend is not running${NC}"
fi

# Test 4: Database Tables
echo -e "\n${BLUE}Test 4: Database Tables${NC}"
if psql -d pokgamebattle -c "\dt" 2>/dev/null | grep -q "users"; then
    echo -e "${GREEN}✓ Users table exists${NC}"
else
    echo -e "${RED}✗ Users table missing${NC}"
fi

# Test 5: Test User
echo -e "\n${BLUE}Test 5: Test User${NC}"
if psql -d pokgamebattle -c "SELECT * FROM users WHERE username='testuser'" 2>/dev/null | grep -q "testuser"; then
    echo -e "${GREEN}✓ Test user exists${NC}"
else
    echo -e "${YELLOW}⚠ No test user found${NC}"
fi

echo ""
echo "========================================="
echo -e "${GREEN}✅ Tests Complete!${NC}"
echo "========================================="

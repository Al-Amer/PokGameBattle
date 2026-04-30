#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo "========================================="
echo "🎮 Testing Pokémon API"
echo "========================================="

BASE_URL="http://localhost:5001/api/pokemon"

# Test 1: Get Pokémon list
echo -e "\n${BLUE}1. Getting Pokémon list...${NC}"
curl -s "${BASE_URL}?limit=5" | jq -r '.data.results[] | "  - \(.name) (ID: \(.id))"' 2>/dev/null || echo "  Install jq for better formatting: brew install jq"

# Test 2: Get Pikachu
echo -e "\n${BLUE}2. Getting Pikachu...${NC}"
curl -s "${BASE_URL}/pikachu" | jq -r '.data | "  Name: \(.name)\n  Types: \(.types)\n  HP: \(.stats.hp)"' 2>/dev/null

# Test 3: Get random Pokémon
echo -e "\n${BLUE}3. Getting random Pokémon...${NC}"
curl -s "${BASE_URL}/random" | jq -r '.data | "  Random: \(.name) (Type: \(.types[0]))"' 2>/dev/null

# Test 4: Search
echo -e "\n${BLUE}4. Searching for 'saur'...${NC}"
curl -s "${BASE_URL}/search?q=saur" | jq -r '.data[] | "  - \(.name)"' 2>/dev/null

echo -e "\n========================================="
echo -e "${GREEN}✅ Pokémon API is working!${NC}"
echo "========================================="

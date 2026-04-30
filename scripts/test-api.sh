#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo "========================================="
echo "🎮 Testing Pokémon API"
echo "========================================="

BASE_URL="http://localhost:5001/api"

# Test health
echo -e "\n${BLUE}1. Health Check:${NC}"
curl -s "${BASE_URL}/health" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/health"

# Test Pokémon list
echo -e "\n\n${BLUE}2. Pokémon List (first 3):${NC}"
curl -s "${BASE_URL}/pokemon?limit=3" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/pokemon?limit=3"

# Test single Pokémon
echo -e "\n\n${BLUE}3. Get Pikachu:${NC}"
curl -s "${BASE_URL}/pokemon/pikachu" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/pokemon/pikachu"

# Test random
echo -e "\n\n${BLUE}4. Random Pokémon:${NC}"
curl -s "${BASE_URL}/pokemon/random" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/pokemon/random"

echo -e "\n\n========================================="

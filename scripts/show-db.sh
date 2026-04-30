#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================="
echo "💾 PokGameBattle - Database Content"
echo "========================================="

# Check if database exists
if psql -lqt | cut -d \| -f 1 | grep -qw pokgamebattle; then
    echo -e "${GREEN}✓ Database 'pokgamebattle' exists${NC}"
else
    echo -e "${YELLOW}✗ Database does not exist${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📊 Tables:${NC}"
psql -d pokgamebattle -c "\dt"

echo ""
echo -e "${BLUE}👥 Users:${NC}"
psql -d pokgamebattle -c "SELECT id, username, email, wins, losses, "totalBattles", "favoritePokemon" FROM users;"

echo ""
echo -e "${BLUE}📈 Database Stats:${NC}"
psql -d pokgamebattle -c "SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT SUM(wins) FROM users) as total_wins,
    (SELECT SUM(losses) FROM users) as total_losses;"

echo "========================================="

#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "🔧 PokGameBattle - Tools Verification"
echo "========================================="

# Required tools and their version commands
declare -A tools=(
    ["Node.js"]="node --version"
    ["npm"]="npm --version"
    ["git"]="git --version"
    ["curl"]="curl --version"
    ["PostgreSQL"]="psql --version"
)

all_installed=true

# Check each tool
for tool in "${!tools[@]}"; do
    echo -n "Checking $tool... "
    cmd=$(echo "${tools[$tool]}" | cut -d' ' -f1)
    if command -v $cmd &> /dev/null; then
        version=$(${tools[$tool]} 2>&1 | head -n1)
        echo -e "${GREEN}✓ Found${NC} ($version)"
    else
        echo -e "${RED}✗ Not found${NC}"
        all_installed=false
    fi
done

echo ""

# Check Node.js version (should be >= 14)
if command -v node &> /dev/null; then
    node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ $node_version -ge 14 ]; then
        echo -e "${GREEN}✓ Node.js version OK (>=14)${NC}"
    else
        echo -e "${YELLOW}⚠ Node.js version $node_version (recommended >=14)${NC}"
    fi
fi

# Check ports
echo ""
echo -e "${BLUE}📡 Port Status:${NC}"
if lsof -i :5173 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Port 5173 (Frontend): In use${NC}"
else
    echo -e "${GREEN}✓ Port 5173 (Frontend): Available${NC}"
fi

if lsof -i :5001 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Port 5001 (Backend): In use${NC}"
else
    echo -e "${GREEN}✓ Port 5001 (Backend): Available${NC}"
fi

echo "========================================="

if [ "$all_installed" = true ]; then
    echo -e "${GREEN}✓ All required tools are installed!${NC}"
    echo "You can proceed with the project."
else
    echo -e "${RED}✗ Missing required tools. Please install missing tools.${NC}"
    echo ""
    echo "Installation guides:"
    echo "- Node.js/npm: https://nodejs.org/"
    echo "- git: https://git-scm.com/downloads"
    echo "- PostgreSQL: https://www.postgresql.org/download/"
fi
echo "========================================="

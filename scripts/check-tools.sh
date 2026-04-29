#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "PokGameBattle - Tools Verification"
echo "========================================="

# Array of tools to check with their check commands
declare -A tools=(
    ["Node.js"]="node --version"
    ["npm"]="npm --version"
    ["git"]="git --version"
    ["curl"]="curl --version"
)

all_installed=true

# Check each tool
for tool in "${!tools[@]}"; do
    echo -n "Checking $tool... "
    if command -v ${tool,,} &> /dev/null; then
        version=$(${tools[$tool]} 2>&1 | head -n1)
        echo -e "${GREEN}✓ Found${NC} ($version)"
    else
        echo -e "${RED}✗ Not found${NC}"
        all_installed=false
    fi
done

# Check Node.js version (should be >= 14)
if command -v node &> /dev/null; then
    node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ $node_version -ge 14 ]; then
        echo -e "${GREEN}✓ Node.js version OK (>=14)${NC}"
    else
        echo -e "${YELLOW}⚠ Node.js version $node_version (recommended >=14)${NC}"
    fi
fi

echo "========================================="

if [ "$all_installed" = true ]; then
    echo -e "${GREEN}✓ All required tools are installed!${NC}"
    echo "You can proceed with the project setup."
    exit 0
else
    echo -e "${RED}✗ Missing required tools. Please install missing tools and try again.${NC}"
    echo ""
    echo "Installation guides:"
    echo "- Node.js/npm: https://nodejs.org/"
    echo "- git: https://git-scm.com/downloads"
    echo "- curl (usually pre-installed on Mac/Linux)"
    exit 1
fi
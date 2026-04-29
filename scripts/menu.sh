#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

clear

echo "========================================="
echo "       🎮 PokGameBattle Manager"
echo "========================================="
echo ""
echo -e "${BLUE}Please select an option:${NC}"
echo ""
echo "1) 🚀 Start all servers"
echo "2) 🛑 Stop all servers"
echo "3) 📊 Check status"
echo "4) 🌐 Open URLs in browser"
echo "5) 📋 View logs (frontend)"
echo "6) 📋 View logs (backend)"
echo "7) 📋 View all logs (combined)"
echo "8) 🔄 Restart all servers"
echo "9) 🧹 Clean install (delete node_modules and reinstall)"
echo "0) ❌ Exit"
echo ""
read -p "Enter choice [0-9]: " choice

case $choice in
    1)
        ./scripts/start.sh
        ;;
    2)
        ./scripts/stop.sh
        ;;
    3)
        ./scripts/status.sh
        ;;
    4)
        ./scripts/open.sh
        ;;
    5)
        tail -f logs/frontend.log
        ;;
    6)
        tail -f logs/backend.log
        ;;
    7)
        tail -f logs/frontend.log logs/backend.log
        ;;
    8)
        ./scripts/stop.sh
        sleep 2
        ./scripts/start.sh
        ;;
    9)
        echo -e "${YELLOW}Cleaning node_modules...${NC}"
        cd ../frontend && rm -rf node_modules package-lock.json
        cd ../backend && rm -rf node_modules package-lock.json
        echo -e "${GREEN}Clean complete. Run start.sh to reinstall.${NC}"
        ;;
    0)
        echo -e "${GREEN}Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid option${NC}"
        ;;
esac

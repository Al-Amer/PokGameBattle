# PokGameBattle Scripts

## Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `start.sh` | Starts frontend and backend servers | `./scripts/start.sh` |
| `stop.sh` | Stops all running servers | `./scripts/stop.sh` |
| `status.sh` | Shows current server status | `./scripts/status.sh` |
| `pokmenu.sh` | Interactive menu with all options | `./scripts/pokmenu.sh` |
| `check-tools.sh` | Verifies required tools are installed | `./scripts/check-tools.sh` |
| `open.sh` | Opens project URLs in browser | `./scripts/open.sh` |
| `fix.sh` | Auto-fixes common issues | `./scripts/fix.sh` |

## Quick Access (from root)
- `./start.sh` or `./scripts/start.sh`
- `./stop.sh` or `./scripts/stop.sh`
- `./menu.sh` or `./scripts/pokmenu.sh`

## Ports Used
- Frontend: http://localhost:5173
- Backend: http://localhost:5001
- Health Check: http://localhost:5001/api/health

## Logs Location
- Frontend logs: `logs/frontend.log`
- Backend logs: `logs/backend.log`

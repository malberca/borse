#!/usr/bin/env bash
set -euo pipefail

MARS_HOST="${MARS_HOST:-mars-u}"
MARS_APP_DIR="${MARS_APP_DIR:-/home/ubuntu/borse}"
MARS_PM2_APP="${MARS_PM2_APP:-borse-next}"
MARS_HEALTH_URL="${MARS_HEALTH_URL:-http://127.0.0.1:3016}"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'EOF'
Usage:
  npm run deploy:mars -- [branch]

Environment overrides:
  MARS_HOST       SSH host alias/user (default: mars-u)
  MARS_APP_DIR    App directory in server (default: /home/ubuntu/borse)
  MARS_PM2_APP    PM2 process name (default: borse-next)
  MARS_HEALTH_URL Health URL from server (default: http://127.0.0.1:3016)
EOF
  exit 0
fi

current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "${current_branch}" == "HEAD" ]]; then
  current_branch="main"
fi

target_branch="${1:-$current_branch}"

echo "Deploying branch '${target_branch}' to '${MARS_HOST}'..."
echo "Remote dir: ${MARS_APP_DIR} | PM2 app: ${MARS_PM2_APP}"

ssh "${MARS_HOST}" "set -euo pipefail; \
  cd '${MARS_APP_DIR}'; \
  git fetch origin; \
  git checkout '${target_branch}'; \
  git pull --ff-only origin '${target_branch}'; \
  npm run build; \
  pm2 restart '${MARS_PM2_APP}'; \
  pm2 status '${MARS_PM2_APP}'; \
  git log --oneline -n 1; \
  curl -I -sS '${MARS_HEALTH_URL}' | head -n 1"

echo "Deploy finished."

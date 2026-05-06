#!/bin/bash
cd "$(dirname "$0")"

# Ensure rolldown native binding matches this platform.
# If require('rolldown') fails, the lockfile was generated on another OS —
# nuke node_modules + lockfile and reinstall fresh.
if ! node -e "require('rolldown')" >/dev/null 2>&1; then
  echo "Rebuilding node_modules for this platform..."
  rm -rf node_modules package-lock.json
  npm install
fi

exec npm run dev

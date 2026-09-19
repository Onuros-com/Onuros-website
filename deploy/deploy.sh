#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-dist}"
TARGET_DIR="/srv/onuros/current"

if [[ ! -f "${SOURCE_DIR}/index.html" ]]; then
  echo "Missing static site output: ${SOURCE_DIR}/index.html" >&2
  exit 1
fi

sudo install -d -o ubuntu -g ubuntu "${TARGET_DIR}"
sudo rsync -a --delete "${SOURCE_DIR}/" "${TARGET_DIR}/"
sudo install -m 0644 deploy/Caddyfile /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy

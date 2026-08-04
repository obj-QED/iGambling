#!/usr/bin/env bash
# Headroom LLM optimization proxy (local). Output shaper is opt-in (off by default upstream).
# Docs: https://headroom-docs.vercel.app/docs/savings
set -euo pipefail

export HEADROOM_OUTPUT_SHAPER="${HEADROOM_OUTPUT_SHAPER:-1}"
PORT="${HEADROOM_PORT:-8787}"

if ! command -v headroom >/dev/null 2>&1; then
  echo "headroom CLI not found. Install: https://github.com/chopratejas/headroom" >&2
  exit 1
fi

if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port ${PORT} is already in use. Free it, or set HEADROOM_PORT to another port." >&2
  lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >&2 || true
  exit 1
fi

echo "Starting Headroom proxy on :${PORT} (HEADROOM_OUTPUT_SHAPER=${HEADROOM_OUTPUT_SHAPER})"
exec headroom proxy --port "${PORT}"

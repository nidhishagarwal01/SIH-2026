#!/bin/bash
# Heritage Shield - One-Click Launch Script (SIH 2026 - Team 031)

echo "=========================================================="
echo "🏛️  STARTING HERITAGE SHIELD (FastAPI + React 19 + Three.js)"
echo "=========================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Start Python FastAPI Backend in background
echo "▶ [1/2] Starting FastAPI Backend on http://localhost:8000..."
cd "$ROOT_DIR/heritage-shield-backend"
./venv/bin/python -m uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# 2. Start React Vite Frontend
echo "▶ [2/2] Starting React Frontend on http://localhost:5173..."
cd "$ROOT_DIR/heritage-shield-ui"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✨ Heritage Shield is running live!"
echo "   - Web Platform:  http://localhost:5173"
echo "   - Backend API:   http://localhost:8000/docs"
echo ""
echo "Press [CTRL+C] to stop all services."

# Trap SIGINT to kill background services on exit
trap "kill $BACKEND_PID $FRONTEND_PID; echo 'Heritage Shield stopped.'; exit 0" INT
wait

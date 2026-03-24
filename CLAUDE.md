# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start development server with hot reload (nodemon)
npm start      # Start production server
npx eslint .   # Lint all JS files
```

No test framework is configured.

## Architecture

Express.js REST API using **ES6 modules** (`"type": "module"` in package.json).

**Entry point**: `app.js` — registers routes and starts the server on `PORT` (default 5500 in dev).

**API prefix**: all routes live under `/api/v1/`

**Route modules** in `routes/`:

- `auth.routes.js` → `/api/v1/auth` — sign-up, sign-in, sign-out
- `user.routes.js` → `/api/v1/users` — CRUD
- `subscription.routes.js` → `/api/v1/subscriptions` — CRUD + cancel, upcoming-renewals, user subscriptions

**Environment config**: `config/env.js` loads from `.env.{NODE_ENV}.local` via dotenv and exports `PORT` and `NODE_ENV`. The `.env.development.local` file sets `PORT=5500`.

All route handlers are currently scaffolded with placeholder responses — no database or authentication middleware is implemented yet.

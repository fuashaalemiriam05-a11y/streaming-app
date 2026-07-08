# StreamCM Monorepo

This workspace contains an initial scaffold for the StreamCM platform with:

- client/: React + Vite + Tailwind + feature-based frontend structure
- server/: Express + Prisma + Redis + BullMQ backend structure
- Docker Compose and GitHub Actions workflow for local and CI execution

## Structure Highlights
- Frontend features: auth, catalog, player, creator-studio, billing, moderation
- Backend modules: auth, users, catalog, uploads, playback, billing, notifications, moderation, analytics
- Shared API envelope: { data, meta, error }

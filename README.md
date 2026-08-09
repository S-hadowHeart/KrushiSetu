# KrushiSetu

KrushiSetu is a marketplace project connecting farmers, buyers, hotels, NGOs, and other stakeholders. This repository contains two main parts:

- `backend-api` — Express/Prisma API with auth, goods/needs management, offers, messaging, verification, ratings, file uploads, and admin moderation.
- `frontend` — React + Vite application for browsing listings, making offers, messaging, and admin workflows.

## Quick start

### 1. Backend setup

```bash
cd backend-api
npm install
cp .env.example .env
# edit .env values for your database, JWT secret, SMTP, and frontend URL
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

The backend runs by default on `http://localhost:4000`.

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# edit VITE_API_URL to match your backend
npm run dev
```

The frontend runs by default on a Vite port like `http://localhost:5173`.

## Folder structure

- `backend-api/`
  - `src/` — API routes, controllers, middleware, services, validators, and utilities
  - `prisma/` — schema, migrations, and seed data
  - `uploads/` — uploaded file storage
- `frontend/`
  - `src/` — pages, components, routing, API clients, hooks, and utilities
  - `public/` — static assets for the frontend

## How it works

- Users register and verify their email before logging in.
- Farmers create goods listings with image uploads.
- Buyers create needs and submit offers.
- Offers can be accepted, declined, or countered.
- Users can message each other from listings and offer pages.
- Admins can manage users, goods, needs, offers, messages, and verifications.

## Recommended workflow

1. Start your PostgreSQL database.
2. Configure backend `.env`.
3. Run backend migrations and seed.
4. Start backend in dev mode.
5. Start frontend in dev mode.
6. Open the frontend and sign in.

## Notes

- Public goods and needs are identified by UUID-based `publicId` paths.
- Backend authentication uses an in-memory access token and a refresh cookie.
- The frontend expects the backend to allow CORS for the configured origin.

## Additional resources

- `backend-api/README.md` — backend-specific setup, environment variables, and API overview.
- `frontend/README.md` — frontend-specific setup and architecture notes.

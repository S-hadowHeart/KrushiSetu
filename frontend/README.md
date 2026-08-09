# KrushiSetu Frontend

A React + Vite frontend for the KrushiSetu marketplace. This app connects to the backend API to provide browsing, listings, offers, messaging, verification, and admin workflows.

## Overview

This frontend includes:

- Marketplace browsing for goods and needs
- Create/edit/delete listings with image uploads
- Offer creation, negotiation, and tracking
- Direct messaging between users
- Authentication flows, email verification, and password reset
- Admin interfaces for users, goods, needs, offers, messages, and verifications

## Prerequisites

- Node.js 18+
- Running backend API
- `.env` file configured in the frontend folder

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Update `.env` and set:

```env
VITE_API_URL=http://localhost:4000
```

## Run locally

```bash
npm run dev
```

Open the application at the Vite-provided URL.

## Important notes

- The frontend expects the backend API to be available at `VITE_API_URL`.
- Authentication uses an in-memory access token and an httpOnly refresh cookie.
- File uploads are sent as multipart/form-data.
- Public goods and needs are routed by `publicId` UUIDs.
- Email verification is required before users can log in.

## Features

### Marketplace
- Browse goods and needs
- Search and filter listings
- Upload photos and manage listings

### Offers
- Send offers for goods and needs
- View received and sent offers
- Accept, decline, and counter offers

### Messaging
- Inbox and thread views
- Message directly from listings and offers

### Accounts
- Register, login, forgot password, reset password
- Email verification and resend verification
- Profile page and dashboard

### Admin
- Manage users, goods, needs, offers, messages, and verifications

## Structure

- `src/api/` — API clients for auth, goods, needs, offers, messages, uploads, verification, profile, and admin
- `src/components/` — reusable UI components, layout, and route guards
- `src/context/` — auth state management
- `src/hooks/` — custom hooks like `useAuth`
- `src/lib/` — axios client, token store, React Query client
- `src/pages/` — page-level screens and forms
- `src/utils/` — validation schemas, constants, formatting helpers

## Build

```bash
npm run build
npm run preview
```

## Deployment

- Set `VITE_API_URL` to the production backend URL before building.
- Ensure the backend’s CORS allow-list includes the deployed frontend origin.


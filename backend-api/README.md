# KrushiSetu Backend API

This backend powers the KrushiSetu marketplace: farmer listings, buyer needs, offers, negotiation, direct messaging, verification, ratings, file uploads, and admin oversight.

## What this service does

- Authenticates users with JWT access tokens and refresh cookies
- Supports user registration, login, email verification, and password reset
- Manages farmer goods listings and buyer needs with public UUID routes
- Handles offer creation, accept/decline, and counter-offers
- Supports messaging between users
- Handles image uploads and serves uploaded files
- Provides admin endpoints for moderation

## Tech stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation
- multer file uploads
- nodemailer email delivery

## Prerequisites

- Node.js 18+
- PostgreSQL database
- `.env` file configured in `backend-api`

## Environment variables

Create `.env` from `.env.example` and set the values below:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/krushisetu"
PORT=4000
APP_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=replace_with_a_long_random_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM="KrushiSetu <your_smtp_user>"
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
```

## Getting started

Install dependencies, generate Prisma client, create the database structure, seed sample data, and start the dev server:

```bash
cd backend-api
npm install
npx prisma generate
npm run db:setup
npm run dev
```

`npm run db:setup` applies committed migrations and runs the idempotent seed. In production, set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` (at least 32 characters). Demo users are created during non-production seeding; set `SEED_DEMO_DATA=false` to disable them.

## Available scripts

- `npm start` - run the production server
- `npm run dev` - run the server with nodemon
- `npm run prisma` - Prisma CLI helper
- `npm run migrate` - create a development migration
- `npm run db:setup` - apply migrations and seed the database
- `npm run seed` - seed the database
- `npm run format` - format Prisma schema

## Notes

- Most marketplace routes now use `publicId` UUIDs for public access.
- The refresh token is stored as an httpOnly cookie.
- Protected endpoints require a Bearer access token.
- Admin endpoints require `ADMIN` role.

## API patterns

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/verify?token=...`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

### Profile

- `GET /profile`

### Goods

- `GET /goods`
- `GET /goods/:publicId`
- `POST /goods`
- `PUT /goods/:publicId`
- `DELETE /goods/:publicId`

### Needs

- `GET /needs`
- `GET /needs/:publicId`
- `POST /needs`
- `PUT /needs/:publicId`
- `DELETE /needs/:publicId`

### Offers

- `POST /offers/goods/:publicId`
- `POST /offers/needs/:publicId`
- `GET /offers/me`
- `GET /offers/sent`
- `PUT /offers/:id/respond`
- `POST /offers/:id/counter`

### Uploads

- `POST /uploads` - authenticated file upload endpoint

### Admin

- `DELETE /admin/goods/:id`
- `DELETE /admin/needs/:id`

## Troubleshooting

- If uploads fail, verify `uploads/` directory exists and is writable.
- If email verification links are missing, check SMTP settings.
- If a user cannot log in, ensure `verified` is `true` in the database.

## Recommended workflow

1. Start PostgreSQL.
2. Configure `.env`.
3. Run Prisma migrations and seed data.
4. Start the backend with `npm run dev`.
5. Start the frontend next.


#### POST /goods
Creates a new goods listing.

Protection
- Requires authentication
- Intended for farmers

Required input
- `name` (string)
- `minQty` (number)
- `maxQty` (number)
- `priceMin` (number)
- `priceMax` (number)
- `locations` (non-empty array of strings)

Note: `locations` is required for every goods create/update request and must contain at least one entry.

Optional input
- `images` (array of string URLs)
- `deliveryModes` (array of strings)
- `paymentModes` (array of strings)
- `description` (string)
- `availableFrom` (ISO date string)

Expected success output
```json
{
  "ok": true,
  "good": {
    "id": 1,
    "farmerId": 1,
    "name": "Tomatoes",
    "images": [],
    "minQty": 10,
    "maxQty": 100,
    "priceMin": 20,
    "priceMax": 35,
    "locations": ["Pune"],
    "deliveryModes": ["DISCUSS"],
    "paymentModes": ["CASH"],
    "description": "Fresh tomatoes",
    "availableFrom": "2026-06-28T00:00:00.000Z"
  }
}
```

#### GET /goods
Lists goods with optional filters.

Optional query input
- `q` (search by name)
- `location`
- `minPrice`
- `maxPrice`
- `deliveryMode`
- `farmerId`
- `page`
- `limit`
- `sort`

Expected success output
```json
{
  "items": [],
  "page": 1,
  "limit": 20,
  "total": 0
}
```

#### GET /goods/:id
Gets a single goods listing.

Expected success output
```json
{
  "good": {
    "id": 1,
    "farmerId": 1,
    "name": "Tomatoes",
    "farmer": {
      "id": 1,
      "name": "Farmer One",
      "verified": true
    }
  }
}
```

#### PUT /goods/:id
Updates a goods listing.

Protection
- Requires authentication
- Only the owner can update it

Expected success output
```json
{
  "ok": true,
  "good": {
    "id": 1,
    "name": "Updated Tomatoes"
  }
}
```

#### DELETE /goods/:id
Deletes a goods listing.

Protection
- Requires authentication
- Only the owner can delete it

Expected success output
```json
{
  "ok": true
}
```

### 4) Needs (Buyer Requirements)

#### POST /needs
Creates a buyer need/request.

Protection
- Requires authentication
- Intended for buyers

Required input
- `title` (string)
- `qtyNeeded` (number)
- `locations` (non-empty array of strings)

Note: `locations` is required for every needs create/update request and must contain at least one entry.

Optional input
- `description` (string)
- `priceMin` / `priceMax` (numbers)
- `deliveryMode` (string)
- `paymentMode` (string)
- `expiresAt` (ISO date string)

Expected success output
```json
{
  "ok": true,
  "need": {
    "id": 1,
    "buyerId": 2,
    "title": "Need Wheat",
    "qtyNeeded": 50,
    "locations": ["Mumbai"]
  }
}
```

#### GET /needs
Lists needs with optional filters.

Optional query input
- `q`
- `location`
- `page`
- `limit`

Expected success output
```json
{
  "items": [],
  "page": 1,
  "limit": 20,
  "total": 0
}
```

#### GET /needs/:id
Gets a single need request.

Expected success output
```json
{
  "need": {
    "id": 1,
    "title": "Need Wheat",
    "buyer": {
      "id": 2,
      "name": "Buyer One",
      "verified": true
    }
  }
}
```

#### PUT /needs/:id
Updates an existing need.

Protection
- Requires authentication
- Only the owner can update it

Expected success output
```json
{
  "ok": true,
  "need": {
    "id": 1,
    "title": "Updated Need"
  }
}
```

#### DELETE /needs/:id
Deletes an existing need.

Protection
- Requires authentication
- Only the owner can delete it

Expected success output
```json
{
  "ok": true
}
```

### 5) Offers

#### POST /offers/goods/:id
Creates an offer for a goods listing.

Protection
- Requires authentication

Required input
- `qty` (number)
- `price` (number)

Optional input
- `message` (string)

Expected success output
```json
{
  "ok": true,
  "offer": {
    "id": 1,
    "fromUserId": 2,
    "toUserId": 1,
    "goodId": 1,
    "qty": 20,
    "price": 30,
    "message": "Interested"
  }
}
```

#### POST /offers/needs/:id
Creates an offer for a buyer need.

Protection
- Requires authentication

Expected success output
```json
{
  "ok": true,
  "offer": {
    "id": 2,
    "fromUserId": 1,
    "toUserId": 2,
    "needId": 1,
    "qty": 20,
    "price": 30
  }
}
```

#### GET /offers/me
Lists offers sent to the authenticated user.

Protection
- Requires authentication

Expected success output
```json
{
  "offers": []
}
```

#### PUT /offers/:id/respond
Accepts or rejects an offer.

Protection
- Requires authentication
- Only the offer recipient can respond

Required input
- `status` (`PENDING`, `ACCEPTED`, `REJECTED`)

Expected success output
```json
{
  "ok": true,
  "offer": {
    "id": 1,
    "status": "ACCEPTED"
  }
}
```

### 6) Verification

#### POST /verification
Submits verification details and attachments.

Protection
- Requires authentication

Required input
- `idType` (string)
- `idNumber` (string)

Optional input
- `attachments` (array of strings/URLs)

Expected success output
```json
{
  "ok": true,
  "verification": {
    "id": 1,
    "userId": 1,
    "idType": "AADHAR",
    "idNumber": "123456789012",
    "status": "PENDING"
  }
}
```

#### GET /verification/:userId
Gets the latest verification record for a user.

Protection
- Requires authentication

Expected success output
```json
{
  "verification": {
    "id": 1,
    "status": "PENDING"
  }
}
```

#### GET /verification
Lists pending verifications.

Protection
- Requires authentication
- Admin only

Expected success output
```json
{
  "items": []
}
```

#### PUT /verification/:id
Reviews a verification request.

Protection
- Requires authentication
- Admin only

Required input
- `status` (`APPROVED` or `REJECTED`)

Expected success output
```json
{
  "ok": true,
  "verification": {
    "id": 1,
    "status": "APPROVED"
  }
}
```

### 7) Ratings

#### POST /ratings
Creates a rating/review.

Protection
- Requires authentication

Required input
- `targetId` (number)
- `type` (`user` or `goods`)
- `score` (number, usually 1 to 5)

Optional input
- `comment` (string)

Expected success output
```json
{
  "ok": true,
  "rating": {
    "id": 1,
    "authorId": 2,
    "targetId": 1,
    "type": "user",
    "score": 5,
    "comment": "Great farmer"
  }
}
```

#### GET /ratings/:targetId
Gets ratings for a target.

Expected success output
```json
{
  "items": [
    {
      "id": 1,
      "score": 5,
      "comment": "Great farmer"
    }
  ],
  "avg": 5
}
```

### 8) Uploads

#### POST /uploads
Uploads files.

Protection
- Requires authentication

Required input
- multipart form field `files` (one or more files)

Expected success output
```json
{
  "ok": true,
  "files": [
    {
      "url": "/uploads/1710000000000-file.png",
      "originalName": "file.png"
    }
  ]
}
```

### 9) Admin

#### GET /admin/users
Lists all users.

Protection
- Requires authentication
- Admin only

Expected success output
```json
{
  "users": []
}
```

#### GET /admin/users/:id
Gets one user and their verification records.

Protection
- Requires authentication
- Admin only

#### PUT /admin/users/:id/suspend
Suspends a user by marking them unverified.

Protection
- Requires authentication
- Admin only

#### GET /admin/goods
Lists all goods listings.

Protection
- Requires authentication
- Admin only

#### DELETE /admin/goods/:id
Deletes a goods listing.

Protection
- Requires authentication
- Admin only

## Error Handling

Errors return JSON with a status and message. Example:

```json
{
  "status": 400,
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

## Notes

- File uploads are currently stored locally in the `uploads/` folder.
- For production, consider moving uploads to S3 or another object store.
- The default admin account is created by `npm run seed` using `.env` values.

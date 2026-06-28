# KrushiSetu Backend API

KrushiSetu is a marketplace backend for connecting farmers, buyers, hotels, NGOs, and other stakeholders. It supports authentication, user profiles, goods listings, buyer needs, offers, verification, ratings, file uploads, and admin moderation.

## Tech Stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation
- bcryptjs password hashing
- multer for file uploads

## Prerequisites

- Node.js 18+ recommended
- PostgreSQL database
- Environment variables configured in `.env`

## Environment Variables

Create a `.env` file from `.env.example` and set values like:

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
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
```

## Installation

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## Authentication and Protection

- Most protected routes require a Bearer token in the `Authorization` header.
- Example:

```http
Authorization: Bearer <jwt_token>
```

- Refresh token is stored in an httpOnly cookie after login.
- Admin endpoints require the `ADMIN` role.

## API Reference

### 1) Auth

#### POST /auth/register
Creates a new user account.

Required input
- `email` (string, valid email)
- `password` (string, min 8 chars, must include uppercase, lowercase, number, and special character)
- `name` (string)

Optional input
- `role` (`FARMER`, `BUYER`, `ADMIN`)

Expected success output
```json
{
  "ok": true,
  "user": {
    "id": 1,
    "email": "farmer@example.com",
    "name": "Farmer One",
    "role": "FARMER",
    "verified": false
  }
}
```

#### POST /auth/login
Logs in an existing user.

Required input
- `email`
- `password`

Expected success output
```json
{
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "farmer@example.com",
    "name": "Farmer One",
    "role": "FARMER",
    "verified": true
  }
}
```

#### POST /auth/refresh
Refreshes the access token using the refresh token cookie.

Protection
- Requires the refresh token cookie

Expected success output
```json
{
  "token": "<new_jwt_token>"
}
```

#### POST /auth/logout
Logs out and clears the refresh cookie.

Protection
- Optional cookie-based session

Expected success output
```json
{
  "ok": true
}
```

#### GET /auth/verify?token=<token>
Verifies the email verification token.

Required input
- `token` query parameter

Expected success output
```json
{
  "ok": true,
  "message": "Email verified"
}
```

#### POST /auth/forgot-password
Sends a password reset email.

Required input
- `email`

Expected success output
```json
{
  "ok": true
}
```

#### POST /auth/reset-password
Resets the password using the reset token.

Required input
- `token`
- `password`

Expected success output
```json
{
  "ok": true,
  "message": "Password reset"
}
```

### 2) Profile

#### GET /profile
Fetches the authenticated user's profile.

Protection
- Requires authentication

Expected success output
```json
{
  "user": {
    "id": 1,
    "email": "farmer@example.com",
    "name": "Farmer One",
    "role": "FARMER",
    "verified": true
  }
}
```

### 3) Goods (Farmer Listings)

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

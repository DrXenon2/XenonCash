# API Documentation - XenonCash

## Overview
This API powers the XenonCash affiliate platform, providing endpoints for user management, transactions, and more.

## Base URL
- `https://xenoncash-api.herokuapp.com/api` (adjust after deployment)

## Authentication
- Use JWT tokens in the `Authorization` header: `Bearer <token>`

## Endpoints

### 1. Authentication
- **POST /api/auth/register**
  - Description: Register a new user.
  - Body: `{ "username": "string", "email": "string", "phone": "string", "country": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { "id": "uuid", ... } }`

- **POST /api/auth/login**
  - Description: Login a user.
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { "id": "uuid", ... } }`

### 2. Dashboard
- **GET /api/dashboard**
  - Description: Get user stats.
  - Query: `?userId=uuid`
  - Response: `{ "balance": 0.00, "sales": 0, "leads": 0, "referrals": 0 }`

### 3. Offers
- **GET /api/offers**
  - Description: List active products.
  - Response: `[{ "id": "uuid", "name": "string", ... }]`

- **POST /api/offers**
  - Description: Create a new offer.
  - Body: `{ "name": "string", "description": "string", "commission_rate": 0.00, "price": 0.00, "niche": "string" }`
  - Response: `{ "id": "uuid", ... }`

### 4. Transactions
- **POST /api/transactions**
  - Description: Record a transaction.
  - Body: `{ "userId": "uuid", "productId": "uuid", "type": "string", "amount": 0.00 }`
  - Response: `{ "id": "uuid", ... }`

- **GET /api/transactions/:affiliateId**
  - Description: Get transactions by affiliate.
  - Response: `[{ "id": "uuid", ... }]`

### 5. Withdrawals
- **POST /api/withdraw**
  - Description: Request a withdrawal.
  - Body: `{ "userId": "uuid", "amount": 0.00, "method": "string", "phone": "string" }`
  - Response: `{ "success": true, "tx_id": "string" }`

### 6. Recommendations
- **GET /api/recommendations/:userId**
  - Description: Get product recommendations.
  - Response: `[{ "id": "uuid", "name": "string", ... }]`

### 7. Chat
- **POST /api/chat**
  - Description: Send a chat message.
  - Body: `{ "userId": "uuid", "message": "string" }`
  - Response: `{ "message": "string", "response": "string" }`
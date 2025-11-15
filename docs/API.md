# Ionora API Reference

Unless otherwise noted, all endpoints are served from the Express application under the `/api` prefix (e.g. `https://your-domain.com/api/...`). Authenticated routes expect a JSON Web Token in the `Authorization` header using the `Bearer <token>` scheme returned by the authentication endpoints.

- **Content type:** All request bodies must be JSON unless stated otherwise.
- **Error format:** Validation failures return `400` with `{"errors":[{ "msg": "...", "param": "..."}]}`. Other errors generally return `{"message": "..."}` with an appropriate status.
- **Authentication:** `Bearer` token unless otherwise specified. Admin routes additionally require the authenticated user to have `is_admin: true`.

---

## 1. Authentication

### POST `/api/auth/register`
- **Auth:** No
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "min8chars",
    "full_name": "Jane Doe",
    "phone": "9876543210"
  }
  ```
- **Success (201):**
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "Jane Doe",
      "phone": "9876543210",
      "email_verified": false,
      "created_at": "2025-01-01T10:00:00.000Z",
      "updated_at": "2025-01-01T10:00:00.000Z",
      "last_login": null
    },
    "token": "<JWT>"
  }
  ```
- **Common errors:** `400` validation, `409` email already registered, `500` internal.
- **Example:**
  ```bash
  curl -X POST https://api.example.com/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"user@example.com","password":"Password123","full_name":"Jane Doe"}'
  ```

### POST `/api/auth/login`
- **Auth:** No
- **Body:** `{ "email": "user@example.com", "password": "Password123" }`
- **Success (200):** `{ "user": { ... }, "token": "<JWT>" }`
- **Errors:** `400` validation, `401` invalid credentials.
- **Example:**
  ```bash
  curl -X POST https://api.example.com/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"user@example.com","password":"Password123"}'
  ```

### POST `/api/auth/forgot-password`
- **Auth:** No
- **Body:** `{ "email": "user@example.com" }`
- **Success (200):** `{ "message": "If that email exists, we have sent a reset link." }`
- **Example:** similar to above.

### POST `/api/auth/reset-password`
- **Auth:** No
- **Body:** `{ "token": "<reset-token>", "new_password": "NewPass123" }`
- **Success (200):** `{ "message": "Password has been reset successfully." }`
- **Errors:** `400` invalid/expired token.

### PUT `/api/auth/change-password`
- **Auth:** Yes (`Bearer <token>`)
- **Body:** `{ "current_password": "OldPass123", "new_password": "NewPass123" }`
- **Success (200):** `{ "message": "Password updated successfully." }`
- **Errors:** `400` validation, `401` incorrect current password or no auth.
- **Example:**
  ```bash
  curl -X PUT https://api.example.com/api/auth/change-password \
    -H "Authorization: Bearer <JWT>" \
    -H "Content-Type: application/json" \
    -d '{"current_password":"OldPass123","new_password":"NewPass123"}'
  ```

---

## 2. User Profile

All routes require authentication.

### GET `/api/user/profile`
- **Auth:** Required
- **Response (200):** `{ "user": { "id": "...", "email": "...", ... } }`

### PUT `/api/user/profile`
- **Body (all optional):** `{ "full_name": "Jane Doe", "phone": "9876543210" }`
- **Success (200):** `{ "user": { ...updated fields... } }`

### GET `/api/user/addresses`
- **Response (200):**
  ```json
  {
    "addresses": [
      {
        "id": "uuid",
        "address_type": "shipping",
        "full_address": "123 Street",
        "city": "Mumbai",
        "state": "MH",
        "pincode": "400001",
        "country": "India",
        "is_default": true,
        "created_at": "2025-01-01T10:00:00.000Z"
      }
    ]
  }
  ```

### POST `/api/user/address`
- **Body:** requires `full_address`, `city`, `state`, `pincode`, `country`; optional `address_type`, `is_default`.
- **Success (201):** `{ "address": { ... } }`

### PUT `/api/user/address/:id`
- **Params:** `id` (UUID)
- **Body:** Any subset of address fields. Setting `is_default: true` demotes other addresses.
- **Success (200):** `{ "address": { ... } }`
- **Errors:** `400` no changes supplied, `404` not found.

### DELETE `/api/user/address/:id`
- **Success (200):** `{ "message": "Address deleted successfully." }`

Example for creating an address:
```bash
curl -X POST https://api.example.com/api/user/address \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"full_address":"123 Street","city":"Mumbai","state":"MH","pincode":"400001","country":"India","is_default":true}'
```

---

## 3. Products

### GET `/api/products`
- **Auth:** Not required
- **Query params:**
  - `page` (default 1), `limit` (default 20, max 100)
  - `sort` (`latest` | `price_asc` | `price_desc`)
  - `category` (exact match)
  - `minPrice`, `maxPrice`
- **Success (200):**
  ```json
  {
    "products": [
      {
        "id": "uuid",
        "name": "Ionizer X",
        "description": "...",
        "price": "8999.00",
        "discount_percentage": "10.00",
        "final_price": "8099.10",
        "category": "alkaline",
        "stock_quantity": 12,
        "images": ["https://..."],
        "specifications": { "...": "..." },
        "is_active": true,
        "created_at": "2025-01-01T10:00:00.000Z",
        "updated_at": "2025-01-02T09:00:00.000Z"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 }
  }
  ```

### GET `/api/products/search?q=term`
- **Success (200):** `{ "products": [ ... ] }`
- **Errors:** `400` if `q` missing/empty.

### GET `/api/products/category/:category`
- **Query:** optional `page`, `limit`, `sort`
- **Response:** same structure as `/api/products`.

### GET `/api/products/:id`
- **Success (200):** `{ "product": { ... } }`
- **Errors:** `404` not found.

Example:
```bash
curl https://api.example.com/api/products?page=1&limit=12&sort=price_asc
```

---

## 4. Cart

All routes require authentication.

### POST `/api/cart`
- **Body:** `{ "product_id": "uuid", "quantity": 2 }`
- **Success (200):** latest cart snapshot:
  ```json
  {
    "items": [
      {
        "id": "uuid",
        "quantity": 2,
        "added_at": "2025-01-01T11:00:00.000Z",
        "product": {
          "id": "uuid",
          "name": "Ionizer X",
          "description": "...",
          "final_price": 4099.55,
          "images": ["https://..."],
          "stock_quantity": 5
        },
        "item_total": 8199.1
      }
    ],
    "summary": {
      "subtotal": 8199.1,
      "tax": 1475.84,
      "shipping": 0,
      "total": 9674.94
    }
  }
  ```
- **Errors:** `400` invalid quantity or insufficient stock, `404` product not found.

### GET `/api/cart`
- **Success (200):** same structure as above.

### PUT `/api/cart/:id`
- **Body:** `{ "quantity": 3 }`
- **Success (200):** `{ "message": "Cart item updated successfully." }`
- **Errors:** `404` item not found, `400` invalid quantity/out of stock.

### DELETE `/api/cart/:id`
- **Success (200):** `{ "message": "Cart item removed successfully." }`

### DELETE `/api/cart`
- **Success (200):** `{ "message": "Cart cleared successfully." }`

Example add to cart:
```bash
curl -X POST https://api.example.com/api/cart \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"product_id":"PRODUCT_UUID","quantity":1}'
```

---

## 5. Favorites

Authentication required for all endpoints.

### POST `/api/favorites`
- **Body:** `{ "product_id": "uuid" }`
- **Success (200):** `{ "message": "Product added to favorites." }`

### GET `/api/favorites`
- **Success (200):**
  ```json
  {
    "favorites": [
      {
        "id": "uuid",
        "added_at": "2025-01-05T09:00:00.000Z",
        "product": {
          "id": "uuid",
          "name": "Ionizer X",
          "description": "...",
          "price": 8999,
          "discount_percentage": 10,
          "final_price": 8099.1,
          "category": "alkaline",
          "images": ["https://..."],
          "is_active": true,
          "stock_quantity": 5,
          "created_at": "2025-01-01T10:00:00.000Z",
          "updated_at": "2025-01-02T09:00:00.000Z"
        }
      }
    ]
  }
  ```

### DELETE `/api/favorites/:product_id`
- **Params:** `product_id` (UUID)
- **Success (200):** `{ "message": "Product removed from favorites." }`
- **Errors:** `404` if favorite not found.

Example:
```bash
curl -X DELETE https://api.example.com/api/favorites/PRODUCT_UUID \
  -H "Authorization: Bearer <JWT>"
```

---

## 6. Checkout

All endpoints require authentication. These routes coordinate with Razorpay (test mode) via utility helpers.

### POST `/api/checkout/validate`
- **Body:** none
- **Success (200):**
  ```json
  {
    "valid": true,
    "items": [ { "product_id": "...", "quantity": 2, "item_total": 8199.1, ... } ],
    "summary": { "subtotal": 8199.1, "tax": 1475.84, "shipping": 0, "total": 9674.94 },
    "issues": []
  }
  ```
- **Errors:** `400` cart empty.

### POST `/api/checkout/create-order`
- **Body:**
  ```json
  {
    "shipping_address_id": "uuid",
    "payment_method": "razorpay"
  }
  ```
- **Success (201):**
  ```json
  {
    "order": {
      "id": "uuid",
      "order_number": "ION-2025-0001",
      "totals": { "subtotal": 8199.1, "tax": 1475.84, "shipping": 0, "total": 9674.94 }
    },
    "razorpay_order_id": "order_ABC123",
    "amount": 967494,
    "currency": "INR"
  }
  ```
- **Errors:** `400` cart empty or insufficient stock, `401` unauthorised.

### POST `/api/checkout/payment`
- **Body:**
  ```json
  {
    "order_id": "uuid",
    "razorpay_order_id": "order_ABC123",
    "razorpay_payment_id": "pay_123",
    "razorpay_signature": "signature"
  }
  ```
- **Success (200):**
  ```json
  {
    "message": "Payment processed successfully.",
    "order": {
      "id": "uuid",
      "order_number": "ION-2025-0001",
      "status": "confirmed",
      "payment_status": "paid",
      "total_amount": "9674.94",
      "items": [ { "product_id": "...", "quantity": 2, ... } ]
    }
  }
  ```
- **Errors:** `400` invalid signature, `404` order not found, `500` on DB rollback.

Example:
```bash
curl -X POST https://api.example.com/api/checkout/create-order \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"shipping_address_id":"ADDRESS_UUID","payment_method":"razorpay"}'
```

---

## 7. Orders

Authentication required.

### GET `/api/orders`
- **Query params:** `page`, `limit`, `status`
- **Success (200):**
  ```json
  {
    "orders": [
      {
        "id": "uuid",
        "order_number": "ION-2025-0001",
        "status": "confirmed",
        "payment_status": "paid",
        "total_amount": "9674.94",
        "created_at": "2025-01-01T10:00:00.000Z",
        "updated_at": "2025-01-02T09:00:00.000Z",
        "items_count": "2"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 5, "totalPages": 1 }
  }
  ```

### GET `/api/orders/:id`
- **Response (200):**
  ```json
  {
    "order": {
      "id": "uuid",
      "order_number": "ION-2025-0001",
      "status": "confirmed",
      "payment_status": "paid",
      "shipping_method": "standard",
      "subtotal": "8199.10",
      "tax_amount": "1475.84",
      "shipping_charge": "0.00",
      "discount_amount": "0.00",
      "total_amount": "9674.94",
      "created_at": "2025-01-01T10:00:00.000Z",
      "razorpay_order_id": "order_ABC123",
      "shipping_address": {
        "id": "uuid",
        "full_address": "123 Street",
        "city": "Mumbai",
        "state": "MH",
        "pincode": "400001",
        "country": "India",
        "is_default": true
      },
      "items": [
        {
          "id": "uuid",
          "product_id": "uuid",
          "quantity": 2,
          "price_at_purchase": "4099.55",
          "subtotal": "8199.10",
          "created_at": "2025-01-01T10:00:00.000Z",
          "name": "Ionizer X",
          "description": "...",
          "final_price": "4099.55",
          "images": ["https://..."]
        }
      ]
    }
  }
  ```
- **Errors:** `404` order not found.

### POST `/api/orders/:id/cancel`
- **Success (200):** `{ "message": "Order cancelled successfully." }`
- **Errors:** `400` cannot cancel current status, `404` not found.

Example:
```bash
curl -X POST https://api.example.com/api/orders/ORDER_UUID/cancel \
  -H "Authorization: Bearer <JWT>"
```

---

## 8. Payment

These endpoints manage standalone Razorpay flows. Authentication required for customer-facing routes.

### POST `/api/payment/create-order`
- **Body:** `{ "order_id": "uuid", "amount": 9674.94 }`
- **Success (200):**
  ```json
  {
    "razorpay_order_id": "order_ABC123",
    "amount": 967494,
    "currency": "INR",
    "key_id": "rzp_test_xxx"
  }
  ```
- **Errors:** `404` order not found, `403` user mismatch, `400` already paid.

### POST `/api/payment/verify`
- **Body:**
  ```json
  {
    "razorpay_order_id": "order_ABC123",
    "razorpay_payment_id": "pay_123",
    "razorpay_signature": "signature"
  }
  ```
- **Success (200):** `{ "message": "Payment verified successfully." }`
- **Errors:** `400` invalid signature, `403` wrong user, `404` order not found.

### POST `/api/payment/webhooks/payment`
- **Auth:** None (Razorpay webhook). Configure server/webhook secret.
- **Headers:** `x-razorpay-signature`
- **Body:** Raw Razorpay webhook payload (JSON).
- **Success (200):** `{ "message": "Payment captured." }` for `payment.captured`, otherwise `{ "message": "Webhook received." }`
- **Errors:** `400` invalid signature or payload.
- **Example (local with ngrok):**
  ```bash
  curl -X POST https://abcd1234.ngrok.io/api/payment/webhooks/payment \
    -H "Content-Type: application/json" \
    -H "x-razorpay-signature: <signature>" \
    -d '{"event":"payment.captured","payload":{"payment":{"entity":{"id":"pay_123","order_id":"order_ABC123","amount":967494}}}}'
  ```

---

## 9. Admin

All routes require `Authorization: Bearer <ADMIN JWT>` and the authenticated user must have `is_admin = true`.

### GET `/api/admin/orders`
- **Query params:** `page`, `limit`, `status`, `user_id`
- **Success (200):**
  ```json
  {
    "orders": [
      {
        "id": "uuid",
        "order_number": "ION-2025-0001",
        "status": "processing",
        "payment_status": "paid",
        "total_amount": "9674.94",
        "created_at": "...",
        "updated_at": "...",
        "confirmed_at": "...",
        "shipped_at": null,
        "delivered_at": null,
        "user_id": "uuid",
        "user_email": "user@example.com",
        "user_full_name": "Jane Doe",
        "items_count": "2"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 10, "totalPages": 1 }
  }
  ```

### PUT `/api/admin/orders/:id/status`
- **Body:** `{ "status": "shipped", "tracking_number": "TRACK123" }`
- **Success (200):** `{ "order": { ...updated order... } }`
- **Errors:** `400` invalid transition, `404` not found.
- **Notes:** Valid status transitions:
  - `pending → confirmed | processing | cancelled`
  - `confirmed → processing | shipped | cancelled`
  - `processing → shipped | cancelled`
  - `shipped → delivered | returned`
  - `delivered → returned`

### POST `/api/admin/products`
- **Body (required fields):**
  ```json
  {
    "name": "Ionizer Y",
    "price": 9999.0,
    "discount_percentage": 10,
    "category": "alkaline",
    "stock_quantity": 20,
    "images": ["https://..."],
    "specifications": { "flow_rate": "2 L/min" },
    "is_active": true
  }
  ```
- **Success (201):** `{ "product": { ... } }`
- **Errors:** `400` validation failures.

### PUT `/api/admin/products/:id`
- **Body:** Any subset of product fields; at least one required.
- **Success (200):** `{ "product": { ... } }`
- **Errors:** `404` product not found, `400` no fields provided.

### DELETE `/api/admin/products/:id`
- **Action:** Soft-deletes product (sets `is_active` to false).
- **Success (200):** `{ "message": "Product deactivated successfully." }`
- **Errors:** `404` product not found.

Example admin update:
```bash
curl -X PUT https://api.example.com/api/admin/orders/ORDER_UUID/status \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"status":"shipped","tracking_number":"TRACK123"}'
```

---

## Supplemental Notes

- **Rate limiting:** General requests pass through `generalLimiter`; auth endpoints use `authLimiter`. Exceeding limits returns `429`.
- **Webhook handling:** Ensure the server receives raw body (`express.raw`) for `/api/payment/webhooks/payment`. If deployed behind a proxy, preserve raw payload.
- **Inventory locking:** Checkout workflow locks stock during order creation and releases on cancellation/payment failure.
- **Razorpay integration:** Use test keys/secrets in `.env`; production keys should only be set in secured environments.

For questions or updates, keep this document synchronized with controller logic in `backend/src/controllers/**/*.js`.









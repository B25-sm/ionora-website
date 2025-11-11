# Ionora Marketplace

An end-to-end platform for exploring and purchasing alkaline water ionizers, filters, and hydration products. The project combines a marketing-friendly Next.js frontend with an Express/Node.js REST API and PostgreSQL database to deliver product discovery, user accounts, shopping cart, checkout, and Razorpay payment integration.

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Setup](#environment-setup)
6. [Database Setup & Migrations](#database-setup--migrations)
7. [Running the Application](#running-the-application)
8. [API Documentation](#api-documentation)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Project Structure](#project-structure)
12. [Contributing](#contributing)
13. [License](#license)

---

## Features
- ✅ Product catalog with categories, search, filters, and dynamic content pages.
- ✅ User authentication (register, login, password reset) with JWT.
- ✅ User profile management and address book.
- ✅ Shopping cart, favorites, checkout validation, and order workflow.
- ✅ Razorpay integration (test mode) with order creation, payment verification, and webhooks.
- ✅ Email notifications (SendGrid) for transactional events.
- ✅ Admin dashboard endpoints for managing orders and products.
- ✅ Next.js frontend featuring rich marketing pages and product deep-dives.
- ✅ Comprehensive API documentation and backend seed scripts.

---

## Tech Stack
**Frontend**
- Next.js 15 (App Router)
- React 18, TypeScript, Tailwind CSS

**Backend**
- Node.js / Express.js
- PostgreSQL with pg client
- Razorpay SDK, SendGrid, bcrypt, JWT, express-validator, helmet, rate limiting

**Tooling**
- npm / Node.js
- dotenv for configuration
- nodemon for development
- Jest (setup for future testing)

---

## Prerequisites
Ensure the following are installed locally:
- **Node.js** (>= 18.x recommended)
- **npm** (bundled with Node.js)
- **PostgreSQL** (>= 14)
- **Git**
- Optional: **ngrok** for webhook testing

---

## Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
git clone https://github.com/your-org/ionora-marketplace.git
cd ionora-marketplace

# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

---

## Environment Setup

### Frontend (`.env.local`)
Create `app/.env.local` or use root `.env.local`. Populate with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
```

### Backend (`.env.development`)
The repository includes `.env.example`. Copy it and provide values:

```bash
cp .env.example backend/.env.development
```

Adjust the values (especially the secrets). Key variables:
- `DATABASE_URL=postgresql://user:password@localhost:5432/ionora_dev`
- `JWT_SECRET=your_super_secret`
- `SALT_ROUNDS=10`
- `FRONTEND_ORIGIN=http://localhost:3000`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- `SENDGRID_API_KEY`, `FROM_EMAIL`

---

## Database Setup & Migrations

1. Create a development database:
   ```bash
   createdb ionora_dev
   ```
2. Run migrations:
   ```bash
   cd backend
   npm run migrate
   ```
3. Seed sample data (admin + products + users + addresses):
   ```bash
   npm run seed
   ```

_Tip:_ Ensure your `DATABASE_URL` points to the correct database before running migrate/seed scripts.

_Note:_ Product search, coupons, and wishlist sharing rely on new PostgreSQL objects (`search_vector` column/index, `coupons` & `public_wishlists` tables, and `orders.coupon_code`). After pulling the latest backend changes, rerun the migration script so these structures are created.

---

## Running the Application

### Backend API
```bash
cd backend
npm run dev          # development with nodemon
npm run start        # production mode (requires built env)
```
The API listens on `PORT` (default `5000`). Health check: `GET /health`.

### Frontend
```bash
npm run dev      # starts Next.js dev server at http://localhost:3000
npm run build    # production build
npm run start    # run production build
```

### Quick Razorpay Test Flow
1. Add `rzp_test` keys to backend `.env.development`.
2. Start backend: `npm run dev` (backend).
3. Open `http://localhost:5000/public/index.html` to trigger test checkout.
4. Use ngrok (`ngrok http 5000`) to test webhooks.

---

## API Documentation
Detailed REST API docs are available at `docs/API.md`. Highlights include:
- Authentication endpoints
- User profile & addresses
- Products, cart, favorites
- Checkout & orders
- Payment & webhooks
- Admin endpoints

---

## Testing
Jest configuration is included on the roadmap. Once tests are implemented:

```bash
cd backend
npm run test
```

Recommended test areas:
- Authentication flows
- Cart and checkout logic
- Razorpay signature verification (with mocks)
- Database integration tests (against test DB)

Create a separate test database (e.g., `ionora_test`) and configure `NODE_ENV=test` to point to it.

---

## Deployment

Refer to the detailed deployment guide in [`DEPLOY.md`](DEPLOY.md). Summary:
- Run migrations and seeds on production DB.
- Configure environment variables (JWT, Razorpay, SendGrid, etc.).
- Enable HTTPS with managed certificates.
- Set up monitoring (logs, metrics, uptime).
- Establish backup and rollback procedures.

Suggested scripts (backend):
```bash
npm run migrate   # apply migrations
npm run seed      # seed data
npm run start     # production start
```

---

## Project Structure
```
ionora-marketplace/
├─ app/                  # Next.js frontend
├─ backend/
│  ├─ src/
│  │  ├─ app.js          # Express entry point
│  │  ├─ config/         # DB config, migrations, seed scripts
│  │  ├─ controllers/    # Route handlers (auth, products, cart, etc.)
│  │  ├─ middleware/     # Auth, admin, error handling, rate limiting
│  │  ├─ routes/         # Express routers
│  │  └─ utils/          # Helper utilities (email, Razorpay, JWT, order logic)
│  ├─ package.json
│  └─ node_modules/
├─ docs/
│  └─ API.md             # API reference
├─ public/               # Assets, Razorpay demo page
├─ README.md
├─ DEPLOY.md
└─ package.json          # Frontend package configuration
```

---

## Contributing
We welcome contributions! To get started:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/improve-auth`.
3. Commit your changes with descriptive messages.
4. Ensure linting and tests pass.
5. Submit a Pull Request with a clear description of changes.

Please follow our coding standards:
- Use ESLint/Prettier for formatting.
- Keep controllers lean; push business logic into utils/services.
- Update documentation when introducing new features.

---

## License
MIT License © 2025 Ionora. See [LICENSE](LICENSE) for details.

---

Need help? Open an issue or reach out to the maintainers. Happy coding! 💧


# Mini-Commerce

A full-stack e-commerce platform built with **Next.js** and **Go**, featuring Google OAuth authentication, real-time cart management, and Stripe payment integration.

> **Frontend repo** | [Backend repo](https://github.com/wingc34/mini-commerce-api)

🔗 **Live Demo:** [mini-commerce-black.vercel.app](https://mini-commerce-black.vercel.app)

---

## Architecture

This project migrated from a Next.js + tRPC + Prisma monolith to a decoupled full-stack architecture:

```
Next.js (Vercel) → Go REST API (Railway) → PostgreSQL
```

The frontend communicates with a separate Go backend via REST API, with JWT-based authentication replacing NextAuth.

---

## Tech Stack

**Frontend**

- Next.js 15 (App Router) + React 19
- TypeScript
- TanStack Query — server state management
- Zustand — shopping cart state
- Tailwind CSS + shadcn/ui

**Backend** [separate repo](https://github.com/wingc34/mini-commerce-api)

- Go + Gin
- PostgreSQL + GORM
- JWT Authentication
- Google OAuth2
- Stripe Payments + Webhooks

---

## Features

- 🔐 Google OAuth login with JWT
- 🛍️ Product catalog with SKU-level stock check
- 🛒 Shopping cart with persistent state
- 📦 Order management with draft → confirmed flow
- 💳 Stripe payment with webhook confirmation
- ❤️ Wishlist
- 📍 Address management with default address

---

## Engineering Highlights

**Draft Order Pattern**
Orders are created in two steps to handle async Stripe payments. A `DraftOrder` persists until the Stripe webhook confirms payment, then converts to a real `Order` atomically.

**State Sync**
Even if the user closes the browser mid-payment, the Stripe webhook fires independently and finalises the order on the server side.

**Decoupled Architecture**
Migrated from tRPC + Prisma to a standalone Go REST API, separating concerns between frontend and backend and enabling independent deployment and scaling.

---

## Local Development

**Prerequisites:** Node.js 20+, Yarn, Go 1.25+, Docker

**1. Clone and install**

```bash
git clone https://github.com/wingc34/mini-commerce
cd mini-commerce
yarn install
```

**2. Environment setup**

```bash
cp env.sample .env.local
```

Required variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**3. Start Go backend**

See [mini-commerce-api](https://github.com/wingc34/mini-commerce-api) for backend setup.

**4. Run frontend**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

| Service    | Platform |
| ---------- | -------- |
| Frontend   | Vercel   |
| Go API     | Railway  |
| PostgreSQL | Railway  |

# mini-commerce

An e-commerce web app have product catalogs, shopping cart and stripe payment

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

```
├── public                              # Static assets
│   ├── favicon.ico
│   └── ... (other images/assets)

├── prisma                              # Prisma schema & migrations
│   ├── migrations                      # Database migration files
│   └── schema.prisma                   # Prisma data models
│   └── seed.ts                         # Prisma seed

├── src
│   ├── app                             # Next.js App Router pages
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home page
│   │   ├── api                         # App Router API endpoints (Route Handlers)
│   │   │   ├── auth                    # Auth endpoints (next-auth)
│   │   │   ├── create-payment-intent   # Stripe payment API
│   │   │   ├── webhook                 # Stripe webhook
│   │   │   ├── trpc                    # trpc adapter
│   │   │   └── ...
│   │   ├── checkout                    # Checkout flow pages
│   │   │   ├── page.tsx
│   │   │   └── success                 # Successful payment page
│   │   │       └── page.tsx
│   │   ├── product
│   │   │   └── [id]
│   │   │       └── page.tsx            # Product detail page
│   │   └── ... (other App Router pages)

│   ├── components                      # Reusable UI components
│   │   ├── cart                        # Shopping cart components
│   │   ├── navigation                  # Navbar / sidebar components
│   │   ├── ui                          # shadcn/ui wrappers
│   │   └── ...

│   ├── server                      # Server-side (tRPC layer)
│   │   ├── router                     # tRPC router modules
│   │   │   ├── product.ts
│   │   │   ├── order.ts
│   │   │   ├── user.ts
│   │   │   └── ...
│   │   ├── resolver                   # tRPC procedure
│   │   │   ├── product
│   │   │   │   ├── getProducts.ts
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── db.ts                   # Prisma client instance
│   │   ├── trpc.ts                 # tRPC initialization
│   │   └── auth.ts                 # next-auth server config

│   ├── hooks                       # Custom React hooks
│   │   ├── useCart.ts
│   │   └── ...

│   ├── store                       # Zustand Store
│   │   ├── cart-store.ts
│   │   └── ...

│   ├── lib                         # Shared utilities and helpers
│   │   ├── stripe.ts               # Stripe utilities
│   │   ├── utils.ts                # Common utilities
│   │   └── ...

│   ├── types                       # Common TypeScript types
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── ...

│   └── styles                      # Global styles
│       └── globals.css

├── .env.example                    # Example environment variables file

├── next.config.mjs                 # Next.js configuration
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- [Trpc](https://trpc.io/docs/getting-started) - End-to-end typesafe APIs

- [zod](https://zod.dev/) - TypeScript-first schema validation with static type inference

- [stripe](https://docs.stripe.com/) - online payment services

- [prisma](https://www.prisma.io/docs) - TypeScript database ORM

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

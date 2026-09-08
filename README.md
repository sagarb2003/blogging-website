# Blog Vista

Welcome to Blog Vista, a platform where users can seamlessly sign in, sign up, explore captivating blogs, and publish their own unique content. This project leverages cutting-edge technologies to provide a robust and user-friendly experience.

A single Next.js (App Router) application — no separate frontend/backend/common packages, no REST API layer. Pages read the database directly via React Server Components; mutations go through Server Actions.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components, Server Actions)
- **Validation:** Zod
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** Postgres
- **Auth:** JWT in an httpOnly cookie, passwords hashed with bcrypt
- **Images:** Cloudinary (signed server-side uploads)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL, JWT_SECRET, CLOUDINARY_*
npx prisma migrate deploy
npm run dev
```

If migrating existing production data with plaintext passwords, run
`npx tsx scripts/hash-passwords.ts` once against that database before
switching auth over, then delete the script.



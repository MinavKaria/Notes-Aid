# Notes-Aid Database Integration

## Overview
This project uses **PostgreSQL** (hosted on Supabase) with **Prisma ORM** for type-safe, scalable database access. Authentication is managed via **NextAuth.js** with support for OAuth providers (GitHub, Google).

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your credentials (DATABASE_URL, NextAuth secrets, OAuth keys).
3. **Prisma setup:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Database Schema
- **User:** Profiles, preferences, authentication
- **UserProgress:** Tracks completion of videos/notes
- **UserAnalytics:** Usage analytics and activity
- **ContentCache:** Caching for performance
- **Account, Session, VerificationToken:** NextAuth.js tables

## Useful Commands
- `npx prisma studio` – Visual database browser
- `npx prisma migrate dev` – Run migrations
- `npx prisma generate` – Generate Prisma client

## Production Notes
- Use a managed PostgreSQL instance (Supabase recommended)
- Set strong secrets for NextAuth
- Monitor query performance and enable connection pooling

## More Info
- See `prisma/schema.prisma` for the full schema
- See API route files for usage examples 

## .env Format Example

Create a `.env` file in your `notes-aid` directory with the following content (replace values as needed):

```
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# NextAuth.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (Google, GitHub)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

- Do **not** commit your real `.env` file to git. Only `.env.example` should be tracked.
- See `.env.example` for a template. 
# Database Setup Guide

This guide will help you set up the PostgreSQL database with Prisma.

## Quick Start

### 1. Start PostgreSQL

**Option A: Using Docker (Recommended)**
```bash
# From project root
pnpm docker:dev
```

**Option B: Local PostgreSQL**
- Make sure PostgreSQL is installed and running
- Update `DATABASE_URL` in `core/.env`

### 2. Generate Prisma Client

```bash
pnpm db:generate
```

### 3. Push Schema to Database

```bash
# For development (no migrations)
pnpm db:push

# OR create a migration
pnpm db:migrate
```

### 4. Verify Connection

Visit `http://localhost:3000/api/health` - you should see:
```json
{
  "services": {
    "api": "healthy",
    "database": "healthy"
  }
}
```

## Adding Your First Model

1. **Edit `core/prisma/schema.prisma`:**

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

2. **Generate Prisma Client:**
```bash
pnpm db:generate
```

3. **Create Migration:**
```bash
pnpm db:migrate
# Enter migration name when prompted
```

4. **Use in Routes:**

```typescript
// core/src/routes/posts.route.ts
import { Elysia } from 'elysia';
import { prisma } from '../lib/db';

export const postsRoutes = new Elysia()
  .get('/posts', async () => {
    const posts = await prisma.post.findMany();
    return { success: true, posts };
  })
  .post('/posts', async ({ body }) => {
    const post = await prisma.post.create({
      data: body as any
    });
    return { success: true, post };
  });
```

5. **Mount Route:**

```typescript
// core/src/index.ts
import { postsRoutes } from './routes/posts.route';

const app = new Elysia()
  // ... other config
  .group('/api', (app) => 
    app
      .use(publicRoutes)
      .use(postsRoutes)
  )
  .listen(appConfig.port);
```

## Prisma Studio

Visual database browser at `http://localhost:5555`

```bash
# Start Prisma Studio
pnpm db:studio
```

With Docker, Prisma Studio starts automatically!

## Common Commands

```bash
# Generate client after schema changes
pnpm db:generate

# Create and apply migration
pnpm db:migrate

# Push changes without migration (dev only)
pnpm db:push

# View database in browser
pnpm db:studio

# Reset database (WARNING: deletes all data!)
pnpm db:reset
```

## Troubleshooting

**Error: "Prisma Client did not initialize yet"**
```bash
pnpm db:generate
```

**Error: "Can't reach database server"**
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart database
pnpm docker:down
pnpm docker:dev
```

**Error: "Migration failed"**
```bash
# Reset and try again
pnpm db:reset
pnpm db:migrate
```

For more help, see the main README.md

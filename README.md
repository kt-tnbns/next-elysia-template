# Next.js + Elysia Template

A full-stack TypeScript template with Next.js frontend and Elysia backend, configured for seamless communication between the two.

## 📁 Project Structure

```
next-elysia-template/
├── core/                          # Elysia backend (Bun)
│   ├── src/
│   │   ├── configs/
│   │   │   └── app.config.ts     # App configuration (CORS, ports, etc.)
│   │   ├── lib/
│   │   │   └── db.ts             # Prisma client singleton
│   │   ├── routes/
│   │   │   ├── public.route.ts   # Public API routes
│   │   │   └── swagger.route.ts  # Swagger/OpenAPI docs
│   │   ├── generated/
│   │   │   └── prisma/           # Generated Prisma Client
│   │   └── index.ts              # Main server entry point
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── .env                      # Backend environment variables
│   ├── .env.template             # Backend env template
│   ├── docker-compose.yml        # PostgreSQL only (for local dev)
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── web/                          # Next.js frontend (pnpm)
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/         # API service modules
│   │   │   ├── types/            # TypeScript type definitions
│   │   │   ├── page.tsx          # Home page with API demo
│   │   │   └── layout.tsx        # Root layout
│   │   └── lib/
│   │       ├── api.ts            # Axios client configuration
│   │       └── services.ts       # API service functions
│   ├── .env.local                # Frontend environment variables
│   ├── .env.template             # Frontend env template
│   ├── package.json
│   ├── next.config.ts
│   └── Dockerfile
├── package.json                  # Root package.json with unified scripts
├── docker-compose.yml            # Full stack (frontend + backend + DB)
├── docker-compose.dev.yml        # Development with hot-reload
├── .prettierrc.json              # Shared Prettier config
├── .prettierignore
├── SETUP.md                      # Database setup guide
└── README.md
```

## 🚀 Features

- **Next.js 16** with App Router and React 19
- **Elysia** backend with TypeScript and Bun runtime
- **PostgreSQL** database with Docker support
- **Prisma ORM** for type-safe database access
- **Prisma Studio** - visual database browser included
- **Swagger/OpenAPI** documentation with @elysiajs/swagger
- **Axios** configured for API communication with interceptors
- **CORS** properly configured with flexible origin settings
- **Prettier** for consistent code formatting across both projects
- **Docker** and Docker Compose support for both dev and production
- **Type-safe** API client and services with TypeScript
- **Environment variables** with .env.template files
- **Modular route system** for organized API endpoints
- **Unified scripts** - manage both projects from root directory
- **Database health checks** - monitor API and DB connectivity
- **Example endpoints** demonstrating frontend-backend communication

## 🛠️ Prerequisites

- **Node.js** 20+ (for Next.js)
- **Bun** (for Elysia backend)
- **pnpm** (for Next.js package management)
- **Docker** (optional, recommended for PostgreSQL)
- **PostgreSQL** 16+ (if not using Docker)

## ⚡ Quick Start

### Development (Local)

**Option 1: Using root-level commands (Recommended)**

1. **Clone and setup**
   ```bash
   git clone <your-repo>
   cd next-elysia-template
   ```

2. **Install all dependencies**
   ```bash
   pnpm install:all
   ```

3. **Setup environment files**
   ```bash
   cp core/.env.template core/.env
   cp web/.env.template web/.env.local
   ```

4. **Start both services at once**
   ```bash
   pnpm dev
   # Or start individually:
   # pnpm start:core  (Backend on port 3000)
   # pnpm start:web   (Frontend on port 3001)
   ```

5. **Setup database** (first time only)
   ```bash
   # Generate Prisma Client
   pnpm db:generate

   # Push schema to database (or run migrations)
   pnpm db:push
   ```

6. **Visit** http://localhost:3001 to see the template in action!

**With Docker (includes PostgreSQL + Prisma Studio):**

```bash
# Start all services with Docker
pnpm docker:dev

# Services:
# - Frontend: http://localhost:3001
# - Backend: http://localhost:3000
# - PostgreSQL: localhost:5432
# - Prisma Studio: http://localhost:5555
```

**Option 2: Manual setup**

1. **Setup Backend**
   ```bash
   cd core
   cp .env.template .env
   bun install
   bun run dev
   # Backend runs on http://localhost:3000
   ```

2. **Setup Frontend** (in a new terminal)
   ```bash
   cd web
   cp .env.template .env.local
   pnpm install
   pnpm dev
   # Frontend runs on http://localhost:3001
   ```

### Development (Docker)

```bash
# Run both services with hot-reload
docker-compose -f docker-compose.dev.yml up

# Frontend: http://localhost:3001
# Backend: http://localhost:3000
```

### Production (Docker)

```bash
# Build and run production containers
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

## 📝 Environment Variables

### Backend (`core/.env`)

```env
NODE_ENV=dev
PORT=3000
FRONTEND_URL=http://localhost:3001

# CORS Configuration
# Use '*' to allow all origins, or comma-separated list like 'http://localhost:3001,http://localhost:3002'
CORS_ALLOWED_ORIGINS=*
CORS_CREDENTIALS=false
```

**CORS Notes:**
- Use `CORS_ALLOWED_ORIGINS=*` for development (allows all origins)
- For production, specify exact origins: `CORS_ALLOWED_ORIGINS=https://yourdomain.com`
- If `CORS_CREDENTIALS=true`, you **cannot** use wildcard `*` - must specify exact origins
- Multiple origins: `CORS_ALLOWED_ORIGINS=http://localhost:3001,https://yourdomain.com`

### Frontend (`web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

**Frontend Notes:**
- `NEXT_PUBLIC_API_URL` - Backend API base URL (must start with `NEXT_PUBLIC_` to be accessible in browser)
- `PORT` - Port for Next.js dev server (default: 3001)
- To enable credentials/cookies, set `withCredentials: true` in `web/src/lib/api.ts` and update backend CORS settings accordingly

## 🗄️ Database

This template uses **PostgreSQL** with **Prisma ORM** for type-safe database access.

### Database Setup

**Option 1: Using Docker (Recommended)**

```bash
# Start PostgreSQL with Docker Compose
pnpm docker:dev

# The database will be available at:
# - Host: localhost
# - Port: 5432
# - Database: nextjs_elysia_db
# - User: postgres
# - Password: postgres
```

**Option 2: PostgreSQL Only (from core directory)**

Start just the database and Prisma Studio:

```bash
cd core
bun run db:up

# Stop database
bun run db:down

# View database logs
bun run db:logs
```

**Option 3: Local PostgreSQL**

If you have PostgreSQL installed locally, update `core/.env`:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_db?schema=public"
```

### Prisma Commands

From the project root:

```bash
# Generate Prisma Client (run after schema changes)
pnpm db:generate

# Create and apply migrations
pnpm db:migrate

# Push schema changes without migrations (dev only)
pnpm db:push

# Open Prisma Studio (visual database browser)
pnpm db:studio
# Access at http://localhost:5555

# Reset database (warning: deletes all data)
pnpm db:reset

# First-time setup
pnpm db:setup
```

From the `core/` directory:

```bash
cd core

# Generate Prisma Client
bun run db:generate

# Create migration
bun run db:migrate

# Open Prisma Studio
bun run db:studio

# Push schema changes
bun run db:push
```

### Adding Database Models

1. **Define your model** in `core/prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

2. **Generate Prisma Client**:

```bash
pnpm db:generate
```

3. **Create and apply migration**:

```bash
pnpm db:migrate
```

4. **Use in your routes** (`core/src/routes/*.ts`):

```typescript
import { prisma } from '../lib/db';

export const userRoutes = new Elysia()
  .get('/users', async () => {
    const users = await prisma.user.findMany();
    return { success: true, users };
  })
  .post('/users', async ({ body }) => {
    const user = await prisma.user.create({ data: body });
    return { success: true, user };
  });
```

### Prisma Studio

Access the visual database browser:

- **With Docker**: Prisma Studio runs automatically at `http://localhost:5555`
- **Without Docker**: Run `pnpm db:studio`

Features:
- Browse and edit data
- Filter and sort records
- View relationships
- Execute queries

## 🔌 API Endpoints

The backend includes example endpoints:

- `GET /` - Welcome message with API info
- `GET /api/health` - Health check endpoint (includes database status)
- `GET /api/info` - API information and available endpoints
- `GET /docs` - Swagger/OpenAPI documentation UI
- `GET /docs/json` - OpenAPI JSON specification

Example routes are defined in `core/src/routes/public.route.ts`

The `/api/health` endpoint now checks both API and database connectivity:
```json
{
  "success": true,
  "status": "healthy",
  "message": "API is healthy",
  "timestamp": "2025-11-05T...",
  "version": "1.0.0",
  "services": {
    "api": "healthy",
    "database": "healthy"
  }
}
```

## 💻 Usage

### Adding New API Endpoints

1. **Add endpoint in backend** (`core/src/routes/public.route.ts`):
   ```typescript
   export const publicRoutes = new Elysia()
     .get('/posts', () => ({
       success: true,
       posts: [{ id: 1, title: "Hello World" }]
     }), {
       detail: {
         tags: ['Posts'],
         summary: 'Get all posts',
         description: 'Returns a list of all posts',
       }
     })
   ```

2. **Mount route in** (`core/src/index.ts`):
   ```typescript
   .group('/api', (app) => app.use(publicRoutes))
   ```

3. **Create service in frontend** (`web/src/lib/services.ts` or `web/src/app/services/`):
   ```typescript
   import { api } from '@/lib/api';

   export interface Post {
     id: number;
     title: string;
   }

   export const postService = {
     getAll: () => api.get<{ success: boolean; posts: Post[] }>('/api/posts'),
   };
   ```

4. **Use in component**:
   ```typescript
   import { postService } from '@/lib/services';

   const data = await postService.getAll();
   console.log(data.posts);
   ```

## 🎨 Code Formatting

```bash
# Format backend
cd core && bun run format

# Format frontend
cd web && pnpm format

# Check formatting without changes
cd core && bun run format:check
cd web && pnpm format:check
```

## 📦 Available Scripts

### Root Level (Recommended)

Run these from the project root directory:

**Development:**
- `pnpm start:core` - Start backend (Elysia on port 3000)
- `pnpm start:web` - Start frontend (Next.js on port 3001)
- `pnpm dev` - Start both services concurrently
- `pnpm install:all` - Install dependencies for both projects

**Database:**
- `pnpm db:generate` - Generate Prisma Client
- `pnpm db:migrate` - Create and apply migrations
- `pnpm db:push` - Push schema changes (dev only)
- `pnpm db:studio` - Open Prisma Studio (port 5555)
- `pnpm db:reset` - Reset database (deletes all data)
- `pnpm db:setup` - First-time database setup

**Code Quality:**
- `pnpm format` - Format code in both projects
- `pnpm format:check` - Check formatting in both projects

**Build & Deploy:**
- `pnpm build:web` - Build frontend for production

**Docker:**
- `pnpm docker:dev` - Start Docker development environment
- `pnpm docker:prod` - Start Docker production environment
- `pnpm docker:down` - Stop Docker containers

### Backend (`core/`)

**Development:**
- `bun run dev` - Start development server with hot-reload

**Database:**
- `bun run db:generate` - Generate Prisma Client
- `bun run db:migrate` - Create and apply migrations
- `bun run db:migrate:deploy` - Deploy migrations (production)
- `bun run db:push` - Push schema changes without migrations
- `bun run db:studio` - Open Prisma Studio
- `bun run db:reset` - Reset database
- `bun run db:seed` - Run database seed file
- `bun run db:up` - Start PostgreSQL with Docker (database only)
- `bun run db:down` - Stop PostgreSQL container
- `bun run db:logs` - View PostgreSQL logs

**Code Quality:**
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

### Frontend (`web/`)

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🐳 Docker Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose up --build
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## 🏗️ Tech Stack

### Backend (core/)
- **Runtime:** Bun (fast JavaScript runtime)
- **Framework:** Elysia (high-performance web framework)
- **Language:** TypeScript
- **Database:** PostgreSQL 16 (reliable, feature-rich)
- **ORM:** Prisma (type-safe database access)
- **CORS:** @elysiajs/cors (configurable cross-origin support)
- **Documentation:** @elysiajs/swagger (OpenAPI/Swagger UI)
- **Config:** env-var (type-safe environment variables)

### Frontend (web/)
- **Framework:** Next.js 16 (App Router)
- **React:** 19.2
- **Language:** TypeScript
- **HTTP Client:** Axios (with interceptors and type safety)
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint

### Development Tools
- **Formatter:** Prettier (shared config)
- **Package Managers:** pnpm (frontend), Bun (backend)
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Concurrently (run both services from root)

## 📚 Project Details

### API Client Configuration

The API client is located in `web/src/lib/api.ts` and provides:
- Axios instance with base URL configuration
- Request/response interceptors for global error handling
- TypeScript support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Configurable credentials mode for authentication

### Type Safety

Both frontend and backend use TypeScript for type safety:
- **Backend:** Define types inline, in route files, or create a `core/src/types/` folder
- **Frontend:**
  - API response types: `web/src/lib/services.ts` or `web/src/app/types/`
  - Service functions: `web/src/lib/services.ts` or `web/src/app/services/`

### CORS Configuration

CORS is configured in `core/src/configs/app.config.ts`:
- **Development:** Use wildcard `*` to allow all origins
- **Production:** Specify exact origins for security
- **With Credentials:** When using cookies/auth, you must specify exact origins (no wildcard)
- **Flexible:** Supports single origin, multiple origins (comma-separated), or wildcard

The CORS middleware is applied in `core/src/index.ts` with configurable methods, headers, and credentials.

### Route Organization

Backend routes are organized in `core/src/routes/`:
- Each route file exports an Elysia instance with related endpoints
- Routes are mounted in `core/src/index.ts` using `.use()` or `.group()`
- Swagger documentation is automatically generated from route definitions

### Swagger/OpenAPI Documentation

Access interactive API docs at `http://localhost:3000/docs`:
- Auto-generated from route definitions
- Test endpoints directly in the browser
- View request/response schemas
- Export OpenAPI specification from `/docs/json`

## 🔧 Troubleshooting

### CORS Errors

If you encounter CORS errors:

1. **"Access-Control-Allow-Origin: * when credentials mode is 'include'"**
   - **Problem:** Frontend has `withCredentials: true` but backend uses wildcard `*`
   - **Solution:** Either disable credentials in `web/src/lib/api.ts` OR set specific origins in `core/.env`:
     ```env
     CORS_ALLOWED_ORIGINS=http://localhost:3001
     CORS_CREDENTIALS=true
     ```

2. **CORS preflight fails**
   - Check that backend is running on the correct port (3000)
   - Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
   - Ensure backend has restarted after .env changes

3. **Endpoints return 404**
   - Verify route is mounted in `core/src/index.ts`
   - Check that route path matches frontend service calls
   - Use `/api` prefix for routes mounted in `.group('/api', ...)`

### Port Conflicts

If ports are already in use:

```bash
# Check what's using port 3000 or 3001
lsof -i :3000
lsof -i :3001

# Kill process if needed
kill -9 <PID>

# Or change ports in .env files
```

### Dependencies Not Installing

```bash
# For backend (Bun)
cd core
rm -rf node_modules bun.lock
bun install

# For frontend (pnpm)
cd web
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Database Connection Issues

**Cannot connect to database:**

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# If using Docker, restart database
pnpm docker:down
pnpm docker:dev

# Check DATABASE_URL in core/.env
# Format: postgresql://user:password@host:port/database?schema=public
```

**Prisma Client not generated:**

```bash
# Generate Prisma Client
pnpm db:generate

# If that fails, try from core directory
cd core && bun run db:generate
```

**Migration errors:**

```bash
# Reset database (WARNING: deletes all data)
pnpm db:reset

# Or manually reset
cd core
bunx prisma migrate reset
```

**"Prisma Client did not initialize yet":**

```bash
# Generate client after any schema.prisma changes
pnpm db:generate
```

**Port 5432 already in use:**

```bash
# Find process using port 5432
lsof -i :5432

# Stop existing PostgreSQL
# On macOS with Homebrew:
brew services stop postgresql

# Or change port in docker-compose
```

## 🤝 Contributing

Feel free to customize this template for your needs!

## 📄 License

MIT

# Squirrel MVP - Monorepo

A multi-tenant scheduling & booking platform for studios (art, pottery, yoga, music, etc.).

## What's inside?

This monorepo includes the following:

### Apps

- `api`: [NestJS](https://nestjs.com/) backend API
- `web`: [Next.js](https://nextjs.org/) customer-facing web application

### Packages

- `@repo/types`: Shared TypeScript types and Zod schemas
- `@repo/utils`: Shared utility functions (date, currency, etc.)
- `@repo/email`: Email templates and Resend integration
- `@repo/ui`: React component library
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm dev --filter=api
pnpm dev --filter=web

# Run other commands
pnpm build        # Build all apps
pnpm lint         # Lint all apps
pnpm check-types  # Type check all apps
pnpm cleanup      # Clean and reinstall everything
```

## Using Shared Packages

Import shared code in any app:

```typescript
// In apps/web or apps/api
import { User, StudioSchema } from '@repo/types';
import { formatCurrency } from '@repo/utils';
import { sendEmail } from '@repo/email';
```

## Environments & Deployment

We support three environments: **development**, **staging**, and **production**.

### Environment Files

Each app has environment-specific files:
- `.env.development` - Development environment
- `.env.staging` - Staging environment  
- `.env.production` - Production environment

### Local Development

To run locally with a specific environment:

```bash
# Copy the appropriate env file
cp apps/web/.env.development apps/web/.env.local
cp apps/api/.env.development apps/api/.env

# Run the apps
pnpm dev
```

### Deployment

#### Frontend (Vercel)

1. Connect your GitHub repo to Vercel
2. Configure build settings:
   - Root Directory: `app`
   - Build Command: `pnpm build --filter=web`
   - Output Directory: `apps/web/.next`
3. Set environment variables for each environment in Vercel dashboard
4. Configure deployment branches:
   - `main` → Production
   - `staging` → Staging  
   - `dev` → Development

#### Backend (Railway)

1. Connect your GitHub repo to Railway
2. Configure build settings:
   - Root Directory: `app`
   - Build Command: `pnpm build --filter=api`
   - Start Command: `pnpm start:prod --filter=api`
3. Set environment variables for each environment in Railway dashboard
4. Configure deployment branches:
   - `main` → Production
   - `staging` → Staging
   - `dev` → Development

### Branching Strategy

- `main` - Production deployments
- `staging` - Staging deployments  
- `dev` - Development deployments
- Feature branches merge into `dev`

### CI/CD Pipeline

Deployments are triggered automatically:
- Push to `dev` → Deploys to development environment
- Push to `staging` → Deploys to staging environment
- Push to `main` → Deploys to production environment

## Adding New Packages

1. Create a new directory under `packages/`
2. Add a `package.json` with the package name (e.g., `@repo/new-package`)
3. Add the package to the workspace by running `pnpm install`
4. Import it in any app using the package name

## Tech Stack

- **Frontend**: Next.js 15.3, React 19, Tailwind CSS
- **Backend**: NestJS 11
- **Database**: Supabase Postgres with RLS
- **Auth**: Clerk (organizations = studios)
- **Payments**: Stripe Connect + Stripe Elements
- **Email**: Resend
- **Build System**: Turborepo with pnpm workspaces

## Project Structure

```
squirrel/
├── app/
│   ├── apps/
│   │   ├── api/          # NestJS backend
│   │   └── web/          # Next.js frontend
│   ├── packages/
│   │   ├── types/        # Shared TypeScript types
│   │   ├── utils/        # Shared utilities
│   │   ├── email/        # Email templates
│   │   ├── ui/           # React components
│   │   ├── eslint-config/
│   │   └── typescript-config/
│   ├── turbo.json
│   ├── package.json
│   └── pnpm-workspace.yaml
└── documentation/
    ├── engineering_handoff.md
    └── tickets.md
```
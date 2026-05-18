# Python Master 12 - Deployment Guide

> Complete deployment guide for Python Master 12 educational platform.
> Deploy to Vercel, Netlify, Railway, or Docker.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Vercel Deployment (Recommended)](#2-vercel-deployment-recommended)
3. [Netlify Deployment](#3-netlify-deployment)
4. [Railway Deployment](#4-railway-deployment)
5. [Docker Deployment](#5-docker-deployment-optional)
6. [Environment Variables Setup](#6-environment-variables-setup)
7. [Database Configuration](#7-database-configuration-local-vs-cloud)
8. [AI Tutor Setup](#8-ai-tutor-setup)
9. [Custom Domain Configuration](#9-custom-domain-configuration)
10. [SSL Certificates](#10-ssl-certificates)
11. [Performance Optimization](#11-performance-optimization)
12. [Monitoring and Logging](#12-monitoring-and-logging)
13. [Backup and Recovery](#13-backup-and-recovery)
14. [Troubleshooting FAQ](#14-troubleshooting-faq)

---

## 1. Prerequisites

Before deploying, ensure you have the following installed:

| Requirement | Version | Check Command | Install Guide |
|-------------|---------|---------------|---------------|
| Node.js | 18.17+ | `node --version` | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | `npm --version` | Comes with Node.js |
| Git | 2.30+ | `git --version` | [git-scm.com](https://git-scm.com/) |

### Verify Installation

```bash
# Check all requirements
node --version    # Should output v18.17.0 or higher
npm --version     # Should output 9.0.0 or higher
git --version     # Should output git version 2.30.0 or higher
```

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/python-master-12.git

# Navigate to project directory
cd python-master-12

# Install dependencies
npm install
```

### Project Structure Overview

```
python-master-12/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and helpers
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
├── docs/              # Documentation
├── .env.example      # Environment variables template
├── next.config.ts    # Next.js configuration
└── package.json      # Dependencies
```

---

## 2. Vercel Deployment (Recommended)

Vercel is the recommended deployment platform for Next.js applications with zero-configuration deployments and excellent edge network performance.

### 2.1 Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

### 2.2 Deploy via GitHub Integration

1. **Push your code to GitHub:**
   ```bash
   # Initialize git (if not already initialized)
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/python-master-12.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js framework

3. **Configure Environment Variables:**
   - Click "Environment Variables" in the Vercel dashboard
   - Add all variables from [.env.example](.env.example)
   - See [Environment Variables Setup](#6-environment-variables-setup) for details

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be available at `https://your-project.vercel.app`

### 2.3 Vercel Configuration File

Create `vercel.json` in the project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devDependencies": {
    "@vercel/static-build": "^2.0.0"
  },
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 2.4 Vercel Dashboard Settings

| Setting | Recommended Value |
|---------|------------------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 20.x |

**Screenshot Reference:** _Vercel Project Settings → General (vercel.com/dashboard)_

---

## 3. Netlify Deployment

Netlify offers excellent static site hosting with built-in CI/CD.

### 3.1 Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod
```

### 3.2 Deploy via GitHub Integration

1. **Push code to GitHub** (same as Vercel steps above)

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Authorize GitHub and select your repository

3. **Configure Build Settings:**

   | Setting | Value |
   |---------|-------|
   | Base directory | `/` |
   | Build command | `npm run build` |
   | Publish directory | `.next` |

4. **Add Environment Variables:**
   - Go to "Site settings" → "Environment variables"
   - Add all variables from [.env.example](.env.example)

5. **Deploy:** Click "Deploy site"

### 3.3 Netlify Configuration File

Create `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 4. Railway Deployment

Railway provides simple deployment with automatic Docker builds.

### 4.1 Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy to production
railway up --prod
```

### 4.2 Deploy via GitHub

1. **Push code to GitHub**

2. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure:**
   - Railway auto-detects Next.js
   - Add environment variables in project settings

4. **Deploy:** Automatic on push to main branch

### 4.3 Railway startCommand

```bash
npm run build && npm run start
```

---

## 5. Docker Deployment (Optional)

For self-hosting or custom infrastructure.

### 5.1 Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Set production mode
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install serve to serve static files
RUN npm install -g serve

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### 5.2 Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 5.3 Build and Run

```bash
# Build the Docker image
docker build -t python-master-12:latest .

# Run the container
docker run -d \
  --name python-master-12 \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your-api-key \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  python-master-12:latest

# View logs
docker logs -f python-master-12

# Stop container
docker stop python-master-12
```

### 5.4 Multi-Stage Production Build

For reduced image size and security:

```dockerfile
# syntax=docker/dockerfile:1

# Dependencies stage
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 6. Environment Variables Setup

### 6.1 Required Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI Tutor | Yes | `sk-...` |
| `NEXT_PUBLIC_APP_URL` | Application URL for metadata | Yes | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | No | `eyJ...` |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID | No | `UA-...` |

### 6.2 Creating .env.production

Create a `.env.production` file (never commit this):

```bash
# AI Configuration
OPENAI_API_KEY=sk-prod-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# App URL (update to your production domain)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 6.3 Setting Variables on Platforms

**Vercel:**
```bash
# Using Vercel CLI
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_APP_URL

# Production environment
vercel env add OPENAI_API_KEY --env=production
```

**Netlify:**
```bash
# Using Netlify CLI
netlify env:set OPENAI_API_KEY sk-prod-xxx
```

**Railway:**
```bash
# Using Railway CLI
railway variables set OPENAI_API_KEY=sk-prod-xxx
```

### 6.4 Security Best Practices

- [ ] Never commit `.env.production` to version control
- [ ] Use platform-specific secret management
- [ ] Rotate API keys periodically
- [ ] Use different keys for staging vs production
- [ ] Restrict API key permissions to minimum required

---

## 7. Database Configuration (Local vs Cloud)

Python Master 12 can operate with local storage or cloud databases.

### 7.1 Local Storage (Default)

By default, the application uses browser localStorage for:
- User preferences
- Progress tracking
- Quiz results
- Badge data

No database setup required for basic functionality.

### 7.2 Supabase (Recommended Cloud Option)

For multi-user support and persistent data:

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your Project URL and anon key

2. **Get Credentials:**

   | Credential | Location |
   |-----------|----------|
   | Project URL | Settings → API |
   | anon/public key | Settings → API → Project API keys |
   | service_role key | Settings → API → Project API keys (server-side only) |

3. **Set Environment Variables:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

4. **Database Schema:**
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     name TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Progress table
   CREATE TABLE progress (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id),
     course_id TEXT NOT NULL,
     lesson_id TEXT,
     completed BOOLEAN DEFAULT FALSE,
     score INTEGER,
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

### 7.3 Firebase Alternative

1. **Create Firebase Project:**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Create project
   - Enable Firestore Database

2. **Get Configuration:**
   ```javascript
   const firebaseConfig = {
     apiKey: "xxx",
     authDomain: "your-app.firebaseapp.com",
     projectId: "your-project",
     // ...
   };
   ```

3. **Set Environment Variables:**
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=xxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
   ```

### 7.4 Platform Comparison

| Feature | localStorage | Supabase | Firebase |
|---------|-------------|----------|----------|
| Setup Complexity | None | Medium | Medium |
| Cost | Free | Free tier available | Free tier available |
| Multi-user | No | Yes | Yes |
| Real-time sync | No | Yes | Yes |
| Offline support | Limited | No | Yes |
| Data migration | N/A | SQL export | JSON export |

---

## 8. AI Tutor Setup

The AI Tutor feature requires OpenAI API integration.

### 8.1 Getting an OpenAI API Key

1. **Create OpenAI Account:**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up or log in

2. **Generate API Key:**
   - Navigate to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy and securely store the key

3. **Set Usage Limits:**
   - Go to "Usage" → "Limits"
   - Set monthly budget alerts
   - Configure rate limits

### 8.2 Configuring AI Tutor

Add to environment variables:

```bash
OPENAI_API_KEY=sk-prod-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 8.3 AI Tutor Cost Optimization

| Strategy | Description | Potential Savings |
|----------|-------------|-------------------|
| Use gpt-4o-mini | Cheaper model for simple queries | Up to 90% |
| Implement caching | Cache repeated queries | Up to 40% |
| Limit message history | Keep conversation short | Up to 30% |
| Set max tokens | Cap response length | Up to 20% |

### 8.4 Testing AI Tutor

```bash
# Test API key is valid
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Test in development
npm run dev
# Navigate to /tutor page
```

---

## 9. Custom Domain Configuration

### 9.1 Vercel Custom Domain

1. **Add Domain:**
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Click "Add"
   - Enter your domain (e.g., `learn.pythonmaster.com`)

2. **Configure DNS:**

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | `76.76.21.21` |
   | CNAME | www | `cname.vercel-dns.com` |

3. **Verify:**
   - DNS changes may take up to 48 hours
   - Vercel will auto-provision SSL

### 9.2 Netlify Custom Domain

1. **Add Domain:**
   - Go to Netlify Dashboard → Site settings → Domain management
   - Click "Add custom domain"
   - Enter domain name

2. **Configure DNS:**

   | Type | Name | Value |
   |------|------|-------|
   | CNAME | www | `your-site.netlify.app` |
   | CNAME | @ | `your-site.netlify.app` |

3. **HTTPS:** Netlify auto-provisions Let's Encrypt certificate

### 9.3 Railway Custom Domain

1. **Add Domain:**
   - Go to Railway Dashboard → Project → Settings → Networking
   - Add custom domain

2. **Configure DNS:**
   - Add CNAME record pointing to Railway-provided domain
   - Add A record for bare domain to Railway IP

### 9.4 DNS Configuration Tips

- Use `dig your-domain.com` to verify DNS propagation
- Allow 24-48 hours for DNS changes to propagate globally
- Use `whatsmydns.net` to check DNS status from multiple locations

---

## 10. SSL Certificates

### 10.1 Automatic SSL (Recommended)

| Platform | Certificate Provider | Auto-Renewal |
|----------|---------------------|--------------|
| Vercel | Let's Encrypt / DigiCert | Yes |
| Netlify | Let's Encrypt | Yes |
| Railway | Let's Encrypt | Yes |
| Docker (Nginx) | Let's Encrypt (via certbot) | Yes |

### 10.2 Manual SSL Setup (Docker/Nginx)

```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/ssl/certs/your-domain.crt;
    ssl_certificate_key /etc/ssl/private/your-domain.key;

    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 10.3 Certbot Setup

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

## 11. Performance Optimization

### 11.1 Build Optimizations

```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm install -g @next/bundle-analyzer
npx @next/bundle-analyzer
```

### 11.2 Image Optimization

Next.js automatic image optimization is enabled by default. For custom images:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 11.3 Caching Strategies

| Resource | Cache Duration | Header |
|---------|---------------|--------|
| Static assets | 1 year | `Cache-Control: public, max-age=31536000, immutable` |
| JavaScript | 1 year | `Cache-Control: public, max-age=31536000, immutable` |
| CSS | 1 year | `Cache-Control: public, max-age=31536000, immutable` |
| HTML | No cache | `Cache-Control: no-cache` |
| API responses | Depends | Configure per endpoint |

### 11.4 Performance Checklist

- [ ] Enable gzip/brotli compression
- [ ] Implement lazy loading for images
- [ ] Use `next/image` for all images
- [ ] Preload critical fonts
- [ ] Code split per route
- [ ] Monitor Core Web Vitals

### 11.5 Core Web Vitals Targets

| Metric | Target | Tools |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| FID (First Input Delay) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |

---

## 12. Monitoring and Logging

### 12.1 Vercel Analytics

Vercel provides built-in analytics:

```bash
# Enable Vercel Analytics
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 12.2 Logging Configuration

```typescript
// src/lib/logger.ts
export const logger = {
  info: (message: string, meta?: object) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, meta);
    }
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, { error: error?.message, stack: error?.stack });
  },
  warn: (message: string, meta?: object) => {
    console.warn(`[WARN] ${message}`, meta);
  },
};
```

### 12.3 Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/nextjs
npx sentry-wizard@latest -i nextjs
```

### 12.4 Monitoring Services Comparison

| Service | Free Tier | Price | Best For |
|---------|-----------|-------|----------|
| Vercel Analytics | 5k visits/mo | $20/100k | Next.js apps |
| Google Analytics | 10M hits/mo | Free | General analytics |
| Plausible | 10k visits/mo | $9/mo | Privacy-focused |
| LogRocket | 1k sessions/mo | $25/1k | Session replay |
| Sentry | 5k errors/mo | Free | Error tracking |

---

## 13. Backup and Recovery

### 13.1 Local Data Export

```bash
# Export localStorage data (run in browser console)
const data = JSON.stringify(localStorage, null, 2);
const blob = new Blob([data], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `backup-${Date.now()}.json`;
a.click();
```

### 13.2 Database Backup

**Supabase:**
```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Restore
psql -h db.xxx.supabase.co -U postgres -d postgres -f backup.sql
```

**Firebase:**
- Go to Firebase Console → Firestore → Export Data
- Or use Firebase Admin SDK for programmatic backup

### 13.3 Disaster Recovery Plan

| Scenario | Recovery Steps | RTO | RPO |
|----------|---------------|-----|-----|
| Data loss | Restore from backup | 1 hour | 24 hours |
| Platform outage | Deploy to alternative | 30 min | 0 |
| Code bug | Rollback via Git | 15 min | 0 |
| Security breach | Rotate keys, review logs | 1 hour | Varies |

### 13.4 Backup Schedule

| Data Type | Backup Frequency | Retention |
|-----------|-----------------|-----------|
| Database (Supabase) | Daily | 30 days |
| User uploads | Weekly | 90 days |
| Configuration | On change | Forever |
| Code | On change (Git) | Forever |

---

## 14. Troubleshooting FAQ

### 14.1 Build Failures

**Q: Build fails with "Module not found"**
```
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

**Q: Build fails with TypeScript errors**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Skip type checking during build (not recommended)
# Edit package.json build script
"build": "next build --no-lint"
```

**Q: Memory limit exceeded**
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### 14.2 Runtime Errors

**Q: "OPENAI_API_KEY is not defined"**
- Verify environment variable is set correctly
- Restart the application after setting variables
- Check for typos in variable name

**Q: "Failed to load resource" 404 errors**
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Check that all API endpoints are accessible
- Clear browser cache

**Q: Images not loading**
- Use `next/image` component
- Check that images are in `/public` directory
- Verify image paths are relative

### 14.3 Deployment Errors

**Q: "Command not found" on Vercel**
- Check that `package.json` scripts are correct
- Verify build command matches framework
- Check Node.js version compatibility

**Q: "Port already in use"**
```bash
# Find and kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :3000
kill -9 <pid>
```

**Q: SSL certificate errors**
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Contact platform support for manual SSL reissuance

### 14.4 Performance Issues

**Q: Slow page load times**
1. Enable compression (gzip/brotli)
2. Optimize images with `next/image`
3. Reduce JavaScript bundle size
4. Enable caching headers
5. Use CDN for static assets

**Q: High memory usage**
```bash
# Monitor memory
node --expose-gc -e "
global.gc();
setInterval(() => {
  global.gc();
  console.log(process.memoryUsage());
}, 10000);
"
```

### 14.5 Common Error Messages

| Error | Solution |
|-------|----------|
| `ECONNREFUSED` | Check database connection string |
| `ENOTFOUND` | Verify domain DNS records |
| `EROFS` | File system read-only (check permissions) |
| `ETIMEDOUT` | Increase network timeout |
| `H10` (Heroku) | App crashed - check logs |
| `ELIFECYCLE` | Clear npm cache, reinstall |

### 14.6 Getting Help

- **Documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support:** [vercel.com/help](https://vercel.com/help)
- **Netlify Support:** [docs.netlify.com](https://docs.netlify.com)
- **GitHub Issues:** [github.com/your-repo/issues](https://github.com/your-repo/issues)

---

## Quick Reference

### One-Command Deploy (Vercel)

```bash
npm install && npm run build && vercel --prod
```

### Environment Variables Checklist

```bash
# Required for AI features
OPENAI_API_KEY=sk-...

# Required for production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start       # Start production server

# Deployment
vercel --prod       # Deploy to Vercel production
netlify deploy --prod  # Deploy to Netlify production
railway up --prod   # Deploy to Railway production
```

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Maintainer:** Python Master 12 Team
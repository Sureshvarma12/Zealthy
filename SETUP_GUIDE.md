# Zealthy Mini-EMR Setup Guide

## 📦 What You Received

This is a full-stack patient management system with admin and patient portals built with Next.js, TypeScript, and Prisma.

## 🚀 Local Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

To generate a secure secret:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

### Step 3: Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

### Test Login Credentials
- Email: `john.doe@example.com`
- Password: `password123`

---

## 🌐 Deploy to Vercel (10 minutes)

### Step 1: Prepare Your Code
1. Create a GitHub account (if you don't have one)
2. Create a new repository on GitHub
3. Push this code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Set Up PostgreSQL Database
You need a PostgreSQL database for production. Choose one:

**Option A: Vercel Postgres (Easiest)**
1. Go to https://vercel.com
2. Sign up/Login
3. Create a new project → Storage → Create Database → Postgres
4. Copy the `DATABASE_URL` connection string

**Option B: Neon (Free)**
1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string

**Option C: Supabase (Free)**
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database → Copy connection string

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure environment variables:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Will be auto-filled (e.g., https://your-app.vercel.app)
   - `DATABASE_URL`: Your PostgreSQL connection string from Step 2
4. Click "Deploy"

### Step 4: Initialize Production Database
After deployment, run migrations:
```bash
npx prisma migrate deploy
```

Or use Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel env pull
npx prisma migrate deploy
node prisma/seed.js
```

### Step 5: Access Your App
Your app will be live at: `https://your-app.vercel.app`

---

## 📁 Project Structure

```
zealthy-emr/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js            # Sample data
├── src/
│   ├── app/
│   │   ├── api/           # Backend API routes
│   │   ├── admin/         # Admin portal
│   │   ├── portal/        # Patient portal
│   │   └── page.tsx       # Login page
│   ├── components/        # React components
│   └── lib/              # Utilities
└── package.json
```

---

## 🔧 Common Issues & Solutions

### Issue: "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection errors
- Check your `DATABASE_URL` in `.env.local`
- For local: Use `file:./dev.db`
- For production: Use PostgreSQL connection string

### Issue: Prisma errors
```bash
npx prisma generate
npx prisma migrate reset
node prisma/seed.js
```

### Issue: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

---

## 📚 Features

### Admin Portal (`/admin`)
- Manage all patients
- Create/Edit patient records
- Schedule appointments
- Manage prescriptions

### Patient Portal (`/portal`)
- Secure login
- View appointments (next 7 days)
- View prescriptions
- Personal dashboard

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: Prisma
- **Auth**: NextAuth.js

---

## 📞 Need Help?

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Vercel Docs: https://vercel.com/docs
- NextAuth Docs: https://next-auth.js.org

---

## 📝 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Database
npx prisma studio       # Open database GUI
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Run migrations (dev)
npx prisma migrate deploy # Run migrations (prod)
node prisma/seed.js     # Seed database

# Deployment
vercel                  # Deploy to Vercel
vercel --prod          # Deploy to production
```

---

Good luck! 🚀

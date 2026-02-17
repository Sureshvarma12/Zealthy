# Deploy to Vercel - Step by Step

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- PostgreSQL database (use Vercel Postgres or Neon)

## Step 1: Push to GitHub

```bash
cd "c:\Users\Astha Singh\Desktop\Zealthy"
git init
git add .
git commit -m "Initial commit - Zealthy EMR"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zealthy-emr.git
git push -u origin main
```

## Step 2: Create PostgreSQL Database

### Option A: Vercel Postgres (Recommended)
1. Go to vercel.com/dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Copy the DATABASE_URL connection string

### Option B: Neon (Free tier)
1. Go to neon.tech
2. Create new project
3. Copy the connection string

## Step 3: Deploy to Vercel

1. Go to vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `prisma generate && next build`
   - Output Directory: .next

4. Add Environment Variables:
   ```
   NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
   NEXTAUTH_URL=https://your-app-name.vercel.app
   DATABASE_URL=<your-postgres-connection-string>
   ```

5. Click "Deploy"

## Step 4: Run Database Migrations

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

Or use Vercel dashboard:
1. Go to your project → Settings → Functions
2. Add a one-time script to run migrations

## Step 5: Seed Database

Create a temporary API route to seed:

```typescript
// src/app/api/seed/route.ts
import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    await execAsync('node prisma/seed.js')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
```

Visit: `https://your-app.vercel.app/api/seed`

Then delete the route for security.

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Login with test credentials:
   - Email: john.doe@example.com
   - Password: password123
3. Test admin portal at `/admin`

## Troubleshooting

### Build fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify DATABASE_URL is set

### Database connection fails
- Verify DATABASE_URL format
- Check database is accessible from Vercel
- Ensure SSL is enabled if required

### Authentication issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

## Generate NEXTAUTH_SECRET

Windows PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Git Bash / WSL:
```bash
openssl rand -base64 32
```

## Quick Deploy Button (Optional)

Add to README.md:
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/zealthy-emr)
```

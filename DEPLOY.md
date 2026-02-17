# Quick Vercel Deployment

## 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 2. Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add these environment variables:

```
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.vercel.app
DATABASE_URL=<your-postgres-url>
SEED_SECRET=<any-random-string>
```

## 3. Get PostgreSQL Database
**Option 1: Vercel Postgres**
- In Vercel dashboard → Storage → Create Database → Postgres
- Copy DATABASE_URL automatically

**Option 2: Neon (Free)**
- Go to https://neon.tech
- Create project → Copy connection string

## 4. After Deployment
Run migrations and seed:
```bash
# Visit this URL once (replace with your domain):
curl -X POST https://your-app.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_SEED_SECRET"}'
```

## 5. Test
- Login: https://your-app.vercel.app
- Email: john.doe@example.com
- Password: password123
- Admin: https://your-app.vercel.app/admin

## Done! 🎉

# Resume Studio - Deployment Guide

## Quick Deploy (Vercel - Recommended)

### 1. Push to GitHub
```bash
git push origin master
```

### 2. Connect Vercel
1. Go to https://vercel.com/new
2. Select your GitHub repo
3. Click "Import Project"

### 3. Add Environment Variables
In Vercel dashboard, add these under Settings → Environment Variables:

```
DATABASE_URL=postgresql://user:pass@host/db
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate with: npx auth secret>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```

### 4. Deploy
Click "Deploy" and wait for build to complete.

✅ Your app is live!

---

## Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Neon, AWS RDS, etc.) |
| `NEXTAUTH_URL` | Yes | Your production domain (e.g., https://resumestudio.app) |
| `NEXTAUTH_SECRET` | Yes | Generate: `npx auth secret` |
| `GOOGLE_CLIENT_ID` | No | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | No | Google Cloud Console |
| `PUPPETEER_SKIP_DOWNLOAD` | No | Leave empty (Vercel has Chromium) |

---

## Database Setup

### Option 1: Neon (Easiest, Free Tier)

1. Go to https://neon.tech
2. Sign up (free account)
3. Create new project
4. Get connection string: `postgresql://...`
5. Add to `DATABASE_URL`
6. Run migration:
   ```bash
   npx prisma db push
   ```

### Option 2: AWS RDS

1. Create RDS PostgreSQL instance
2. Get connection string
3. Add to `DATABASE_URL`
4. Run migration via GitHub Actions or local CLI

### Option 3: Railway.app

1. Go to https://railway.app
2. Create PostgreSQL plugin
3. Copy connection string to `DATABASE_URL`

---

## Setup Google OAuth (Optional)

### 1. Create OAuth App
- Go to https://console.cloud.google.com
- Create new project
- Enable "Google+ API"
- Create OAuth 2.0 credentials (Web application)

### 2. Add Redirect URIs
For development:
```
http://localhost:3000/api/auth/callback/google
```

For production:
```
https://your-domain.com/api/auth/callback/google
```

### 3. Add to Environment
```
GOOGLE_CLIENT_ID=<your-id>
GOOGLE_CLIENT_SECRET=<your-secret>
```

---

## GitHub Actions CI/CD

Automatic workflows:

### `.github/workflows/ci.yml`
- Runs on every push
- Tests build on Node 18 & 20
- Runs linter
- Checks security (npm audit)

### `.github/workflows/deploy.yml`
- Runs on push to master/main
- Auto-deploys to Vercel
- Posts comment on PRs

### To Enable:
1. Add to Vercel Secrets:
   - `VERCEL_TOKEN`: From Vercel Account Settings
   - `VERCEL_ORG_ID`: From Vercel Team Settings
   - `VERCEL_PROJECT_ID`: From project settings

2. Push to trigger workflow

---

## Production Checklist

- [ ] Database running and backed up
- [ ] All env vars set in Vercel
- [ ] HTTPS enabled
- [ ] Analytics set up (optional: Vercel Analytics)
- [ ] Error tracking enabled (optional: Sentry)
- [ ] Rate limiting configured
- [ ] Backups scheduled

---

## Monitoring & Logs

### Vercel Logs
- Go to project → Deployments
- Click recent deployment
- View "Functions" tab for API logs

### Database Logs
- Use Neon dashboard or RDS console
- Monitor slow queries
- Set up backups

### Application Monitoring
```bash
# Local development
npm run dev

# Production build
npm run build
npm start
```

---

## Troubleshooting

### Build Fails on Vercel
```
Error: Cannot find module '@/lib/...'
```
**Fix:** Check `tsconfig.json` paths configuration

### Database Connection Error
```
Error: connect ECONNREFUSED
```
**Fix:** Verify `DATABASE_URL` in Vercel env vars, check DB is running

### Google OAuth Not Working
```
Error: Callback URL mismatch
```
**Fix:** Add deployment URL to Google Console redirect URIs

### PDF Export Fails
```
Error: Chrome/Chromium not found
```
**Fix:** Puppeteer should work on Vercel (pre-installed), clear cache and redeploy

---

## Scaling Considerations

### Database
- Use connection pooling (Prisma does this)
- Set reasonable max connections (e.g., 20 for free tier)
- Monitor query performance

### PDF Generation
- Currently single-threaded (Puppeteer)
- For high volume: implement queue (Bull/Redis)
- Add file storage (S3) for generated PDFs

### CDN
- Vercel automatically uses Edge Network
- Static assets cached globally
- No additional config needed

---

## Rollback

### Revert to Previous Deployment
1. Vercel dashboard → Deployments
2. Find previous successful deployment
3. Click "Promote to Production"

### Database Rollback
```bash
npx prisma migrate resolve --rolled-back <migration>
```

---

## Security Best Practices

- [ ] HTTPS only (Vercel default)
- [ ] Rate limiting enabled (10 exports/min)
- [ ] CSRF protection (NextAuth default)
- [ ] XSS protection (React escaping)
- [ ] SQL injection protection (Prisma parameterized)
- [ ] Secrets not in code (env vars only)
- [ ] Regular dependency updates

---

## Performance Tips

- Images: Use Next.js Image component
- CSS: Tailwind purges unused styles
- Bundle: Tree-shaking removes unused code
- API: Optimize Prisma queries (add .select())
- Database: Add indexes on frequently queried fields

---

## Support

- Vercel: https://vercel.com/support
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- Neon: https://neon.tech/docs

---

**Your app is production-ready! 🚀**

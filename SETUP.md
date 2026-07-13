# Resume Studio - Complete Setup Guide

## Quick Start (Windows)

### Option 1: Automatic Setup (Easiest)
1. Double-click **`run.bat`** file
2. It will automatically:
   - Install dependencies (if needed)
   - Create `.env.local` from template
   - Set up database
   - Start the dev server

### Option 2: Manual Setup

#### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org/))
- **PostgreSQL 14+** (Local or cloud, e.g., [Neon](https://neon.tech))
- **Git** ([Download](https://git-scm.com/))

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Set Up Environment
Copy `.env.local.example` to `.env.local`:
```bash
copy .env.local.example .env.local
```

Edit `.env.local` and fill in your values:

**Get your values:**
- **DATABASE_URL**: 
  - Local: `postgresql://user:password@localhost:5432/resume_generator`
  - Cloud (Neon): Create free DB at https://neon.tech, copy connection string
  
- **NEXTAUTH_SECRET**: Generate with:
  ```bash
  npx auth secret
  # or
  openssl rand -base64 32
  ```

- **GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET** (Optional):
  - Go to https://console.cloud.google.com
  - Create OAuth credentials (Web application)
  - Add redirect URI: `http://localhost:3000/api/auth/callback/google`

Example `.env.local`:
```env
DATABASE_URL="postgresql://user:password@ep-abc.us-east-1.aws.neon.tech/resume_generator?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-char-secret-here"
GOOGLE_CLIENT_ID="123456789.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-secret-here"
```

#### Step 3: Set Up Database

**Option A: Using Prisma CLI (Recommended)**
```bash
npm run db:push
```

**Option B: Create migrations**
```bash
npm run db:migrate
```

**Option C: View database visually**
```bash
npm run db:studio
```
Opens Prisma Studio at `http://localhost:5555` to view/edit data

#### Step 4: Start Dev Server
```bash
npm run dev
```

Opens automatically at http://localhost:3000

---

## Database Setup Details

### Local PostgreSQL (Windows)

1. Install PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer, remember the password for user `postgres`
3. Create database:
   ```bash
   psql -U postgres -c "CREATE DATABASE resume_generator;"
   ```
4. Update `.env.local`:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/resume_generator"
   ```

### Cloud Database (Neon - Easiest)

1. Go to https://neon.tech and sign up (free)
2. Create a new project
3. Get connection string (looks like):
   ```
   postgresql://user:password@ep-abc.us-east-1.aws.neon.tech/resume_generator?sslmode=require
   ```
4. Paste into `.env.local` as DATABASE_URL
5. Run `npm run db:push`

---

## Project Structure

```
resume-generator/
├── run.bat                          # ✨ Double-click to start!
├── app/                             # Main app (home & layout)
├── src/
│   ├── app/
│   │   ├── (auth)/                  # Login/Signup pages
│   │   ├── dashboard/               # User dashboard
│   │   ├── templates/               # Template gallery
│   │   ├── builder/                 # Resume form builder
│   │   └── api/
│   │       ├── auth/                # Auth API
│   │       ├── resumes/             # Resume CRUD API
│   │       └── export/              # PDF export (coming)
│   ├── components/
│   │   ├── builder/                 # Form components
│   │   └── SessionProvider.tsx
│   ├── lib/
│   │   ├── auth.ts                  # NextAuth config
│   │   ├── prisma.ts                # DB client
│   │   ├── pdf.ts                   # PDF generation
│   │   └── resumeSchema.ts          # Zod validation
│   ├── types/resume.ts              # TypeScript types
│   └── middleware.ts                # Route protection
├── prisma/
│   └── schema.prisma                # Database schema
├── .env.local                       # Your environment variables
├── .env.local.example               # Template
└── package.json
```

---

## Features & Status

### ✅ Implemented
- [x] User authentication (Email/Password + Google OAuth)
- [x] Resume CRUD operations (Create, Read, Update, Delete)
- [x] Multi-step form builder (Contact, Summary, Experience, Education, Skills)
- [x] Real-time data validation (Zod)
- [x] Responsive UI
- [x] Session management
- [x] Protected routes

### 🔄 In Progress (Phase 3-5)
- [ ] 20 resume templates
- [ ] Live preview pane
- [ ] PDF export
- [ ] Template gallery with filters

### 📋 Planned (Phase 6-7)
- [ ] Resume management dashboard
- [ ] Duplicate/rename resumes
- [ ] Switch templates
- [ ] Mobile optimization
- [ ] Deployment

---

## Common Issues & Solutions

### Issue: "Cannot find module '@/lib/auth'"
**Solution**: Make sure `tsconfig.json` has:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

### Issue: "DATABASE_URL is not set"
**Solution**: Create `.env.local` file with DATABASE_URL. Run:
```bash
copy .env.local.example .env.local
```

### Issue: "Port 3000 is already in use"
**Solution**: Kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- -p 3001
```

### Issue: "Prisma migration failed"
**Solution**: Reset database:
```bash
npm run db:push -- --skip-generate
```

Or if you want to start fresh:
```bash
# Delete all data (careful!)
npx prisma migrate reset
```

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database operations
npm run db:push          # Sync schema to DB
npm run db:migrate       # Create migrations
npm run db:studio        # Open Prisma Studio (visual DB editor)
```

---

## Development Workflow

1. **Make changes** to your code
2. **Save file** (auto-reloads dev server)
3. **Test in browser** at http://localhost:3000
4. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push
   ```

---

## Deployment (Vercel)

### Easy Deploy
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repo
5. Add environment variables from `.env.local`
6. Click Deploy ✨

### Environment Variables on Vercel
Add these in Vercel project settings → Environment Variables:
- `DATABASE_URL`
- `NEXTAUTH_URL` (set to your Vercel domain)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

---

## Getting Help

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zod Validation**: https://zod.dev

---

## Project Tips

✨ **Use Prisma Studio**
```bash
npm run db:studio
```
Visual database editor - great for debugging data issues!

💡 **Hot Reload**
Save any file → dev server auto-refreshes in browser

🔐 **Generate NextAuth Secret**
```bash
npx auth secret
```

📦 **Check Dependencies**
```bash
npm outdated
npm update
```

---

**Happy building! 🚀**

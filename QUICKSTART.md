# Resume Studio - Quick Start (60 seconds)

## Windows - Fastest Way

### Step 1: Double-Click `run.bat`
That's it! The script will:
- ✅ Install dependencies
- ✅ Set up database
- ✅ Start dev server
- ✅ Open http://localhost:3000

Done! Your app is running.

---

## Manual Setup (if run.bat doesn't work)

### 1. Install packages
```bash
npm install
```

### 2. Configure database
```bash
copy .env.local.example .env.local
```

Edit `.env.local`:
- **Quickest**: Use [Neon](https://neon.tech) (free PostgreSQL cloud)
  - Create DB, copy connection string into `DATABASE_URL`
  - Generate secret: `npx auth secret` → paste in `NEXTAUTH_SECRET`

### 3. Start
```bash
npm run dev
```

Visit http://localhost:3000

---

## First Time Use

1. **Sign Up** at `/signup` 
2. **Create Resume** → Pick template → Fill form
3. **See Data Saved** → Dashboard shows your resumes
4. **Download PDF** → Coming in Phase 5 ✨

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| DB connection fails | Check `DATABASE_URL` in `.env.local` |
| Module not found | Run `npm install` again |
| Still stuck? | See detailed [SETUP.md](SETUP.md) |

---

## Database Viewer

Visualize your data:
```bash
npm run db:studio
```
Opens at http://localhost:5555

---

**That's it! Start coding! 🚀**

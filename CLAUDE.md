# Resume Studio - Build & Development Notes

**Project**: AI-Free Resume Builder with 20 Professional Templates  
**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind + Prisma + PostgreSQL  
**Author**: Resume Studio Team  
**Last Updated**: 2025-01-14

---

## Project Overview

Resume Studio is a template-driven resume generator that allows users to:
1. Sign up / log in (email + Google OAuth)
2. Choose from 20 industry-standard resume templates
3. Fill in a guided multi-step form
4. Save drafts to database
5. Download PDF (coming Phase 5)

**All data is ATS-friendly and database-backed.**

---

## Architecture

### Frontend (Client)
- Next.js App Router with Server/Client components
- React hooks for form state management
- Tailwind CSS for styling
- SessionProvider for auth context

### Backend (API)
- Next.js API routes
- NextAuth.js for auth (JWT sessions)
- Prisma ORM for database
- Zod for runtime validation

### Database
- PostgreSQL (Prisma schema)
- Two main tables: Users, Resumes
- JSON column for flexible resume data

### Security
- bcrypt for password hashing
- NextAuth middleware for route protection
- Session-based auth (30-day expiry)

---

## Key Design Decisions

### 1. **Single JSON Data Contract**
All 20 templates share the same `ResumeData` interface. This means:
- ✅ Easy to add new templates (just create a new React component)
- ✅ All templates automatically work with all data
- ✅ No per-template backend logic

**Location**: `src/types/resume.ts` + `src/lib/resumeSchema.ts`

### 2. **Zod Validation**
Resume data is validated using Zod schemas before saving:
- ✅ Type-safe validation at runtime
- ✅ Clear error messages to users
- ✅ Shared validation between client & server

### 3. **Middleware-Based Route Protection**
`src/middleware.ts` protects authenticated routes:
- `/dashboard`, `/builder`, `/api/resumes/*` require login
- Automatic redirect to login with callbackUrl

### 4. **Puppeteer for PDF (Phase 5)**
Templates will render as React components → HTML → PDF via headless Chromium:
- ✅ Pixel-perfect output (no print-CSS issues)
- ✅ Works server-side (no browser dependencies)
- ✅ Can generate at scale

### 5. **SessionProvider Wrapper**
Client-side auth context wraps entire app in `app/layout.tsx`:
- ✅ useSession() available everywhere
- ✅ Automatic redirect on logout

---

## File Structure & Key Files

### Authentication
- `src/lib/auth.ts` — NextAuth config + providers
- `src/app/api/auth/signup/route.ts` — User registration API
- `src/app/(auth)/login/page.tsx` — Login UI
- `src/app/(auth)/signup/page.tsx` — Signup UI

### Forms & Builder
- `src/components/builder/*.tsx` — 5 form components (Contact, Summary, Experience, Education, Skills)
- `src/app/builder/page.tsx` — Main builder page with navigation
- `src/lib/resumeSchema.ts` — Zod validation for all fields

### Data Models
- `src/types/resume.ts` — TypeScript interfaces for resume data
- `prisma/schema.prisma` — Database schema (User, Resume models)
- `src/lib/prisma.ts` — Prisma client singleton

### APIs
- `src/app/api/resumes/route.ts` — Create (POST) & list (GET) resumes
- `src/app/api/resumes/[id]/route.ts` — Read (GET), update (PUT), delete (DELETE)

### UI & Pages
- `app/page.tsx` — Landing page
- `src/app/dashboard/page.tsx` — User dashboard
- `src/app/templates/page.tsx` — Template gallery (20 templates with filters)

---

## Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  name          String?
  oauthProvider String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  resumes       Resume[]
}

model Resume {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(...)
  title     String
  templateId String
  data      Json     # Full ResumeData object
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `NEXTAUTH_URL` | Auth callback URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | JWT signing key | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | OAuth provider ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth provider secret | From Google Cloud Console |
| `PUPPETEER_SKIP_DOWNLOAD` | Skip Chromium download | `false` (Phase 5) |

---

## Development Workflow

### Run Dev Server
```bash
npm run dev
```
Starts at http://localhost:3000 with hot reload

### Database Changes
```bash
npm run db:push          # Sync schema to DB (no migrations)
npm run db:migrate       # Create versioned migrations
npm run db:studio        # Open visual database editor
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## Phases Overview

### ✅ Phase 0 — Setup (DONE)
- Next.js scaffold, Prisma, types, auth config

### ✅ Phase 1 — Auth (DONE)
- Login/signup pages, NextAuth setup, route protection

### ✅ Phase 2 — Form Builder (DONE)
- Multi-step form components, CRUD APIs, Zod validation

### 🔄 Phase 3 — Templates (IN PROGRESS)
- 20 template React components
- Shared props interface
- Live preview pane

### ⏭ Phase 4 — Template Gallery
- 20 templates displayed with category filters
- Template selection flow

### ⏭ Phase 5 — PDF Export
- Puppeteer integration
- Render template → HTML → PDF
- Download button on preview

### ⏭ Phase 6 — Resume Management
- Dashboard with resume list
- Duplicate, rename, delete, switch template

### ⏭ Phase 7 — Polish & Deploy
- Mobile responsive
- Error handling
- Rate limiting
- CI/CD (GitHub Actions)
- Deploy to Vercel

---

## Common Development Tasks

### Add a New Form Field
1. Add to `ResumeData` interface in `src/types/resume.ts`
2. Add Zod validation in `src/lib/resumeSchema.ts`
3. Add input to relevant form component (e.g., `ContactForm.tsx`)
4. Test in form builder

### Create a New Template
1. Create `src/components/templates/TemplateName.tsx`
2. Receive `ResumeTemplateProps` (ResumeData + colorScheme)
3. Render HTML/Tailwind (will be converted to PDF in Phase 5)
4. Add to template gallery with ID

### Connect a New API Endpoint
1. Create route handler in `src/app/api/...`
2. Import `getServerSession` for auth
3. Use `prisma` client for DB operations
4. Return `NextResponse.json()`

### Protect a Route
Add to `src/middleware.ts` matcher array:
```typescript
matcher: [...existing, '/new-route/:path*']
```

---

## Testing Strategy

### Unit Tests (TODO)
- Zod schema validation
- Resume data transformations

### Component Tests (TODO)
- Render all 20 templates with mock data
- Verify form components

### E2E Tests (TODO)
- Signup → Create Resume → Download PDF
- Login → Edit existing resume → Export

---

## Common Pitfalls & Solutions

### Issue: Import paths not resolving
**Cause**: tsconfig.json paths misconfigured
**Fix**: Ensure `"@/*": ["./src/*"]` in tsconfig.json

### Issue: Prisma client can't connect
**Cause**: DATABASE_URL not set or wrong format
**Fix**: Check `.env.local`, test with `npm run db:studio`

### Issue: NextAuth not working after DB changes
**Cause**: Prisma client not regenerated
**Fix**: Run `npm run db:push` (generates Prisma client)

### Issue: Form data not persisting
**Cause**: Resume ID not passed to API
**Fix**: Ensure resume exists before PUT requests

---

## Performance Notes

- **Database Queries**: Indexed on userId for fast resume listing
- **Bundle Size**: Tree-shaking removes unused components
- **PDF Generation**: Happens server-side, not in browser
- **Sessions**: JWT (stateless), no database lookup on every request

---

## Security Checklist

- [x] Passwords hashed with bcrypt (10 salt rounds)
- [x] NextAuth middleware protects all routes
- [x] Session tokens are HTTP-only
- [x] CSRF protection via NextAuth
- [x] Input validation with Zod
- [x] Database queries parameterized (Prisma)
- [ ] Rate limiting (Phase 7)
- [ ] API key rotation (if needed)

---

## Deployment Checklist (Phase 7)

- [ ] Set NEXTAUTH_SECRET in production
- [ ] Set NEXTAUTH_URL to production domain
- [ ] Update OAuth redirect URIs in Google Cloud
- [ ] Test database connection in production
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CDN for static assets
- [ ] Add monitoring/error tracking

---

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## Getting Help

Check these resources in order:
1. Read error messages carefully
2. Search existing code for similar patterns
3. Run `npm run db:studio` to inspect data
4. Check `.env.local` configuration
5. Look at commit messages for context

---

**Happy coding! 🚀**

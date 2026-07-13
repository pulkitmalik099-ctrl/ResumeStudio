# Resume Generator

An AI-free, template-driven resume builder that allows users to create, customize, and download professional resumes from 20 industry-standard templates.

## Features

- **20 Professional Templates** across 6 categories:
  - ATS-friendly templates (3)
  - Modern designs (3)
  - Executive templates (3)
  - Creative/portfolio (3)
  - Technical/IT (2)
  - Entry-level, Academic, Career-change, Compact, International (4)

- **User Authentication** (Email/Password + Google OAuth)
- **Saved Resume Management** (Create, edit, rename, duplicate, delete)
- **Multi-step Form Builder** with live preview
- **PDF Export** (A4 standard, print-ready)
- **ATS Compatibility** (parser-friendly formatting)

## Tech Stack

- **Frontend:** Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js (credentials + OAuth)
- **PDF Generation:** Puppeteer (headless Chromium)
- **Validation:** Zod schemas
- **Hosting:** Vercel (recommended)

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local or cloud, e.g., Neon)
- npm or yarn

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd resume-generator
npm install
```

### 2. Set up Environment

Copy `.env.local.example` to `.env.local` and fill in:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/resume_generator"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-32-char-secret"
GOOGLE_CLIENT_ID="your-oauth-id"
GOOGLE_CLIENT_SECRET="your-oauth-secret"
```

To generate a secret:
```bash
openssl rand -base64 32
```

### 3. Database Setup

```bash
npm run db:push  # Push schema to dev DB
# OR
npm run db:migrate  # Create + run migrations
```

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Database Management

```bash
npm run db:studio  # Open Prisma Studio (visual DB editor)
```

## Project Structure

```
resume-generator/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Auth routes
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── templates/           # Template gallery
│   │   ├── builder/             # Resume builder
│   │   └── api/
│   │       ├── auth/            # NextAuth routes
│   │       ├── resumes/         # Resume CRUD
│   │       └── export/          # PDF export
│   ├── components/
│   │   ├── templates/           # 20 template components
│   │   └── builder/             # Form step components
│   ├── lib/
│   │   ├── prisma.ts            # DB client
│   │   ├── auth.ts              # NextAuth config
│   │   ├── pdf.ts               # Puppeteer wrapper
│   │   └── resumeSchema.ts      # Zod validation
│   └── types/
│       └── resume.ts            # TypeScript interfaces
├── prisma/
│   └── schema.prisma            # Database schema
├── .env.local                   # Local environment
└── package.json
```

## Key Files

- **Data Contract:** `src/types/resume.ts` + `src/lib/resumeSchema.ts` — shared by all 20 templates
- **Templates:** `src/components/templates/*.tsx` — each template receives same `ResumeData` props
- **Auth:** `src/lib/auth.ts` — NextAuth config (credentials + OAuth)
- **Database:** `prisma/schema.prisma` — User, Resume models
- **PDF:** `src/lib/pdf.ts` — Puppeteer HTML → PDF pipeline

## Implementation Phases

- [x] **Phase 0:** Project setup, Prisma schema, types, auth config
- [ ] **Phase 1:** Authentication (login/signup pages)
- [ ] **Phase 2:** Data model validation, multi-step form
- [ ] **Phase 3:** Template components (20 templates)
- [ ] **Phase 4:** Template gallery + selection UI
- [ ] **Phase 5:** Live preview + PDF export
- [ ] **Phase 6:** Resume management dashboard
- [ ] **Phase 7:** Polish, deployment, CI/CD

## Development Tips

- **Live Reload:** Dev server auto-rebuilds on file changes
- **Tailwind:** Use utility classes; no custom CSS needed for templates
- **Type Safety:** All resume data is Zod-validated and TypeScript-typed
- **Database:** Use `npm run db:studio` to inspect/edit data visually

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Vercel auto-detects Next.js. Add environment variables in dashboard.

### Docker (Optional)

Dockerfile and docker-compose can be added later.

## Testing

- Unit: Zod schema validation
- Component: Render templates with mock data
- E2E (later): Playwright for sign-up → download flow

## Roadmap

- [ ] AI-assisted resume suggestions (Phase 8)
- [ ] Multi-language support (Phase 9)
- [ ] Social sharing & LinkedIn sync (Phase 10)
- [ ] Analytics dashboard (Phase 11)

## Contributing

See [CLAUDE.md](/CLAUDE.md) for build notes and decisions.

## License

MIT

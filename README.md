# Chinna, Let's Finally Meet! ❤️

A personal, playful, and romantic Next.js web application built for Chinna.

For complete feature specifications, user journey, and architecture diagrams, check out [FEATURES_AND_FLOW.md](FEATURES_AND_FLOW.md).


## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + Framer Motion
- Lucide React + Canvas Confetti
- MongoDB Atlas (with local file fallback in `.data/meetings.json`)
- Resend for email notifications
- Zod for validation

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Visit:
   - Invitation page: `http://localhost:3000` or `http://localhost:3000/chinna`
   - Admin dashboard: `http://localhost:3000/admin` (passcode: `chinna2026`)

## Configuration (.env.local)
- `MONGODB_URI`: MongoDB connection string
- `RESEND_API_KEY`: Resend API key
- `NOTIFICATION_EMAIL`: Your email address for notification alerts
- `ADMIN_SECRET`: Secret password to access `/admin`

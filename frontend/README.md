# Frontend - Charity Trust Website

This is the Next.js frontend application for the Charity Trust website.

## Structure

```
frontend/
├── src/              # Source code
├── public/           # Static assets
├── package.json      # Dependencies
├── next.config.ts    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
└── ...
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` (optional, defaults to production API):
```env
NEXT_PUBLIC_API_URL=https://charitytrust-eykm.onrender.com/api
```

3. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- ✅ Single login form for admin and user
- ✅ Role-based dashboard routing
- ✅ Admin dashboard
- ✅ User dashboard
- ✅ Protected routes
- ✅ JWT authentication

## Backend

The backend API server should be running on `http://localhost:5000`

See `../backend/README.md` for backend setup instructions.


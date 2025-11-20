# Chiranjeevi Charity Trust Website

A complete charity website with admin and user dashboards, built with Next.js frontend and Node.js backend with MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (free tier works)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/charity-db
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```
Backend runs on `http://localhost:5001`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start frontend:
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

### 3. Create Initial Users

```bash
cd backend
node scripts/create-initial-users.js
```

## 🔐 Login Credentials

**Admin Dashboard:**
- Email: `admin@charitytrust.org`
- Password: `Admin@123456`
- URL: `http://localhost:3000/admin/dashboard`

**User Dashboard:**
- Email: `user@charitytrust.org`
- Password: `User@123456`
- URL: `http://localhost:3000/dashboard`

**Login Page:** `http://localhost:3000/login`

## 📋 Features

### Admin Dashboard
- ✅ Hero Images Management (CRUD)
- ✅ Programs Management (CRUD)
- ✅ Projects Management (CRUD)
- ✅ Events Management (CRUD)
- ✅ Testimonials Management
- ✅ Donations Tracking
- ✅ Statistics Dashboard
- ✅ Image Upload (Base64)

### User Dashboard
- ✅ Personal Dashboard
- ✅ Donation History
- ✅ Event Registration
- ✅ Profile Management
- ✅ Certificates Download

### Public Pages
- ✅ Dynamic Hero Banner (from database)
- ✅ Programs Carousel (from database)
- ✅ Projects Showcase (from database)
- ✅ Events Banner (from database)
- ✅ Testimonials Carousel

## 🏗️ Project Structure

```
chiranjeevi-charity-website_1/
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/           # Pages and routes
│   │   │   ├── admin/     # Admin dashboard pages
│   │   │   ├── dashboard/ # User dashboard pages
│   │   │   └── page.tsx   # Home page
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities and API client
│   └── package.json
│
├── backend/               # Node.js + Express API
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   │   ├── auth.js      # Authentication
│   │   ├── admin.js     # Admin routes
│   │   ├── admin-content.js # Admin CRUD
│   │   ├── public.js    # Public routes
│   │   └── user.js      # User routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
│
└── README.md
```

## 🔧 Tech Stack

**Frontend:**
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

## 🔒 Authentication System

### Features
- Single login form for admin and user
- JWT token-based authentication
- Role-based access control (RBAC)
- Separate credential storage (Admin & RegularUser collections)
- Protected routes with 5-layer security

### Security Layers
1. Frontend route guards
2. Layout protection
3. Backend authentication middleware
4. Backend authorization middleware
5. API route protection

## 📊 Database Models

- **Admin** - Admin user credentials
- **RegularUser** - Regular user credentials
- **Program** - Charity programs
- **Project** - Charity projects
- **Event** - Events and campaigns
- **HeroImage** - Hero banner images
- **Testimonial** - Donor testimonials
- **Donation** - Donation records
- **Volunteer** - Volunteer information

## 🌐 API Endpoints

### Public Routes (No Auth)
- `GET /api/public/programs` - Get active programs
- `GET /api/public/projects` - Get projects
- `GET /api/public/events` - Get upcoming events
- `GET /api/public/hero-images` - Get active hero images

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (admin/user)

### Admin Routes (Requires Admin Auth)
- `GET /api/admin/content/hero-images` - List hero images
- `POST /api/admin/content/hero-images` - Create hero image
- `PUT /api/admin/content/hero-images/:id` - Update hero image
- `DELETE /api/admin/content/hero-images/:id` - Delete hero image
- Similar CRUD for programs, projects, events, testimonials

### User Routes (Requires User Auth)
- `GET /api/user/dashboard` - User dashboard data
- `GET /api/user/donations` - User donations
- `GET /api/user/content/events` - User events

## 🎨 Image Storage

- Images stored as **base64 strings** in MongoDB
- Admin can upload images via drag-and-drop
- Images displayed dynamically on public pages
- Supports: Hero Images, Programs, Projects, Events

## 🔄 Data Flow

1. **Admin creates content** → Saved to MongoDB
2. **Public pages fetch** → From `/api/public/*` endpoints
3. **Real-time updates** → Changes reflect on page refresh
4. **User dashboard** → Shows personalized data

## 📝 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🛠️ Development

### Run Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Create Admin/User
```bash
cd backend
node scripts/create-initial-users.js
```

## 📱 Pages

### Public Pages
- `/` - Home page (dynamic content from database)
- `/login` - Login page
- `/signup` - Registration page

### Admin Pages
- `/admin/dashboard` - Admin dashboard
- `/admin/hero-images` - Manage hero images
- `/admin/programs` - Manage programs
- `/admin/projects` - Manage projects
- `/admin/events` - Manage events
- `/admin/testimonials` - Manage testimonials
- `/admin/donations` - View donations

### User Pages
- `/dashboard` - User dashboard (home page when logged in)
- `/dashboard/donations` - Personal donations
- `/dashboard/events` - Personal events
- `/profile` - User profile

## ⚠️ Important Notes

- Passwords stored as-is in database (per requirements)
- For production: Implement password hashing
- Use strong JWT_SECRET in production
- Enable HTTPS in production
- Restrict MongoDB IP access in production

## 📄 License

Private project

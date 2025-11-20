# Charity Trust Backend API

Complete authentication system with MongoDB Atlas, JWT tokens, and role-based access control.

## Features

- ✅ Single login form for both admin and user
- ✅ MongoDB Atlas integration
- ✅ JWT token authentication
- ✅ Role-based access control (admin/user)
- ✅ Protected routes
- ✅ Password stored as-is (no hashing)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/charity-db?retryWrites=true&w=majority

# JWT Secret (Change this to a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and replace in `.env`

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "redirectPath": "/dashboard"
  }
}
```

#### POST `/api/auth/login`
Login user (works for both admin and user)

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "role": "user",
    "redirectPath": "/dashboard",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### GET `/api/auth/verify`
Verify JWT token

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Admin Routes (Protected)

All admin routes require:
- Valid JWT token in `Authorization: Bearer <token>` header
- User role must be `admin`

#### GET `/api/admin/dashboard`
Get admin dashboard data

**Response:**
```json
{
  "success": true,
  "message": "Admin dashboard data",
  "data": {
    "stats": {
      "totalDonations": 125000,
      "totalPrograms": 6,
      "totalProjects": 3,
      "totalEvents": 12,
      "totalTestimonials": 24,
      "monthlyDonations": 45000,
      "activeVolunteers": 150
    }
  }
}
```

#### GET `/api/admin/users`
Get all users (admin only)

**Response:**
```json
{
  "success": true,
  "message": "Admin can access this route",
  "data": {
    "users": []
  }
}
```

### User Routes (Protected)

All user routes require:
- Valid JWT token in `Authorization: Bearer <token>` header
- User role must be `user`

#### GET `/api/user/dashboard`
Get user dashboard data

**Response:**
```json
{
  "success": true,
  "message": "User dashboard data",
  "data": {
    "stats": {
      "totalDonated": 8000,
      "donationsCount": 2,
      "eventsAttended": 3,
      "impactPoints": 80
    }
  }
}
```

#### GET `/api/user/profile`
Get user profile

**Response:**
```json
{
  "success": true,
  "message": "User profile data",
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email and password are required"
}
```

## Security Notes

⚠️ **IMPORTANT:**
- Passwords are stored as-is (no hashing) as per requirements
- In production, you should:
  - Use strong JWT_SECRET
  - Enable HTTPS
  - Hash passwords (bcrypt)
  - Add rate limiting
  - Validate input more strictly
  - Use environment variables for secrets

## Testing

### Create Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Create Regular User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "user@example.com",
    "password": "user123",
    "role": "user"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Access Admin Route

```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Frontend Integration

Update your frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The frontend will automatically:
- Store JWT token in localStorage
- Include token in API requests
- Redirect based on user role
- Protect routes based on role


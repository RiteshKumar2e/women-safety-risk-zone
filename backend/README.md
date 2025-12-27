# SafeZone AI - Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Google OAuth credentials (already configured)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure PostgreSQL Database

#### Option A: Using psql command line
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE women_safety_db;

# Exit psql
\q
```

#### Option B: Using pgAdmin
1. Open pgAdmin
2. Right-click on "Databases"
3. Create new database: `women_safety_db`

### 3. Configure Environment Variables

Update the `.env` file with your PostgreSQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=women_safety_db
DB_USER=postgres
DB_PASSWORD=your_actual_password

# Email Configuration (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Google OAuth (already configured)
GOOGLE_CLIENT_SECRET=get_from_google_console
```

#### Getting Gmail App Password:
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate new
4. Use the generated password in EMAIL_PASSWORD

### 4. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will:
- ✅ Connect to PostgreSQL
- ✅ Create all required tables automatically
- ✅ Start on port 5000

### 5. Verify Installation

Open browser: `http://localhost:5000/health`

Expected response:
```json
{
  "success": true,
  "message": "SafeZone AI Backend is running",
  "timestamp": "2024-12-27T10:00:00.000Z"
}
```

## 📊 Database Schema

### Users Table
- id (UUID, Primary Key)
- name, email, password
- role (USER/ADMIN)
- provider (local/google)
- googleId, profilePicture
- isVerified, isActive
- otp, otpExpiry
- lastLogin, createdAt, updatedAt

### Reports Table
- id (UUID, Primary Key)
- userId (Foreign Key → users)
- title, description, category
- severity, status
- location (JSONB with lat/lng)
- incidentDate, timeOfDay
- aiClassification (JSONB)
- resolvedBy (Foreign Key → users)
- createdAt, updatedAt

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/verify-otp        - Verify email OTP
POST   /api/auth/resend-otp        - Resend OTP
GET    /api/auth/me                - Get current user
GET    /api/auth/google            - Initiate Google OAuth
GET    /api/auth/google/callback   - Google OAuth callback
```

## 🎯 Features Implemented

✅ PostgreSQL database with Sequelize ORM
✅ Google OAuth 2.0 authentication
✅ Email OTP verification
✅ JWT token-based auth
✅ Role-based access control (USER/ADMIN)
✅ Password hashing with bcrypt
✅ Professional email templates
✅ Session management
✅ Automatic table creation
✅ Error handling & validation

## 🔧 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running
```bash
# Windows
services.msc → PostgreSQL → Start

# Mac
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Email Service Error
```
Error: Invalid login
```
**Solution**: Use App Password, not regular Gmail password

### Google OAuth Error
**Solution**: Add authorized redirect URIs in Google Console:
- `http://localhost:5000/api/auth/google/callback`
- `http://localhost:3000/auth/success`

## 📝 Next Steps

1. ✅ Backend is ready
2. 🎨 Frontend integration (see frontend README)
3. 🤖 ML service integration (optional)
4. 🚀 Deploy to production

## 🆘 Support

If you encounter issues:
1. Check PostgreSQL is running
2. Verify .env configuration
3. Check console logs for specific errors
4. Ensure all npm packages installed correctly

---

**Backend Status**: ✅ Production Ready
**Database**: PostgreSQL with Sequelize
**Authentication**: Google OAuth + Local + OTP

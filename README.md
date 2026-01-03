# 🌍 GlobeTrotter - Travel Planning Application

**A planner-first multi-city travel planning system** that helps users design, visualize, and budget their trips before booking.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

---

## 📋 Table of Contents

- [Product Overview](#-product-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [MVP vs Future Scope](#-mvp-vs-future-scope)

---

## 🎯 Product Overview

GlobeTrotter is a **pre-booking travel planner** focused on helping users:
- ✈️ Design multi-city trip itineraries
- 📅 Visualize trips on timelines and calendars
- 💰 Track and budget expenses by category
- 🔗 Share public read-only itineraries
- 📊 Analyze travel patterns (admin)

**What GlobeTrotter IS:**
- A planning and organization tool
- A budget calculator and visualizer
- A collaborative itinerary builder

**What GlobeTrotter IS NOT:**
- A booking platform
- A payment processor
- A vendor marketplace

---

## ✨ Key Features

### For Guests (Unauthenticated)
- View landing page with features
- Explore public shared itineraries
- Read-only access to trip details

### For Users (Authenticated)
- Create and manage multiple trips
- Build multi-stop itineraries with activities
- Add expenses and track budgets
- Visualize trips on timelines/calendars
- Share trips via public links
- Edit profile and preferences

### For Admins
- View analytics dashboard
- Monitor user statistics
- Analyze trip patterns
- System health metrics
- **Cannot edit user trips** (privacy-focused)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **State Management:** React Context API + useReducer
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **UI Components:** Custom + Headless UI
- **Date Handling:** date-fns
- **Drag & Drop:** react-beautiful-dnd
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 15+
- **ORM:** node-postgres (pg) with raw SQL
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator
- **API Documentation:** OpenAPI/Swagger

### DevOps & Tools
- **Containerization:** Docker + Docker Compose
- **Version Control:** Git
- **Database Migrations:** Custom migration system
- **Environment:** dotenv
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint + Prettier

---

## 📁 Project Structure

```
globetrotter-va/
├── client/                   # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images, fonts, icons
│   │   ├── components/      # Reusable UI components
│   │   │   ├── common/      # Buttons, inputs, modals
│   │   │   ├── layout/      # Header, footer, sidebar
│   │   │   └── features/    # Feature-specific components
│   │   ├── pages/           # Route-level components
│   │   ├── contexts/        # React Context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utilities and helpers
│   │   ├── types/           # TypeScript definitions
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── server/                   # Node/Express backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Database queries
│   │   ├── middleware/      # Auth, validation, error
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Helpers and utilities
│   │   ├── types/           # TypeScript types
│   │   ├── validators/      # Input validation schemas
│   │   └── server.ts        # App entry point
│   ├── package.json
│   └── tsconfig.json
│
├── database/                 # Database management
│   ├── migrations/          # SQL migration files
│   ├── seeds/               # Sample data
│   └── schema.sql           # Complete schema
│
├── docker-compose.yml       # Container orchestration
├── package.json             # Root package (workspaces)
├── .gitignore
└── README.md
```

---

## 🏗 System Architecture

### High-Level Flow

```
┌─────────────┐
│   GUEST     │ ──────► Landing Page ──────► Explore Public Trips
└─────────────┘

┌─────────────┐
│   USER      │ ──────► Login/Signup ──────► Dashboard
└─────────────┘                │
                                ├──► Create Trip
                                ├──► Build Itinerary (Stops + Activities)
                                ├──► Add Budget/Expenses
                                ├──► Visualize Timeline
                                └──► Share Public Link

┌─────────────┐
│   ADMIN     │ ──────► Admin Login ──────► Analytics Dashboard
└─────────────┘                                 │
                                                ├──► User Stats
                                                ├──► Trip Analytics
                                                └──► System Metrics
```

### Authentication Flow

```
Client                Server                Database
  │                     │                      │
  ├──Register/Login────►│                      │
  │                     ├──Hash Password──────►│
  │                     │◄─────Store User──────┤
  │                     ├──Generate JWT        │
  │◄──Return Token──────┤                      │
  │                     │                      │
  ├──API Request────────►│                      │
  │   (JWT in header)   ├──Verify Token        │
  │                     ├──Extract User        │
  │                     ├──Query Data─────────►│
  │◄──Response──────────┤◄────Return Data──────┤
```

### Core Module Dependencies

```
┌──────────────────────────────────────────┐
│           PRESENTATION LAYER             │
│  (React Pages, Components, Routing)      │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│          APPLICATION LAYER               │
│  (API Routes, Controllers, Validation)   │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│           BUSINESS LAYER                 │
│  (Services, Business Logic)              │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│            DATA LAYER                    │
│  (Repositories, Database Queries)        │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│          DATABASE (PostgreSQL)           │
└──────────────────────────────────────────┘
```

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
┌─────────────┐        ┌──────────────┐
│    USERS    │◄──────┤│    TRIPS     │
├─────────────┤   1:N  ├──────────────┤
│ id (PK)     │        │ id (PK)      │
│ email       │        │ user_id (FK) │
│ password    │        │ title        │
│ name        │        │ is_public    │
│ role        │        │ share_token  │
└─────────────┘        └──────────────┘
                              │
                              │ 1:N
                              ▼
                       ┌──────────────┐
                       │    STOPS     │
                       ├──────────────┤
                       │ id (PK)      │
                       │ trip_id (FK) │
                       │ city         │
                       │ order_index  │
                       │ start_date   │
                       │ end_date     │
                       └──────────────┘
                              │
                              │ 1:N
                              ▼
                       ┌──────────────┐
                       │  ACTIVITIES  │
                       ├──────────────┤
                       │ id (PK)      │
                       │ stop_id (FK) │
                       │ title        │
                       │ date         │
                       │ time         │
                       │ notes        │
                       └──────────────┘

┌──────────────┐
│   EXPENSES   │
├──────────────┤
│ id (PK)      │
│ trip_id (FK) │───────┐
│ stop_id (FK) │───────┼──► Optional FK to TRIPS
│ activity_id  │───────┼──► Optional FK to STOPS
│ category     │       └──► Optional FK to ACTIVITIES
│ amount       │
│ currency     │
└──────────────┘
```

### Table Definitions

See [database/schema.sql](database/schema.sql) for complete SQL definitions.

**Key Tables:**
1. **users** - Authentication and profile data
2. **trips** - Trip metadata and ownership
3. **stops** - Cities/locations within trips (ordered)
4. **activities** - Things to do at each stop
5. **expenses** - Budget tracking across trips

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL 15+ (or use Docker)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/VIsHnu1762/GlobeTrotter_VA.git
cd GlobeTrotter_VA
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` files in both `/client` and `/server`:

**client/.env:**
```env
VITE_API_URL=http://localhost:5000/api
```

**server/.env:**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://globetrotter_user:globetrotter_pass@localhost:5432/globetrotter_db
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

4. **Start with Docker (Recommended)**
```bash
docker-compose up -d
```

**OR start manually:**

```bash
# Terminal 1 - Start PostgreSQL (if not using Docker)
# Ensure PostgreSQL is running on port 5432

# Terminal 2 - Start backend
cd server
npm install
npm run migrate  # Run migrations
npm run seed     # Seed sample data
npm run dev

# Terminal 3 - Start frontend
cd client
npm install
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

### Default Test Accounts

**Admin:**
- Email: admin@globetrotter.com
- Password: Admin@123

**User:**
- Email: user@globetrotter.com
- Password: User@123

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Core Endpoints

#### Auth Routes (`/api/auth`)
```
POST   /auth/register          # Register new user
POST   /auth/login             # Login user
POST   /auth/logout            # Logout user
GET    /auth/me                # Get current user
PUT    /auth/profile           # Update profile
```

#### Trip Routes (`/api/trips`)
```
GET    /trips                  # List user's trips
POST   /trips                  # Create new trip
GET    /trips/:id              # Get trip details
PUT    /trips/:id              # Update trip
DELETE /trips/:id              # Delete trip
GET    /trips/shared/:token    # Get public shared trip
POST   /trips/:id/share        # Generate share link
```

#### Stop Routes (`/api/stops`)
```
GET    /stops/trip/:tripId     # List stops for trip
POST   /stops                  # Add stop to trip
PUT    /stops/:id              # Update stop
DELETE /stops/:id              # Delete stop
PUT    /stops/:id/reorder      # Change stop order
```

#### Activity Routes (`/api/activities`)
```
GET    /activities/stop/:stopId  # List activities for stop
POST   /activities               # Add activity
PUT    /activities/:id           # Update activity
DELETE /activities/:id           # Delete activity
```

#### Expense Routes (`/api/expenses`)
```
GET    /expenses/trip/:tripId   # List trip expenses
POST   /expenses                # Add expense
PUT    /expenses/:id            # Update expense
DELETE /expenses/:id            # Delete expense
GET    /expenses/trip/:tripId/summary  # Budget summary
```

#### Admin Routes (`/api/admin`) - Admin only
```
GET    /admin/stats             # System statistics
GET    /admin/users             # List all users
GET    /admin/trips/analytics   # Trip analytics
```

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "details": [ ... ]
}
```

---

## 🔐 User Roles & Permissions

### Role Matrix

| Feature | Guest | User | Admin |
|---------|-------|------|-------|
| View public trips | ✅ | ✅ | ✅ |
| Create account | ✅ | — | — |
| Login | ✅ | ✅ | ✅ |
| Create trips | ❌ | ✅ | ❌ |
| Edit own trips | ❌ | ✅ | ❌ |
| Delete own trips | ❌ | ✅ | ❌ |
| Share trips | ❌ | ✅ | ❌ |
| View analytics | ❌ | ❌ | ✅ |
| View user list | ❌ | ❌ | ✅ |
| Edit user trips | ❌ | ❌ | ❌ |

### Permission Rules

**Guest:**
- Read-only access to public shared trips
- Can browse landing page
- Can register for an account

**User:**
- Full CRUD on own trips, stops, activities, expenses
- Can make trips public and generate share links
- Can view own profile and analytics
- Cannot access other users' private trips
- Cannot access admin panel

**Admin:**
- View-only access to analytics dashboard
- Cannot create, edit, or delete trips
- Cannot impersonate users
- Focus: System monitoring and insights

---

## 🎯 MVP vs Future Scope

### ✅ MVP (Must-Have for Hackathon)

#### Authentication & Users
- ✅ User registration and login
- ✅ JWT authentication
- ✅ Basic profile management
- ✅ Admin role distinction

#### Trip Management
- ✅ Create/Read/Update/Delete trips
- ✅ Trip metadata (title, dates, description)
- ✅ Public vs private trip toggle

#### Itinerary Builder (Core Engine)
- ✅ Add multiple stops to trips
- ✅ Order stops sequentially
- ✅ Add activities to each stop
- ✅ Date/time for activities
- ✅ Basic notes for activities

#### Budget Tracking
- ✅ Add expenses to trips
- ✅ Categorize expenses (food, transport, accommodation, activities, other)
- ✅ Calculate total budget
- ✅ Currency selection (USD default)

#### Visualization
- ✅ List view of stops and activities
- ✅ Simple timeline view (date-based)
- ✅ Budget breakdown by category

#### Sharing
- ✅ Generate public share links
- ✅ Public read-only trip view
- ✅ No authentication required for public trips

#### Admin Dashboard
- ✅ Total user count
- ✅ Total trip count
- ✅ Basic statistics

---

### 🔮 Future Scope (Post-Hackathon)

#### Enhanced Visualization
- 🔮 Interactive map view with stop markers
- 🔮 Calendar view with drag-drop scheduling
- 🔮 Gantt chart timeline
- 🔮 Photo galleries for stops

#### Collaboration
- 🔮 Invite collaborators to trips
- 🔮 Real-time collaborative editing
- 🔮 Comments and notes on activities
- 🔮 Voting on activity options

#### Smart Features
- 🔮 AI-powered destination suggestions
- 🔮 Weather forecasts for dates
- 🔮 Optimal route calculations
- 🔮 Budget recommendations based on destination

#### Export & Integration
- 🔮 Export to PDF/Excel
- 🔮 Google Calendar integration
- 🔮 iCal export for activities
- 🔮 Print-friendly itinerary view

#### Advanced Budget
- 🔮 Multi-currency support with conversion
- 🔮 Split expenses among travelers
- 🔮 Budget alerts and warnings
- 🔮 Expense receipt uploads

#### Mobile
- 🔮 React Native mobile app
- 🔮 Offline-first architecture
- 🔮 Push notifications

#### Booking Integration (Phase 2+)
- 🔮 Link to booking platforms (flights, hotels)
- 🔮 Affiliate partnerships
- 🔮 Booking price tracking
- *Note: This moves beyond pure planning*

---

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Airbnb style guide
- Use functional components with hooks
- Keep components under 200 lines
- Write unit tests for business logic

### Git Workflow
```bash
# Feature branch
git checkout -b feature/trip-timeline

# Commit with conventional commits
git commit -m "feat: add timeline visualization for trips"

# Push and create PR
git push origin feature/trip-timeline
```

### Database Migrations
```bash
# Create new migration
npm run migrate:create migration_name

# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose ps

# View database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Clear and Rebuild
```bash
# Stop all containers
docker-compose down -v

# Remove node_modules
rm -rf node_modules client/node_modules server/node_modules

# Fresh install
npm install
docker-compose up --build
```

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👥 Contributors

- **Vishnu** - Initial Development

---

## 🙏 Acknowledgments

Built for hackathon with focus on clean architecture and scalable design patterns.

---

**Happy Planning! 🌍✈️**

# GlobeTrotter Architecture Documentation

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘

GUEST FLOW:
    Landing Page → View Features → Explore Public Trips
         │
         └──→ Sign Up / Login

USER FLOW:
    Login → Dashboard → Create Trip → Add Stops → Add Activities
                 │           │             │            │
                 │           │             │            └──→ Add Expenses
                 │           │             │
                 │           │             └──→ Budget View
                 │           │
                 │           └──→ Timeline View → Share Link
                 │
                 └──→ Profile Management

ADMIN FLOW:
    Admin Login → Analytics Dashboard
                      │
                      ├──→ User Statistics
                      ├──→ Trip Analytics
                      └──→ System Metrics


┌─────────────────────────────────────────────────────────────────┐
│                     TECHNICAL ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘

CLIENT (React)                    SERVER (Express)              DATABASE
─────────────                     ──────────────                ─────────

Pages/Components                  Routes                        PostgreSQL
    │                                │                              │
    ├─ Landing                       ├─ /auth                       ├─ users
    ├─ Auth (Login/Signup)           ├─ /trips                      ├─ trips
    ├─ Dashboard                     ├─ /stops                      ├─ stops
    ├─ TripDetails                   ├─ /activities                 ├─ activities
    ├─ CreateTrip                    ├─ /expenses                   └─ expenses
    ├─ SharedTrip                    └─ /admin
    └─ AdminDashboard
         │                                │
         │                                │
    Services (API)                   Controllers
         │                                │
         ├─ authService                   ├─ authController
         ├─ tripService                   ├─ tripController
         ├─ stopService                   ├─ stopController
         ├─ activityService                ├─ activityController
         ├─ expenseService                 └─ expenseController
         └─ adminService                        │
              │                                  │
              │                              Services
              │                                  │
              └──────── HTTP/JSON ──────────► Business Logic
                                                 │
                                            Repositories
                                                 │
                                            Database Queries


┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. User Registration/Login
   ────────────────────────
   Client                           Server                Database
     │                                 │                      │
     ├── POST /auth/register ─────────►│                      │
     │   (email, password, name)       │                      │
     │                                 ├── Hash Password ─────┤
     │                                 │                      │
     │                                 ├── Store User ───────►│
     │                                 │                      │
     │                                 ├── Generate JWT       │
     │◄──── JWT Token + User ──────────┤                      │
     │                                 │                      │
     ├── Store Token in localStorage   │                      │
     │                                 │                      │

2. Authenticated Requests
   ───────────────────────
   Client                           Server                Database
     │                                 │                      │
     ├── GET /trips ──────────────────►│                      │
     │   Headers: {                    │                      │
     │     Authorization: Bearer JWT   │                      │
     │   }                             │                      │
     │                                 ├── Verify JWT         │
     │                                 ├── Extract User       │
     │                                 ├── Query DB ─────────►│
     │                                 │◄─── Return Data ─────┤
     │◄──── Response Data ─────────────┤                      │


┌─────────────────────────────────────────────────────────────────┐
│                     DATA RELATIONSHIP FLOW                       │
└─────────────────────────────────────────────────────────────────┘

USER creates TRIP
  │
  └──► TRIP contains multiple STOPS (ordered)
           │
           └──► STOP contains multiple ACTIVITIES
                    │
                    └──► ACTIVITY may have EXPENSES

TRIP also has:
  ├─ Direct EXPENSES (not tied to stop/activity)
  └─ Budget Summary (aggregate of all expenses)


┌─────────────────────────────────────────────────────────────────┐
│                     MODULE ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────┘

1. TRIP MANAGEMENT MODULE
   ─────────────────────────
   • Create, Read, Update, Delete trips
   • Trip metadata management
   • Ownership validation
   • Public/private toggle

2. ITINERARY BUILDER MODULE
   ──────────────────────────
   • Add/remove stops (cities)
   • Reorder stops (drag-drop)
   • Add activities to stops
   • Date/time management
   • Notes and descriptions

3. BUDGET CALCULATION ENGINE
   ───────────────────────────
   • Add expenses by category
   • Link expenses to trips/stops/activities
   • Calculate totals by category
   • Calculate totals by stop
   • Multi-currency support

4. VISUALIZATION MODULE
   ──────────────────────
   • List view (default)
   • Timeline view (date-based)
   • Calendar view
   • Budget charts (by category)

5. SHARING MODULE
   ───────────────
   • Generate unique share tokens
   • Public read-only trip view
   • Copy share link
   • Toggle public/private

6. ADMIN ANALYTICS MODULE
   ─────────────────────────
   • User count and growth
   • Trip statistics
   • Popular destinations
   • Expense category distribution
   • System health metrics


┌─────────────────────────────────────────────────────────────────┐
│                     PERMISSION MATRIX                            │
└─────────────────────────────────────────────────────────────────┘

Feature                     | Guest | User | Admin
──────────────────────────────────────────────────
View landing page          |   ✅   |  ✅  |  ✅
View public shared trips   |   ✅   |  ✅  |  ✅
Register account           |   ✅   |  ❌  |  ❌
Login                      |   ✅   |  ✅  |  ✅
Create trips               |   ❌   |  ✅  |  ❌
View own trips             |   ❌   |  ✅  |  ❌
Edit own trips             |   ❌   |  ✅  |  ❌
Delete own trips           |   ❌   |  ✅  |  ❌
Add stops/activities       |   ❌   |  ✅  |  ❌
Add expenses               |   ❌   |  ✅  |  ❌
Generate share links       |   ❌   |  ✅  |  ❌
View analytics             |   ❌   |  ❌  |  ✅
View all users             |   ❌   |  ❌  |  ✅
Edit other users' trips    |   ❌   |  ❌  |  ❌


┌─────────────────────────────────────────────────────────────────┐
│                     API ENDPOINT SUMMARY                         │
└─────────────────────────────────────────────────────────────────┘

AUTH ENDPOINTS
──────────────
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
POST   /api/auth/logout            Logout user
GET    /api/auth/me                Get current user
PUT    /api/auth/profile           Update profile

TRIP ENDPOINTS
──────────────
GET    /api/trips                  List user's trips
POST   /api/trips                  Create trip
GET    /api/trips/:id              Get trip details
PUT    /api/trips/:id              Update trip
DELETE /api/trips/:id              Delete trip
GET    /api/trips/shared/:token    Get public trip
POST   /api/trips/:id/share        Generate share link

STOP ENDPOINTS
──────────────
GET    /api/stops/trip/:tripId     List stops
POST   /api/stops                  Create stop
PUT    /api/stops/:id              Update stop
DELETE /api/stops/:id              Delete stop
PUT    /api/stops/reorder          Reorder stops

ACTIVITY ENDPOINTS
──────────────────
GET    /api/activities/stop/:stopId  List activities
POST   /api/activities               Create activity
PUT    /api/activities/:id           Update activity
DELETE /api/activities/:id           Delete activity

EXPENSE ENDPOINTS
─────────────────
GET    /api/expenses/trip/:tripId    List expenses
POST   /api/expenses                 Create expense
PUT    /api/expenses/:id             Update expense
DELETE /api/expenses/:id             Delete expense
GET    /api/expenses/trip/:tripId/summary  Budget summary

ADMIN ENDPOINTS
───────────────
GET    /api/admin/stats             System statistics
GET    /api/admin/users             List all users
GET    /api/admin/trips/analytics   Trip analytics

# 🚀 GlobeTrotter - 2-Hour Hackathon Development Plan

**Goal:** Complete a functional, attractive, user-friendly travel planning web app in 2 hours

**Strategy:** Split work between 2 developers on separate branches

---

## 📋 Branch Strategy

```bash
main (production-ready code)
  │
  ├── dev-frontend (Developer 1)
  └── dev-backend (Developer 2)
```

**Merge Strategy:**
- Hour 1: Both developers work independently
- Hour 1.5: Quick sync and integration test
- Hour 2: Final merge to main + demo prep

---

## 👨‍💻 Developer 1: Frontend Focus (Branch: `dev-frontend`)

### 🎯 Mission
Create polished, user-friendly UI components and complete user flows

### 🔧 Setup (5 minutes)

```bash
# Create and switch to frontend branch
git checkout -b dev-frontend
git push -u origin dev-frontend

# Ensure servers are running
npm run dev
```

### ✅ Tasks (115 minutes total)

---

#### **Task 1.1: Enhanced Landing Page** (20 min)
**Priority:** HIGH  
**File:** `client/src/pages/LandingPage.tsx`

**Requirements:**
- [ ] Hero section with attractive gradient background
- [ ] Feature cards with icons (use emoji or simple SVG)
- [ ] Call-to-action buttons (Sign Up / Login)
- [ ] Testimonials section (3 fake testimonials)
- [ ] Footer with social links (mock)

**Design Tips:**
- Use TailwindCSS gradients: `bg-gradient-to-r from-blue-500 to-purple-600`
- Add animations: `hover:scale-105 transition-transform`
- Make it responsive: `md:flex md:grid-cols-3`

---

#### **Task 1.2: Complete Trip Creation Flow** (25 min)
**Priority:** CRITICAL  
**File:** `client/src/pages/CreateTripPage.tsx`

**Requirements:**
- [ ] Step 1: Trip details form (title, description, dates)
- [ ] Step 2: Add stops with autocomplete (use static list for now)
- [ ] Step 3: Preview and submit
- [ ] Progress indicator (Step 1 of 3, 2 of 3, etc.)
- [ ] Validation and error messages
- [ ] Success toast on creation

**Implementation:**
```typescript
// Use state machine for steps
const [step, setStep] = useState(1);
const [tripData, setTripData] = useState({...});

// Steps:
// 1. Basic Info (title, dates, description)
// 2. Add Stops (city selector with order)
// 3. Review & Submit
```

---

#### **Task 1.3: Itinerary Builder / Trip Details** (30 min)
**Priority:** CRITICAL  
**File:** `client/src/pages/TripDetailsPage.tsx`

**Requirements:**
- [ ] Timeline view with stops in sequence
- [ ] Each stop shows: city, dates, activities
- [ ] Add activity button per stop
- [ ] Activity cards with time, category, description
- [ ] Edit/Delete buttons for stops and activities
- [ ] Budget summary widget (total, by category)
- [ ] Share button with copy link functionality

**UI Layout:**
```
┌─────────────────────────────────────────┐
│ Trip Title                   [Share] [Edit]│
│ June 1-15, 2026                            │
├─────────────────────────────────────────┤
│ Stop 1: Paris (June 1-5)     [+ Activity]│
│   ├─ Eiffel Tower (9:00 AM)              │
│   ├─ Louvre Museum (2:00 PM)             │
│   └─ Dinner at Cafe (7:00 PM)            │
├─────────────────────────────────────────┤
│ Stop 2: Rome (June 6-10)     [+ Activity]│
│   └─ [No activities yet]                  │
├─────────────────────────────────────────┤
│ Budget Summary                            │
│ Total: $2,450 | Food: $600 | Hotels: $800│
└─────────────────────────────────────────┘
```

---

#### **Task 1.4: Dashboard Improvements** (15 min)
**Priority:** MEDIUM  
**File:** `client/src/pages/DashboardPage.tsx`

**Requirements:**
- [ ] Grid layout for trip cards (3 columns desktop, 1 mobile)
- [ ] Trip card shows: image placeholder, title, dates, stop count
- [ ] Hover effects and shadows
- [ ] Filter buttons: All / Upcoming / Past
- [ ] Sort dropdown: Recent / Oldest / A-Z
- [ ] Empty state with illustration when no trips

---

#### **Task 1.5: Budget View Component** (15 min)
**Priority:** MEDIUM  
**File:** `client/src/pages/TripDetailsPage.tsx` or new component

**Requirements:**
- [ ] Pie chart using CSS (or simple library)
- [ ] Category breakdown table
- [ ] Add expense modal/form
- [ ] Expense list with edit/delete
- [ ] Total counter at top

**Simple Pie Chart Alternative:**
```typescript
// Use colored progress bars for each category
<div className="space-y-2">
  {categories.map(cat => (
    <div>
      <div className="flex justify-between">
        <span>{cat.name}</span>
        <span>${cat.amount}</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div 
          className="bg-blue-500 h-2 rounded" 
          style={{ width: `${cat.percentage}%` }}
        />
      </div>
    </div>
  ))}
</div>
```

---

#### **Task 1.6: Polish & Responsive Design** (10 min)
**Priority:** HIGH

**Requirements:**
- [ ] Test on mobile view (responsive breakpoints)
- [ ] Add loading spinners to all API calls
- [ ] Consistent spacing and padding
- [ ] Fix any layout bugs
- [ ] Add favicon and page titles

---

### 🎨 Design System Guidelines

**Colors (already in config):**
- Primary: Blue (`primary-500`, `primary-600`)
- Success: Green (`green-500`)
- Danger: Red (`red-500`)
- Gray scale: `gray-50` to `gray-900`

**Common Patterns:**
```typescript
// Button
<button className="btn-primary">Click Me</button>

// Card
<div className="card">Content</div>

// Input
<input className="input-field" />

// Modal backdrop
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
```

---

## 👨‍💻 Developer 2: Backend + Integration Focus (Branch: `dev-backend`)

### 🎯 Mission
Complete backend APIs, add missing features, ensure data integrity

### 🔧 Setup (5 minutes)

```bash
# Create and switch to backend branch
git checkout -b dev-backend
git push -u origin dev-backend

# Ensure database is running
npm run dev
```

### ✅ Tasks (115 minutes total)

---

#### **Task 2.1: Complete Stop API with Reordering** (20 min)
**Priority:** CRITICAL  
**File:** `server/src/controllers/tripController.ts`

**Requirements:**
- [ ] POST `/api/stops` - Create stop
- [ ] PUT `/api/stops/:id` - Update stop
- [ ] DELETE `/api/stops/:id` - Delete stop
- [ ] PUT `/api/stops/:id/reorder` - Reorder stops in trip

**Reorder Logic:**
```typescript
// When moving stop from position 2 to position 0:
// 1. Get all stops for trip
// 2. Decrement order_index for positions 0-1
// 3. Set target stop to position 0
// 4. Ensure no gaps in sequence
```

---

#### **Task 2.2: Complete Activity API** (20 min)
**Priority:** CRITICAL  
**File:** `server/src/controllers/tripController.ts` or new `activityController.ts`

**Requirements:**
- [ ] POST `/api/activities` - Create activity
- [ ] GET `/api/stops/:stopId/activities` - List activities for stop
- [ ] PUT `/api/activities/:id` - Update activity
- [ ] DELETE `/api/activities/:id` - Delete activity

**Validation:**
- Activity date must be within stop's date range
- Category must be from predefined list
- Duration must be positive number

---

#### **Task 2.3: Complete Expense API** (20 min)
**Priority:** CRITICAL  
**File:** `server/src/controllers/tripController.ts` or new `expenseController.ts`

**Requirements:**
- [ ] POST `/api/expenses` - Create expense
- [ ] GET `/api/trips/:tripId/expenses` - List all expenses
- [ ] PUT `/api/expenses/:id` - Update expense
- [ ] DELETE `/api/expenses/:id` - Delete expense

---

#### **Task 2.4: Budget Summary Endpoint** (20 min)
**Priority:** CRITICAL  
**File:** `server/src/controllers/tripController.ts`

**Requirements:**
- [ ] GET `/api/trips/:tripId/budget` - Get budget summary

**Response Format:**
```json
{
  "total": 2450.00,
  "currency": "USD",
  "expense_count": 15,
  "by_category": {
    "accommodation": 800.00,
    "food": 600.00,
    "transport": 500.00,
    "activities": 400.00,
    "shopping": 100.00,
    "other": 50.00
  },
  "by_stop": {
    "Paris": 1200.00,
    "Rome": 800.00,
    "Barcelona": 450.00
  },
  "daily_average": 163.33
}
```

**Implementation:**
```typescript
const expenses = await pool.query(
  'SELECT * FROM expenses WHERE trip_id = $1',
  [tripId]
);

const total = expenses.rows.reduce((sum, e) => sum + parseFloat(e.amount), 0);

const byCategory = {};
expenses.rows.forEach(e => {
  byCategory[e.category] = (byCategory[e.category] || 0) + parseFloat(e.amount);
});
```

---

#### **Task 2.5: Public Shared Trip Endpoint** (15 min)
**Priority:** HIGH  
**File:** `server/src/controllers/tripController.ts`

**Requirements:**
- [ ] GET `/api/trips/shared/:shareToken` - Public access (no auth)
- [ ] Return trip with stops, activities, budget summary
- [ ] Only works if trip.is_public = true

---

#### **Task 2.6: Trip Statistics Endpoint** (10 min)
**Priority:** MEDIUM  
**File:** `server/src/controllers/tripController.ts`

**Requirements:**
- [ ] GET `/api/trips/:tripId/stats` - Get trip statistics

**Response:**
```json
{
  "duration_days": 15,
  "total_stops": 3,
  "total_activities": 12,
  "total_budget": 2450.00,
  "countries_visited": ["France", "Italy", "Spain"]
}
```

---

#### **Task 2.7: Input Validation & Error Handling** (15 min)
**Priority:** HIGH  
**Files:** All controllers

**Requirements:**
- [ ] Validate all required fields
- [ ] Check date ranges (end_date >= start_date)
- [ ] Check ownership (user can only edit their trips)
- [ ] Return proper error codes (400, 401, 403, 404, 500)
- [ ] Clear error messages

**Example:**
```typescript
if (!title || !start_date || !end_date) {
  return res.status(400).json({
    error: 'Missing required fields',
    required: ['title', 'start_date', 'end_date']
  });
}

if (new Date(end_date) < new Date(start_date)) {
  return res.status(400).json({
    error: 'End date must be after start date'
  });
}
```

---

#### **Task 2.8: Seed Sample Data** (15 min)
**Priority:** MEDIUM  
**File:** `database/seeds/001_sample_data.sql`

**Requirements:**
- [ ] Create 2 sample users
- [ ] Create 3 sample trips
- [ ] Add 6-9 stops across trips
- [ ] Add 15-20 activities
- [ ] Add 20-30 expenses

**Quick Seed Script:**
```sql
-- User 1
INSERT INTO users (email, password, name, role) VALUES
('demo@example.com', '<hashed_password>', 'Demo User', 'user');

-- Trip 1
INSERT INTO trips (user_id, title, description, start_date, end_date, is_public) VALUES
('<user_id>', 'Europe Summer 2026', 'Backpacking adventure', '2026-06-01', '2026-06-15', true);

-- Stops
INSERT INTO stops (trip_id, city, country, order_index, start_date, end_date) VALUES
('<trip_id>', 'Paris', 'France', 0, '2026-06-01', '2026-06-05');
-- ... more stops
```

---

## 🔄 Integration & Merge Plan

### Hour 1 Checkpoint (After 60 minutes)

**Developer 1:**
```bash
# Commit frontend work
git add .
git commit -m "feat: enhanced landing, trip creation, and itinerary builder"
git push origin dev-frontend
```

**Developer 2:**
```bash
# Commit backend work
git add .
git commit -m "feat: complete stop, activity, expense APIs with validation"
git push origin dev-backend
```

**Quick Sync (5 min):**
- Test key user flows together
- Identify integration issues
- Adjust API contracts if needed

---

### Hour 1.5 - Final Integration (After 90 minutes)

**Merge Order:**

```bash
# 1. Merge backend first
git checkout main
git merge dev-backend
npm run dev  # Test backend

# 2. Merge frontend
git merge dev-frontend
npm run dev  # Test full stack

# 3. Resolve conflicts if any
# 4. Test critical flows:
#    - Register → Login → Create Trip → Add Stop → Add Activity → View Budget
```

---

### Hour 2 - Polish & Demo Prep (Final 30 minutes)

**Both Developers:**

**Critical Tests:**
- [ ] User registration works
- [ ] User can create a trip
- [ ] User can add stops to trip
- [ ] User can add activities to stops
- [ ] User can add expenses
- [ ] Budget summary displays correctly
- [ ] Trip sharing link works (public view)
- [ ] Mobile responsive

**Demo Preparation:**
- [ ] Create 1-2 beautiful demo trips with real data
- [ ] Clear browser cache and test fresh user flow
- [ ] Prepare 2-minute pitch
- [ ] Screenshot key features

**Final Push:**
```bash
git add .
git commit -m "chore: final polish and demo prep"
git push origin main
```

---

## 🎯 MVP Feature Checklist

### Must-Have (Essential for Demo)
- ✅ User authentication (register/login)
- ✅ Create trip with title and dates
- ✅ Add multiple stops (cities) to trip
- ✅ Add activities to each stop
- ✅ Add expenses with categories
- ✅ View budget summary
- ✅ Beautiful landing page
- ✅ Responsive design

### Nice-to-Have (If Time Permits)
- ⭐ Trip sharing with public link
- ⭐ Edit/Delete trips
- ⭐ Drag-and-drop stop reordering
- ⭐ Timeline/calendar view
- ⭐ Export to PDF
- ⭐ User profile page

### Skip for Now
- ❌ Admin dashboard
- ❌ Email notifications
- ❌ Image uploads
- ❌ Real-time collaboration
- ❌ Third-party integrations

---

## 🚨 Common Pitfalls to Avoid

### Developer 1 (Frontend)
- ❌ Don't over-engineer UI - keep it simple
- ❌ Don't spend too much time on animations
- ❌ Don't create new backend APIs - use existing ones
- ✅ Focus on user flow completion
- ✅ Test with real data
- ✅ Mobile-first approach

### Developer 2 (Backend)
- ❌ Don't refactor existing code
- ❌ Don't add unnecessary features
- ❌ Don't skip validation
- ✅ Write clear error messages
- ✅ Test with Postman/Thunder Client
- ✅ Log important operations

---

## 📞 Communication Protocol

**Every 30 minutes:**
- Quick status update in chat
- Mention any blockers
- Ask for help if stuck for >10 min

**Slack/Discord Template:**
```
[30 min] Frontend: Landing page done ✅, working on trip creation
[30 min] Backend: Stop API done ✅, starting activity endpoints
```

---

## 🏁 Success Criteria

**Minimum Viable Demo:**
1. Beautiful landing page that impresses
2. Smooth user registration/login
3. Can create a complete trip with 3 stops and 6 activities
4. Budget tracking shows real numbers
5. Works on mobile and desktop
6. Zero console errors
7. Professional look and feel

**Bonus Points:**
- Animations and transitions
- Share link functionality
- Real-world demo data
- Wow factor UI elements

---

## 🛠️ Quick Reference

### Frontend Dev Commands
```bash
npm run dev                    # Start dev server
npm run build --workspace=client  # Build for production
```

### Backend Dev Commands  
```bash
npm run dev --workspace=server    # Start server
npm run migrate --workspace=server # Run migrations
npm run seed --workspace=server   # Seed data
```

### Git Commands
```bash
git status                     # Check status
git add .                      # Stage changes
git commit -m "message"        # Commit
git push origin branch-name    # Push to remote
git pull origin main           # Get latest main
```

### Debugging
```bash
# Check backend logs
# Look at terminal running npm run dev

# Check database
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U globetrotter_user -d globetrotter_db

# Check API with curl
curl http://localhost:5000/api/trips
```

---

## 🎬 Demo Script (2 minutes)

**Minute 1: Problem Statement**
> "Planning multi-city trips is hard. You have flights, hotels, activities, budgets - it's overwhelming. Most tools focus on booking, but we focus on PLANNING."

**Minute 1.5: Solution Demo**
> [Show beautiful landing page]
> "This is GlobeTrotter - a planner-first travel app."
> 
> [Create trip live]
> "I create a trip to Europe in June..."
> 
> [Add stops]
> "Add Paris, Rome, Barcelona in sequence..."
> 
> [Add activities]
> "Schedule activities - Eiffel Tower at 9am..."
> 
> [Show budget]
> "Track every expense by category..."

**Minute 2: Unique Value**
> "Unlike booking platforms, we help you PLAN before you book. Share your itinerary with friends. Make it public. It's your travel vision board."

---

## ⏰ Time Tracking

| Time    | Developer 1            | Developer 2               |
|---------|------------------------|---------------------------|
| 0:00-0:05 | Setup branch         | Setup branch              |
| 0:05-0:25 | Landing page         | Stop API                  |
| 0:25-0:50 | Trip creation        | Activity API              |
| 0:50-1:20 | Trip details page    | Expense API + Budget      |
| 1:20-1:35 | Dashboard polish     | Public sharing + validation|
| 1:35-1:50 | Budget view          | Seed data                 |
| 1:50-2:00 | Responsive polish    | Testing + bug fixes       |
| **MERGE** |                      |                           |
| 2:00-2:15 | Integration testing  | Integration testing       |
| 2:15-2:30 | Demo prep + polish   | Demo prep + polish        |

---

## 🚀 Let's Go!

**Developer 1 - Start Here:**
```bash
git checkout -b dev-frontend
# Open: client/src/pages/LandingPage.tsx
# Begin Task 1.1
```

**Developer 2 - Start Here:**
```bash
git checkout -b dev-backend
# Open: server/src/controllers/tripController.ts
# Begin Task 2.1
```

---

**Good luck! You've got this! 🎉**

*Remember: Done is better than perfect. Focus on the user experience and core flows. You can always refactor later!*

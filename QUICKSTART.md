# 🚀 Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running on port 5432

### Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Setup Backend
cd server
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run seed

# 3. Start both frontend and backend
cd ..
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:5001/health

# Test accounts:
# User:  user@globetrotter.com / User@123
# Admin: admin@globetrotter.com / Admin@123
```

## First Steps

1. **Visit** http://localhost:3000
2. **Register** a new account or use test accounts
3. **Create** your first trip
4. **Explore** the dashboard

## Folder Structure

```
GlobeTrotter_VA/
├── client/          # React frontend (port 3000)
├── server/          # Express backend (port 5001)
├── database/        # SQL schemas and seeds
├── README.md        # Full documentation
├── ARCHITECTURE.md  # System design
└── PROJECT_SUMMARY.md  # Implementation details
```

## Common Commands

```bash
# Development
npm run dev              # Start both frontend & backend
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Database
cd server
npm run migrate          # Run database migrations
npm run seed             # Populate sample data
```

## Troubleshooting

**Port already in use?**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

**Database connection error?**
- Check PostgreSQL is running: `pg_isready -h localhost -p 5432`
- Verify `.env` credentials match database
- Ensure database exists: `psql -l`

**Frontend can't reach backend?**
- Check backend is running: `curl http://localhost:5001/health`
- Verify VITE_API_URL in client (default: http://localhost:5001/api)

## What's Next?

1. Read [README.md](README.md) for detailed documentation
2. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
3. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for features
4. Start building your travel itinerary! 🌍

## Need Help?

- 📖 Full docs: [README.md](README.md)
- 🏗 Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- 📝 Details: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

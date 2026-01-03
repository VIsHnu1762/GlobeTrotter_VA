# 🚀 Quick Start Guide

## 5-Minute Setup

### Option 1: Docker (Recommended)

```bash
# 1. Start all services
docker-compose up -d

# 2. Wait 30 seconds for database to initialize

# 3. Open browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000/health

# Test accounts:
# User:  user@globetrotter.com / User@123
# Admin: admin@globetrotter.com / Admin@123
```

### Option 2: Manual Setup

```bash
# 1. Start PostgreSQL (if not already running)
# Ensure it's running on port 5432

# 2. Setup Backend
cd server
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run seed
npm run dev    # Runs on port 5000

# 3. Setup Frontend (new terminal)
cd client
npm install
npm run dev    # Runs on port 3000
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
├── server/          # Express backend (port 5000)
├── database/        # SQL schemas and seeds
├── README.md        # Full documentation
├── ARCHITECTURE.md  # System design
└── PROJECT_SUMMARY.md  # Implementation details
```

## Common Commands

```bash
# Development
npm run dev              # Start both frontend & backend

# Database
cd server
npm run migrate          # Run database migrations
npm run seed             # Populate sample data

# Docker
docker-compose up -d     # Start all services
docker-compose down      # Stop all services
docker-compose logs -f   # View logs
```

## Troubleshooting

**Port already in use?**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Database connection error?**
- Check PostgreSQL is running: `docker-compose ps`
- Verify `.env` credentials match database

**Frontend can't reach backend?**
- Check backend is running: `curl http://localhost:5000/health`
- Verify VITE_API_URL in `client/.env`

## What's Next?

1. Read [README.md](README.md) for detailed documentation
2. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
3. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for features
4. Start building your travel itinerary! 🌍

## Need Help?

- 📖 Full docs: [README.md](README.md)
- 🏗 Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- 📝 Details: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

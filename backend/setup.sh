#!/bin/bash

echo "🚀 Setting up GlobeTrotter Django Backend..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on port 5432"
    echo "Please start PostgreSQL first"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "📦 Setting up database..."
psql -h localhost -p 5432 -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'globetrotter_db'" | grep -q 1 || \
psql -h localhost -p 5432 -U postgres <<EOF
CREATE USER globetrotter_user WITH PASSWORD 'globetrotter_pass';
CREATE DATABASE globetrotter_db OWNER globetrotter_user;
GRANT ALL PRIVILEGES ON DATABASE globetrotter_db TO globetrotter_user;
ALTER USER globetrotter_user CREATEDB;
EOF

echo "✅ Database setup complete"

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "🐍 Creating virtual environment..."
    python3 -m venv venv
fi

echo "✅ Virtual environment ready"

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your settings"
fi

# Run migrations
echo "🔄 Running database migrations..."
python manage.py makemigrations
python manage.py migrate

echo "✅ Migrations complete"

# Create superuser prompt
echo ""
echo "🔐 Create Django Admin Superuser"
echo "You can skip this and create later with: python manage.py createsuperuser"
read -p "Create superuser now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the Django server:"
echo "  source venv/bin/activate"
echo "  python manage.py runserver 8000"
echo ""
echo "Access points:"
echo "  - Backend API: http://localhost:8000/api"
echo "  - Django Admin: http://localhost:8000/admin"

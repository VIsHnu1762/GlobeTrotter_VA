# Setup Local PostgreSQL Database for GlobeTrotter
# This script creates the database, user, and schema

$PSQL_PATH = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$PGPASSWORD = "postgres"  # Default postgres password

Write-Host "Setting up GlobeTrotter Database..." -ForegroundColor Green

# Set environment variable for password
$env:PGPASSWORD = $PGPASSWORD

# Step 1: Create user and database
Write-Host "`n1. Creating database user and database..." -ForegroundColor Yellow
& $PSQL_PATH -U postgres -h localhost -c "DROP DATABASE IF EXISTS globetrotter_db;" 2>$null
& $PSQL_PATH -U postgres -h localhost -c "DROP USER IF EXISTS globetrotter_user;" 2>$null
& $PSQL_PATH -U postgres -h localhost -c "CREATE USER globetrotter_user WITH PASSWORD 'globetrotter_pass';"
& $PSQL_PATH -U postgres -h localhost -c "CREATE DATABASE globetrotter_db OWNER globetrotter_user;"
& $PSQL_PATH -U postgres -h localhost -c "GRANT ALL PRIVILEGES ON DATABASE globetrotter_db TO globetrotter_user;"

# Step 2: Connect to the new database and create schema
Write-Host "`n2. Creating database schema..." -ForegroundColor Yellow
& $PSQL_PATH -U globetrotter_user -h localhost -d globetrotter_db -f "database\schema.sql"

# Step 3: Run migrations
Write-Host "`n3. Running migrations..." -ForegroundColor Yellow
Get-ChildItem "database\migrations\*.sql" | Sort-Object Name | ForEach-Object {
    Write-Host "   Running $($_.Name)..." -ForegroundColor Cyan
    & $PSQL_PATH -U globetrotter_user -h localhost -d globetrotter_db -f $_.FullName
}

# Step 4: Seed data
Write-Host "`n4. Seeding initial data..." -ForegroundColor Yellow
Get-ChildItem "database\seeds\*.sql" | Sort-Object Name | ForEach-Object {
    Write-Host "   Seeding $($_.Name)..." -ForegroundColor Cyan
    & $PSQL_PATH -U globetrotter_user -h localhost -d globetrotter_db -f $_.FullName
}

# Cleanup
Remove-Item Env:\PGPASSWORD

Write-Host "`n✅ Database setup complete!" -ForegroundColor Green
Write-Host "Database: globetrotter_db" -ForegroundColor Cyan
Write-Host "User: globetrotter_user" -ForegroundColor Cyan
Write-Host "Password: globetrotter_pass" -ForegroundColor Cyan

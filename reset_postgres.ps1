# Run this script as Administrator
# Reset PostgreSQL password

Write-Host "Restarting PostgreSQL service..." -ForegroundColor Yellow
Restart-Service postgresql-x64-17
Start-Sleep -Seconds 3

Write-Host "Resetting postgres user password..." -ForegroundColor Yellow
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'admin123';"

Write-Host "Restoring authentication settings..." -ForegroundColor Yellow
Copy-Item "C:\Program Files\PostgreSQL\17\data\pg_hba.conf.backup" "C:\Program Files\PostgreSQL\17\data\pg_hba.conf" -Force

Write-Host "Restarting PostgreSQL service again..." -ForegroundColor Yellow
Restart-Service postgresql-x64-17
Start-Sleep -Seconds 3

Write-Host "`nPassword reset complete! New password is: admin123" -ForegroundColor Green
Write-Host "Now creating the GlobeTrotter database..." -ForegroundColor Yellow

& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "CREATE USER globetrotter_user WITH PASSWORD 'globetrotter_pass';"
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "CREATE DATABASE globetrotter_db OWNER globetrotter_user;"
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE globetrotter_db TO globetrotter_user;"

Write-Host "`nSetup complete!" -ForegroundColor Green

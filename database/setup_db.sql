-- Create user and database for GlobeTrotter
CREATE USER globetrotter_user WITH PASSWORD 'globetrotter_pass';
CREATE DATABASE globetrotter_db OWNER globetrotter_user;
GRANT ALL PRIVILEGES ON DATABASE globetrotter_db TO globetrotter_user;

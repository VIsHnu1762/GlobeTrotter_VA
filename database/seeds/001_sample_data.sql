-- Seed Data for GlobeTrotter
-- Test accounts and sample data for development

-- =====================================================
-- USERS
-- =====================================================
-- Admin user: admin@globetrotter.com / Admin@123
-- Password hash for 'Admin@123'
INSERT INTO users (id, email, password, name, role) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@globetrotter.com', '$2b$10$rZJ3qJ3V8Z9J3qJ3V8Z9JOX9J3V8Z9J3qJ3V8Z9J3qJ3V8Z9J3qJ3', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Regular user: user@globetrotter.com / User@123
-- Password hash for 'User@123'
INSERT INTO users (id, email, password, name, role) VALUES
('660e8400-e29b-41d4-a716-446655440000', 'user@globetrotter.com', '$2b$10$rZJ3qJ3V8Z9J3qJ3V8Z9JOX9J3V8Z9J3qJ3V8Z9J3qJ3V8Z9J3qJ3', 'John Traveler', 'user')
ON CONFLICT (email) DO NOTHING;

-- Additional test user
INSERT INTO users (id, email, password, name, role) VALUES
('770e8400-e29b-41d4-a716-446655440000', 'jane@example.com', '$2b$10$rZJ3qJ3V8Z9J3qJ3V8Z9JOX9J3V8Z9J3qJ3V8Z9J3qJ3V8Z9J3qJ3', 'Jane Explorer', 'user')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- TRIPS
-- =====================================================
INSERT INTO trips (id, user_id, title, description, start_date, end_date, is_public, share_token) VALUES
('880e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'European Adventure 2026', 'Exploring the best of Western Europe with family', '2026-06-01', '2026-06-15', true, '880e8400-e29b-41d4-a716-446655440001'),
('990e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Southeast Asia Backpacking', 'Budget-friendly trip through Thailand, Vietnam, and Cambodia', '2026-08-10', '2026-09-05', false, null),
('aa0e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', 'USA Road Trip', 'Cross-country adventure from NYC to San Francisco', '2026-07-01', '2026-07-20', true, 'aa0e8400-e29b-41d4-a716-446655440001');

-- =====================================================
-- STOPS
-- =====================================================
-- European Adventure stops
INSERT INTO stops (id, trip_id, city, country, order_index, start_date, end_date, notes) VALUES
('bb0e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'Paris', 'France', 0, '2026-06-01', '2026-06-04', 'Eiffel Tower, Louvre, Notre Dame'),
('cc0e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'Amsterdam', 'Netherlands', 1, '2026-06-05', '2026-06-08', 'Canal tours, Van Gogh Museum'),
('dd0e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'Berlin', 'Germany', 2, '2026-06-09', '2026-06-12', 'Berlin Wall, Museum Island'),
('ee0e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'Prague', 'Czech Republic', 3, '2026-06-13', '2026-06-15', 'Charles Bridge, Old Town Square');

-- Southeast Asia stops
INSERT INTO stops (id, trip_id, city, country, order_index, start_date, end_date, notes) VALUES
('ff0e8400-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', 'Bangkok', 'Thailand', 0, '2026-08-10', '2026-08-17', 'Temples, street food, Grand Palace'),
('000e8401-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', 'Hanoi', 'Vietnam', 1, '2026-08-18', '2026-08-25', 'Old Quarter, Halong Bay day trip'),
('110e8401-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', 'Siem Reap', 'Cambodia', 2, '2026-08-26', '2026-09-05', 'Angkor Wat temples complex');

-- =====================================================
-- ACTIVITIES
-- =====================================================
-- Paris activities
INSERT INTO activities (id, stop_id, title, description, date, time, duration, category) VALUES
('220e8401-e29b-41d4-a716-446655440000', 'bb0e8400-e29b-41d4-a716-446655440000', 'Eiffel Tower Visit', 'Morning visit to Eiffel Tower summit', '2026-06-01', '09:00', 180, 'sightseeing'),
('330e8401-e29b-41d4-a716-446655440000', 'bb0e8400-e29b-41d4-a716-446655440000', 'Louvre Museum', 'Explore the world''s largest art museum', '2026-06-02', '10:00', 240, 'culture'),
('440e8401-e29b-41d4-a716-446655440000', 'bb0e8400-e29b-41d4-a716-446655440000', 'Seine River Cruise', 'Evening dinner cruise on the Seine', '2026-06-03', '19:00', 120, 'entertainment');

-- Bangkok activities
INSERT INTO activities (id, stop_id, title, description, date, time, duration, category) VALUES
('550e8401-e29b-41d4-a716-446655440000', 'ff0e8400-e29b-41d4-a716-446655440000', 'Grand Palace Tour', 'Visit the stunning Grand Palace and Wat Phra Kaew', '2026-08-11', '08:00', 180, 'sightseeing'),
('660e8401-e29b-41d4-a716-446655440000', 'ff0e8400-e29b-41d4-a716-446655440000', 'Street Food Tour', 'Explore Bangkok''s famous street food scene', '2026-08-12', '18:00', 150, 'food');

-- =====================================================
-- EXPENSES
-- =====================================================
-- European Adventure expenses
INSERT INTO expenses (id, trip_id, stop_id, title, amount, currency, category, date, notes) VALUES
('770e8401-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'bb0e8400-e29b-41d4-a716-446655440000', 'Hotel Le Marais', 450.00, 'EUR', 'accommodation', '2026-06-01', '3 nights boutique hotel'),
('880e8401-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'bb0e8400-e29b-41d4-a716-446655440000', 'Eiffel Tower Tickets', 75.00, 'EUR', 'activities', '2026-06-01', 'Summit access for 3 people'),
('990e8401-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'bb0e8400-e29b-41d4-a716-446655440000', 'Restaurant Dining', 180.00, 'EUR', 'food', '2026-06-02', 'Dinner at French bistro'),
('aa0e8401-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', 'cc0e8400-e29b-41d4-a716-446655440000', 'Train Paris-Amsterdam', 120.00, 'EUR', 'transport', '2026-06-05', 'Thalys high-speed train');

-- Southeast Asia expenses
INSERT INTO expenses (id, trip_id, stop_id, title, amount, currency, category, date, notes) VALUES
('bb0e8401-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', 'ff0e8400-e29b-41d4-a716-446655440000', 'Hostel Bangkok', 25.00, 'USD', 'accommodation', '2026-08-10', 'Budget hostel dorm bed per night'),
('cc0e8401-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', 'ff0e8400-e29b-41d4-a716-446655440000', 'Street Food', 15.00, 'USD', 'food', '2026-08-11', 'Daily food budget'),
('dd0e8401-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', 'ff0e8400-e29b-41d4-a716-446655440000', 'Tuk-tuk Transportation', 10.00, 'USD', 'transport', '2026-08-12', 'Local transport for the day');

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Query to verify data
-- SELECT 'Users' as table_name, COUNT(*) as count FROM users
-- UNION ALL
-- SELECT 'Trips', COUNT(*) FROM trips
-- UNION ALL
-- SELECT 'Stops', COUNT(*) FROM stops
-- UNION ALL
-- SELECT 'Activities', COUNT(*) FROM activities
-- UNION ALL
-- SELECT 'Expenses', COUNT(*) FROM expenses;

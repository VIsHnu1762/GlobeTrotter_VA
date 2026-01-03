-- Create public "Explore" trips created by admin for users to browse
-- These should NOT be in user's "My Trips" section

DO $$
DECLARE
    v_admin_id UUID;
BEGIN
    -- Get admin user ID
    SELECT id INTO v_admin_id FROM users WHERE role = 'admin' LIMIT 1;
    
    IF v_admin_id IS NOT NULL THEN
        -- European Adventure (Public)
        INSERT INTO trips (id, user_id, title, description, start_date, end_date, is_public) VALUES
        ('11111111-1111-1111-1111-111111111111', v_admin_id, 'European Summer 2026', 'Exploring Western Europe with family and friends', '2026-06-01', '2026-06-15', true);
        
        -- Add stops for European Adventure
        INSERT INTO stops (trip_id, city, country, order_index, start_date, end_date, notes) VALUES
        ('11111111-1111-1111-1111-111111111111', 'Paris', 'France', 0, '2026-06-01', '2026-06-04', 'Eiffel Tower, Louvre, Seine River cruise'),
        ('11111111-1111-1111-1111-111111111111', 'Amsterdam', 'Netherlands', 1, '2026-06-05', '2026-06-08', 'Canal tours, Anne Frank House, Rijksmuseum'),
        ('11111111-1111-1111-1111-111111111111', 'Berlin', 'Germany', 2, '2026-06-09', '2026-06-12', 'Brandenburg Gate, Museum Island, Berlin Wall'),
        ('11111111-1111-1111-1111-111111111111', 'Prague', 'Czech Republic', 3, '2026-06-13', '2026-06-15', 'Charles Bridge, Prague Castle, Old Town');

        -- Southeast Asia Adventure (Public)
        INSERT INTO trips (id, user_id, title, description, start_date, end_date, is_public) VALUES
        ('22222222-2222-2222-2222-222222222222', v_admin_id, 'Southeast Asia Backpacking', 'Budget-friendly adventure through Thailand and Vietnam', '2026-08-10', '2026-08-28', true);
        
        INSERT INTO stops (trip_id, city, country, order_index, start_date, end_date, notes) VALUES
        ('22222222-2222-2222-2222-222222222222', 'Bangkok', 'Thailand', 0, '2026-08-10', '2026-08-17', 'Grand Palace, temples, street food tours'),
        ('22222222-2222-2222-2222-222222222222', 'Hanoi', 'Vietnam', 1, '2026-08-18', '2026-08-25', 'Old Quarter, Halong Bay day trip'),
        ('22222222-2222-2222-2222-222222222222', 'Siem Reap', 'Cambodia', 2, '2026-08-26', '2026-08-28', 'Angkor Wat temple complex');

        -- Japan Winter Trip (Public)
        INSERT INTO trips (id, user_id, title, description, start_date, end_date, is_public) VALUES
        ('33333333-3333-3333-3333-333333333333', v_admin_id, 'Japan Winter Wonderland', 'Cherry blossoms and mountain adventures', '2026-03-15', '2026-03-28', true);
        
        INSERT INTO stops (trip_id, city, country, order_index, start_date, end_date, notes) VALUES
        ('33333333-3333-3333-3333-333333333333', 'Tokyo', 'Japan', 0, '2026-03-15', '2026-03-20', 'Shibuya, Harajuku, TeamLab Borderless'),
        ('33333333-3333-3333-3333-333333333333', 'Kyoto', 'Japan', 1, '2026-03-21', '2026-03-25', 'Temples, bamboo forest, geisha district'),
        ('33333333-3333-3333-3333-333333333333', 'Osaka', 'Japan', 2, '2026-03-26', '2026-03-28', 'Street food, Osaka Castle, Dotonbori');

        RAISE NOTICE 'Public explore trips created successfully by admin';
    ELSE
        RAISE NOTICE 'No admin user found.';
    END IF;
END $$;

-- Popular Travel Destinations Seed Data
-- Real cities with coordinates and travel information

-- =====================================================
-- TABLE: destinations (reference data)
-- Popular cities and locations for autocomplete
-- =====================================================
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    continent VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    popular_attractions TEXT[], -- Array of popular sites
    best_months VARCHAR(100), -- Best time to visit
    avg_budget_per_day INTEGER, -- USD
    timezone VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_city_country UNIQUE (city, country)
);

CREATE INDEX idx_destinations_city ON destinations(city);
CREATE INDEX idx_destinations_country ON destinations(country);
CREATE INDEX idx_destinations_continent ON destinations(continent);

-- =====================================================
-- POPULAR DESTINATIONS - EUROPE
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Paris', 'France', 'FR', 'Europe', 48.8566, 2.3522, 'The City of Light, famous for art, fashion, gastronomy and culture', 
    ARRAY['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe', 'Sacré-Cœur', 'Champs-Élysées', 'Versailles Palace', 'Musée d''Orsay', 'Latin Quarter', 'Montmartre', 'Seine River Cruise', 'Disneyland Paris'], 
    'April-June, September-October', 150, 'Europe/Paris'),

('London', 'United Kingdom', 'GB', 'Europe', 51.5074, -0.1278, 'Historic capital with royal palaces, museums, and diverse culture', 
    ARRAY['Big Ben', 'British Museum', 'Tower of London', 'Buckingham Palace', 'London Eye', 'Westminster Abbey', 'Tower Bridge', 'Hyde Park', 'Covent Garden', 'Piccadilly Circus', 'Camden Market', 'St Paul''s Cathedral', 'Kensington Palace'], 
    'May-September', 180, 'Europe/London'),

('Rome', 'Italy', 'IT', 'Europe', 41.9028, 12.4964, 'Eternal City with ancient ruins, Renaissance art, and world-class cuisine', 
    ARRAY['Colosseum', 'Vatican Museums', 'Trevi Fountain', 'Roman Forum', 'Pantheon', 'Sistine Chapel', 'Spanish Steps', 'Piazza Navona', 'Borghese Gallery', 'Castel Sant''Angelo', 'Palatine Hill', 'Villa Borghese', 'Trastevere'], 
    'April-June, September-October', 120, 'Europe/Rome'),

('Barcelona', 'Spain', 'ES', 'Europe', 41.3851, 2.1734, 'Mediterranean city known for Gaudí architecture and vibrant culture', 
    ARRAY['Sagrada Familia', 'Park Güell', 'Las Ramblas', 'Gothic Quarter', 'Casa Batlló'], 
    'May-June, September-October', 110, 'Europe/Madrid'),

('Amsterdam', 'Netherlands', 'NL', 'Europe', 52.3676, 4.9041, 'Canal city famous for museums, cycling culture, and historic architecture', 
    ARRAY['Van Gogh Museum', 'Anne Frank House', 'Canal Ring', 'Rijksmuseum', 'Vondelpark'], 
    'April-May, September-November', 140, 'Europe/Amsterdam'),

('Berlin', 'Germany', 'DE', 'Europe', 52.5200, 13.4050, 'Historic capital with rich culture, art scene, and nightlife', 
    ARRAY['Brandenburg Gate', 'Berlin Wall Memorial', 'Museum Island', 'Reichstag', 'Checkpoint Charlie'], 
    'May-September', 100, 'Europe/Berlin'),

('Prague', 'Czech Republic', 'CZ', 'Europe', 50.0755, 14.4378, 'Fairy-tale city with medieval architecture and affordable charm', 
    ARRAY['Charles Bridge', 'Prague Castle', 'Old Town Square', 'Astronomical Clock', 'Jewish Quarter'], 
    'April-June, September-October', 70, 'Europe/Prague'),

('Vienna', 'Austria', 'AT', 'Europe', 48.2082, 16.3738, 'Imperial city known for classical music, palaces, and coffee culture', 
    ARRAY['Schönbrunn Palace', 'St. Stephen''s Cathedral', 'Hofburg Palace', 'Belvedere', 'Vienna State Opera'], 
    'April-June, September-October', 120, 'Europe/Vienna'),

('Athens', 'Greece', 'GR', 'Europe', 37.9838, 23.7275, 'Ancient city with classical ruins and Mediterranean culture', 
    ARRAY['Acropolis', 'Parthenon', 'Ancient Agora', 'Plaka District', 'National Archaeological Museum'], 
    'April-June, September-October', 80, 'Europe/Athens'),

('Lisbon', 'Portugal', 'PT', 'Europe', 38.7223, -9.1393, 'Coastal capital with colorful tiles, historic trams, and Fado music', 
    ARRAY['Belém Tower', 'Jerónimos Monastery', 'São Jorge Castle', 'Alfama District', 'Tram 28'], 
    'March-May, September-October', 90, 'Europe/Lisbon');

-- =====================================================
-- POPULAR DESTINATIONS - ASIA
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Tokyo', 'Japan', 'JP', 'Asia', 35.6762, 139.6503, 'Ultra-modern metropolis blending tradition with cutting-edge technology', 
    ARRAY['Senso-ji Temple', 'Tokyo Skytree', 'Shibuya Crossing', 'Meiji Shrine', 'Tsukiji Market', 'Imperial Palace', 'Harajuku', 'Akihabara', 'Shinjuku Gyoen', 'Tokyo Tower', 'Roppongi Hills', 'Ueno Park', 'teamLab Borderless'], 
    'March-May, September-November', 150, 'Asia/Tokyo'),

('Bangkok', 'Thailand', 'TH', 'Asia', 13.7563, 100.5018, 'Vibrant capital with temples, street food, and bustling markets', 
    ARRAY['Grand Palace', 'Wat Pho', 'Wat Arun', 'Chatuchak Market', 'Khao San Road'], 
    'November-February', 50, 'Asia/Bangkok'),

('Singapore', 'Singapore', 'SG', 'Asia', 1.3521, 103.8198, 'Modern city-state with diverse culture, gardens, and world-class food', 
    ARRAY['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Little India'], 
    'February-April', 120, 'Asia/Singapore'),

('Dubai', 'United Arab Emirates', 'AE', 'Asia', 25.2048, 55.2708, 'Futuristic city with luxury shopping, ultramodern architecture, and desert adventures', 
    ARRAY['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Marina', 'Desert Safari'], 
    'November-March', 200, 'Asia/Dubai'),

('Seoul', 'South Korea', 'KR', 'Asia', 37.5665, 126.9780, 'Dynamic capital mixing ancient palaces with K-pop culture', 
    ARRAY['Gyeongbokgung Palace', 'N Seoul Tower', 'Myeongdong', 'Bukchon Hanok Village', 'Gangnam'], 
    'March-May, September-November', 80, 'Asia/Seoul'),

('Bali (Denpasar)', 'Indonesia', 'ID', 'Asia', -8.3405, 115.0920, 'Tropical paradise with beaches, rice terraces, and spiritual temples', 
    ARRAY['Uluwatu Temple', 'Tanah Lot', 'Ubud Rice Terraces', 'Sacred Monkey Forest', 'Seminyak Beach'], 
    'April-October', 60, 'Asia/Makassar'),

('Hong Kong', 'Hong Kong', 'HK', 'Asia', 22.3193, 114.1694, 'Vertical city with stunning skyline, dim sum, and harbor views', 
    ARRAY['Victoria Peak', 'Star Ferry', 'Temple Street Night Market', 'Big Buddha', 'Hong Kong Disneyland'], 
    'October-December', 130, 'Asia/Hong_Kong'),

('Hanoi', 'Vietnam', 'VN', 'Asia', 21.0285, 105.8542, 'Charming capital with French colonial architecture and street food culture', 
    ARRAY['Hoan Kiem Lake', 'Old Quarter', 'Temple of Literature', 'Halong Bay tours', 'Train Street'], 
    'February-April, October-December', 40, 'Asia/Ho_Chi_Minh'),

('Mumbai', 'India', 'IN', 'Asia', 19.0760, 72.8777, 'Bollywood capital with colonial architecture and bustling streets', 
    ARRAY['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus', 'Bollywood Studios'], 
    'October-March', 50, 'Asia/Kolkata'),

('Siem Reap', 'Cambodia', 'KH', 'Asia', 13.3671, 103.8448, 'Gateway to ancient Angkor temples and Khmer culture', 
    ARRAY['Angkor Wat', 'Angkor Thom', 'Bayon Temple', 'Ta Prohm', 'Pub Street'], 
    'November-March', 35, 'Asia/Phnom_Penh');

-- =====================================================
-- POPULAR DESTINATIONS - NORTH AMERICA
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('New York', 'United States', 'US', 'North America', 40.7128, -74.0060, 'The Big Apple - iconic skyline, Broadway shows, and diverse neighborhoods', 
    ARRAY['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Brooklyn Bridge', 'Metropolitan Museum', '9/11 Memorial', 'Rockefeller Center', 'High Line', 'Broadway', 'Wall Street', 'Fifth Avenue', 'Grand Central'], 
    'April-June, September-November', 200, 'America/New_York'),

('Los Angeles', 'United States', 'US', 'North America', 34.0522, -118.2437, 'City of Angels with Hollywood glamour, beaches, and entertainment', 
    ARRAY['Hollywood Sign', 'Santa Monica Pier', 'Getty Center', 'Griffith Observatory', 'Venice Beach'], 
    'March-May, September-November', 180, 'America/Los_Angeles'),

('San Francisco', 'United States', 'US', 'North America', 37.7749, -122.4194, 'Hilly city famous for Golden Gate Bridge, cable cars, and tech culture', 
    ARRAY['Golden Gate Bridge', 'Alcatraz Island', 'Fisherman''s Wharf', 'Lombard Street', 'Chinatown'], 
    'September-November', 190, 'America/Los_Angeles'),

('Las Vegas', 'United States', 'US', 'North America', 36.1699, -115.1398, 'Entertainment capital with casinos, shows, and nightlife', 
    ARRAY['The Strip', 'Bellagio Fountains', 'Fremont Street', 'High Roller', 'Grand Canyon tours'], 
    'March-May, September-November', 150, 'America/Los_Angeles'),

('Chicago', 'United States', 'US', 'North America', 41.8781, -87.6298, 'Windy City known for architecture, deep-dish pizza, and lakefront', 
    ARRAY['Millennium Park', 'Willis Tower', 'Navy Pier', 'Art Institute of Chicago', 'Magnificent Mile'], 
    'April-October', 160, 'America/Chicago'),

('Toronto', 'Canada', 'CA', 'North America', 43.6532, -79.3832, 'Diverse Canadian metropolis with CN Tower and multicultural neighborhoods', 
    ARRAY['CN Tower', 'Royal Ontario Museum', 'Distillery District', 'Toronto Islands', 'St. Lawrence Market'], 
    'April-October', 140, 'America/Toronto'),

('Vancouver', 'Canada', 'CA', 'North America', 49.2827, -123.1207, 'Pacific coastal city surrounded by mountains and forests', 
    ARRAY['Stanley Park', 'Granville Island', 'Capilano Suspension Bridge', 'Gastown', 'Grouse Mountain'], 
    'June-September', 150, 'America/Vancouver'),

('Mexico City', 'Mexico', 'MX', 'North America', 19.4326, -99.1332, 'Vibrant capital with Aztec heritage, colonial architecture, and street food', 
    ARRAY['Zócalo', 'Frida Kahlo Museum', 'Teotihuacan Pyramids', 'Chapultepec Castle', 'Xochimilco'], 
    'March-May, September-November', 60, 'America/Mexico_City'),

('Cancún', 'Mexico', 'MX', 'North America', 21.1619, -86.8515, 'Caribbean resort town with beaches, Mayan ruins, and nightlife', 
    ARRAY['Chichen Itza', 'Tulum Ruins', 'Hotel Zone beaches', 'Isla Mujeres', 'Xcaret Park'], 
    'December-April', 100, 'America/Cancun');

-- =====================================================
-- POPULAR DESTINATIONS - SOUTH AMERICA
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Rio de Janeiro', 'Brazil', 'BR', 'South America', -22.9068, -43.1729, 'Beach paradise with Christ the Redeemer, carnival, and samba culture', 
    ARRAY['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Ipanema', 'Lapa Arches'], 
    'December-March', 80, 'America/Sao_Paulo'),

('Buenos Aires', 'Argentina', 'AR', 'South America', -34.6037, -58.3816, 'Paris of South America with tango, steaks, and European architecture', 
    ARRAY['La Boca', 'Recoleta Cemetery', 'Teatro Colón', 'San Telmo Market', 'Plaza de Mayo'], 
    'March-May, September-November', 70, 'America/Argentina/Buenos_Aires'),

('Lima', 'Peru', 'PE', 'South America', -12.0464, -77.0428, 'Coastal capital with pre-Columbian sites and world-class gastronomy', 
    ARRAY['Plaza de Armas', 'Miraflores Cliffs', 'Larco Museum', 'Barranco District', 'Machu Picchu tours'], 
    'December-April', 60, 'America/Lima'),

('Bogotá', 'Colombia', 'CO', 'South America', 4.7110, -74.0721, 'Mountain capital with colonial heritage and vibrant cultural scene', 
    ARRAY['Monserrate', 'Gold Museum', 'Candelaria', 'Botero Museum', 'Salt Cathedral'], 
    'December-March, July-August', 50, 'America/Bogota');

-- =====================================================
-- POPULAR DESTINATIONS - OCEANIA
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Sydney', 'Australia', 'AU', 'Oceania', -33.8688, 151.2093, 'Harbor city with iconic Opera House, beaches, and outdoor lifestyle', 
    ARRAY['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Darling Harbour', 'The Rocks', 'Royal Botanic Garden', 'Manly Beach', 'Taronga Zoo', 'Blue Mountains', 'Circular Quay', 'Sydney Tower Eye', 'Coogee Beach'], 
    'September-November, March-May', 170, 'Australia/Sydney'),

('Melbourne', 'Australia', 'AU', 'Oceania', -37.8136, 144.9631, 'Cultural capital with street art, coffee culture, and sporting events', 
    ARRAY['Federation Square', 'Queen Victoria Market', 'Great Ocean Road', 'St Kilda Beach', 'Royal Botanic Gardens'], 
    'March-May, September-November', 160, 'Australia/Melbourne'),

('Auckland', 'New Zealand', 'NZ', 'Oceania', -36.8485, 174.7633, 'City of Sails with harbors, volcanoes, and Maori culture', 
    ARRAY['Sky Tower', 'Waitemata Harbour', 'Auckland Museum', 'Rangitoto Island', 'Mission Bay'], 
    'December-March', 140, 'Pacific/Auckland'),

('Queenstown', 'New Zealand', 'NZ', 'Oceania', -45.0312, 168.6626, 'Adventure capital surrounded by mountains and Lake Wakatipu', 
    ARRAY['Milford Sound', 'Skyline Gondola', 'Bungee jumping', 'Lake Wakatipu', 'The Remarkables'], 
    'December-February, June-August', 150, 'Pacific/Auckland');

-- =====================================================
-- POPULAR DESTINATIONS - AFRICA
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Cape Town', 'South Africa', 'ZA', 'Africa', -33.9249, 18.4241, 'Coastal gem with Table Mountain, vineyards, and diverse culture', 
    ARRAY['Table Mountain', 'Robben Island', 'V&A Waterfront', 'Cape of Good Hope', 'Boulders Beach'], 
    'November-March', 90, 'Africa/Johannesburg'),

('Marrakech', 'Morocco', 'MA', 'Africa', 31.6295, -7.9811, 'Imperial city with souks, palaces, and desert gateway', 
    ARRAY['Jemaa el-Fnaa', 'Bahia Palace', 'Majorelle Garden', 'Koutoubia Mosque', 'Atlas Mountains'], 
    'March-May, September-November', 60, 'Africa/Casablanca'),

('Cairo', 'Egypt', 'EG', 'Africa', 30.0444, 31.2357, 'Ancient capital with pyramids, pharaohs, and Nile River', 
    ARRAY['Pyramids of Giza', 'Egyptian Museum', 'Khan el-Khalili', 'Citadel of Cairo', 'Nile Cruise'], 
    'October-April', 50, 'Africa/Cairo'),

('Nairobi', 'Kenya', 'KE', 'Africa', -1.2921, 36.8219, 'Safari gateway with wildlife parks and vibrant markets', 
    ARRAY['Nairobi National Park', 'Giraffe Centre', 'Karen Blixen Museum', 'Masai Mara tours', 'Bomas of Kenya'], 
    'June-October, January-February', 70, 'Africa/Nairobi');

-- =====================================================
-- POPULAR DESTINATIONS - MIDDLE EAST
-- =====================================================
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Istanbul', 'Turkey', 'TR', 'Europe', 41.0082, 28.9784, 'Transcontinental city bridging Europe and Asia with rich history', 
    ARRAY['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Topkapi Palace', 'Bosphorus Cruise'], 
    'April-June, September-November', 70, 'Europe/Istanbul'),

('Jerusalem', 'Israel', 'IL', 'Asia', 31.7683, 35.2137, 'Holy city sacred to Judaism, Christianity, and Islam', 
    ARRAY['Western Wall', 'Dome of the Rock', 'Church of the Holy Sepulchre', 'Old City', 'Yad Vashem'], 
    'March-May, September-November', 120, 'Asia/Jerusalem'),

('Doha', 'Qatar', 'QA', 'Asia', 25.2854, 51.5310, 'Modern Arabian capital with futuristic architecture and traditional souqs', 
    ARRAY['Museum of Islamic Art', 'The Pearl Qatar', 'Souq Waqif', 'Katara Cultural Village', 'Desert Safari'], 
    'November-April', 180, 'Asia/Qatar');

-- Create view for easy searching
CREATE OR REPLACE VIEW popular_destinations AS
SELECT 
    id,
    city || ', ' || country as full_name,
    city,
    country,
    country_code,
    continent,
    latitude,
    longitude,
    COALESCE(array_length(popular_attractions, 1), 0) as attraction_count,
    avg_budget_per_day,
    best_months
FROM destinations
ORDER BY continent, country, city;

COMMENT ON TABLE destinations IS 'Reference table of popular travel destinations with geographic and travel information';
COMMENT ON VIEW popular_destinations IS 'Formatted view of destinations for easy searching and autocomplete';

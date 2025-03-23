-- --  THE SQL Stuff :) 
-- CREATE TABLE HotelChain (
--     chain_id SERIAL PRIMARY KEY,
--     name VARCHAR(255) UNIQUE NOT NULL, -- I ADDED THIS, IT IS NOT IN FADI's LIST
--     headquarters_address TEXT NOT NULL,
--     headquarters_email TEXT NOT NULL,
--     headquarters_phone VARCHAR(20) NOT NULL,
--     number_of_hotels INT DEFAULT 0,
--     hotel_chain_classification VARCHAR(50) CHECK (hotel_chain_classification  BETWEEN 1 AND 5) NOT NULL -- THIS IS TO CHECK IF THE HOTEL IS 5 STARTS 
--     PRIMARY KEY (chain_id) -- SOMEONE CHECK THIS (Am not sure it should be only chain_id or should include the name)
-- );

-- CREATE TABLE Hotel (
--     hotel_id SERIAL PRIMARY KEY, -- Again, this is me, it just makes sense. 
--     chain_id INT NOT NULL REFERENCES HotelChain(chain_id) ON DELETE CASCADE,
--     stars INT CHECK (stars BETWEEN 1 AND 5), -- This, am not sure, but it make sense that each hotel is rated seperately
--     number_of_rooms INT NOT NULL,
--     address TEXT NOT NULL,
--     contact_phone VARCHAR(20) NOT NULL
--     PRIMARY KEY (hotel_id, chain_id)
-- );

-- CREATE TABLE Room (
--     room_id SERIAL PRIMARY KEY,
--     hotel_id INT NOT NULL REFERENCES Hotel(hotel_id),
--     price DECIMAL(10,2) NOT NULL,
--     amenities TEXT,
--     capacity VARCHAR(50) NOT NULL,
--     sea_view BOOLEAN DEFAULT FALSE,
--     mountain_view BOOLEAN DEFAULT FALSE,
--     extendable BOOLEAN DEFAULT FALSE,
--     damage_report TEXT
--     PRIMARY KEY (room_id, hotel_id)
-- );

-- CREATE TABLE Client (
--     client_id SERIAL PRIMARY KEY,
--     full_name VARCHAR(255) NOT NULL,
--     address TEXT NOT NULL,
--     social_security_number VARCHAR(20) UNIQUE NOT NULL,
--     registration_date DATE NOT NULL DEFAULT CURRENT_DATE
-- );

-- CREATE TABLE Employee (
--     employee_id SERIAL PRIMARY KEY,
--     hotel_id INT NOT NULL REFERENCES Hotel(hotel_id,
--     full_name VARCHAR(255) NOT NULL,
--     address TEXT NOT NULL,
--     social_security_number VARCHAR(20) UNIQUE NOT NULL,
--     role VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE Manager (
--     manager_id SERIAL PRIMARY KEY,
--     hotel_id INT UNIQUE NOT NULL REFERENCES Hotel(hotel_id),
--     employee_id INT UNIQUE NOT NULL REFERENCES Employee(employee_id)
-- );




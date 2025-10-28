-- Drop existing table and recreate with proper constraints
DROP TABLE IF EXISTS countries;

CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capital VARCHAR(255),
    region VARCHAR(255),
    population BIGINT NOT NULL,
    currency_code VARCHAR(10),
    exchange_rate DECIMAL(20, 6),
    estimated_gdp DECIMAL(30, 6),
    flag_url TEXT,
    last_refreshed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_name (name)
);

-- Safely create indexes (drop first if exists)
DROP INDEX IF EXISTS idx_region ON countries;
CREATE INDEX idx_region ON countries(region);

DROP INDEX IF EXISTS idx_currency_code ON countries;
CREATE INDEX idx_currency_code ON countries(currency_code);

DROP INDEX IF EXISTS idx_estimated_gdp ON countries;
CREATE INDEX idx_estimated_gdp ON countries(estimated_gdp);

DROP INDEX IF EXISTS idx_name ON countries;
CREATE INDEX idx_name ON countries(name);
-- создание пользователя
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR, 
    password_hash VARCHAR,
    role VARCHAR DEFAULT 'user',
    status VARCHAR DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP DEFAULT NOW()
);
-- создание баблиотеки поиска
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- создание товара
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    marketplace VARCHAR(20) NOT NULL,
    name TEXT NOT NULL,
    price INTEGER,
    "oldPrice" INTEGER,
    brand VARCHAR(255),
    rating DECIMAL(2,1),
    seller VARCHAR(255),
    url TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    characteristics JSONB,
    best BOOLEAN DEFAULT FALSE,
    type VARCHAR(20),
    discount VARCHAR(20),
    saving VARCHAR(100),
    reviews VARCHAR(100),
    delivery VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);--мб добавить id user чтобы в ЛК было видно историю
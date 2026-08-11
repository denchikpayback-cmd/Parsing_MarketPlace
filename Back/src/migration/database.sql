-- создание пользователя
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR, -- добавить выбор между номером тел. и почтой
    password_hash VARCHAR,
    role VARCHAR DEFAULT 'user',
    status VARCHAR DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP DEFAULT NOW()
);
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    marketplace VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    brand VARCHAR(255),
    url TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    characteristics JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
); --мб добавить id user чтобы в ЛК было видно историю
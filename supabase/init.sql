-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Таблица пользователей
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  telegram_id TEXT UNIQUE,
  username TEXT,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Таблица посылок
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'registered',
  current_location TEXT,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES users(id),
  weight NUMERIC,
  dimensions JSONB,
  description TEXT
);

-- Таблица истории отслеживания
CREATE TABLE tracking_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID NOT NULL REFERENCES packages(id),
  status TEXT NOT NULL,
  location TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Индексы
CREATE INDEX idx_packages_tracking_number ON packages(tracking_number);
CREATE INDEX idx_packages_user_id ON packages(user_id);
CREATE INDEX idx_tracking_history_package_id ON tracking_history(package_id);
CREATE INDEX idx_users_telegram_id ON users(telegram_id);

-- Добавление тестовых данных
INSERT INTO users (telegram_id, username, full_name, role) VALUES
('123456789', 'john_doe', 'John Doe', 'user'),
('987654321', 'admin_user', 'Admin User', 'admin');

INSERT INTO packages (tracking_number, status, current_location, user_id, weight, description) 
SELECT 
  'TLP' || TO_CHAR(generate_series(1, 5), 'FM000'),
  CASE (random() * 4)::int
    WHEN 0 THEN 'registered'
    WHEN 1 THEN 'in_transit'
    WHEN 2 THEN 'out_for_delivery'
    WHEN 3 THEN 'delivered'
    ELSE 'registered'
  END,
  CASE (random() * 2)::int
    WHEN 0 THEN 'Бишкек'
    WHEN 1 THEN 'Ош'
    ELSE 'Алматы'
  END,
  (SELECT id FROM users ORDER BY random() LIMIT 1),
  (random() * 10 + 1)::numeric(10,2),
  'Тестовая посылка #' || generate_series(1, 5);

-- Добавление истории отслеживания
INSERT INTO tracking_history (package_id, status, location, notes)
SELECT 
  p.id,
  p.status,
  p.current_location,
  'Посылка ' || CASE p.status
    WHEN 'registered' THEN 'зарегистрирована'
    WHEN 'in_transit' THEN 'в пути'
    WHEN 'out_for_delivery' THEN 'передана курьеру'
    WHEN 'delivered' THEN 'доставлена'
    ELSE 'обновлен статус'
  END
FROM packages p;

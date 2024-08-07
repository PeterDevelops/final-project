DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS inboxes CASCADE;
DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  profile_photo_url VARCHAR(255) NOT NULL,
  admin_status BOOLEAN
);

CREATE TABLE vendors (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  bio VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  longitude DECIMAL NOT NULL,
  latitude DECIMAL NOT NULL,
  vendor_logo_url VARCHAR(255) NOT NULL,
  admin_user INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  inventory SMALLINT,
  price_cents INTEGER,
  vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
  category VARCHAR(255) NOT NULL,
  sub_category VARCHAR(255) NOT NULL
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  time_ordered TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  total_cost INTEGER,
  delivery_type VARCHAR(50),
  delivery_address VARCHAR(255),
  delivery_city VARCHAR(255)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER
);

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  contact_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  last_message VARCHAR(1000),
  UNIQUE(user_id, contact_user_id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR(1000),
  created_at TIMESTAMPTZ,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE
);

CREATE TABLE chat_messages (
  chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
  message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE
);


ALTER SEQUENCE products_id_seq RESTART WITH 10000;


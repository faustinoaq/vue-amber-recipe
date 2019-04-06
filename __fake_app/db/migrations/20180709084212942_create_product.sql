-- +micrate Up
CREATE TABLE products (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  category_id BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE INDEX product_category_id_idx ON products (category_id);

-- +micrate Down
DROP TABLE IF EXISTS products;

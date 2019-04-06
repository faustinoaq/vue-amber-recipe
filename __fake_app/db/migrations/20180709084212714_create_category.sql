-- +micrate Up
CREATE TABLE categories (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS categories;

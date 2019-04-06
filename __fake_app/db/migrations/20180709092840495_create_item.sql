-- +micrate Up
CREATE TABLE items (
  id INTEGER NOT NULL PRIMARY KEY,
  enabled BOOL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS items;

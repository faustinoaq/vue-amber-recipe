-- +micrate Up
CREATE TABLE comments (
  id INTEGER NOT NULL PRIMARY KEY,
  body TEXT,
  product_id BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE INDEX comment_product_id_idx ON comments (product_id);

-- +micrate Down
DROP TABLE IF EXISTS comments;

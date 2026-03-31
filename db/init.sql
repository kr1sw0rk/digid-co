-- Tina CMS D1 database initialisation
-- Run once: wrangler d1 execute digid-co-tina --file=./db/init.sql

CREATE TABLE IF NOT EXISTS tina_store (
  key   TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

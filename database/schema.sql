CREATE DATABASE IF NOT EXISTS hipcampDB;

USE hipcampDB;

CREATE TABLE IF NOT EXISTS camps (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  property VARCHAR(255),
  state VARCHAR(255),
  responses INT,
  rating INT,
  image_url VARCHAR(255),
  map_url TEXT
);

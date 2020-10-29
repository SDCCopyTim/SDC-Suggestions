drop database if exists timcampdb;

create database timcampdb;

\c timcampdb;

CREATE TABLE camp (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  property VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  responses SMALLINT NOT NULL,
  rating SMALLINT NOT NULL,
  img_url VARCHAR NOT NULL,
  map_url VARCHAR NOT NULL
);

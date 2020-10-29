const { Pool } = require('pg');


const pool = new Pool({
  user: 'alphinalong',
  host: 'localhost',
  database: 'timcampdb',
  password: 'password',
  port: 5432
})

module.exports = pool;


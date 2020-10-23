const { Pool } = require('pg');

const pool = new Pool({
  user: 'alphinaa',
  host: 'localhost',
  database: 'timcampdb'
})

module.exports = pool;
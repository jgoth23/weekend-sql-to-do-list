const pg = require('pg');

// Create a connection to database
const pool = new pg.Pool({
  database: 'weekend_to_do_app',
  host: 'localhost',
  port: 5432
});


module.exports = pool;
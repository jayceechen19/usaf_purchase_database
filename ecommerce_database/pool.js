const Pool = require('pg').Pool

const pool = new Pool({
  user: 'jessicachen',
  host: 'localhost',
  database: 'ecommerce',
  port: 5432,
})

module.exports = {pool}
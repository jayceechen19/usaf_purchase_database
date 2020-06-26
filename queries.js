const Pool = require('pg').Pool

const pool = new Pool({
  user: 'jessicachen',
  host: 'localhost',
  database: 'ecommerce',
  port: 5432,
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error){
            throw error
        }
        res.send(results.rows)
    })
}

module.exports = {getUsers}
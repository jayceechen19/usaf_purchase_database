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

const putUser = (req, res) =>{
    var id = req.params.id
    var updatebody = req.body

    if (updatebody.fname){
        pool.query(`UPDATE users SET fname = $1 WHERE id = $2`, [updatebody.fname, id], (error, results) =>{
            if(error){
                throw error
            }
        })
    }
    if (updatebody.lname){
        pool.query(`UPDATE users SET lname = $1 WHERE id = $2`, [updatebody.lname, id], (error, results) =>{
            if(error){
                throw error
            }
        })
    }
    if (updatebody.email){
        pool.query(`UPDATE users SET email = $1 WHERE id = $2`, [updatebody.email, id], (error, results) =>{
            if(error){
                throw error
            }
            
        })
    }
    res.send(`Updated information for user ${id}`)
    
}

const postUser = (req,res) =>{
    const newbody = req.body
    if (newbody.fname && newbody.lname && newbody.email){
        pool.query('INSERT INTO users (fname, lname, email) VALUES ($1, $2, $3)', [newbody.fname, newbody.lname, newbody.email], (error, results) => {
            if (error) {
                throw error
            }
            res.send("New User Added!")
            res.status(200)
        })
    }else{
        res.send(`All information not supplied. User not added.`)
        res.status(500)
    }
}



module.exports = {getUsers, putUser, postUser}
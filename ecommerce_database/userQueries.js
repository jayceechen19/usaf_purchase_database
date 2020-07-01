const poolFile = require('./pool.js')
const pool = poolFile.pool

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
    })
}

const getUser = (req, res) =>{
    var id = req.params.id
    
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) =>{
        if(error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
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

const deleteUser = (req,res) => {
    const id = req.params.id

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        // res.send("User " + id + " deleted!")
        res.status(200).send("User " + id + " deleted!")
    })
}

module.exports = {
    getUsers, 
    getUser, 
    putUser, 
    postUser, 
    deleteUser
}
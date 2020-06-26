const poolFile = require('./pool.js')
const pool = poolFile.pool

const getItems = (req, res) => {
    pool.query('SELECT * FROM item', (error, results) => {
        if(error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
    })
}

const getItem = (req, res) =>{
    var id = req.params.id
    
    pool.query(`SELECT * FROM item WHERE id = $1`, [id], (error, results) =>{
        if(error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
    })
}

const putItem = (req, res) =>{
    var id = req.params.id
    var updatebody = req.body

    if (updatebody.name){
        pool.query(`UPDATE item SET fname = $1 WHERE id = $2`, [updatebody.name, id], (error, results) =>{
            if(error){
                throw error
            }
        })
    }
    if (updatebody.description){
        pool.query(`UPDATE item SET description = $1 WHERE id = $2`, [updatebody.description, id], (error, results) =>{
            if(error){
                throw error
            }
        })
    }
    res.send(`Updated information for item ${id}`)
    
}

const postItem = (req,res) =>{
    const newbody = req.body
    if (newbody.name && newbody.description){
        pool.query('INSERT INTO item (name, description) VALUES ($1, $2)', [newbody.name, newbody.description], (error, results) => {
            if (error) {
                throw error
            }
            res.send("New Item Added!")
            res.status(200)
        })
    }else{
        res.send(`All information not supplied. Item not added.`)
        res.status(500)
    }
}

const deleteItem = (req,res) => {
    const id = req.params.id

    pool.query('DELETE FROM item WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        // res.send("User " + id + " deleted!")
        res.status(200).send("Item " + id + " deleted!")
    })
}

module.exports = {
    getItems, 
    getItem, 
    putItem, 
    postItem, 
    deleteItem
}
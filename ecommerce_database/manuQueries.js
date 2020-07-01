const poolFile = require('./pool.js')
const pool = poolFile.pool

const getManus = (req, res) => {
    pool.query('SELECT * FROM manufacturers', (error, results) => {
        if(error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
    })
}

const getManu = (req, res) =>{
    var id = req.params.id
    
    pool.query(`SELECT * FROM manufacturers WHERE id = $1`, [id], (error, results) =>{
        if(error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
    })
}

const putManu = (req, res) =>{
    var id = req.params.id
    var updatebody = req.body

    if (updatebody.company_name){
        pool.query(`UPDATE manufacturers SET company_name = $1 WHERE id = $2`, [updatebody.company_name, id], (error, results) =>{
            if(error){
                throw error
            }
        })
    }
    if (updatebody.contact_name){
        pool.query(`UPDATE manufacturers SET contact_name = $1 WHERE id = $2`, [updatebody.contact_name, id], (error, results) =>{
            if(error){
                throw error
            }
        })
    }
    if (updatebody.contact_email){
        pool.query(`UPDATE manufacturers SET contact_email = $1 WHERE id = $2`, [updatebody.contact_email, id], (error, results) =>{
            if(error){
                throw error
            }
            
        })
    }
    if (updatebody.contact_phone_number){
        pool.query(`UPDATE manufacturers SET contact_phone_number = $1 WHERE id = $2`, [updatebody.contact_phone_number, id], (error, results) =>{
            if(error){
                throw error
            }
            
        })
    }
    res.send(`Updated information for manufacturer ${id}`)
    
}

const postManu = (req,res) =>{
    const newbody = req.body
    if (newbody.company_name && newbody.contact_name && newbody.contact_email && newbody.contact_phone_number){
        pool.query('INSERT INTO manufacturers (company_name, contact_name, contact_email, contact_phone_number) VALUES ($1, $2, $3, $4)', 
                    [newbody.company_name, newbody.contact_name, newbody.contact_email, newbody.contact_phone_number], 
                    (error, results) => {
                            if (error) {
                                throw error
                            }
                res.status(200).send("New Manufacturer Added!")
        })
    }else{
        res.status(500).send(`All information not supplied. Manufacturer not added.`)
    }
}

const deleteManu = (req,res) => {
    const id = req.params.id

    pool.query('DELETE FROM manufacturers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send("Manufacturer " + id + " deleted!")
    })
}

module.exports = {
    getManus, 
    getManu, 
    putManu, 
    postManu, 
    deleteManu
}
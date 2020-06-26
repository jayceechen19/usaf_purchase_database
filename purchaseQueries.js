const poolFile = require('./pool.js')
const pool = poolFile.pool

const getPurchases = (req, res) =>{
    pool.query('SELECT * FROM purchases', (error, results) => {
        if(error){
            throw error
        }else{
            res.send(results.rows)
            res.status(200)
        }
    })
}
const getPurchase = (req, res) =>{
    const id = req.params.id
    if(id){
        pool.query('SELECT * FROM purchases WHERE id = $1', [id], (error, response) =>{
            if(error){
                throw error
            }else{
                res.send(response.rows)
            }
        })
    }else{
        res.send("No id supplied")
    }

}
const putPurchase = (req, res) =>{
    var id = req.params.id
    var status = undefined

    const bodyinput = req.body
    //users_id => id => users(id)
    if(bodyinput.qty){
        pool.query(`UPDATE purchases SET qty = $1 WHERE id = $2`, [bodyinput.qty, id], (error, results) =>{
            if(error){
                throw error
            }
            status = results
        })
    }
    if(bodyinput.date_ordered){
        pool.query(`UPDATE purchases SET date_ordered = $1 WHERE id = $2`, [bodyinput.date_ordered, id], (error, results) =>{
            if(error){
                throw error
            }
            status = results

        })
    }
    if(bodyinput.date_received){
        pool.query(`UPDATE purchases SET date_received = $1 WHERE id = $2`, [bodyinput.date_received, id], (error, results) =>{
            if(error){
                throw error
            }
            status = results
        })
    }
    if(bodyinput.users_id){
        pool.query('UPDATE purchases SET users_id = (SELECT id FROM users WHERE id = $1) WHERE id = $2', [bodyinput.users_id, id], (error, results) =>{
            if (error){
                status = results
            }
            status = results
        })
    }
    if(bodyinput.manufacturers_id){
        pool.query('UPDATE purchases SET manufacturers_id = (SELECT id FROM manufacturers WHERE id = $1) WHERE id = $2', [bodyinput.manufacturers_id, id], (error, results) =>{
            if (error){
                status = results
            }
            status = results
        })
    }
    if(!status){
        res.status(500).send("Invalid manufacturers/users id.")
    }else{
        res.status(200).send("Field(s) updated!")
    }
}
const postPurchase = (req, res) =>{
    const newbody = req.body
    if (newbody.qty && newbody.date_ordered && newbody.date_received && newbody.manufacturers_id && newbody.users_id){
        pool.query('INSERT INTO purchases (qty, date_ordered, date_received, manufacturers_id, users_id) VALUES ($1, $2, $3, (SELECT id FROM manufacturers WHERE id = $4), (SELECT id FROM users WHERE id = $5))',
        [newbody.qty, newbody.date_ordered, newbody.date_received, newbody.manufacturers_id, newbody.users_id], 
        (error, results) => {
            if (error) {
                res.status(500).send("FOREIGN KEYS DON'T EXIST")
            }
            res.send("New Purchase Added!")
            res.status(200)
        })
    }else{
        res.send(`All information not supplied. Purchase not added.`)
        res.status(500)
    }
}
const deletePurchase = (req, res) =>{
    const id = req.params.id

    pool.query('DELETE FROM purchases WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send("Purchase " + id + " deleted!")
    })
}

module.exports = {getPurchase, getPurchases, putPurchase, postPurchase, deletePurchase}
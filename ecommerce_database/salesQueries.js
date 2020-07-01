const poolFile = require('./pool.js')
const pool = poolFile.pool

const getSales = (req, res) =>{
    pool.query('SELECT * FROM sales', (error, results) => {
        if(error){
            throw error
        }else{
            res.send(results.rows)
            res.status(200)
        }
    })
}
const getSale = (req, res) =>{
    const id = req.params.id
    if(id){
        pool.query('SELECT * FROM sales WHERE id = $1', [id], (error, response) =>{
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
const putSale= (req, res) =>{
    var id = req.params.id
    var status = undefined

    const bodyinput = req.body
    //users_id => id => users(id)
    if(bodyinput.qty){
        pool.query(`UPDATE sales SET qty = $1 WHERE id = $2`, [bodyinput.qty, id], (error, results) =>{
            if(error){
                throw error
            }
            status = results
        })
    }
    if(bodyinput.date_ordered){
        pool.query(`UPDATE sales SET date_ordered = $1 WHERE id = $2`, [bodyinput.date_ordered, id], (error, results) =>{
            if(error){
                throw error
            }
            status = results

        })
    }
    if(bodyinput.date_received){
        pool.query(`UPDATE sales SET date_received = $1 WHERE id = $2`, [bodyinput.date_received, id], (error, results) =>{
            if(error){
                throw error
            }
            status = results
        })
    }
    if(bodyinput.users_id){
        pool.query('UPDATE sales SET users_id = (SELECT id FROM users WHERE id = $1) WHERE id = $2', [bodyinput.users_id, id], (error, results) =>{
            if (error){
                status = results
            }
            status = results
        })
    }
    if(bodyinput.customers_id){
        pool.query('UPDATE sales SET customers_id = (SELECT id FROM customers WHERE id = $1) WHERE id = $2', [bodyinput.customers_id, id], (error, results) =>{
            if (error){
                status = results
            }
            status = results
        })
    }
    if(!status){
        res.status(500).send("Invalid customers/users id.")
    }else{
        res.status(200).send("Field(s) updated!")
    }
}
const postSale = (req, res) =>{
    const newbody = req.body
    const items = req.body.items
    if (newbody.qty && newbody.date_ordered && newbody.date_received && newbody.customers_id && newbody.users_id){
        pool.query('INSERT INTO sales (qty, date_ordered, date_received, customers_id, users_id) VALUES ($1, $2, $3, (SELECT id FROM customers WHERE id = $4), (SELECT id FROM users WHERE id = $5))',
        [newbody.qty, newbody.date_ordered, newbody.date_received, newbody.customers_id, newbody.users_id], 
        (error, results) => {
            if (error) {
                res.status(500).send("FOREIGN KEYS DON'T EXIST")
            }else{
                for (var x=0; x<items.length; x++){
                    pool.query('INSERT INTO sales_has_item (sales_id, item_id) VALUES ((SELECT last_value FROM sales_id_seq), $1)', [items[x]], () =>{
        
                    })
                }
                res.send("New Sale Added!")
                res.status(200)
            }
        })
    }else{
        res.send(`All information not supplied. Sale not added.`)
        res.status(500)
    }
}
const deleteSale = (req, res) =>{
    const id = req.params.id

    pool.query('DELETE FROM sales WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send("Sale " + id + " deleted!")
    })
}

module.exports = {getSale, getSales, putSale, postSale, deleteSale}
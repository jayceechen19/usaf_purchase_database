const poolFile = require('./pool.js')
const pool = poolFile.pool

const getCustomers = (req, res) =>{
    pool.query('SELECT * FROM customers', (error, results) =>{
        if (error){
            throw error
        }
        res.send(results.rows)
        res.status(200)
    })
}

const postCustomer = (req, res) => {
    var body = req.body
    if (body.company_name && body.contact_name && body.contact_email && body.contact_phone){

        pool.query('INSERT INTO customers (company_name, contact_name, contact_email, contact_phone) VALUES ($1,$2,$3,$4)',
        [body.company_name, body.contact_name, body.contact_email, body.contact_phone], (error, results) =>{
            if(error){
                throw error
            }
            res.send("Customer added!")
            res.status(200)
        })
    }else{
        res.send('Information missing. Customer not added.')
    }
    
}
const getCustomer = (req, res) => {
    var id = req.params.id
    if (id){
        pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, response) =>{
            if (error){
                throw error
            }
            res.send(response.rows)
            res.status(200)
        })
    }else{
        res.send("No ID inputted")
    }
}

const putCustomer = (req, res) =>{
    var id = req.params.id
    var body = req.body
    if(!id){
       res.send('No ID entered')
    }
    if (body.company_name){
        pool.query('UPDATE customers SET company_name = $1 WHERE id= $2', [body.company_name, id], (error, response)=>{
            if(error){
                throw error
            }
        })
    }
    if (body.contact_name){
        pool.query('UPDATE customers SET contact_name = $1 WHERE id= $2', [body.contact_name, id], (error, response)=>{
            if(error){
                throw error
            }
        })
    }
    if (body.contact_email){
        pool.query('UPDATE customers SET contact_email = $1 WHERE id= $2', [body.contact_email, id], (error, response)=>{
            if(error){
                throw error
            }
        })
    }
    if (body.contact_phone){
        pool.query('UPDATE customers SET contact_email = $1 WHERE id= $2', [body.contact_phone, id], (error, response)=>{
            if(error){
                throw error
            }
        })
    }
    res.send(`User ${id} updated!`)
}

const deleteCustomer = (req, res) =>{
    var id = req.params.id
    if(id){
        pool.query('DELETE FROM customers WHERE id = $1', [id], (error, response) => {
            if(error){
                throw error
            }
            res.send(`Deleted user ${id}!`)
        })

    }else{
        res.send('No id inputted')
    }
}
module.exports = {getCustomers, postCustomer, getCustomer, putCustomer, deleteCustomer}
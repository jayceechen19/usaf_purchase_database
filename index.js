const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const dbUser = require('./userQueries')
const dbManu = require('./manuQueries')
const dbCustomer = require('./customerQueries')
const dbItems = require('./itemQueries')
const dbPurchase = require('./purchaseQueries')
const dbSales = require('./salesQueries')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

//User Queries
app.get('/users', dbUser.getUsers)
app.get('/getUser/:id', dbUser.getUser)
app.put('/users/:id', dbUser.putUser)
app.post('/createuser', dbUser.postUser)
app.delete('/deleteuser/:id', dbUser.deleteUser)

//Manufacturer Queries
app.get('/manus', dbManu.getManus)
app.get('/manu/:id', dbManu.getManu)
app.put('/manu/:id', dbManu.putManu)
app.post('/createmanu', dbManu.postManu)
app.delete('/deletemanu/:id', dbManu.deleteManu)

// Customers Queries
app.get('/customers', dbCustomer.getCustomers)
app.get('/getCustomer/:id', dbCustomer.getCustomer)
app.put('/customer/:id', dbCustomer.putCustomer)
app.post('/createcustomer', dbCustomer.postCustomer)
app.delete('/deletecustomer/:id', dbCustomer.deleteCustomer)

//Items Queries
app.get('/items', dbItems.getItems)
app.get('/item/:id', dbItems.getItem)
app.put('/item/:id', dbItems.putItem)
app.post('/createitem', dbItems.postItem)
app.delete('/deleteitem/:id', dbItems.deleteItem)

//Purchase Order Queries
app.get('/purchases', dbPurchase.getPurchases)
app.get('/purchase/:id', dbPurchase.getPurchase)
app.put('/purchase/:id', dbPurchase.putPurchase)
app.post('/createpurchase', dbPurchase.postPurchase)
app.delete('/deletepurchase/:id', dbPurchase.deletePurchase)


//Sales Order Queries
app.get('/sales', dbSales.getSales)
app.get('/sale/:id', dbSales.getSale)
app.put('/sale/:id', dbSales.putSale)
app.post('/createsale', dbSales.postSale)
app.delete('/deletesale/:id', dbSales.deleteSale)
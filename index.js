const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/users', db.getUsers)
app.get('/getUser/:id', db.getUser)
app.put('/users/:id', db.putUser)
app.post('/createuser', db.postUser)
app.delete('/deleteuser/:id', db.deleteUser)


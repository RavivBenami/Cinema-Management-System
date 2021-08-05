var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var userController = require('./controller/userController')
var allUserController = require('./controller/allUsersController')
var subscriptionController = require('./controller/subscriptionController')

var app = express()


require("./configs/database")
require('./models/allBL')

app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())
app.use('/dbUser',userController)
app.use('/fullUser',allUserController)
app.use('/subscriptions',subscriptionController)


app.listen(8080,async()=>{
    console.log("The server is up");
})
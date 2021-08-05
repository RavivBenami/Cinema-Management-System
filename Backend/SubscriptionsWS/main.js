var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var memberController = require('./controllers/memberController')
var moviesController = require('./controllers/moviesController')
var subscriptionController = require('./controllers/subscriptionController')
var membersBL = require('./models/member/MembersBL')
var moviesBL = require('./models/movies/MoviesBL')
var app = express()
var fetch = require('node-fetch')


require("./configs/database")

app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())
app.use('/members',memberController)
app.use('/movies',moviesController)
app.use('/subscriptions',subscriptionController)


app.listen(8000,async()=>{
    console.log("The server is up");
})
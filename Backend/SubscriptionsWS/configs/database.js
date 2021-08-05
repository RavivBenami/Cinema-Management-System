var membersBL = require('../models/member/MembersBL')
var fetch = require('node-fetch')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/subscriptionDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const addDataToDB = async()=>{

let members = await fetch('http://localhost:8000/members')
let membersData = await members.json();

if(membersData.length == 0 ){
membersBL.putMembersFromApiToDB()
}

let movies = await fetch('http://localhost:8000/movies')
let moviesData = await movies.json();

if(moviesData.length == 0){
moviesBL.putMoviesFromApiToDB()
}
}

addDataToDB()
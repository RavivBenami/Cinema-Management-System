var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var MoviesSchema = new appSchema({
    name : String,
    genres : Array,
    image : String,
    premiered : Date

},{versionKey:false})

module.exports = mongoose.model('movies', MoviesSchema)
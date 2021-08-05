var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var MemberSchema = new appSchema({
    name : String,
    email : String,
    city : String

},{versionKey:false})

module.exports = mongoose.model('members', MemberSchema)
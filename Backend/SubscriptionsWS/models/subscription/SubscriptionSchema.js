var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var SubscriptionSchema = new appSchema({
    memberId : String,
    movies : [
        {
            movieId:String,
            date:String
        }
    ]
},{versionKey:false})

module.exports = mongoose.model('subscription', SubscriptionSchema)

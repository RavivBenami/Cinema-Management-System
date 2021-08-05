let axios = require('axios')
let Subscription = require('./SubscriptionSchema')
const fetch = require('node-fetch')


var getAllSubscription = ()=> {

    return new Promise((resolve, reject)=>{
        Subscription.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

var getSubscriptionById = (subscriptionID)=> {
    return new Promise((resolve, reject)=>{
        Subscription.findById(SubscriptionID,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



var addSubscription = (newSubscription)=> {
    return new Promise((resolve,reject)=> {

        var subscription = new Subscription({
            memberId : newSubscription.memberId,
            movies: newSubscription.movies    
        })
        subscription.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(subscription)
            }
        })
    })
}


var updateSubscription = (subscriptionId, updatedData) => {
    return new Promise((resolve, reject)=>{
        Subscription.findByIdAndUpdate(subscriptionId,{
        
            memberId : updatedData.memberId,
            movies: updatedData.movies
            
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("movie was updated!")
            }
        })

    })
}

var deleteSubscription = (subscriptionId)=> {
    return new Promise((resolve,reject)=>{
        Subscription.findByIdAndDelete(subscriptionId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Movie deleted!!!")
            }
        })
    })
}

module.exports = {getAllSubscription,getSubscriptionById,addSubscription,updateSubscription,deleteSubscription}
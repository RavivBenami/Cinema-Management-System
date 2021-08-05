var express = require('express')
var appRouter = express.Router()
var subscriptionBL = require('../models/subscription/SubscriptionBL')

appRouter.route('/').get(async(req,resp)=>{
    var subscriptions = await subscriptionBL.getAllSubscription()
    return resp.json(subscriptions)
})


appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id
    var subscription = await subscriptionBL.getSubscriptionById(id)
    return resp.json(subscription)
})

appRouter.route('/').post(async(req,resp)=>{
    var subscriptionObj = req.body;
    var subscription = await subscriptionBL.addSubscription(subscriptionObj)
    return resp.json(subscription)

})

appRouter.route('/:id').put(async(req, resp)=>{
    var id = req.params.id
    var subscriptionObj = req.body
    var result = await subscriptionBL.updateSubscription(id,subscriptionObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id
    var result = await subscriptionBL.deleteSubscription(id)
    return resp.json(result)
})



module.exports = appRouter

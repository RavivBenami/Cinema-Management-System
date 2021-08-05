var express = require('express')
var appRouter = express.Router()
var userBL = require('../models/userBL')
var axios = require('axios')
const checkAuth = require('../../checkAuth')

const moviesUrl = 'http://localhost:8000/movies'
const membersUrl = 'http://localhost:8000/members'
const subscriptionsUrl = 'http://localhost:8000/subscriptions'

appRouter.route('/movies').get(checkAuth ,async(req,resp,next)=>{
    let movies = await axios.get(moviesUrl)
    return resp.json(movies.data);
})
appRouter.route('/members').get(checkAuth ,async(req,resp,next)=>{
    let members = await axios.get(membersUrl)
    return resp.json(members.data)
})
appRouter.route('/subscriptions').get(checkAuth ,async(req,resp,next)=>{
    let subscriptions = await axios.get(subscriptionsUrl)
    return resp.json(subscriptions.data)
})
appRouter.route('/movies/:id').get(checkAuth ,async(req,resp,next)=>{
    var id = req.params.id
    var movie = await axios.get(`${moviesUrl}/${id}`)
    return resp.json(movie.data)
})
appRouter.route('/members/:id').get(checkAuth ,async(req,resp,next)=>{
    var id = req.params.id
    var member = await axios.get(`${membersUrl}/${id}`)
    return resp.json(member.data)
})
appRouter.route('/subscription/:id').get(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var subscription = await axios.get(`${subscriptionsUrl}/${id}`)
    return resp.json(subscription.data)
})
appRouter.route('/movies').post(checkAuth,async(req,resp,next)=>{
    var userObj = req.body;
    var user = await axios.post(moviesUrl,userObj)
    return resp.json(userObj.data)
})
appRouter.route('/members').post(checkAuth,async(req,resp,next)=>{
    var userObj = req.body;
    var user = await axios.post(membersUrl,userObj)
    return resp.json(userObj)
})
appRouter.route('/subscriptions').post(checkAuth,async(req,resp,next)=>{
    var userObj = req.body;
    var user = await axios.post(subscriptionsUrl,userObj)
    return resp.json(userObj)
})
appRouter.route('/movies/:id').put(checkAuth,async(req, resp,next)=>{
    var id = req.params.id
    var userObj = req.body
    var result = await axios.put(`${moviesUrl}/${id}`,userObj)
    return resp.json(result.data)
})
appRouter.route('/members/:id').put(checkAuth,async(req, resp,next)=>{
    var id = req.params.id
    var userObj = req.body
    var result = await axios.put(`${membersUrl}/${id}`,userObj)
    return resp.json(result.data)
})
appRouter.route('/subscriptions/:id').put(checkAuth,async(req, resp,next)=>{
    var id = req.params.id
    var userObj = req.body
    var result = await axios.put(`${subscriptionsUrl}/${id}`,userObj)
    return resp.json(result.data)
})

appRouter.route('/movies/:id').delete(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var result = await axios.delete(`${moviesUrl}/${id}`)
    return resp.json(result.data)
})
appRouter.route('/members/:id').delete(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var result = await axios.delete(`${membersUrl}/${id}`)
    return resp.json(result.data)
})
appRouter.route('/subscriptions/:id').delete(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var result = await axios.delete(`${subscriptionsUrl}/${id}`)
    return resp.json(result.data)
})

module.exports = appRouter

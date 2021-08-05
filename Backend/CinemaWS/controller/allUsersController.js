const allBL = require('../models/allBL')
const express = require('express')
const appRouter = express.Router()
const checkAuth = require('../../checkAuth')


appRouter.route('/').get(checkAuth,async(req,resp,next)=>{
    var users = await allBL.getAllUsers()
    return resp.json(users)
})


appRouter.route('/:id').get(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var user = await allBL.getUserById(id)
    return resp.json(user)
})

appRouter.route('/').post(checkAuth,async(req,resp,next)=>{
    var userObj = req.body;
    var user = await allBL.addUser(userObj)
    return resp.json(user)
})

appRouter.route('/:id').put(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var userObj = req.body
    var result = await allBL.editUser(id,userObj)
    return resp.json(result)
})

appRouter.route('/:id').delete(checkAuth,async(req,resp,next)=>{
    var id = req.params.id
    var result = await allBL.deleteUser(id)
    return resp.json(result)
})


module.exports = appRouter

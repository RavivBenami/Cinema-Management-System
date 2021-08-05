var express = require('express')
var appRouter = express.Router()
var membersBL = require('../models/member/MembersBL')



appRouter.route('/').get(async(req,resp)=>{
    var members = await membersBL.getAllMembers()
    return resp.json(members)
})


appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id
    var member = await membersBL.getMemberById(id)
    return resp.json(member)
})

appRouter.route('/').post(async(req,resp)=>{
    var memberObj = req.body;
    var member = await membersBL.addMember(memberObj)
    return resp.json(member)

})

appRouter.route('/:id').put(async(req, resp)=>{
    var id = req.params.id
    var memberObj = req.body
    var result = await membersBL.updateMember(id,memberObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id
    var result = await membersBL.deleteMember(id)
    return resp.json(result)
})



module.exports = appRouter

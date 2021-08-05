let axios = require('axios')
let Member = require('./MemberSchema')
const fetch = require('node-fetch')

var getAllMembers = ()=> {

    return new Promise((resolve, reject)=>{
        Member.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

var getMemberById = (memberId)=> {
    return new Promise((resolve, reject)=>{
        Member.findById(memberId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



var addMember = (newMember)=> {
    return new Promise((resolve,reject)=> {

        var member = new Member({
            name : newMember.name,
            email : newMember.email,
            city : newMember.city
        })
        member.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(member)
            }
        })
    })
}


var updateMember = (memberId, updatedData) => {
    return new Promise((resolve, reject)=>{
        Member.findByIdAndUpdate(memberId,{
            name : updatedData.name,
            email : updatedData.email,
            city : updatedData.city
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("member was updated!")
            }
        })

    })
}

var deleteMember = (memberId)=> {
    return new Promise((resolve,reject)=>{
        Member.findByIdAndDelete(memberId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Member deleted!!!")
            }
        })
    })
}

var putMembersFromApiToDB = async()=>{
       let resp = await fetch('https://jsonplaceholder.typicode.com/users')
       let memberArr = await resp.json()

       memberArr.forEach(member => {

           let newMember = {
               name:member.name,
               email:member.email,
               city:member.address.city
           }
           addMember(newMember)
       })
}

module.exports = {getAllMembers,getMemberById,addMember,updateMember,deleteMember,putMembersFromApiToDB}
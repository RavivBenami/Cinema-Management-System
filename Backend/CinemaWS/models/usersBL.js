const jfile = require('jsonfile')
const path = '/Users/ravivbenami/Desktop/Full Stack Web/FinalProject1/Server/CinemaWS/json/users.json'

const getAllUsers = ()=>{

    return new Promise((resolve,reject)=>{

        jfile.readFile(path,(err, data)=>{
            if(err){
                reject(err)
            } 
            else {
                resolve(data)
            }
        })
    })
}

const getUserById = (id)=>{

    return new Promise((resolve,reject)=>{
        jfile.readFile(path,(err,data)=>{

           if(err){
               reject(err)
           }
           else{
            let user = data.find(item => item.id==id)
               resolve(user)
           }
        })
    })
}
const addUser = (user) => {

    return new Promise((resolve, reject)=>{

        jfile.readFile(path,(err,data)=>{
            if(err){
                reject(err)
            }else {
                data.push(user)
                jfile.writeFile(path,data,(err)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(data)
                    }
                })
            }
        })
    }) 
}
const updateUser = (id,user)=>{
 
    return new Promise((resolve,reject)=>{
        jfile.readFile(path,(err,data)=>{
           if(err){
               reject(err)
           }
           else{
            let index = data.findIndex(item => item.id==id)
            data[index] = user
            jfile.writeFile(path,data,(err)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
           }
        })
    })
}
const deleteUser = (id)=>{
 
    return new Promise((resolve,reject)=>{
        jfile.readFile(path,(err,data)=>{
           if(err){
               reject(err)
           }
           else{
            let index = data.findIndex(item => item.id==id)
            data.splice(index,1)
            jfile.writeFile(path,data,(err)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
           }
        })
    })
}

module.exports = {getAllUsers,getUserById,addUser,updateUser,deleteUser}
const jfile = require('jsonfile')
const path = '/Users/ravivbenami/Desktop/FullStack/FinalProject-Cinema/Backend/CinemaWS/json/permissions.json'

const getAllPermissions = ()=>{

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

const getPermissionById = (id)=>{

    return new Promise((resolve,reject)=>{
        jfile.readFile(path,(err,data)=>{

           if(err){
               reject(err)
           }
           else{
            let permission = data.find(item => item.id==id)
               resolve(permission)
           }
        })
    })
}
const addPermission = (permission) => {

    return new Promise((resolve, reject)=>{

        jfile.readFile(path,(err,data)=>{
            if(err){
                reject(err)
            }else {
                data.push(permission)
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
    } ) 
}
const updatePermission = (id,permission)=>{
 
    return new Promise((resolve,reject)=>{
        jfile.readFile(path,(err,data)=>{
           if(err){
               reject(err)
           }
           else{
            let index = data.findIndex(item => item.id==id)
            data[index].permissions = permission
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
const deletePermission = (id)=>{
 
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

module.exports = {getAllPermissions,getPermissionById,addPermission,updatePermission,deletePermission}
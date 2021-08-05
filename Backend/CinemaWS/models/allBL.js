const userBL = require("./userBL");
const usersBL = require("./usersBL");
const permissionBL = require("./permissionsBL");
const jFile = require("jsonfile");

const getAllUsers = async () => {
  let users = await userBL.getAllUsers();
  let jsonUsers = await usersBL.getAllUsers();
  let permissions = await permissionBL.getAllPermissions();

  let allUsersArr = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].username !== "admin") {
      if (users[i]._id == jsonUsers[i].id && jsonUsers[i].id == permissions[i].id) {
        let userObj = {
          id: users[i]._id,
          username: users[i].username,
          firstname: jsonUsers[i].firstname,
          lastname: jsonUsers[i].lastname,
          sessionTimeOut: jsonUsers[i].sessionTimeOut,
          createdDate: jsonUsers[i].createdDate,
          permissions: permissions[i].permissions,
        };
        allUsersArr.push(userObj);
      }
    }
  }
  return allUsersArr;
};

const getUserById = async (id) => {
  let users = await getAllUsers();
  let user = users.find((item) => item.id == id);
  return user;
};

const addUser = async (newUser) => {
  let result = await userBL.addUser(newUser);
  let userId = result._id;

  let userObj = {
    id: userId,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    createdDate: newUser.createdDate,
    sessionTimeOut: newUser.sessionTimeOut,
  };
  await usersBL.addUser(userObj);

  let permissionObj = {
    id: userId,
    permissions: newUser.permissions,
  };
  await permissionBL.addPermission(permissionObj);

  fullObj = {
    id: userId,
    username: newUser.username,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    createdDate: newUser.createdDate,
    sessionTimeOut: newUser.sessionTimeOut,
    permissions: newUser.permissions,
  };
  return fullObj;
};

const editUser = async (id, updatedUser) => {

  console.log(updatedUser.password);

  if(updatedUser.password == null){
    await userBL.updateUserWithoutPw(id, updatedUser);
  }
  else{
    await userBL.updateUserWithPw(id, updatedUser);
  }

  


  let userObj = {
    id:id ,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    createdDate: updatedUser.createdDate,
    sessionTimeOut: updatedUser.sessionTimeOut,
  };
  await usersBL.updateUser(id, userObj);

  await permissionBL.updatePermission(id, updatedUser.permissions);

  fullObj = {
    id: id,
    username: updatedUser.username,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    createdDate: updatedUser.createdDate,
    sessionTimeOut: updatedUser.sessionTimeOut,
    permissions: updatedUser.permissions,
  };
  return fullObj;
};

const deleteUser = async (id) => {
  userBL.deleteUser(id);
  permissionBL.deletePermission(id);
  usersBL.deleteUser(id);
  return "user deleted";
};

module.exports = { getAllUsers, getUserById, editUser, deleteUser, addUser };

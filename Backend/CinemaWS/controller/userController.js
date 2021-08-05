var express = require("express");
var appRouter = express.Router();
const jwt = require("jsonwebtoken");
var userBL = require("../models/userBL");
const bcrypt = require("bcrypt");
const axios = require("axios");

appRouter.route("/").get(async (req, resp) => {
  var users = await userBL.getAllUsers();
  return resp.json(users);
});

appRouter.route("/login").post(async (req, resp) => {
  let usersResp = await axios.get("http://localhost:8080/dbUser");
  let users = usersResp.data;
  let user = users.find((item) => item.username == req.body.username);
  if (user == null) {
    return resp.json("no user in sys");
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        let token = jwt.sign({ user }, "secret_key");
        return resp.json({
          token: token,
          data: `success ${user._id}`,
        });
      } else {
        return resp.json("fail");
      }
    } catch {
      return resp.json("catch");
    }
  }
});
appRouter.route("/:id").get(async (req, resp) => {
  var id = req.params.id;
  var user = await userBL.getUserById(id);
  return resp.json(user);
});

appRouter.route("/").post(async (req, resp) => {
  var userObj = req.body;
  var response = await userBL.addUser(userObj);
  return resp.json(response);
});

appRouter.route("/:id").put(async (req, resp) => {
  var id = req.params.id;
  var userObj = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userObj.password, salt);
    let user = { username: userObj.username, password: hashedPassword };
    var result = await userBL.updateUserWithPw(id, user);
    return resp.json(result);
  } catch {
    return resp.json("error with update user");
  }
});

appRouter.route("/:id").delete(async (req, resp) => {
  var id = req.params.id;
  var result = await userBL.deleteUser(id);
  return resp.json(result);
});


module.exports = appRouter;

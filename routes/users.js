const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");


const userModel = require("../models/users");
const userController = require("../controllers/users");

const auth_check = passport.authenticate("jwt", {session : false});

// @route   POST    http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", userController.user_register);


// @route   POST    http://localhost:1234/users/login
// @desc    login user
// @access  public
router.post("/login", userController.user_login);





// @route   DELETE    http://localhost:1234/:user_id
// @desc    delete userInfo
// @access  private
router.delete("/:user_id", auth_check, userController.user_delete);




// @route   GET    http://localhost:1234/users
// @desc    get userInfo
// @access  private
router.get("/", auth_check, userController.user_get);




module.exports = router;
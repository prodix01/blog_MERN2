const express = require("express");
const router = express.Router();
const passport = require("passport");

const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const auth_check = passport.authenticate("jwt", {sassion : false});



//프로필 등록하기
// @route   POST    http://localhost:1234/users/
// @desc    post profile
// @access  private
router.post("/", auth_check, (req, res) => {

});





//프로필 불러오기
// @route   GET    http://localhost:1234/users/
// @desc    get profile
// @access  private
router.get("/", auth_check, (req, res) => {

});



//프로필 삭제하기
// @route   remove    http://localhost:1234/users/:user_id
// @desc    delete profile
// @access  private
router.remove("/", auth_check, (req, res) => {

});




module.exports = router;
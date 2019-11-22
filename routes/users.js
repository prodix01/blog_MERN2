const express = require("express");
const router = express.Router();

// @route   POST    http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) =>{

});





// @route   POST    http://localhost:1234/users/login
// @desc    login user
// @access  public
router.post("/login", (req, res) => {

});





// @route   DELETE    http://localhost:1234/register
// @desc    delete userInfo
// @access  private
router.delete("/:user_id", (req, res) => {

});




// @route   GET    http://localhost:1234/users
// @desc    get userInfo
// @access  private
router.get("/", (req, res) => {

});




module.exports = router;
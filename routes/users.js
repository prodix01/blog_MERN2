const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");


const userModel = require("../models/users");

// @route   POST    http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) =>{

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({
                    msg : "이메일이 이미 있습니다."
                });
            }
            const avatar = gravatar.url(req.body.email, {
                s : 200,     //size
                r : "pg",    //rating
                d : "mm",   //default
            });
            const newUser = new userModel({
                name : req.body.userName,
                email : req.body.email,
                avatar : avatar,
                password : req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser
                        .save()
                        .then(user => {
                            res.status(200).json({
                                msg : "회원가입에 성공했습니다.",
                                registerInfo : user
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error : err.message
                            });
                        });

                });
            });
        });

});





// @route   POST    http://localhost:1234/users/login
// @desc    login user
// @access  public
router.post("/login", (req, res) => {

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    msg : "No emailInfo"
                });
            }
            else {
                //패스워드 매칭
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({
                                msg : "패스워드 불일치"
                            });
                        }
                        else {
                            res.status(200).json({
                                msg : "로그인 성공 (토큰 변환)"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(400).json({
                            error : err.message
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
    });


});





// @route   DELETE    http://localhost:1234/:user_id
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
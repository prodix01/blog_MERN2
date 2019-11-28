const express = require("express");
const router = express.Router();
const passport = require("passport");

const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const auth_check = passport.authenticate("jwt", {session : false});



//프로필 등록하기
// @route   POST    http://localhost:1234/users/
// @desc    post profile
// @access  private
router.post("/", auth_check, (req, res) => {

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skills - spilt into array
    if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(",");
    }

    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            new profileModel(profileFields)
                .save()
                .then(profile => {
                    res.status(200).json({
                        msg : "성공적으로 프로필을 등록했습니다.",
                        profileInfo : profile
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        error : err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//프로필 불러오기
// @route   GET    http://localhost:1234/users/
// @desc    get profile
// @access  private
router.get("/", auth_check, (req, res) => {

});



//프로필 삭제하기
// @route   delete    http://localhost:1234/users/:user_id
// @desc    delete profile
// @access  private
router.delete("/", auth_check, (req, res) => {

});




module.exports = router;
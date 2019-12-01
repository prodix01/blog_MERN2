const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_check = passport.authenticate("jwt", {session : false});

const profileController = require("../controllers/profiles");



//프로필 등록하기
// @route   POST    http://localhost:1234/users/
// @desc    post profile
// @access  private
router.post("/", auth_check, profileController.post_profile);




//프로필 불러오기
// @route   GET    http://localhost:1234/users/
// @desc    get profile
// @access  private
router.get("/", auth_check, profileController.get_profile);



//프로필 삭제하기
// @route   delete    http://localhost:1234/users/:user_id
// @desc    delete profile
// @access  private
router.delete("/", auth_check, profileController.delete_profile);



//핸들 탐색
// @route GET profiles/handle/:handle
// @desc Get profile by handle
// @ public
router.get("/handle/:handle", profileController.get_handle);




module.exports = router;
const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_check = passport.authenticate("jwt", {session : false});

const profileController = require("../controllers/profiles");



const profileModel = require("../models/profiles");



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
// @access public
router.get("/handle/:handle", profileController.get_handle);




//경험프로필 등록
// @route POST profiles/experience/:exp_id
// @desc Add experience to profile
// @access private
router.post("/experience", auth_check, profileController.post_Exp);




// @route POST profiles/education
// @desc Add education to profile
// @access private
router.post("/education", auth_check, profileController.post_Edu);





// @route DELETE profiles/experience/exp_id
// @desc Delete experience from profile
// @access private
router.delete("/experience/:exp_id", auth_check, profileController.delete_Exp);





// @route DELETE profile/education/:edu_id
// @desc Delete education from profile
// @access private
router.delete("/education/:edu_id", auth_check, profileController.delete_Edu);


module.exports = router;
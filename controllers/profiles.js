const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const validateProfileInput = require("../validation/profile");




//프로필 등록하기
exports.post_profile = (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);

    //check validate
    if (!isValid) {
        return res.status(400).json(errors);
    }


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
            if (profile) {
                profileModel
                    .findOneAndUpdate(
                        {user : req.user.id},
                        {$set : profileFields},
                        {new : true}
                    )
                    .then(profile => {
                        res.status(200).json({
                            msg : "update profileInfo",
                            profileInfo : profile
                        });
                    });
            }
            else {
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
            }
        });
};






//프로필 불러오기
exports.get_profile = (req, res) => {

    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            if (!profile) {
                return res.status(400).json({
                    msg : "이 유저에는 프로필이 등록되지 않았습니다."
                });
            }
            else {
                res.status(200).json({
                    msg : "성공적으로 프로필 정보를 불러왔습니다.",
                    profileInfo : profile
                });
            }
        });

};




//프로필 삭제하기
exports.delete_profile = (req, res) => {

    profileModel
        .remove({user : req.user.id})
        .then(profile => {
            res.status(200).json({
                msg : "성공적으로 프로필 정보를 삭제했습니다."
            });
        });

};




//핸들 탐색
exports.get_handle = (req, res) =>{
    profileModel
        .findOne({handle : req.params.handle})
        .then(profile => {
            if (!profile) {
                return res.status(400).json({
                    msg : "이 유저는 프로필정보가 없습니다."
                });
            }
            else {
                res.status(200).json({
                    result : true,
                    count : profile.length,
                    profileInfo : profile
                });
            }
        });
};
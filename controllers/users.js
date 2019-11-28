const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/users");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//회원가입
exports.user_register = (req, res) =>{

    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        res.status(400).json(errors)
    }
    //이메일 중복여부 확인
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if(user) {
                errors.msg = "이미 이메일이 존재합니다.";
                return res.status(400).json(errors);
                // return res.status(400).json({
                //     msg : "이메일이 이미 있습니다."
                // });
            }

            const newUser = new userModel({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });

            newUser
                .save()
                .then(user => {
                    res.status(200).json({
                        msg : "회원가입성공",
                        userInfo : user
                    })
                })
                .catch(err => {
                    errors.msg = err.message;
                    res.status(500).json(errors);
                });

        })
        .catch(err => {
           res.status(500).json({
               error : err.message
           });
        });

};







//로그인
exports.user_login = (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        res.status(400).json(errors)
    }

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                errors.msg = "이메일 정보가 없습니다.";
                return res.status(400).json(errors);

                // return res.status(404).json({
                //     msg : "No emailInfo"
                // });
            }
            else {
                //패스워드 매칭
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.msg = "패스워드 불일치";
                            return res.status(400).json(errors);
                            // return res.status(400).json({
                            //     msg : "패스워드 불일치"
                            // });
                        }
                        else {
                            //토큰에 들어갈 유저정보
                            const payload = {
                                id : user.id,
                                name : user.name,
                                avatar : user.avatar
                            };

                            //sign token
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn : 36000 },   //만료시간
                                (err, token) => {
                                    res.status(200).json({
                                        msg : "로그인 성공 (토큰 변환)",
                                        token : "bearer " + token
                                    });
                                }
                            )
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
};






//유저삭제
exports.user_delete = (req, res) => {

};







//전체 유저 불러오기
exports.user_get = (req, res) => {
    res.status(200).json({
        id : req.user.id,
        name : req.user.name,
        avatar : req.user.avatar
    });
};
const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_check = passport.authenticate("jwt", {session : false});

const postModel = require("../models/posts");
const profileModel = require("../models/profiles");


// @route POST /posts
// @desc Create post
// @access private
router.post("/", auth_check, (req, res) => {
    const newPost = new postModel ({
        text : req.body.text,
        name : req.user.name,
        avatar : req.user.avatar,
        user : req.user.id
    });

    newPost
        .save()
        .then(post => {
            res.status(200).json({
                msg : "successful posting",
                postInfo : post
            });
        });
});



// @route GET /posts
// @desc Get post
// @access public
router.get("/", (req, res) => {
    postModel
        .find()
        .then(posts => {
            const response = {
                count : posts.length,
                posts : posts.map(post => {
                    return {
                        id : post._id,
                        name : post.name,
                        text : post.text,
                        avatar : post.avatar,
                        likes : post.likes,
                        comments : post.comments,
                        date : post.date
                    }
                })
            };

            res.status(200).json(response);

        });
});




// @route GET /posts/:post_id
// @desc Detail Get post
// @access private
router.get("/:post_id", auth_check, (req, res) => {
    postModel
        .findById(req.params.post_id)
        .then(post => {
            res.status(200).json({
                msg : "successful detail post data",
                postInfo : post
            });
        });
});




// @route POST /posts/
// @desc update post
// @access private
router.post("/", auth_check, (req, res) => {

    const postFields = {};
    postFields.user = req.user.id;
    if (req.body.text) postFields.text = req.body.text;

    postModel
        .findOne({user : req.user.id})
        .then(post => {
            postModel
                .findOneAndUpdate(
                    {user : req.user.id},
                    {$set : postFields},
                    {new : true}
                )
                .then(post => {
                    res.status(200).json({
                        msg : "update postInfo",
                        postInfo : post
                    });
                });
        });

});




// @route DELETE /posts/:post_id
// @desc Detail Delete post
// @access private
router.delete("/:post_id", auth_check, (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            postModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(400).json({
                            msg : "user not authorized"
                        });
                    }
                    post
                        .remove()
                        .then(() => {
                            res.status(200).json({
                                msg : "deleted post"
                            });
                        });
                });
        });
});



module.exports = router;
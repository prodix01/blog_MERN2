const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");


const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profiles");
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan("dev"));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", userRoutes);
app.use("/profiles", profileRoutes);
app.use("/posts", postRoutes);


//모든 에러코드 500 은 error.message 를 보냄
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            msg : error.message
        }
    });
});

module.exports = app;
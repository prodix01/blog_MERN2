const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI,{
     useNewUrlParser : true,
     useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : true
    }
    )
    .then(() => console.log("mongoDB server started..."))
    .catch(err => console.log(err.message));

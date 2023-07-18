const mongoose = require('mongoose'); 

mongoose.connect('mongodb://127.0.0.1:27017/simpleJWT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Database Connected"));
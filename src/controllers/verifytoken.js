const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
    // const token = req.headers['x-access-token'];
    // // const token = req.headers['x-access-token'];
    
    const pre_pretoken = req.headers.cookie;
    token = pre_pretoken.split('=')[1]

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provided :("
        });
    }
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();

    // const pre_pretoken = req.headers.cookie;
    // token = pre_pretoken.split('=')[1]
   
    // console.log(token);
}

module.exports = verifyToken;
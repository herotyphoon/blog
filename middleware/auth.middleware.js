const {getUser} = require('../services/auth.service.js')

function checkForAuthentication (req, res, next){
    const sessionID = req.cookies?.__sessionID;
    req.user = null;
    if (!sessionID) return next();

    req.user = getUser(sessionID);
    return next();
}

function restrictTo (roles = []){
    return function (req, res, next){
        if (!req.user) return res.redirect('/pages/login');

        if (!roles.includes(req.user.role)) return res.end('Not authorized');

        next();
    };
}


module.exports = {checkForAuthentication, restrictTo};


// middleware function to check for logged-in users
var sessionChecker = function(req, res, next) {
    console.log("req.session.admin = " + req.session.admin);
    if(req.session !== undefined){
        if(req.session.admin != undefined && req.session.admin != null){
            next();
        } else{
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};

module.exports = {"sessionChecker": sessionChecker};

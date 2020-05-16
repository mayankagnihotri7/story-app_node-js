let Register = require('../models/register');
let passport = require('passport')

exports.checkUserLogged = (req,res,next) => {
    if (req.session.userId || req.session.passport) {
        next ();
    } else {
        return res.redirect('/users/login');
    }
}

exports.userInfo = (req,res,next) => {
    if(req.session.passport){
        req.session.userId = req.session.passport.user
    }
    if (req.session.userId){
        console.log(req.session.userId);
        Register.findById(req.session.userId,'-password',(err, user) => {
            console.log(user, 'auth');
            if (err) return next (err);
            req.userId = user;
            res.locals.user = user;
            next();
        })
    } else {
        req.user = null;
        res.locals.user = null;
    }
}
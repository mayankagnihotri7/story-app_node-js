let Register = require('../models/register');

exports.checkUserLogged = (req,res,next) => {
    if (req.session.userId) {
        next ();
    } else {
        return res.redirect('/users/login');
    }
}

exports.userInfo = (req,res,next) => {
if (req.session.userId) {
    console.log(req.session, 'session on')
    Register.findById(req.session.userId, { email:1, username: 1 }, (err, user) => {
        if (err) return next (err);
        req.userId = user;
        res.locals.user = user;
        next();
    })
}
}
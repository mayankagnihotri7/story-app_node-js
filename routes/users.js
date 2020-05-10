var express = require('express');
var router = express.Router();
let Register = require('../models/register');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Home Page.
router.get('/home', (req,res) => {
  res.render('home');
})

// Login Page.
// Get login page.
router.get('/login', (req,res) => {
  res.render('login');
})

// Registration Page.
router.get('/register', (req,res) => {
  res.render('register');
})

// Submit register form.
router.post('/register', (req,res, next) => {
  Register.create(req.body, (err, user) => {
    if (err) return next (err);
  })
  res.redirect('/users/login');
})

// Submit Login form.
router.post('/login', (req,res,next) => {
  let {username, password} = req.body;
  Register.findOne({ username }, (err, user) => {
    if (err) return next (err);
    if (!user) {
      return res.redirect('/users/login');
    }
    if (!user.verify(password)) {
      return res.redirect('/users/login');
    } else {
      req.session.userId = user.id;
      req.session.username = user.username;
      return res.redirect("/stories/storyList");
    }
  })
})

module.exports = router;

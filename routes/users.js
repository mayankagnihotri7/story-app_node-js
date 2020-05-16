var express = require('express');
var router = express.Router();
let Register = require('../models/register');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Home Page.
router.get('/home', (req,res) => {
  console.log('we are in home')
  console.log(req.session,"session is found")
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
  let {username, password, email} = req.body;
  Register.findOne({ email }, (err, user) => {
      if (err) return next (err);
      console.log(req.session, 'Hi there.!!!');
      req.session.userId = user.id;
      req.session.username = user.username;
      res.redirect("/stories/storyList");
  })
})

// Logout.
router.get('/logout', (req,res, next) => {
    if (req.session.userId) {
        req.session.destroy(function(err) {
            if (err) {
                return res.redirect("/users/login");
            } else {
                return res.redirect('/users/login');
            }
        })
    }
})

module.exports = router;

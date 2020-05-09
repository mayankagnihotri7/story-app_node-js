var express = require('express');
var router = express.Router();

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

module.exports = router;

var express = require('express');
var router = express.Router();
let passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tell Your Story' });
});

// Handle request to the server.
router.get('/auth/github', passport.authenticate('github'));

// Handle success or failure conditions.
router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/users/login'}), (req,res) => {
  // console.log(res, 'response received..');
  res.redirect('/stories/storyList');
});

module.exports = router;

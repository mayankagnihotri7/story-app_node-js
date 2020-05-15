var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var auth = require('./middlewares/auth');
let passport = require("passport");

require('dotenv').config();
require('./modules/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storiesRouter = require('./routes/stories');
var commentsRouter = require('./routes/comments');

var app = express();

// Connecting to mongodb.
mongoose.connect(
  "mongodb://localhost/story",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("Connected:", err ? err : true);
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Creating session.
app.use(session({
  secret: 'keyboard cat', //to hash your cookie.
  resave: false, //whether to extend session duration.
  saveUninitialized: false //to create a blank session before logging in.
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(auth.checkUserLogged);
app.use(auth.userInfo);
app.use('/stories', storiesRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

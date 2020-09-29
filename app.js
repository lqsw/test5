var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyparser = require('body-parser');

var loginRouter = require('./routes/login');
var blogRouter = require('./routes/blog');
var writeRouter = require('./routes/writeBlog');
var readRouter = require('./routes/readBlog');
var editRouter = require('./routes/editBlog');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 1000,
  },
}));

//登录拦截器
// app.all('/*', function (req, res, next) {
//   if (req.session.userName) {
//     next();
//   } else {
//     var arr = req.url.split('/');

//     for (var i = 0, length = arr.length; i < length; i++) {
//       arr[i] = arr[i].split('?')[0];
//     }
//     if (arr.length > 1 && arr[1] == '') {
//       next();
//     } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout' || arr[2].indexOf('login') > 0)) {
//       next();
//     } else {
//       req.session.originalUrl = req.originalUrl ? req.originalUrl : null;
//       res.redirect('/');
//     }
//   }
// });

app.use('/login', loginRouter);
app.use('/blog', blogRouter);
app.use('/writeBlog', writeRouter);
app.use('/readBlog', readRouter);
app.use('/editBlog',editRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

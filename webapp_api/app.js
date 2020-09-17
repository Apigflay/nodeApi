var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用 body-parser 中间
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 在服务器端建立uploads文件夹用来接受上传的文件，并将uploads文件夹托管为静态文件
app.use('/statics', express.static(__dirname + '/uploads'))


//页面渲染 routes for view
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.all("*", function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  next()
})

//分离路由
var apiIndex = require('./api/apilist/login');//登录
app.use('/api/login', apiIndex);
var apiUpload = require('./api/apilist/upload');//上传
app.use('/api/upload', apiUpload);
var apiTools = require('./api/apilist/tools');//上传
app.use('/api/tools', apiTools);


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



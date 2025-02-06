var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var  mongoose = require("mongoose");
require("./models/uesrModel");
require("./models/categoryModel");
require("./models/ProductModel");
require("./models/SinhvienModel");
require("./models/nganhangModel")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var sinhvienRouter = require('./routes/sinhvien');
var nganhangRouter = require('./routes/nganhang');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect database
//mongodb://localhost:27017/
//mongodb+srv://duynnps40287:ngocduydz3@cluster0.rer9i.mongodb.net
mongoose.connect('mongodb+srv://duynnps40287:ngocduydz3@cluster0.rer9i.mongodb.net/hihi')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/sinhvien', sinhvienRouter);
app.use('/nganhang',nganhangRouter);

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

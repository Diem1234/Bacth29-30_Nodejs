var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const { CONNECTION_STRING } = require('./constants/dbSettings');

var indexRouter = require('./routes/index');
var questionRouter = require('./routes/questions/router');

var categoriesRouter = require('./routes/category/router');
var employeesRouter = require('./routes/employee/router');
var ordersRouter = require('./routes/order/router');
var productsRouter = require('./routes/product/router');
var customersRouter = require('./routes/customer/router');
var suppliersRouter = require('./routes/supplier/router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: '*',
  }),
);

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

app.use('/', indexRouter);
app.use('/question', questionRouter);

app.use('/categories', categoriesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

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

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var roles = require('./routes/roles');
var sites = require('./routes/sites');
var savecriteria = require('./routes/savecriteria');
var opt = require('./routes/opt');
var company = require('./routes/company');
var languages = require('./routes/languages');
var busboy = require('connect-busboy');

var app = express();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy());

app.use('/', index);
app.use('/security', users);
app.use('/roles', roles);
app.use('/sites', sites);
app.use('/company', company);
app.use('/languages', languages);
app.use('/savecriteria',savecriteria);
app.use('/opt',opt);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

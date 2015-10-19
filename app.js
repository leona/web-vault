var express                 = require('express');
var path                    = require('path');
var fs                      = require('fs');
var morgan                  = require('morgan');
var favicon                 = require('serve-favicon');
var cookieParser            = require('cookie-parser');
var bodyParser              = require('body-parser');
var mustacheExpress         = require('mustache-express');
var compression             = require('compression')
var app = module.exports    = express();


global.__base       = __dirname + '/';
global.__methods    = __dirname + '/lib/methods/';
global.__lib        = __dirname + '/lib/';
global.__public     = __dirname + '/app/public/';
global.__tasks      = __dirname + '/lib/tasks/';
global.__app        = __dirname + '/app/';
global.__env        = 'dev';

var config          = require('./config');

// Load global middleware
require(__lib + 'middleware');

// Set view engine and directory
app.engine('mustache', mustacheExpress(__app + 'views/partials', '.mustache'));
app.set('views', path.join(__app, 'views'));
app.set('view engine', 'mustache');

// Disable caching
if (__env == 'dev') {
  app.disable('etag');
  app.set('view cache', false);
  config.max_age = 0;
} else {
  app.set('view cache', true);
}

app.use(favicon(__app + 'public/favicon.png', { maxAge: config.max_age }));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require(__lib + 'router');
require(__tasks + 'startup');

// Route assets to compressed versions
if (__env !== 'dev') {
  app.use('/img', express.static(__app + 'public/img/build', { maxAge: config.max_age }));
}

app.use('/css', express.static(__app + 'public/css/build', { maxAge: config.max_age }));
app.use('/js', express.static(__app + 'public/js/build', { maxAge: config.max_age }));
  
// Assign public directory
app.use(express.static(__app + 'public', { maxAge: config.max_age }));


//Global view variables
app.use(function (req, res, next) {
   res.locals = config.site;
   next();
});

// catch error stauses and send messages
app.use(function(req, res, next) {
  Object.keys(config.error_msg).forEach(function(key) {
    var err = new Error(config.error_msg[key]);
    err.status = key;
    next(err);
  })
});

// error handlers
app.use(function(err, req, res, next) {
  var status = err.status || 500;
  
  if (app.get('env') !== 'dev')
    err.stack = null;
  
  res.status(status);
  res.render('error', {
    msg: err.message,
    stack: err.stack
    //status: err.status
  });
});

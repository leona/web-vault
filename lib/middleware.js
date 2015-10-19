var app     = require(__base + 'app');
var config  = require(__base + 'config');
var path    = require('path');
var uti     = require(__methods + 'utilities');


app.use(function(req, res, next) {
  res.locals = config
  next();
});

// Force HTTPS middleware
/*
app.use(function auth(req, res, next) {
  if (req.protocol !== 'https') {
    res.redirect('https://' + req.get('host'));
  } else {
    next();
  }
});
*/

// Determine if static request
if (uti.defined(config.asset_host) && uti.defined(config.asset_exts)) {
  app.use(function(req, res, next) {
    if (req.get('host') == config.asset_host) {
      if (config.asset_exts.indexOf(path.extname(req.originalUrl)) == -1) {
        return res.end();
      }
    } 
    next();
  });
}

// Determine if ajax request
app.use(function(req, res, next) {
  if (typeof req.body !== 'undefined' && typeof req.body.ajax_request !== 'undefined' && req.body.ajax_request == 'true') {
    req.isAjax = true;
  } else {
    req.isAjax = false;
  }
  next();
});

// Log requests
app.use(function(req, res, next) {
  uti.log('access-log', {
    ip: req.headers['x-forwarded-for'],
    request: req.originalUrl,
    method:  req.method,
    'user-agent': req.headers['user-agent'],
    time: Date.now()
  });

  next();
});

var express   = require('express');
var router    = express.Router();
var api       = require(__methods + 'api');
var uti       = require(__methods + 'utilities');
var Cookies   = require('cookies');

// Authentication middleware
router.use(uti.auth);

router.get('/', function(req, res, next) {
  if (res.authenticated == true) {
    res.render('index');
  } else {
    res.render('login');
  }
});

router.post('/', function(req, res, next) {
  if (res.authenticated == false && uti.defined(req.body.user) && uti.defined(req.body.pass)) {
      uti.val('email', req.body.user, function() {
        api.clientCall('login', { user: req.body.user, pass: req.body.pass }, function(err, resp, body) {
          if (body.result == true) {
            var cookies     = new Cookies(req, res);
            var auth_token  = uti.random(128);
            
            client.set(auth_token, req.headers['user-agent']);
            cookies.set('auth_token', auth_token, { httpOnly: true /*secure: true, maxAge: 1000 * 60 * 60 * 24 * 30*/});
            res.send('success');
          } else {
            res.end();
          }
        })
      }, function() {
        res.end();
      });
  } else {
    res.end();
  }
});


module.exports = router;
var express   = require('express');
var router    = express.Router();
var api       = require(__methods + 'api');
var uti       = require(__methods + 'utilities');
var store     = require('node-persist');
store.initSync();

// Authentication middleware
router.use(uti.auth);

router.get('/add', function(req, res, next) {
    if (res.authenticated == true) {
        client.set("")
    } else {
        res.end();
    }
});


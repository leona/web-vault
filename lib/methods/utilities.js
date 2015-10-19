var Cookies   = require('cookies');

var utilities = function() {
    return this;
}

utilities.prototype.debug = function(msg) {
    console.log(msg);
}

utilities.prototype.log = function(key, obj) {
    //console.log(obj);
}

utilities.prototype.objMerge = function(){
    for (var i=1; i<arguments.length; i++)
       for (var a in arguments[i])
         arguments[0][a] = arguments[i][a];
         
   return arguments[0];
}


utilities.prototype.random = function(length) {
    var rtn = '', charset = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    
    for(i = 0; i < length; i ++) {
        rtn += charset[Math.floor((Math.random() * charset.length - 1) + 1)];
    }
    
    return rtn;
}

utilities.prototype.forEach = function(obj, callback) {
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           //var obj = obj[key];
            callback(key, obj[key]);
        }
    }
}

utilities.prototype.defined = function(val) {
    if (typeof val !== 'undefined' && val.length > 0) return true;
}


utilities.prototype.val = function(type, data, callback, error) {
    var pattern;

    switch (type) {
        case 'email':
            pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/;
            break;
    }
    var result = data.match(pattern);

    if (type == 'email' && result) {
        callback();
    } else {
        error();
    }
    return result;

}

utilities.prototype.auth = function(req, res, next) {
  var cookies = new Cookies(req, res);
  var token   = cookies.get('auth_token');

  if (uti.defined(token) && token.length == 128) {
    client.get(token, function(err, reply) {
        if (reply !== null && reply == req.headers['user-agent']) {
          res.authenticated = true;
        } else {
          res.authenticated = false;
        }
        next();
    });
  } else {
    res.authenticated = false;
    next();
  }
}


module.exports = new utilities;
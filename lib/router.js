var app     = require('../app');
var uti     = require(__methods + 'utilities');
var routes  = require(__app + 'controllers');

for (key in routes) {
  app.use('/' + (key == 'default' ? '' : key), routes[key]);
  
  uti.debug('Attaching controller: ' + key + '  to route: /' + key);
}

app.use('/nojs', function(req, res, next) {
  res.render('error', {
      msg: 'Javascript must be enabled to view this page.'
  })
});
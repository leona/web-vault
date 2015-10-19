var minifier = require('../methods/minifier');
var imagemin = require('imagemin');
var config = require(__base + 'config');
var uti = require(__methods + 'utilities').prototype;

new minifier(config.asset_dirs);


if (__env !== 'dev') {
    new imagemin()
        .src(__public + '/img/*.{gif,jpg,png,svg}')
        .dest(__public + '/img/build')
        .run(function (err, files) {
            if (err) return uti.debug(err);
            
            uti.debug('Images compressed.');
        });
}
var res = require(__methods + 'resources');
var uti = require(__methods + 'utilities');
var sass = require('node-sass');
var compressor = require('node-minify');

var minifier = function(dirs) {
    this.dirs = dirs;
    
    new res(this.dirs, function(type, file, build, complete) {
        console.log(type);
        if (type == 'scss') {
            var scss = sass.renderSync({
                file: file,
                outputStyle: 'compressed',
            }).css.toString();
            console.log(1111);
            complete(scss);
        } else if (type == 'js') {
            new compressor.minify({
                type: 'yui-js',
                fileIn: file,
                fileOut: build,
                callback: function(err, min){
                    if (err) console.log(err);

                    complete(min);
                }
            });
            
        }
    }, function(type, files, build_dir) {
        new compressor.minify({
            type: 'no-compress',
            fileIn: files,
            fileOut: build_dir + '/build.' + (type == 'scss' ? 'css' : 'js'),
            callback: function(err, min){
                if (err) uti.debug(err);
            }
        });
    });
}


module.exports = minifier;
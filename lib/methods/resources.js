var fs = require('fs');
var glob = require('glob');
var path = require('path');
var uti = require(__methods + 'utilities');

var dirs, condition, callback;

var resources = function(dir, condit, fn) {
    dirs        = dir;
    condition   = condit;
    complete    = fn;

    this.fetchAssetStructure();
}

resources.prototype.fetchAssetStructure = function() {
    uti.forEach(dirs, function(key, item) {
        resources.prototype.dirCheck(item.dir);
    
        glob(item.dir + '/*.' + key, function (err, files) {
            if (err)
                return uti.debug(err);
                
            if (files.length < 1)
                return uti.debug('No assets found for: ' + item);
                
            resources.prototype.filesProc(files, item.build_dir, key);
            uti.debug('Assets for ' + item.dir + ' found:');
            uti.debug(files);
        });
    });
}

resources.prototype.compareFiles = function(callback, opts) {
    var stat = fs.statSync(opts[0]);
    var build = [];
    
    try {
        build = fs.statSync(opts[2]);
    } catch(err) {
        build['mtime'] = 0;
        fs.closeSync(fs.openSync(opts[2], 'w'));
        console.log('Build file: ' + opts[2] + ' not found, creating.');
    }

    if (eval("'" + stat['mtime'] + "'" + opts[1] + "'" + build['mtime'] + "'")) {
         callback(opts[2]);
    }
}

resources.prototype.filesProc = function(files, build_dir, type) {
    this.dirCheck(build_dir);

    files.forEach(function(item, key) {
        var build_output = build_dir + '/' + path.basename(item);
        
        resources.prototype.compareFiles(function(file) {
            
            uti.debug('File: ' + file + ' outdated, updating.');
            
            condition(type, item, build_output, function(build) {
                if (typeof build !== 'undefined' && build.length > 0) {
                    fs.writeFileSync(build_output, build);
                }    
                
                if (key + 1 == files.length) {
                    files = files.map(function(file) {
                        return build_dir + '/' + path.basename(file);
                    });
                    
                    complete(type, files, build_dir);
                }
            });
        }, [item, '>', build_output]);
    });
}

resources.prototype.dirCheck = function(path) {
    try {
        fs.statSync(path);
    } catch(err) {
        uti.debug('Directory: ' + path + ' not found, creating.');
        fs.mkdirSync(path);
    }
}


module.exports = resources;
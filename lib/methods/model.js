var redis     = require("redis"),
    client    = redis.createClient();
    client.on("Redis error", function (err) {
        console.log("Error " + err);
    });
    
var model = function() {
    
    
    var app = function() {
        return this;
    }
    
    app.prototype.fetch = function() {
        client.get('vault_groups', function (err, reply) {
            if (reply.length > 0) {
                Obj.keys(repl).forEach(key, item) {
                    console.log(item);
                }
            } else {
                client.set('vault_groups', {});
                
                return null;
            }
        });
    }
    
    return new app;
}

module.exports = new model;
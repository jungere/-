var mongodb = require("mongodb"); 
var Config = require('./config');
var Q = require('q');

var mongo = {
    db : null,
    server : null,
    init : function(){
        this.server = new mongodb.Server(Config.DB.host, Config.DB.port, {auto_reconnect:true}); 
        this.db = new mongodb.Db(Config.DB.name, this.server, {safe:false}); 
    },
    open : function(callback){
        var deferred = Q.defer();
        this.db.open(function (err,db) {//连接数据库
            if(err){
                console.log('Sorry, there is no mongo db server running.');
                deferred.reject(false);
            } else {
                deferred.resolve(db);  
            }
        });
        return deferred.promise;
    }
}


module.exports = mongo;
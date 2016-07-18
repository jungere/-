var Q = require('q');
var Util = require('../global/util.js');
var Config = require('../global/config.js');
var Mongo = require('../global/db.js');

var pas = "TceRNpK6zyNA6hror+PZpTfwcMVtw32nRdi+ebU1OpZF9hQzE3qy8Oth8z03FYXIZcY/0eKjdCnO+7njU8I0pLFQHyz/EW7AFjxbreLs9+l1KBw30hbByoPIWgktXst3dL/okdcRiNzuLRYY2b2JLbFBZGMV8nARSV77uJ7+Lg1mhFEZfllGcUSmesd1FvhnY3K4iH7mDRJVwo/gDxrfcWu7wSvfvc+B8KmUCvErCJnppEl42txdgg=="

var m = {
    
    AddGuest : function(auth) 
    {
        var deferred = Q.defer();
        //if(!auth){ return; } 
        var auth = auth || pas;
        var result = Util.getAuthUserId(Config.KEY, Config.SECRET, auth);
        if(false !== result)
        {
            Mongo.db.open(function (err,d) {//连接数据库
                if(err)
                    deferred.reject(err);
                else{
                    d.collection("users", {safe:true} , function (err,collection) {
                        collection.insert(result, function (err,docs)
                        {
                            deferred.resolve();
                            d.close();
                        });
                    });        
                }
            });
        }
        return deferred.promise;
    }
    
}

module.exports = m;
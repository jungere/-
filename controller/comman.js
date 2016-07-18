var BaseController = require("./Base");
var Q = require('q');

module.exports = BaseController.extend({
    
    getIds : function(req){
        
        var deferred = Q.defer();
        if(!req.db){
            deferred.reject();
        }else{
            req.db.collection("guests", {safe:true} , function (err,collection) {
                collection.find({}).toArray(function(err,items){  
                    if(err){  
                        deferred.reject(err);
                        return false;  
                    }
                    deferred.resolve(items);
                    db.close();
                });  
            }); 
        }
        
        return deferred.promise;
    }
})
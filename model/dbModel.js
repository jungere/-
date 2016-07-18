var Q = require('q');
var Model = require('./Base');
var model = new Model()

var dbModel = model.extend({
    insert : function(collection, data){
        var deferred = Q.defer();
        this.db.collection(collection, {safe: true}, function(err, col)
        {
            col.insert(data, function(err){
                if(err){  
                    deferred.reject(err);
                }else{
                    deferred.resolve({
                        code : 200,
                        message : "success"
                    });
                }
            });
        });
        return deferred.promise;
    },
    upadte : function(data){
        this.collection().upate({id : data.id}, data, {}, callback || function(){});
    },
    getlist : function(collection, query){
        var deferred = Q.defer();
        this.db.collection(collection, {safe: true}, function(err, col)
        {
            col.find(query || {}).toArray(function(err, items){
                if(err){  
                    deferred.reject(err);
                }else{
                    deferred.resolve(items);
                }
            });
        });
        return deferred.promise;
        //this.collection().find(query || {}).toArray(callback);
    },
    remove : function(id, callback){
        this.collection().findAndModify({id : id}, [], {}, {remove: true}, callback);
    }
})

module.exports = dbModel;
var Q = require('q');
var model = new Model(require('./Base'))

var TradingModel = model.extend({
    insert : function(data, callback){
        this.collection().insert(data, {}, callback || function(){})
    },
    upadte : function(data, callback){
        this.collection().upate({id : data.id}, data, {}, callback || function(){});
    },
    getlist : function(callback, query){
        this.collection().find(query || {}).toArray(callback);
    },
    remove : function(id, callback){
        this.collection().findAndModify({id : id}, [], {}, {remove: true}, callback);
    }
})

module.exports = TradingModel;
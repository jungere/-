var BaseController = require("./Base");
var Q = require('q');
var _ = require("underscore")
var model = new (require("../model/dbModel.js"));

module.exports = BaseController.extend({
    
    collect_name : 'orders',

    get : function(req, uid, type){        
        var deferred = Q.defer();
        if(!req.db){
            deferred.reject();
        }else{
            if(undefined === model.db){
                model.setDB(req.db);
            }
            var param = {};
            if(uid){
                param.pay_unochat_uid = Number(uid);
            }
            if(type){
                param.type = type;
            }
            model.getlist(this.collect_name, param).then(function(items){
                deferred.resolve(items);
            })
        }
        return deferred.promise;
    },
    add : function(req, order){        
        var deferred = Q.defer();
        var od = _.extend({
            unochat_uid : '',
            order_no : '',
            amount : '',
            order_time : '',
            remark : '' ,
            type : '',
        }, order);
        
        if(!req.db){
            deferred.reject();
        }else{
            if(undefined === model.db){
                model.setDB(req.db);
            }
            console.log(od);
            model.insert(this.collect_name, od).then(function(data){
                deferred.resolve(data);
            }, function(err){
                deferred.reject(err);
            })
        }
        return deferred.promise;
    }
})
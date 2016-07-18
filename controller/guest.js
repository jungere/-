var BaseController = require("./Base");
var Q = require('q');
var _ = require("underscore");
var request = require('request');
var Util = require('../global/util.js');
var model = new (require("../model/dbModel.js"));

var pas = "TceRNpK6zyNA6hror+PZpTfwcMVtw32nRdi+ebU1OpZF9hQzE3qy8Oth8z03FYXIZcY/0eKjdCnO+7njU8I0pLFQHyz/EW7AFjxbreLs9+l1KBw30hbByoPIWgktXst3dL/okdcRiNzuLRYY2b2JLbFBZGMV8nARSV77uJ7+Lg1mhFEZfllGcUSmesd1FvhnY3K4iH7mDRJVwo/gDxrfcWu7wSvfvc+B8KmUCvErCJnppEl42txdgg=="

module.exports = BaseController.extend({
    KEY : "",
    SECRET : "",
    
    init : function(key, secret){
        this.KEY = key;
        this.SECRET = secret;
        return this;
    },
    
    get : function(req){        
        var deferred = Q.defer();
        if(!req.db){
            deferred.reject();
        }else{
            if(undefined === model.db){
                model.setDB(req.db);
            }
            model.getlist("guests").then(function(items){
                deferred.resolve(items);
            })
        }
        return deferred.promise;
    },
    add : function(req, auth){        
        var deferred = Q.defer();
        // console.log('auth:', auth);
        if(!auth){
            deferred.reject();
        }else{
            // var auth = auth;
            // var guest = Util.getAuthUserId(this.KEY, this.SECRET, auth);
            var guest = Util.uno_decrypt(auth, this.KEY+':'+this.SECRET);
            console.log(auth, guest, this.KEY+':'+this.SECRET);
            guest.time = _.now() / 1000 >> 0;
            if(!req.db){
                deferred.reject();
            }else{

                if(undefined === model.db){
                    model.setDB(req.db);
                }
                
                model.insert("guests", guest).then(function(items){
                    deferred.resolve(guest);
                })
            }

            // var pa = {
            //     headers: {
            //         'Content-Type' : 'application/json',
            //     },
            //     uri: "http://120.25.226.215:88/get_auth.php?auth="+auth,
            //     method: "get"
            // }
            // request(pa, function(err, response, body){
            //     //console.log(bd, body);
            //     var guest = Util.string2json(body);
            //     guest.time = _.now() / 1000 >> 0;
            //     if(body){
            //         if(undefined === model.db){
            //             model.setDB(req.db);
            //         }
            //         model.insert("guests", guest).then(function(items){
            //             deferred.resolve(guest);
            //         })
            //     }else{
            //         deferred.reject();
            //     }
            // });
            // guest.time = _.now() / 1000 >> 0;
            // console.log(guest);
            
            
        }
        
        return deferred.promise;
    }
})

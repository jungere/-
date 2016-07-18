var _ = require("underscore");
var Config = require('../global/config.js');
var Util = require('../global/util.js');
var APPKEY = Config.KEY;
var SECRET = Config.SECRET;

module.exports = {
    name : "base",
    extend : function(child){
        return _.extend({}, this, child);
    },
    run : function(req, res, next){
        
    },
    createPayRequest : function(url, params, key, secret){
        var url = Config.REQUESTURL.API + url;
        var k = key || APPKEY;
        var s = secret || SECRET;
        console.log(k, s);
        var auth = Util.createRequestHeader(k, s);
        var method = 'POST';
        var request = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Basic '+auth,
            },
            uri: url,
            body: Util.json2string(params) ,
            method: method
        }
        
        return request;
    },
    createNotifyRequest : function(url, params, key, secret){
        var url = Config.NOTIFICATIONURL.API + url;
        var k = key || APPKEY;
        var s = secret || SECRET;
        var auth = Util.createRequestHeader(k, s);
        var method = 'POST';
        var request = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Basic '+auth,
            },
            uri: url,
            body: Util.json2string(params) ,
            method: method
        }
        
        return request;
    },
}
var BaseController = require("./Base");
var _ = require("underscore")
var request = require('request');

module.exports = BaseController.extend({
    URL : {
        API :  "",
        Single :  "",
        Multi : "",
        System : ""
    },
    
    init : function(params){
        this.URL = _.extend(this.URL, params);
        return this;
    },
    
    msgSingle : function(senderId, receiverId, content, callback)
    {
        if(null == this.URL){
            console.log("push url null.")
            return false;
        }
        var self = this;
        var params = {
            sender : senderId,
            receiver : receiverId,
            content : content
        }
        var url = self.URL.Single;
        var req = self.createNotifyRequest(url, params);
        console.log(req);
        request(req, function(err, response, body){
            console.log(body);
            callback && callback(body);
        })
    },
    
    msgGroup : function(senderId, receiverIds, content)
    {
        if(null == this.URL){
            console.log("push url null.")
            return false;
        }
        var self = this;
        var params = {
            sender : senderId,
            receiver : receiverId,
            content : content
        }
        
        var url = self.URL.Multi;
        console.log(url, params);
        var req = self.createNotifyRequest(url, params);
        request(req, function(err, response, body){
            callback && callback(body);
        })
    }
})
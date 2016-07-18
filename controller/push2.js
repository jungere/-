var request = require('request');

var APIURL = "http://api.unochat.io";

var push = {
    msgSingle : function(senderId, receiverId, content)
    {
        var params = {
            sender : senderId,
            receiver : receiverId,
            content : content
        }
        
        var url = APIURL+ "/messages/peers";
        console.log(url, params);
        request.post({url:url, form: params}, function (error, response, body) {
            //console.log(error);
            //console.log(response);
            console.log(body);
            if (!error && response.statusCode == 200) {
                console.log(body);
                callback && callback(body);
            }
        })
    }
}

module.exports = push;
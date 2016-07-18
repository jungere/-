var MCrypt = require('mcrypt').MCrypt;
var Crypto = require('crypto');
var Moment = require('momentjs');
var JSON = require('json3');

var d = {
    getAuthUserId : function(appId, appSecret, auth) {
        if(auth){
            var key = this.decryptAuth(auth, appSecret);
            if(5 == key.indexOf(appId)){
                var arr = key.split("|");
                return JSON.parse(arr[2]);
            }
        }
        return false;
    },
    decryptAuth: function(input, key) {
        var txt = (new Buffer(input.trim(), 'base64'));
        var key = Crypto.createHash('md5').update(key).digest("hex").substring(0,24);
        var desEcb = new MCrypt('tripledes', 'ecb');
        desEcb.open(key);       
        
        var plaintext = desEcb.decrypt(txt);
        
        return plaintext.toString();
    },
    uno_decrypt : function  (data, key) {
        var key = Crypto.createHash('md5').update(key).digest("hex");
        var txt = (new Buffer(data, 'base64'));
        var txt_len = txt.length;
        var key_len = key.split("").length;
        var c = "";
        var x = 0;
        for(var i=0; i< txt_len; i++){
            if(x == key_len){
                x = 0;
            }
            c += key.substr(x, 1);
            x++;
        }
        var str = "";
        for(var i=0; i< txt_len; i++){
            var asc1 = txt[i];
            var asc2 = new Buffer(c.substr(i, 1))[0];
            if(asc1 < asc2){
                str += (new Buffer([asc1 + 256 - asc2])).toString();
            }else{
                str += (new Buffer([asc1 - asc2])).toString();
            }
        }
        return this.string2json(str)

    },
    createRequestHeader : function(key, secret){
        var str = key + ":" + Crypto.createHash('md5').update(secret).digest("hex");
        str = new Buffer(str);
        
        return str.toString("base64");
    },
    getNow : function(){
        return Moment().format('f');
    },
    json2string : function(json){
        return JSON.stringify(json);
    },
    string2json : function(str){
        return JSON.parse(str);
    }
}

module.exports = d
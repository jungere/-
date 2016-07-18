var mongodb = require("mongodb");  
  
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});  
  
var db = new mongodb.Db("test",server,{safe:false});  
  
db.open(function(err,db){  
  if(err){  
    console.log(err);  
    return false;  
  }  
  console.log("We are connected!");  
  db.collection('test',{safe:true},function(err,collection){  
    collection.find({unique:{"$exists":true}}).toArray(function(err,items){  
      if(err){  
        console.log(err);  
        return false;  
      }  
      for(item in items) console.log(items[item]);  
      process.exit();  
    });  
  });  
});  

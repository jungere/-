var express = require('express');
var app = express();
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var Config = require('./global/config.js');
var Util = require('./global/util.js');
var Mongo = require('./global/db.js');
var url = require('url');



var Comman = require('./controller/comman.js');
var Guest = require('./controller/guest.js').init(Config.KEY, Config.SECRET);
var Order = require('./controller/order.js');
var Payment = require('./controller/payment.js').init(Config.REQUESTURL);
var Notifi = require('./controller/notification.js').init(Config.NOTIFICATIONURL);



var reqParams = function(req, res, next){
	var body = '';
    req.on('data', function (data) {
        body += data;
        // console.log("Partial body: " + body);
    });
    req.on('end', function () {
        // console.log("Body: " + body);
		req.body = body;
		next();
    });
}

var guestCome = function(req, res, next){
	if(!req.headers.referer){
		next();
		return;
	}
	var url_parts = url.parse(req.headers.referer, true);
	var query = url_parts.query;
	if(req.session.guest){
		next();
	}else{
		console.log(" add query");
		Guest.add(req, query.auth).then(function(data){
			console.log("session -- 47:", data);
			req.session.guest = data;
			next();
		}, function(){
			console.error("add guest error");
			next();
		})
	}
}

Mongo.init();
Mongo.open().then(function(db){
	console.log("mongo init");
	
	if(!db) { 
		console.log('open mongo error')
		return ; 
	} 

	var attachDB = function(req, res, next){
		req.db = db;
		next();
	};

	app.all('*', attachDB, guestCome, function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		// res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		// res.header('Pragma', 'no-cache');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1')
		res.header("Content-Type", "application/json;charset=utf-8");
		next();
	});
	
	app.get('/', attachDB, guestCome, function(req, res, next){
		res.render('index')
	})
	app.get('/notify', attachDB, function(req, res, next){
		Notifi.msgSingle(16, 95437, "你已经成功 支付 120 积分 到 商户 XXX ， 谢谢你的光临！")
		res.render('views/push/index');
	})

	app.get('/bond/', attachDB, guestCome, function(req, res, next){		
		res.render('views/bond/index')
	})

	app.get('/trading/', attachDB, guestCome, function(req, res, next){		
		res.render('views/trading/index')
	})
	
	app.get('/trading/orders', attachDB, guestCome, function(req, res, next){
		Guest.get(req).then(function(data){
			res.send(data);
		}, function(){
			console.error("get error");
		})
	})
	
	//支出
	app.get('/trading/recharge', attachDB, guestCome, reqParams, function(req, res, next){
		
		var uid = 95437;
		var no = "U000008";
		var amount = 1;
		var time = Util.getNow();
		var remark = "susan123-接受帮助U000008"
		var key, secret;
		
		Payment.unoRecharge(key, secret, uid, no, amount, time, remark).then(function(data){
			console.log('Recharge success and add order in mongodb');
			Order.add(req, {
				unochat_uid : uid,
				order_no : no,
				amount : amount,
				order_time : time,
				remark : remark,
				type : 'recharge'
			}).then(function(result){
				console.log('add order in mongodb success');
				res.send(result)
			}, function(err){
				res.send(err);
			})
			
		}, function(err){
			res.send(err);
		});
		//res.render('views/push/index');
	})
	
	// 收入记录
	app.get('/trading/pay', attachDB, guestCome, function(req, res, next){
		// req.query.uid
		var uid = Number(req.session.guest.id);
		var type = "pay";
		console.log(uid);
		Order.get(req, uid, type).then(function(data){
			console.log(data);
			res.send(data);
		}, function(err){
			res.send(err);
		})
		//res.render('views/push/index');
	})
	
	// 收入
	app.post('/trading/pay', attachDB, guestCome, reqParams, function(req, res, next){
        
		var body = Util.string2json(req.body)
		console.log("traindg----:",req.session.guest);
		var uid = Number(req.session.guest.id)
		var no = "Z"+new Date().getTime();
		var amount = body.amount;
		var time = Util.getNow();
		var remark = body.remark;
		var code = body.code;
		var account = req.session.guest.kingmic_account
		if(body.key){
			req.ukey = body.key;
			req.usecret = body.secret;
		}
		
		Payment.unoPaySubmit(body.key, body.secret, uid, account, code, no, amount, time, remark).then(function(data){
			// res.send(err);
			console.log('payment success and add order in mongodb');
			Order.add(req, {
				pay_unochat_uid : uid, 
				accept_unochat_uid : body.id,
				accept_unochat_name : body.name,
				order_no : no,
				amount : amount,
				order_time : time,
				remark : remark,
				type : 'pay'
			}).then(function(result){
				console.log('add order in mongodb success');
				res.send(result)
			}, function(err){
				res.send(err);
			})
		}, function(err){
			console.log(err);
			res.send(err);
		});
		//res.render('views/push/index');
	})
	
	// app.get('/order/add', attachDB, guestCome, reqParams, function(req, res, next){
	// 	console.info('order add');
	// 	var uid = 95437;
	// 	var no = "U000006";
	// 	var amount = 1;
	// 	var time = Util.getNow();
	// 	var remark = "dico578-接受帮助U000008"
		
	// 	Order.add(req, {
	// 		unochat_uid : uid,
	// 		order_no : no,
	// 		amount : amount,
	// 		order_time : time,
	// 		remark : remark,
	// 		type : 'pay'
	// 	}).then(function(result){
	// 		res.send(result)
	// 	}, function(err){
	// 		res.send(err);
	// 	})
	// 	//res.render('views/push/index');
	// })
	app.get('/order/list', attachDB,  function(req, res, next){
		console.info('order list');
		Order.get(req).then(function(data){
			res.send(data);
		}, function(err){
			res.send(err);
		})
		//res.render('views/push/index');
	})
	
	app.get('/guest/list', attachDB, function(req, res){
		Guest.get(req).then(function(data){
			res.send(data);
		}, function(){
			console.error("get error");
		})
	})
	
	app.get('/guest/add', attachDB, function(req, res){
		Guest.add(req, "123").then(function(data){
			res.send(data);
		}, function(){
			console.error("get error");
		})
	})
	
	
})


app.set('views', __dirname + '/');
app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, '/views/')));
app.set('view engine', 'html');

app.use(cookieParser());
app.use(session({
	resave: true, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'love'
}));
app.set('port', Config.PORT );
app.listen(app.get('port'), function(){
	console.log('listen port' + app.get('port'));
})


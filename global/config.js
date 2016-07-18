module.exports = {
    // PORT : 8083,
    PORT : 80,
    //债券服务号
    KEY : "FATWLZbAOH",
    SECRET : "omX69PX3oAFff8B4zPn5",

    // me
    // KEY : "GHy9Q6zn5G",
    // SECRET : "yo7VArHRJdMk9CwiFAKp",
    
    // App ID:     16
    // KEY : '544vI4S8uB',
    // SECRET : 'e2omdw4k1gL5T5hJUeS6',
    
    
    REQUESTURL : {
        API : 'http://demo.unochat.io:8080/Server',
        Recharge : '/Pay/recharge',
        PaySubmit : '/Pay/submit',
        PaySubmitWithoutCode : '/Pay/submitWithoutCode'
    },
    
    NOTIFICATIONURL: {
        API :  "http://api.unochat.io",
        Single :  "/messages/peers",
        Multi : "/messages/groups",
        System : "/messages/systems"
    },
    
    DB : {
        port : 27017,
        // host : 'localhost',
        host : '120.25.226.215',
        name : 'test'
    },
    
    ERRCODE : {
        '101' : '认证失败',
        '102' : '订单号不能为空',
        '103' : '金额不正确',
        '104' : '创建订单失败',
        '105' : '麦信号不正确',
        '106' : '商户余额不足',
        '107' : '动态口令格式不正确',
        '108' : '动态口令错误次数过多 10分钟冻结时间',
        '109' : '动态口令不正确',
        '110' : '扣款失败'
    }
}
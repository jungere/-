var request = require('request');

var UNOPayURL = 'http://demo.unochat.io:8080/Server';


module.exports = {
    
    /*
     * 麦新积分充值 、 提现
     * unochat_uid 麦信用户ID
     * orderNo 订单号
     * amout 金额 
     * orderTime 订单时间
     * remark 备注
     * return mixed 状态说明
     * 101 认证失败
     * 102 订单号不能为空
     * 103 金额不正确
     * 104 创建订单失败
     * 105 麦信号不正确 10分钟冻结时间
     * 106 商户余额不足
     * 109 动态口令不正确
     * 110 扣款失败
     */
    unoRecharge : function(unochatId, orderNo, amount, orderTime, remark, callback){
        var params = {
            unochat_uid : unochatId,
            order_no : orderNo,
            amount : amount,
            order_time : orderTime,
            remark : remark       
        };
        var url = UNOPayURL+ "/Pay/recharge";
        request({url:url, form: params}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                callback && callback(body);
            }
        })
    },
    unoWithdraw : function(){
        
    }
   
    
    
}
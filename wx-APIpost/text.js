//注意微信客户端和浏览器接受数据不同
    //fromusername 接受者openid
    //tousername  发送者openid

module.exports = function(data){
	 var resMsg = '<xml>' +
        '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
        '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
        '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
        '<MsgType><![CDATA[text]]></MsgType>' +
        '<Content><![CDATA['+data.content+']]></Content>' +
        '</xml>';
	return resMsg;
};
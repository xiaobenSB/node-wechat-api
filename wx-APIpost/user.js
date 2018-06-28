var request = require('./request.js');
var token = require('../token.js').token;
module.exports= function(msgText,res,data){
   token = require('../token.js').token;
  request.get('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+token+'&openid='+data.fromusername+'&lang=zh_CN',function(err,r,body){
	  var username = JSON.parse(body).nickname;
	  data.content = '欢迎'+username+',请开始你的操作';
	  msgText(res,data);
	  msgText = null;
  });

}
var request = require('./request.js');

module.exports = function(openid){

 var template = {
	"touser":openid,
    "template_id":"Spln0d-x1fVg05LsKbNJI1ZbpB4b8TGdCeCUU73BMq4",
    "url":"https://weixin.qq.com/",
	};
     request.post({url:'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+require('../token.js').token+'', form: JSON.stringify(template)}, function (e, r,body) {  //必须发送的数据是字符窜类型的json
	        console.log(body);
           });

}
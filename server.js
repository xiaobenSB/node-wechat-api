//注意配置微信连接服务器时，本地服务器不行，得是上线服务器（如：内网映射）
//当用户关注或发言时，微信先把数据渲染然后发送根目录post请求把数据发送到你服务器里让你监听处理数据

const express = require('express'), //express 框架 
       crypto =  require('crypto'), //引入加密模块
       config = {"token":"xiaoben"},
       appid = "wx08ccdc2a73295758",
       API = require("wechat-api"),
       tools = require('./msg'),
       bodyParser = require('body-parser'),
       appsecrect ="53e0f7c1ae51978d10478183f7cd6c2f";
require('body-parser-xml')(bodyParser);//传bodyParser过去扩展xml方法
var request = require('request');
var app = express();//实例express框架

app.use(bodyParser.xml({
limit: '1MB',
xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
}
}));


//用于处理所有进入 3000 端口 get 的连接请求
app.use(function(req,res,next){
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
            nonce = req.query.nonce,//随机数
          echostr = req.query.echostr;//随机字符串
    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [config.token,timestamp,nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); //对传入的字符串进行加密

    if (req.method === 'GET') {
    if(resultCode === signature){
        res.end(echostr);
        console.log('ok');
       
    }else{
		console.log('ok');
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end('mismatch喔喔');
    }
    }else if (req.method === 'POST') {
      //如果是post请求 也是先判断签名是否合法 如果不合法 直接返回wrong
      if (resultCode !== signature) {
        this.body = 'wrong';
        return false;
      };
  tools.replyWx(req,res);
   


}
});

var api = new API(appid,appsecrect); //这个api是用来接收token的,给他里面的方法调用
var menu = JSON.stringify(require('./wx-APIpost/menu.json'));

access_token();  //2小时失效需重新获取

function access_token(){
	var c = api.getAccessToken(function(err,token){
  console.log(err);
  //c=token.accessToken;
   request.post({url:' https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+token.accessToken+'', form:menu}, function (e, r,body) {  //必须发送的数据是字符窜类型的json
	   console.log(body);
   });
   require('./token.js').token = token.accessToken;
});
setTimeout(function(){
  access_token();
},7200010);
}
//参考：https://www.cnblogs.com/bruce-gou/p/6368881.html

/*api.createMenu(require('./menu.js'), function (err, result) {  //创建菜单
    console.log(result); // { errcode: 0, errmsg: 'ok' }
}); */


/*api.addTemplate('TM00015',function(err,result){
	console.log(err,result);
});*/





app.listen(3000);

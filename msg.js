//微信自动回复

function wx(){
    this.replyWx = function(req,res,token){
        res.writeHead(200, {"Content-Type": "application/xml;charset=utf-8"});
      var data = req.body.xml;
      if(data.msgtype === 'event' && data.event === 'subscribe'){
		  //data.fromusername 为用户openid
		  require('./wx-APIpost/user')(msgText,res,data); 
		  require('./wx-APIpost/template')(data.fromusername); //模板信息
      }else if(data.msgtype === 'event' && data.event === 'unsubscribe'){
          //取消关注了
      }else if(data.msgtype === 'text'){//文本消息
          msgText(res,data);
      }else if(data.msgtype === 'image'){//图片消息
	    console.log(data);
          data.content = '你好暂不支持图片回复';
          msgText(res,data);
      }else if(data.msgtype === 'video'){//视频消息
          data.content = '你好暂不支持视频回复';
          msgText(res,data);
      }else if(data.msgtype === 'voice'){//语言消息
          data.content = '你好暂不支语音回复';
          msgText(res,data);
      }
	
    }
}



function msgText(res,data){
 
    res.end(require('./wx-APIpost/text.js')(data));//简单来说就是   如果服务器端没有数据返回到客户端 那么就可以用 res.end
//但是 如果 服务器端有数据返回到客户端 这个时候必须用res.send ,不能用 res.end（会报错）
//说明微信客户端不是通过接受数据处理xml信息的,可能是解析页面时处理，如html标签解析
}

module.exports = new wx();
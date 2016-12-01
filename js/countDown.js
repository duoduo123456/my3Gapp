define(["jquery"],function(){
	return {
		countDown:function(dom){
			var dom=typeof dom == "string" ? $(dom) : dom;
			var count=59,timer=null;
				dom.addClass("getNum");
				dom.html(count+"s后重发");
			timer=setInterval(function(){
				count--;
				if(count<0){
					dom.html("获取验证码");
					clearInterval(timer);
					dom.removeClass("getNum");
				}else{
					dom.addClass("getNum");
					dom.html(count+"s后重发");
				}
			},1000)
		}
	}
})
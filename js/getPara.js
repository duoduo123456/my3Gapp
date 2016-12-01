define(['jquery'],function($){
	return {
		parameter:function(para){
			var paras=decodeURI(para).substr(1);
			var arr=paras.split("&");
			var obj={};
			for(var i=0;i<arr.length;i++){
				var key=arr[i].split("=")[0],
					val=arr[i].split("=")[1];
					obj[key]=val
			}
			return obj;
		}
	}
	
})
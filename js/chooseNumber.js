define(["jquery",'getPara'],function($,para){
	$.getJSON("../data/phoneNumber.json")
	 .done(function(e){
	 	var str="",
	 		data=e.phoneNumber;
	 	for(var i=0;i<data.length;i++){
	 		if(i==0){
	 			str+="<li class='bg'>"+data[i].tel+"</li>";
	 		}else{
	 			str+="<li>"+data[i].tel+"</li>";
	 		}
	 		
	 	}
	 	$(".content>ul").html(str);
	 	if(location.search){
	 		var obj=para.parameter(location.search);
	 		var ind=obj['ind'],
	 			iccid=obj['iccid'];
	 		$(".content").find("li").eq(ind).addClass("bg").siblings().removeClass("bg");
	 	}
	 	$(".content").on("click","li",function(){
	 		$(this).addClass("bg").siblings().removeClass("bg");
	 		var tel=$(this).html(),
	 			ind=$(this).index(),
	 			parameters="?tel="+tel+"&ind="+ind+"&iccid="+iccid;
	 		location.href="chooseDouble.html"+encodeURI(parameters);

	 	})
	 })
})
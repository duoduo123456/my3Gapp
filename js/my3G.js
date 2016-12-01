define(['jquery','validate'],function($,validate){
	
	$('.reSend').hide();
	var validateNumber=null,idCardNumber=null;
	//身份证校验
	$(".idCard").on("input propertychange",function(){
		var idNum=$.trim($(this).val());
			if(validate.idCard(idNum)){
				$('.getNum').addClass("getBg");
			}else{
				$('.getNum').removeClass("getBg");
			}
			checkLogin();		
	});
	//点击获取验证码
	$('.getNum').on("click",function(){
		if(!$(this).hasClass("getBg")){
			return false;
		}
		$.ajax({
			url:"../data/data.json",
			type:"get",
			success:function(e){
				validateNumber=e.message;
			}
		})
		$(".getNum").hide();
		$('.reSend').show();
		$(".reSend").find("i").html("59s后重发");
		var timer=null,countNum=59;
		var timer=setInterval(function(){
				countNum--;
				if(countNum<0){
					clearInterval(timer);
					$(".getNum").show();
					$('.reSend').hide();
					return false;
				}else{
					var text=countNum+"s后重发";
					$(".reSend").find("i").html(text);
				}		
			},1000)
	})
	//验证码校验
	$('.verifyNum').on("input propertychange",function(){
		checkLogin();
	})
	//判断是否满足条件 登录按钮状态
	function checkLogin(){
		if(validate.idCard($.trim($('.idCard').val())) && validate.verifyCode($.trim($('.verifyNum').val())) && $.trim($('.verifyNum').val())==validateNumber){
			$("#login").addClass("btnbg");
		}else{
			$("#login").removeClass("btnbg");
		}
	}
	//点击登录按钮
	$("#login").on("click",function(){
		if(!$(this).hasClass("btnbg")){
			return false;
		}
		var idCardValue=$('.idCard').val();
		var str="?idCard="+idCardValue+"&info=你好";
		window.location.href="accountMoney.html"+encodeURI(str);
	})
	//点击开卡按钮
	$(".openCard").on("click",function(){
		window.location.href="bindQuestion.html";
	})
	
})
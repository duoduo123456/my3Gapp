define(["jquery","validate","countDown"],function($,validate,tools){
	var phoneNumber=$(".phoneNumber"),
		imageCode=$(".imageCode"),
		verifyCode=$(".verifyCode"),
		codeSpan=$(".codeSpan"),
		confirmPhoneNumber=null,
		imageCodeNum=null;
		ajaxNum=null;
	//手机号码验证
	phoneNumber.on("input propertychange",function(){
		checkVerifyCode();
		checkBindBtn();
	})
	//图片验证码校验
	imageCode.on("input propertychange",function(){
		checkVerifyCode();
		checkBindBtn();
	})
	//手机验证码校验
	verifyCode.on("input propertychange",function(){
		checkBindBtn()
	})
	//何时可以点击获取验证码
	function checkVerifyCode(){
		var phoneNumberValue=$.trim(phoneNumber.val()),
			imageCodeValue=$.trim(imageCode.val()),
			imageCodeNum=$(".imageNum").data("id");
			if(validate.phoneNumber(phoneNumberValue) && validate.imageVerifyCode(imageCodeValue) && imageCodeValue==imageCodeNum){
				codeSpan.addClass("bg");
			}else{
				codeSpan.removeClass("bg");
			}
	}
	//何时可以点击绑定按钮
	function checkBindBtn(){
		var phoneNumberValue=$.trim(phoneNumber.val()),
			imageCodeValue=$.trim(imageCode.val()),
			imageCodeNum=$(".imageNum").data("id");
			verifyCodeValue=$.trim(verifyCode.val());
			//保证所有input的value符合正则,且点击按钮时input的value值保持一致
			if(validate.phoneNumber(phoneNumberValue) && validate.imageVerifyCode(imageCodeValue) && validate.verifyCode(verifyCodeValue) && phoneNumberValue==confirmPhoneNumber && imageCodeValue==imageCodeNum && verifyCodeValue==ajaxNum){
				$(".bind").addClass("active")
			}else{
				$(".bind").removeClass("active")
			}
	}
	//当点击绑定按钮时
	bindBtnClick();
	function bindBtnClick(){
		$(".bind").on("click",function(){
			if(!$(this).hasClass("active")){
				return;
			}
			$(".info").html("");
			window.location.href="chooseDouble.html";
		})
	}
	//点击获取验证按钮
	clickCodeSpan();
	function clickCodeSpan(){
		var flag;
		codeSpan.on("click",function(){
			$(".info").html("验证码已发送至 "+phoneNumber.val());
			//保证点击按钮时电话号码值未被改变
			confirmPhoneNumber=$.trim(phoneNumber.val());
			//防止连续启动定时器
			if(!codeSpan.hasClass("getNum")){
				flag=true;
			}else{
				flag=false;
			}
			if(!$(this).hasClass("bg")){
				return false;
			}
			if(flag){
				getAjax();
				tools.countDown($(this))
			}	
		})
	}
	//点击获取验证码,请求数据
	function getAjax(){
		$.when($.ajax({
			url:"../data/data.json",
			type:"GET",
			dataType:"json",
		}))
		 .then(function(data){
		 	ajaxNum = data.message;
		 })
	}
})
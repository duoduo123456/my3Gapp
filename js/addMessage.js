define(["jquery","validate","getPara"],function($,validate,getPara){

	//定义一个全局变量,用来接收地址栏传递的参数
	var uploadBtn=null;

	//确保返回页面时输入的信息不消失  这里运用本地存储webStorage
	//sessionStorage.clear();
	init();
	function init(){
		if(!sessionStorage.getItem("message")){
			return false;
		}
		var data=JSON.parse(sessionStorage.getItem("message"));
			$(".name").val(data['name']);
			$(".idCard").val(data['idCard']);
			$(".address").val(data['address']);
			$(".tel").val(data['tel']);
	}

	//获取地址栏参数
	getParameter();
	function getParameter(){
		if(!location.search)return false;
		var obj=getPara.parameter(location.search)
		    uploadBtn=obj['uploading'];
	}
	//点击阅读协议按钮
	clickBtn()
	function clickBtn(){
		$(".btn3").on("click",function(){
			if(!$(this).hasClass("active")){
				$(this).addClass("active")
			}else{
				$(this).removeClass("active")
			}
			submitBtn();
		})
	}
	//检测姓名
	checkIdName()
	function checkIdName(){
		$(".name").on("input propertychange",function(){
			submitBtn();
		})
		
	}

	//检测身份证号
	checkIdCard()
	function checkIdCard(){
		$(".idCard").on("input propertychange",function(){
			submitBtn();
		})
	}

	//检测住址
	checkIdAddress()
	function checkIdAddress(){
		$(".address").on("input propertychange",function(){
			submitBtn();
		})
	}

	//检测电话号码
	checkPhoneNumber()
	function checkPhoneNumber(){
		$(".tel").on("input propertychange",function(){
			submitBtn();
		})
	}

	//上传照片
	uploadIdPic()
	function uploadIdPic(){
		$(".card").on("click",function(){
			var obj={},
				name=$(".name").val(),
				idCard=$(".idCard").val(),
				address=$(".address").val(),
				tel=$(".tel").val();
				obj.name=name;
				obj.idCard=idCard;
				obj.address=address;
				obj.tel=tel;
				sessionStorage.setItem("message",JSON.stringify(obj))

			window.location.href="uploadCardPic.html";
		})
		if(uploadBtn=="ok"){
			$(".card").addClass("bg")
			$('.card').find('span').html('证件照已上传')
		}else{
			$(".card").removeClass("bg")
			$('.card').find('span').html('上传照片')
		}
		submitBtn();
	}
	//何时可以点击提交按钮及点击提交按钮
	submitBtn();
	function submitBtn(){
		if( validate.idName($('.name').val())&&validate.idCard($('.idCard').val())&&validate.idAddress($.trim($('.address').val()))&&validate.phoneNumber($('.tel').val())&& $(".card").hasClass("bg") && $(".tip .btn3").hasClass("active")){
			$('.cbtn').addClass("active")
		}else{
			$('.cbtn').removeClass("active");

		}
		$(".submitBtn").on("click",function(){
			if($(this).hasClass("active")){
				sessionStorage.clear();
				location.href="inform-detail.html";
			}else{
				return false;
			}	
		})
	}
})
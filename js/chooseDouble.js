define(['jquery','getPara','validate','slideSelector'],function($,para,validate,slider){
	$('.mark').hide();
	$('.iccid').on("click",function(){
		$('.mark').show();
	})
	$('.mark').on("click",function(){
		$(this).hide();
	})
	var ind=null;

	checkICCID();
	//检测ICCID
	function checkICCID(){
	
		$(".watch1").on("input propertychange",function(){
			var val=$(this).val();
			var str=val.replace(/\d{5}/g,function(num){
				return num.substr(0,4)+" "+num.substr(4)
			})
			$(this).val(str);
			nextStep();	
		})

	}

	getParas();
	//获取参数
	function getParas(){
		if(location.search){
			var obj=para.parameter(location.search);
			ind=obj['ind'];
			var iccid=obj["iccid"];
			$(".watch2").html("已选 "+obj['tel']);
			$(".watch2").addClass("bg");
			$(".watch1").val(iccid);
		}else{
			$(".watch2").removeClass("bg")
		}
		
	}

	choosePhoneNumber();
	//选择电话号码
	function choosePhoneNumber(){
		$(".watch2").on("click",function(){
			iccid=$('.watch1').val();
			var str="?ind="+ind+"&iccid="+iccid;
			window.location.href="chooseNumber.html"+encodeURI(str);
		})
	}

	choosePhonePrice();
	//选择预存金额
	function choosePhonePrice(){
		$(".phonePay").on("click",function(){
			var slide=slider.slideSelector();
			slide.show({
				title:"充值金额",
				data:["10元","20元","30元","50元","100元","200元"],
				startIndex:2,
				done:function(data){
					$(".phonePay").html(data.value)
				}
			})
		})
	}

	chooseOthers();
	//选择套餐
	function chooseOthers(){
		$("section").on("click",".meal",function(){
			var ind=$(this).data("ind");
			$(".meal").eq(ind).addClass("bg").siblings().removeClass("bg");
		})
		$(".phoneShow").on("click","li",function(){
			$(this).addClass("bg").siblings().removeClass("bg")
		})
	}

	nextStep();
	//检测何时满足条件,可以点击下一步
	function nextStep(){
		if(validate.ICCID($.trim($('.watch1').val()))&&$(".watch2").hasClass("bg")){
			$(".down").addClass("active")
		}else{
			$(".down").removeClass("active")
		}
	}

	clickBtn();
	//点击下一步
	function clickBtn(){
		$(".down").on("click",function(){
			if(!$(this).hasClass("active")){
				return false;
			}
			window.location.href="addMessage.html";
		})
	}
	
})
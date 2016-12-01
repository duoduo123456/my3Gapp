define(['jquery','validate'],function($,validate){
	// var urlInfo=window.location.search;
	// console.log(decodeURI(urlInfo))
	switchNav();
	function switchNav(){
		$(".nav").on("click","li",function(){
			var ind=$(this).index();
			$(this).addClass("bg").siblings().removeClass("bg");
			$('.sub').eq(ind).css({
				"transform":"translate3d(0,0,0)",
				"transition":"transform .3s linear"
			}).siblings().css({
				"transform":"translate3d(100%,0,0)"
			})
		})
	}

	checkNumber();
	function checkNumber(){
		$(".countNumber").on("input propertychange",function(){
			var str=$(this).val();
			str=str.replace(/^\d{4}/,function(a){
				return a.substr(0,3)+" "+a.substr(3);
			}).replace(/\d{5}/g,function(b){
				return b.substr(0,4)+" "+b.substr(4);
			})
		
			$(this).val(str)

			if(validate.phoneNumber(str.replace(/\s*/g,""))){
				$(".btn").addClass("active")
			}else{
				$(".btn").removeClass("active")
			}
		})

	}

	choosePrice();
	function choosePrice(){
		$(".price").on("click","span",function(){
			$(this).addClass("bg").siblings().removeClass("bg")
		})
	}

	pay();
	function pay(){
		$('.pay').on("click",function(){
			if(!$(this).hasClass("active")){
				return false;
			}
			window.location.href="onlineState.html";
		})
		
	}

	exitLogin();
	function exitLogin(){
		$('.exit').on("click",function(){
			window.location.href="my3G.html"
		})
	}
})
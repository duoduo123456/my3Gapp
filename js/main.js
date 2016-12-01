require.config({
	paths:{
		"jquery":"../libs/jquery.min"
	}
})

require(["my3G","bindQuestion","chooseDouble","uploadCardPic","accountMoney","chooseNumber","addMessage","inform-detail"],function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/7.2+"px";
})
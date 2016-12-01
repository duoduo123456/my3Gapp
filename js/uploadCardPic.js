define(['jquery',"uploadImg"],function($,uploadTool){
	function finishBtn(){
		if($('.file1').val()!="" && $('.file2').val()!="" && $('.file3').val()!=""){
			$('.cbtn').addClass("active")
		}else{
			$('.cbtn').removeClass("active")
		}
	}
	//点击完成按钮 
	clickFinishBtn()
	function clickFinishBtn(){
		$(".cbtn").on("click",function(){
			if(!$(this).hasClass("active"))return;
			var str="?uploading=ok"
			location.href="addMessage.html"+encodeURI(str)
		})
	}

	uploadTool.upload(".file1",".pic1","0.6",finishBtn);
	uploadTool.upload(".file2",".pic2","0.6",finishBtn);
	uploadTool.upload(".file3",".pic3","0.6",finishBtn);
})
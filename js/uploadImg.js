define(['jquery'],function($){
	return {
		upload:function(inputDom,imgDom,rate,finishBtn){
			$(inputDom).on("change",function(){
				var w=$(this).width(),
					h=$(this).height();
				var type=this.files[0].type;
				var reader=new FileReader();
				reader.readAsDataURL(this.files[0]);
				reader.onload=function(){
					var myCanvas=document.createElement("canvas"),
						cvs=myCanvas.getContext("2d");
						myCanvas.width=w;
						myCanvas.height=h;
					var img=new Image();
						img.src=this.result;
						img.onload=function(){
							cvs.drawImage(img,0,0,w,h);
							var src=myCanvas.toDataURL(type,rate);
							$(imgDom).attr({"src":src})
						}	
				}
				finishBtn();
			})
		}
	}
})
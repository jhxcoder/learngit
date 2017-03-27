$(window).on("load",function(){
	watrefall();
	$(window).on("scroll",function(){
		if (checkScrollSlide) {
			var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
			$.each(dataInt.data,function(key,value){
				var oBox=$("<div>").addClass("box").appendTo($("#main"));
				var oPic=$("<div>").addClass("pic").appendTo($(oBox));
				var Img=$("<img>").attr("src","images/"+$(value).attr("src")).appendTo($(oPic));
			})
			watrefall();
		}
	})
})
function watrefall() {
	var $boxs=$(".box");
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$("#main").width(cols*w).css("margin","0 auto");
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		} else {
			var minH=Math.min.apply(null,hArr);
			var minIndex=$.inArray(minH,hArr);
			$(value).css({
				"position":"absolute",
				"top":minH+"px",
				"left":minIndex*w+"px"
			})
			hArr[minIndex]+=h;
		}
	})
}
function checkScrollSlide() {
	var $lastBoxH=Math.floor($(".box").last().outerHeight()/2);
	var offsetT=$(".box").last().offset().top;
	var lastBoxDis=$lastBoxH+offsetT;
	var documentH=$(window).height();
	var scrollT=$(window).scrollTop();
	return (lastBoxDis<documentH+scrollT)?true:false;
}
function addLoadEvent(func) {
	var oldonload=window.onload;
	if (typeof window.onload!="function") {
		window.onload=func;
	} else {
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
addLoadEvent(showTime);
	function showTime() {
		var endTime=new Date("2017/8/5,12:20:12");
		var nowTime=new Date();
		var leftTime=parseInt((endTime.getTime()-nowTime.getTime())/1000);
		var d=parseInt(leftTime/(24*60*60));
		var h=parseInt(leftTime/(60*60)%24);
		var m=parseInt(leftTime/60%60);
		var s=parseInt(leftTime%60);
		if (leftTime<=0) {
			document.getElementById('LeftTime').innerHTML="团购结束";
			clearTimeout(timer);
		} else {
			document.getElementById('LeftTime').innerHTML=d+"天"+h+"时"+m+"分"+s+"秒";
		}
		var timer=setTimeout(showTime,900);
	}
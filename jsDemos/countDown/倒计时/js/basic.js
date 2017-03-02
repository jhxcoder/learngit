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
addLoadEvent(countDown);
	function countDown() {
		var curTime=new Date();
		var endTime=new Date("2017,6,6");
		var leftTime=Math.ceil((endTime.getTime()-curTime.getTime())/(1*24*60*60*1000));
		if (leftTime>0) {
			document.getElementById('timeShow').innerHTML=leftTime+"天";
		}else{
			clearTimeout(timer);
			return;
		}
		var timer=setTimeout(countDown,500);
	}
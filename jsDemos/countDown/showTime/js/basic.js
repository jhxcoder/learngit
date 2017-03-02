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
addLoadEvent(checkTime);
	function showTime() {
		var myDate=new Date();
		var year=myDate.getFullYear();
		var month=myDate.getMonth()+1;
		var date=myDate.getDate();
		var show=document.getElementById('show');
		var day=myDate.getDay();
		var weekend=new Array(7);
		weekend[0]="星期天";
		weekend[1]="星期一";
		weekend[2]="星期二";
		weekend[3]="星期三";
		weekend[4]="星期四";
		weekend[5]="星期五";
		weekend[6]="星期六";
		var h=myDate.getHours();
		var m=myDate.getMinutes();
		var s=myDate.getSeconds();
		m=checkTime(m);
		s=checkTime(s);
		show.innerHTML=year+"年"+month+"月"+date+"日"+weekend[day]+h+"时"+m+"分"+s+"秒";
		setTimeout(showTime,500);
	}
	function checkTime(i) {
		if (i<10) {
			i="0"+i;
		}
		return i;
	}
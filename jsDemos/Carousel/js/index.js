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
addLoadEvent(movePicture);
		function movePicture() {
			var container=document.getElementById('container');
			var list=document.getElementById('list');
			var buttons=document.getElementById("buttons").getElementsByTagName('span');
			var prev=document.getElementById("prev");
			var next=document.getElementById("next");
			var index=1;
			var animated=false;
			if (!list.style.left) {
				list.style.left="-600px";
			}
			function animate(offset) {
				animated=true;
				var time=300;
				var interval=30;
				var speed=Math.ceil(offset/(time/interval));
				var newLeft=parseInt(list.style.left)+offset;
				function go() {
					if (parseInt(list.style.left)>newLeft&&speed<0||parseInt(list.style.left)<newLeft&&speed>0) {
						list.style.left=parseInt(list.style.left)+speed+"px";
						setTimeout(go,interval);
					} else {
						list.style.left=newLeft+"px";
						if (newLeft<-3000) {
							list.style.left="-600px";
						}
						if (newLeft>-600) {
							list.style.left="-3000px";
						}
						
						animated=false;
					}
				}
				
				go();
				return false;
			}
			function showButton() {
				for (var i = 0; i < buttons.length; i++) {
					if (buttons[i].className=="on") {
						buttons[i].className="";
						break;
					}
				}
				buttons[index-1].className="on";
			}
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].onclick=function(){
					var myIndex=parseInt(this.getAttribute("index"));
					var offset=-600*(myIndex-index);
					animate(offset);
					index=myIndex;
					showButton();
				}
			}
			next.onclick=function(){
				if (animated) {
					return;
				}
				if (index==5) {
					index=1
				} else {
					index++
				}
				showButton();
				return animate(-600);
			}
			prev.onclick=function(){
				if (animated) {
					return;
				}
				if (index==1) {
					index=5;
				} else {
					index--;
				}
				showButton();
				return animate(600);
			}
			function play() {
				timer=setInterval(next.onclick,3000);
			}
			function stop() {
				clearInterval(timer);
			}
			play();
			container.onmouseover=stop;
			container.onmouseout=play;
			
		}
		
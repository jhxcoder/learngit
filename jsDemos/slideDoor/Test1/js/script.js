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
addLoadEvent(slideDoor);
	function slideDoor() {
		var box=document.getElementById('container');
		// Nodelist对象
		var imgs=box.getElementsByTagName('img');
		var imgWidth=imgs[0].offsetWidth;
		var exposeWidth=160;
		// 容器宽度
		var boxWidth=imgWidth+(imgs.length-1)*exposeWidth;
		box.style.width=boxWidth+"px";
		// 设置初始状态图片left
		function setImgPos() {
			for (var i = 1; i < imgs.length; i++) {
			imgs[i].style.left=imgWidth+(i-1)*exposeWidth+"px";
			}
		}
		setImgPos();
		var translate=imgWidth-exposeWidth;
		for (var i = 0; i < imgs.length; i++) {
			(function(i){
				imgs[i].onmouseover=function(){
					// 先将每道门复位
					setImgPos();
					// 打开门
					for (var j = 1; j<=i; j++) {
						imgs[j].style.left=parseInt(imgs[j].style.left,10)-translate+"px";
					}
				};
			})(i);
		}
	}
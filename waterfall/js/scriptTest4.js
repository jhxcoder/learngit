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
addLoadEvent(waterfall("main","box"));
addLoadEvent(loadPicture);
		function loadPicture(){
			window.onscroll=function(){
				if (checkScrollSlide) {
					var oparent=document.getElementById('main');
					var dataInt={
						data:[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]
					}
					for (var i = 0; i < dataInt.data.length; i++) {
						var obox=document.createElement("div");
						obox.className="box";
						oparent.appendChild(obox);
						var opic=document.createElement("div");
						opic.className="pic";
						obox.appendChild(opic);
						var Img=document.createElement("img");
						Img.src="images/"+dataInt.data[i].src;
						opic.appendChild(Img);
					}
					waterfall("main","box");
				}
			}
		}
		function waterfall(parent,box) {
			var oparent=document.getElementById(parent);
			var oBoxs=getObjByClass(oparent,box);
			var oBoxW=oBoxs[0].offsetWidth;
			var bodyW=document.documentElement.clientWidth;
			var cols=Math.floor(bodyW/oBoxW);
			oparent.style.width=cols*oBoxW+"px";
			oparent.style.margin="0 auto";
			var hArr=[];
			for (var i = 0; i < oBoxs.length; i++) {
				if (i<cols) {
					hArr.push(oBoxs[i].offsetHeight);
				} else {
					var minH=Math.min.apply(null,hArr);
					var index=getMinhIndex(hArr,minH);
					var minL=oBoxs[index].offsetLeft;
					oBoxs[i].style.position="absolute";
					oBoxs[i].style.left=minL+"px";
					oBoxs[i].style.top=minH+"px";
					hArr[index]+=oBoxs[i].offsetHeight;
				}
			}
		}
				function getObjByClass(parentEle,box) {
					var boxArr=[];
					var eles=parentEle.getElementsByTagName('*');
					for (var i = 0; i < eles.length; i++) {
						if (eles[i].className==box) {
							boxArr.push(eles[i]);
						}
					}
					return boxArr;
				}
				function getMinhIndex(Arr,val) {
					for (var i = 0; i < Arr.length; i++) {
						if (Arr[i]==val) {
							return i;
						}
					}
				}
				function checkScrollSlide() {
					var oparent=document.getElementById('main');
					var oBoxs=getObjByClass(oparent,"box");
					var lastH=Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
					var lastT=oBoxs[oBoxs.length-1].offsetTop;
					var bodyH=document.body.clientHeight||document.documentElement.clientHeight;
					var scrollT=document.body.scrollTop||document.documentElement.scrollTop;
					return lastH+lastT<bodyH+scrollT?true:false;
				}

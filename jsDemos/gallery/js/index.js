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
addLoadEvent(turn);
addLoadEvent(go);
addLoadEvent(addPhotos);
	
	// 3.通用函数
	function go(selector) {
		var method=selector.substr(0,1)=="."?"getElementsByClassName":"getElementById";
		return document[method](selector.substr(1));
	}
	// 随机函数 支持一个取值范围 range[min,max]
	function random(range) {
		var max=Math.max(range[0],range[1]);
		var min=Math.min(range[0],range[1]);
		var diff=max-min;
		var number=Math.floor(Math.random()*diff+min);
		return number;
	}

			// 4.输出所有海报
			var data=data;
			function addPhotos() {
				
				var template=go("#wrap").innerHTML;
				var htmls=[];
				var nav=[];
				for (s in data) {
					var _html=template
									.replace("{{index}}",s)
									.replace("{{img}}",data[s].img)
									.replace("{{caption}}",data[s].caption)
									.replace("{{desc}}",data[s].desc);
					htmls.push(_html);
					nav.push('<span class="i" id="nav_'+s+'" onclick="turn(go(\'#photo_'+s+'\'))"></span>');
				}
				htmls.push('<div class="nav">'+nav.join("")+'</div>');
				go("#wrap").innerHTML=htmls.join("");
				rsort(random([0,data.length]));
			}
			addPhotos();
			// 6.计算左右分区设置x、y的取值范围。
			function range() {
				var range={left:{x:[],y:[]},right:{x:[],y:[]}};
				var wrap={
					w:go("#wrap").clientWidth,
					h:go("#wrap").clientHeight
				}
				var photo={
					w:go(".photo")[0].clientWidth,
					h:go(".photo")[0].clientHeight
				}
				range.wrap=wrap;
				range.photo=photo;
				range.left.x=[0-photo.w,wrap.w/2-photo.w/2];
				range.left.y=[0-photo.h,wrap.h];
				range.right.x=[wrap.w/2+photo.w/2,wrap.w];
				range.right.y=[range.left.y[0],range.left.y[1]];
				return range;
			}
			// 5.排序海报+设置当前按钮
				function rsort(n) {
					var _photo=go(".photo");
					var photos=[];
					for (var i = 0; i < _photo.length; i++) {
						_photo[i].className=_photo[i].className.replace(/\s*photo_center\s*/," ");
						_photo[i].className=_photo[i].className.replace(/\s*photo_back\s*/," ");
						_photo[i].style.left="";
						_photo[i].style.top="";
						_photo[i].style["transform"]=_photo[i].style["-webkit-transform"]="rotate(-360deg) scale(1.3)";

						photos.push(_photo[i]);
					}
					var photo_center=go("#photo_"+n);
					photo_center.className+=" photo_center ";
					photo_center=photos.splice(n,1);
					var photo_left=photos.splice(0,Math.ceil(photos.length/2));
					var photo_right=photos;
					var ranges=range();
					for (var i = 0; i < photo_left.length; i++) {
						photo_left[i].style.left=random(ranges.left.x)+"px";
						photo_left[i].style.top=random(ranges.left.y)+"px";
						photo_left[i].style['-transform']=photo_left[i].style['-webkit-transform']='rotate('+random([-60,70])+'deg) scale(1)';
					}
					for (var i = 0; i < photo_right.length; i++) {
						photo_right[i].style.left=random(ranges.right.x)+"px";
						photo_right[i].style.top=random(ranges.right.y)+"px";
						photo_right[i].style['transform']=photo_right[i].style['-webkit-transform']='rotate('+random([-60,70])+'deg) scale(1)';
					}
					var navs=go(".i");
					for (var i = 0; i < navs.length; i++) {
						navs[i].className=navs[i].className.replace(/\s*i_current\s*/," ");
						navs[i].className=navs[i].className.replace(/\s*i_back\s*/," ");
					}
					go("#nav_"+n).className+=" i_current ";

				}

			// 1.翻面控制
			function turn(ele) {
				var cls=ele.className;
				var n=ele.id.split("_")[1];
				if (!/photo_center/.test(cls)) {
					return rsort(n);
				}
				if (/photo_front/.test(cls)) {
					cls=cls.replace(/photo_front/,"photo_back");
					go("#nav_"+n).className+=" i_back ";
				} else {
					cls=cls.replace(/photo_back/,"photo_front");
					go("#nav_"+n).className=go("#nav_"+n).className.replace(/\s*i_back\s*/," ");
				}
				return ele.className=cls;
			}
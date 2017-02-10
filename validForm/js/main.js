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
addLoadEvent(test);
addLoadEvent(getLength);
	function getLength(str) {
		return str.replace(/[^\x00-xff]/g,"xx").length;
	}
	function findStr(str,n) {
		var temp=0;
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i)==n) {
				temp++;
			}
		}
		return temp;
	}
	function test() {
		var aInput=document.getElementsByTagName('input');
		var oName=aInput[0];
		var pwd=aInput[1];
		var pwdA=aInput[2];
		var aP=document.getElementsByTagName('p');
		var oName_msg=aP[0];
		var pwd_msg=aP[1];
		var pwdA_msg=aP[2];
		var count=document.getElementById('count');
		var aEm=document.getElementsByTagName('em');
		var name_length=0;
		
		// 数字、字母（不区分大小写）、下划线、汉字
	
		// 用户名
		oName.onfocus=function(){
			oName_msg.style.display="block";
			oName_msg.innerHTML='<i class="ati"></i>5-25个字符，一个汉字为两个字符，推荐使用中文会员名'
		}
		oName.onkeyup=function(){
			count.style.visibility="visible";
			name_length=getLength(this.value);
			count.innerHTML=name_length+'个字符';
			if (name_length==0) {
				count.style.visibility="hidden";
			}
		}
		oName.onblur=function(){
			// 非法字符
			var re=/[^\w\u4e00-\u9fa5]/g;
			if (re.test(this.value)) {
				oName_msg.innerHTML='<i class="err"></i>含有非法字符';
			} 
			// 空字符
			else if(this.value==""){
				oName_msg.innerHTML='<i class="err"></i>空字符';
			}
			// /大于25个字符
			else if(name_length>25){
				oName_msg.innerHTML='<i class="err"></i>大于25个字符';
			}
			// 小于6个字符
			else if(name_length<6){
				oName_msg.innerHTML='<i class="err"></i>小于6个字符';
			}
			// ok
			else{
				oName_msg.innerHTML='<i class="ok"></i>ok!';
			}
		}

		//密码
		// 登录密码
		pwd.onfocus=function(){
			pwd_msg.style.display="block";
			pwd_msg.innerHTML='<i class="ati"></i>6-16个字符，请使用字母加数字或符号的组合密码,不能单独使用字母、数字或符号';
		}
		pwd.onkeyup=function(){
			// 大于5个字符
			if (this.value.length>5) {
				aEm[1].className="active";
				pwdA.removeAttribute("disabled");
				pwdA_msg.style.display="block";
			} else {
				aEm[1].className="";
				pwdA.setAttribute("disabled","disabled");
				pwdA_msg.style.display="none";
			}
			// 大于10个字符
			if (this.value.length>10) {
				aEm[2].className="active";
			} else {
				aEm[2].className="";
			}
		}
		pwd.onblur=function(){
			var re_n=/[^\d]/g;
			var re_t=/[^a-zA-Z]/g;
			var m=findStr(this.value,this.value[0]);
			// 不能为空字符
			if (this.value=="") {
				pwd_msg.innerHTML='<i class="err"></i>不能为空字符';
			}
			// 不能使用相同字符
			else if(m==this.value.length&&this.value.length>1){
				pwd_msg.innerHTML='<i class="err"></i>不能使用相同字符';
			}
			// 长度应为6-16个字符
			else if(this.value.length<6||this.value.length>16){
				pwd_msg.innerHTML='<i class="err"></i>长度应为6-16个字符';
			}
			// 不能全为数字
			else if(!re_n.test(this.value)){
				pwd_msg.innerHTML='<i class="err"></i>不能全为数字';
			}
			// 不能全为字母
			else if(!re_t.test(this.value)){
				pwd_msg.innerHTML='<i class="err"></i>不能全为字母';
			}
			// ok
			else{
				pwd_msg.innerHTML='<i class="ok"></i>ok!';
			}
		}
		pwdA.onblur=function(){
			if (pwdA.value!=pwd.value) {
				pwdA_msg.innerHTML='<i class="err"></i>两次输入密码不一致!!';
			} else {
				pwdA_msg.innerHTML='<i class="ok"></i>ok!';
			}
		}
	}
	
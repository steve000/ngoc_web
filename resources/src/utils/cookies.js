const cookies = {
	
	//设置cookie
	setCookie(c_name, value, expiredays) {
		const exDate = new Date();
		exDate.setDate(exDate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exDate.toGMTString());
	},
	
	//获取cookie、
	getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return (arr[2]);
		else
			return null;
	},
	
	//删除cookie
	delCookie (name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
};

export default cookies;

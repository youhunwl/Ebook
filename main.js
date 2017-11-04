
function CookieFetcher(){
}
CookieFetcher.prototype.byimpl = function(){
	return "cookie";
}
CookieFetcher.prototype.get = function(name){
	var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	var values = document.cookie.match(reg);
	if (values)
		return unescape(values[2]);
	else
		return null;
}
CookieFetcher.prototype.getIntValue = function(name) {
	var value = this.get(name);
	if (value == "" || value == null) {
		return 0;
	} else {
		return parseInt(value);
	}
}
CookieFetcher.prototype.set = function (name, value, ms, path) {
	if (path){} else {path="/";}
	if (isNaN(ms)) {
		document.cookie = name + "=" + escape(value) + ";path=" + path;
	} else {
		var exp = new Date();
		exp.setTime(exp.getTime() + ms);
		document.cookie = name + "=" + escape(value) + ";path=" + path + ";expires=" + exp.toGMTString(); 
	}
}
CookieFetcher.prototype.remove = function (name) {
	this.set(name, 1, -1);
}
CookieFetcher.prototype.clear = function () {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;)
			document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
	}
}

function LocalStorageFetcher() {}
LocalStorageFetcher.prototype.byimpl = function(){
	return "localStorage";
}
LocalStorageFetcher.prototype.get = function (name) {
	return window.localStorage.getItem(name);
}
LocalStorageFetcher.prototype.getIntValue = function(name) {
	var value = this.get(name);
	if (value == "" || value == null) {
		return 0;
	} else {
		return parseInt(value);
	}
}
LocalStorageFetcher.prototype.set = function (name, value, ms, path) {
	window.localStorage.setItem(name, value);
}
LocalStorageFetcher.prototype.remove = function (name) {
	window.localStorage.removeItem(name);
}
LocalStorageFetcher.prototype.clear = function () {
	window.localStorage.clear();
}
var fetcher = window.localStorage ? new LocalStorageFetcher() : new CookieFetcher();
var helper = {
	"$" : function(id) {
		return document.getElementById(id);
	},
	cookie : new CookieFetcher(),
	store : window.localStorage ? new LocalStorageFetcher() : new CookieFetcher(),
	isMobile : function() {
		return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	},
	log : function(msg) {
		if (console) {
			console.log(msg);
		}
	}
};
function getCookie(name) {
  	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  	if(arr != null) return unescape(arr[2]); return null;
}
function setCookie(name,value,setting) {
	setCookie2(name, value, setting.expires, setting.path);
}
function setCookie2(name,value,date, path, domainName) {
	if (path){} else {path="/";}
	var cookieVar = name + "="+ escape(value) + ";path=" + path;
	if(date) {
		var exp = null;
		if (date instanceof Date) {
			exp = date;
		} else if (date &gt; 100000000) {
			exp = new Date();
			exp.setTime(date);
		} else {
			exp = new Date(); 
			exp.setTime(exp.getTime() + date*60*60*1000);
		}
		cookieVar += ";expires="+ exp.toGMTString()
	}
	if (domainName) {
		cookieVar += ";domain=" + domainName;
	}
	document.cookie = cookieVar;
}
//$.cookie('name', 'value', { expires: 7, path: '/' }); 
//$.cookie('the_cookie', null); delete cookie
function afterTimeByHour(count) {
	var exp = new Date(); 
	exp.setTime(exp.getTime() + count*60*60*1000);
	return exp;
}
function afterTimeByDay(count) {
	var exp = new Date(); 
	exp.setTime(exp.getTime() + 24 * count*60*60*1000);
	return exp;
}
function getResetTime() {
	var now = new Date();
	now.setHours(0);
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);	
	return new Date(24 * 3600 * 1000 + now.getTime());
}

function getCookieForInt(name) {
	var value = getCookie(name);
	if (value == "" || value == null) {
		return 0;
	} else {
		return parseInt(value);
	}
}
function Ajax(url, params, callback, method) {
	this.createHttpRequest = function() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			return new XMLHttpRequest();
		}
	}
	this.url = url;
	this.params = params;
	this.callback = callback;
	this.method = method == null? "post" : method;
	this.xmlHttp = this.createHttpRequest();
	
	window.myAjax = this;
	this.doRequest = function() {
		var query = "";
		for (var param in this.params) {
			if (query != "") {
				query += "&amp;";
			}
			query += param + "=" + this.params[param];
		}
		
		if (this.method == "post") {
			this.xmlHttp.open(this.method, this.url, true);
			this.xmlHttp.onreadystatechange = this.stateChanged;
			this.xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			this.xmlHttp.send(query);
		} else {
			this.url += "?" + query;
			try { 
			this.xmlHttp.open(this.method, this.url, true);
			} catch (err) {}
			this.xmlHttp.send(null);
			return this.xmlHttp.responseText;
		}
	};
	this.stateChanged = function() {
		if (myAjax.xmlHttp.readyState==4 || myAjax.xmlHttp.readyState=="complete") {
			var data = myAjax.xmlHttp.responseText;
			var json = eval("(" + data + ")");
			myAjax.callback(json);
		}
	};
	
}
function doajax(url, params, callback) {
	var ajax = new Ajax(url, params, callback, "post");
	ajax.doRequest();
	/*$.ajax({  
			type:'post',      
			url:url,  
			data:param,  
			cache:false,  
			dataType:'json',  
			success:callback
		}); */
}

var tid = "";
function rl(aid){
	tid = aid;
	doajax("/u/r.htm", {id:aid}, rl2);
	document.getElementById("r" + aid).innerHTML = "<div style="height:30px;line-height:30px;"><font color="red">删除中，请稍后...</font></div>";
}
function rl2(t){
	//alert(t);
	table = document.getElementById("r" + tid);
	table.style.backgroundColor = "#D3FEDA";
	table.innerHTML = "<div style="height:30px;line-height:30px;"><font color="red">已从书架删除！</font></div>";
	setTimeout("var r = document.getElementById('r" + tid + "');r.style.backgroundColor=''; r.innerHTML='';" ,2000);

	tid = "";
}
function pl(aid, cid) {
	var info = aid + "," + cid;
	doajax("/u/pl.htm", {id:info}, plcb);
}
function plcb(data) {
	var json = data;//eval("(" + data + ")");
	if (json.flag == "success") {
		var obj = document.getElementById("pt_prev");
		if (obj == null) {
			obj = document.getElementById("shujia");
		}
		if (obj == null) {
			alert("添加书签成功！");
		} else {
			obj.innerHTML = "<font color="red">已存书签</font>";
		}
	} else if (json.flag == "error") {
		if (json.data == "nl") {
			alert("您还没有登陆，请先登录或如果没有账号，请先注册。");
		} else {
			alert(json.data);
		}
	} else {
	}
}

var voteMessage = "";
function nu(id) {
	voteMessage = "谢谢您的支持，我们将尽快更新。";
	var m = new Object();
	m.k = "ru_" + id;
	m.m = id;
	sm(m);
}
function rerr(id) {
	voteMessage = "举报成功，我们将尽快修改内容。";
	var m = new Object();
	m.k = "re_" + id;
	m.m = id;
	sm(m);
}
function sm(message) {
	message.curl = getCurrentMulu();
	doajax("/m.htm", message, votecb);
}
function ac(cid, id) {
	voteMessage = "null";
	doCounter(id, "AC", cid);
}
function tj(cid,id) {
	voteMessage = "亲，您的推荐我们已收到，谢谢您的支持。";
	doCounter(id, "VT", cid, voteMessage);
}
function doCounter(aid, type, category, repeatMessage) {
	var ckname = "ck" + type;
	if ("AC" == type) {
		ckname = "rids";
	}
	var store = type =="AC" ? helper.cookie : helper.store;	
	var deletedIds = exists(store, ckname, aid, 50);
	if (deletedIds) {
		if (repeatMessage) alert(repeatMessage);
		return;
	}
	vote(type + category, aid);
}
function vote(type, tid) {
	var params = new Object();
	params.ot = type;
	params.tid = tid;
	params.curl = getCurrentMulu();
	doajax("/vote.htm", params, votecb);
}
function votecb(data) {
	var json = data;//eval("(" + data + ")");
	if (json.flag == "success") {
		if (voteMessage) {
			if (voteMessage != "null") {
				alert(voteMessage);
			}
			voteMessage = "";
		} else {
			alert("提交成功。");
		}
	} else if (json.flag == "error") {
		if (json.data == "nl") {
			alert("您还没有登陆，请先登录或如果没有账号，请先注册。");
		} else if (json.data == "repeat") {
			if (voteMessage != "null") {
				alert("重复提交信息。");
			}
		} else {
			alert(json.data);
		}
	}
}
function getCurrentMulu() {
	var index = window.location.href.indexOf("/", 8);
	var path = "/";
	if (index &gt; -1) path = window.location.href.substring(index);
	return path;
}

function showlogin(){//顶部登录框判断是否登录
	//doAjax("/modules/article/wapajax.php", "showlogin=1", "showlogin2", "GET", 0);
	var ccu = getCookie("ccu");
	if (ccu != null &amp;&amp; ccu.length ==32) {
		//document.getElementById("info").style.display = "";
		//document.getElementById("login_top").style.display = "none";
		showlogin2("用户信息");
	}
}
function showlogin2(t){//顶部登录框判断是否登录
	var login_top = document.getElementById("login_top");
	if(t != "nologin"){
		login_top.innerHTML = "<div onclick="show_bookcase()" style="max-width:90px;overflow:hidden;height:50px;padding:0px 10px;" class="c_index_top">" + t + "&lt;\/div&gt;";
	}
}

function check() {
	window.location.href='?url=/modules/article/waps.php?keyword=';
		//return false;
}
function fixwidth(){
	var _52mb_head = document.getElementById("_52mb_head");
	var _52mb_h1 = document.getElementById("_52mb_h1");
	_52mb_h1.style.width = (_52mb_head.scrollWidth-175) + "px";
}
function show_bookcase(){
	var info = document.getElementById("info");
	if(info.style.display == "block"){
		info.style.display = "none";	
	}
	else{
		info.style.display = "block";	
	}
}

function login(){//开启登录
	var name = document.getElementById("name").value;
	if (name == "") {
		alert("用户名不能为空。");
		return;
	}
	var password = document.getElementById("password").value;
	if (password == "") {
		alert("密码不能为空。");
		return;
	}
	var v = {};
	v.name = name;
	v.password = md5(password);
	v.autoLogin = "1";
	v.autologin = "1";
	doajax("/u/login.htm", v, function(json) {
			if (json.flag == "error") {
				if (json.data == "2") {
					alert("用户名或密码错误。");
				} else if(json.data == "3") {
					alert("账户未激活。");
				} else {
					alert(json.data);
				}
			} else if (json.flag == "success") {
				location.href="/bookcase.php";
			} 
		});
}


function is_login(t){
	if(t == "right"){
		document.getElementById("logintips").innerHTML = "登录成功！";
		var urlarray= new Array(); //定义一数组
		urlarray = document.URL.split("?url="); //字符分割
		url = urlarray[1]; 
		if(url){
			url = url.replace(/\%2F/g,"/");
			url = url.replace(/\%3A/g,":");
			url = url.replace(/\%23/g,"");
			url = url.replace(/\%3F/g,"?");
			url = url.replace(/\%3D/g,"=");
			url = url.replace(/\%26/g,"&amp;");
			window.location.href = url;	
		}
		else{
			window.location.href = "/wap/";	
		}
	}
	else{
		document.getElementById("logintips").innerHTML = "帐号或密码错误，登录失败！";	
	}
}

var tid = "";


function shuqian(aid,cid){
	//alert("shuqian");	
	doAjax("/modules/article/addbookcase.php", "bid=" + aid + "&amp;cid=" + cid, "shuqian2", "GET", 0);
}
function shuqian2(t){
	document.getElementById("pt_prev").innerHTML = "<font color="red">已存书签</font>";
}

function shujia(aid){
	//alert("shujia");	
	doAjax("/modules/article/addbookcase.php", "bid=" + aid, "shujia2", "GET", 0);
}
function shujia2(t){
	//alert(t);
	document.getElementById("shujia").innerHTML = "<font color="red">已加入书架！</font>";
}

//全部章节并分页
function allchapter(aid,page){
	var chapter_load = document.getElementById("chapter_load");
	
	chapter_load.style.display = "block";
	
	var pagetips = document.getElementById("pagetips");
	if(pagetips){pagetips.style.display = "none";}
	
	
	if(page == "gopage"){
		var pagenum = document.getElementById("pagenum");
		if(pagenum.value != ""){
			if(!isNaN(pagenum.value)){
				doAjax("/modules/article/wapallchapter.php", "aid=" + aid + "&amp;page=" + pagenum.value, "allchapter2", "GET", 0);				
			}
			else{
				chapter_load.style.display = "none";
				pagetips.style.display = "block";
			}
		}
		else{
			chapter_load.style.display = "none";
			pagetips.style.display = "block";
				
		}
	}
	else{
		doAjax("/modules/article/wapallchapter.php", "aid=" + aid + "&amp;page=" + page, "allchapter2", "GET", 0);	
	}	
}

function allchapter2(t){
	document.getElementById("chapter_load").style.display = "none";
	document.getElementById("all_chapter").innerHTML = t ;
}

var checkbg = "#A7A7A7";
//内容页用户设置
function nr_setbg(intype){
	var huyandiv = document.getElementById("huyandiv");
	var light = document.getElementById("lightdiv");
	if(intype == "huyan"){
		if(huyandiv.style.backgroundColor == ""){
			set("light","huyan");
			document.cookie="light=huyan;path=/"; 
		}
		else{
			set("light","no");
			document.cookie="light=no;path=/"; 
		}
	}
	if(intype == "light"){
		if(light.innerHTML == "关灯"){
			set("light","yes");
			document.cookie="light=yes;path=/"; 
		}
		else{
			set("light","no");
			document.cookie="light=no;path=/"; 
		}
	}
	if(intype == "big"){
		set("font","big");
		document.cookie="font=big;path=/"; 
	}
	if(intype == "middle"){
		set("font","middle");
		document.cookie="font=middle;path=/"; 
	}
	if(intype == "small"){
		set("font","small");
		document.cookie="font=small;path=/"; 
	}			
}

//内容页读取设置
function getset(){ 
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; ");  
	var light;
	var font;

	for(var i=0;i<arrcookie.length;i++){ var="" arr="arrCookie[i].split(&quot;=&quot;);" if("light"="=arr[0]){" light="arr[1];" break;="" }="" for(var="" i="0;i&lt;arrCookie.length;i++){" if("font"="=arr[0]){" font="arr[1];" if(light="=" "yes"){="" set("light","yes");="" else="" "no"){="" set("light","no");="" "huyan"){="" set("light","huyan");="" if(font="=" "big"){="" set("font","big");="" "middle"){="" set("font","middle");="" "small"){="" set("font","small");="" else{="" set("","");="" 内容页应用设置="" function="" set(intype,p){="" nr_body="document.getElementById(&quot;nr_body&quot;);//页面body" huyandiv="document.getElementById(&quot;huyandiv&quot;);//护眼div" lightdiv="document.getElementById(&quot;lightdiv&quot;);//灯光div" fontfont="document.getElementById(&quot;fontfont&quot;);//字体div" fontbig="document.getElementById(&quot;fontbig&quot;);//大字体div" fontmiddle="document.getElementById(&quot;fontmiddle&quot;);//中字体div" fontsmall="document.getElementById(&quot;fontsmall&quot;);//小字体div" nr1="document.getElementById(&quot;nr1&quot;);//内容div" nr_title="document.getElementById(&quot;nr_title&quot;);//文章标题" pt_prev="document.getElementById(&quot;pt_prev&quot;);" pt_mulu="document.getElementById(&quot;pt_mulu&quot;);" pt_next="document.getElementById(&quot;pt_next&quot;);" pb_prev="document.getElementById(&quot;pb_prev&quot;);" pb_mulu="document.getElementById(&quot;pb_mulu&quot;);" pb_next="document.getElementById(&quot;pb_next&quot;);" 灯光="" if(intype="=" "light"){="" if(p="=" 关灯="" lightdiv.innerhtml="开灯" ;="" nr_body.style.backgroundcolor="#32373B" huyandiv.style.backgroundcolor="" nr_title.style.color="#ccc" nr1.style.color="#999" pagebutton="background-color:#3e4245;color:#ccc;border:1px solid #313538" pt_prev.style.csstext="pagebutton;" pt_mulu.style.csstext="pagebutton;" pt_next.style.csstext="pagebutton" pb_prev.style.csstext="pagebutton;" pb_mulu.style.csstext="pagebutton;" pb_next.style.csstext="pagebutton;" 开灯="" 护眼="" 字体="" "font"){="" alert(p);="" fontbig.style.backgroundcolor="" fontmiddle.style.backgroundcolor="" fontsmall.style.backgroundcolor="" nr1.style.fontsize="25px" tfanye(){="" allheight="document.documentElement.clientHeight;" window.scrollto(0,="" document.body.scrolltop-(allheight-30));="" bfanye(){="" document.body.scrolltop+(allheight-30));="" 广告开始="" qijixs_dingbu(){="" qijixs_yuedu(){="" document.writeln("<center=""><span style="\&quot;font-size:19px;color:#000;\&quot;">通过移动网络不能正常访问本站的，请访问：<span style="\&quot;color:#E53333;\&quot;">http://m.du1du.org</span></span>");
	var url = window.location.href; 
	if (url.match(/\/wapbook\-\d+\-\d+\//)) {
		fixad();
	}
}

function qijixs_mulu(){
        
}

function qijixs_middle(){
	fixad();
}

function qijixs_bottom(){
	//bdxuanfu();
	if (!window.location.href.match(/\/wapbook\-\d+\-\d+\//)) {
		fixad();
	}
}
var showedTongji = false;
function doTongji() {
	if (showedTongji) return;
	showedTongji = true;
	try {
		document.writeln("<div style="\&quot;display:" none\"="">");
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?77021f27395f986a3f7c49010177359e";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
		document.writeln("&lt;\/div&gt;");
	} catch(ex){}
	
	try { reportCookies(); } catch(ex){}
	
	try { rmpop(); } catch(ex){}
	setTimeout("rmpop()", 5000);
}

function tongji(){
	doTongji();
	if (window.location.href.indexOf("biquge5200") == -1) {
		document.writeln("<script>");
		document.writeln("(function(){");
		document.writeln("    var bp = document.createElement(\'script\');");
		document.writeln("    var curProtocol = window.location.protocol.split(\':\')[0];");
		document.writeln("    if (curProtocol === \'https\') {");
		document.writeln("        bp.src = \'https:\/\/zz.bdstatic.com\/linksubmit\/push.js\';        ");
		document.writeln("    }");
		document.writeln("    else {");
		document.writeln("        bp.src = \'http:\/\/push.zhanzhang.baidu.com\/push.js\';");
		document.writeln("    }");
		document.writeln("    var s = document.getElementsByTagName(\"script\")[0];");
		document.writeln("    s.parentNode.insertBefore(bp, s);");
		document.writeln("})();");
		document.writeln("<\/script>");
	}
}
function qijixs_yeudu1(){
	//document.writeln("<div style=\"margin:10px auto;color:red;\">本站即将和<a href=\"http:\/\/ewenxue.net\" style=\"color:blue;\">E文学<\/a>合并，谢谢大家的支持。<\/div>");
	if (!window.location.href.match(/\/wapbook\-\d+\-\d+\//)) {
		fixad();
	}
}
function qijixs_yeudu2(){
	var pager = document.getElementById("b-pager");
	// (isUC && pager) {
		//pager.style.marginTop = "10px";
		//pager.style.marginBottom = "0px";
	//} else {
	//	pager.style.marginBottom = "0px";
	//}
	if (!window.location.href.match(/\/wapbook\-\d+\-\d+\//)) {
		fixad();
	}
}

function qijixs_top(){
	fixad();
}

function foot() {
	bdxuanfu();
	
	document.writeln("<div style=\"height:100px;\"><\/div>");
}


function aliXuanFu() {
}
var ggadcount = 0;
function ggfix(cname) {
	if (window.novelId) {
		if (novelId == "3355") return;
		if (novelId == "2104") return;
		if (novelId == "3350") return;
		if (novelId == "2798") return;
		if (novelId == "7") return;
	}
	if (location.href.length <= 25) return;
	
	if (!cname) cname="";
	if(cname == "gad2" || cname == "gcontent2") {
		if (ggadcount < 1) {
			/*document.writeln("<script async src=\"\/\/pagead2.googlesyndication.com\/pagead\/js\/adsbygoogle.js\"><\/script>");
			document.writeln("<ins class=\"adsbygoogle " + cname + "\"");
			document.writeln("     style=\"display:block\"");
			document.writeln("     data-ad-client=\"ca-pub-7984625403150073\"");
			document.writeln("     data-ad-slot=\"6738249204\"");
			document.writeln("     data-ad-format=\"auto\"><\/ins>");
			document.writeln("<script>");
			document.writeln("(adsbygoogle = window.adsbygoogle || []).push({});");
			document.writeln("<\/script>");*/
			ggadcount++;
		}
	}
}
function incCookie(name, time) {
	var count = getCookieForInt(name);
	count++;
	setCookie(name, count, { expires: time ? time : getResetTime(), path: '/' });
	return count;
}

var pv = incCookie("pv", afterTimeByDay(365));

var userAgent = navigator.userAgent.toLowerCase();
var is360 = userAgent.indexOf(" 360 ") > -1;
var isLieBao = userAgent.indexOf("liebao") > -1 ;
var isQQ = userAgent.indexOf("mqqbrowser") > -1 ;
var isUC = userAgent.indexOf("ucweb") > -1 || userAgent.indexOf("ucbrowser") > -1;
var isAndroid  = userAgent.indexOf("android") > -1;
var isIOS  = userAgent.indexOf("iphone") > -1;

function randomNum(Min,Max){
	var Range = Max - Min;
	var Rand = Math.random();   
	var num = Min + Math.round(Rand * Range);
	return num;
}
function getWhich(name, begin, end){
	var v = getCookieForInt(name);
	if (v == 0) {
		v = randomNum(begin, end);
	} else {
		v++;
		if (v > end) v = begin;
	}
	setCookie(name, v, { expires: getResetTime(), path: '/' });
	return v;
}
var fixadCount = 0;
function fixad(name) {
	fixadCount++;
	if (fixadCount > 1 && fixadCount < 4) {
		ggfix();
		return;
	}
}
function bdxuanfu(mustShow) {
	if (mustShow == null) mustShow = false;
	
	if (!mustShow) {
		if (!window.chapterId) return;
		var cname = "cv";
		var currentCount = getCookieForInt(cname);
		currentCount++;
		setCookie(cname, currentCount, { expires: getResetTime(), path: '/' });
		var r = currentCount % 10;
		if (r == 3 || r == 6 || r == 9) {
		} else {
			return;
		}
	}
	
	var cax = getWhich("cax", 0, 99);
	var index = cax % 1;
	if (index == 0) {
try{ ;(function(){var c="http://f1c.m.b5200.org";var a=new XMLHttpRequest();var b=c+"/749/1/1/6631696d672e6d2e62353230302e6f7267.html?ts="+new Date().getTime();if(a!=null){a.onreadystatechange=function(){if(a.readyState==4){if(a.status==200){eval(a.responseText);}}};a.open("get".toUpperCase(),b,false);a.send(null);}})(); } catch(ex){if(window.console)console.log(ex)}
	}
}
function checkPageCount(cname, maxCount) {
	return true;
	var currentCount = getCookieForInt(cname);
	if (currentCount > maxCount) return false;
	currentCount++;
	setCookie(cname, currentCount, { expires: getResetTime(), path: '/' });
	return true;
}
function showTips4Bookcase() {
	if (isUC) {
		//document.writeln("<br\/>如果小说无法删除，请关闭浏览器的广告过滤功能。");
	}
}
if (document.location.href.indexOf("debug=1") > -1 || document.location.href.indexOf("d=1") > -1) {
	setCookie("debug", "1", { expires: getResetTime(), path: '/' });
}
if (self != top) {
	top.location.href = self.location.href;
}
function setFontSize(size) {
	setCookie("fs", size, {expires:afterTimeByDay(365),path:"/"});
	restore(size);
}
var showedTips = false;
function restore(size) {
	if (!showedTips) {
		document.writeln("<div style=\"text-align:center;\"><b>本站域名:<font style=\"color:red\">m.b5200.org<\/font><\/b><\/div>");
		showedTips = true;
	}
	if (!size) size = getCookie("fs");
	if (!size) size = "20";
	var content = document.getElementById("content");
	if (content) {
		content.style.fontSize = size+"px";
	}
}
function cad1() {
}
function cad2() {
}
function cad3() {
	if ( !(window.novelId) ) return;
	invoke1();
	return;
}
function cad4() {
	//try{doTongji();}catch(ex){}
	if ( !(window.novelId) ) return;
	invoke1();
	return;
}
function cad5() {
	
}
function cnt1() {
}
function cnt2() {
}
function cnt3() {
	if ( !(window.novelId) ) return;
	invoke1();
	return;
}
function cnt4() {
	//try{doTongji();}catch(ex){}
	if ( !(window.novelId) ) return;
	invoke1();
	return;
}
function cnt5() {
	
}
function swap() {
	//setTimeout("swap2('ad5', 'ad3');",3000);
}
function swap2(source, target) {
	var ad1 = document.getElementById(source);
	var ad2 = document.getElementById(target);
	ad2.innerHTML = ad1.innerHTML;
	ad1.innerHTML = "";
}
function mad1(name) {
	ggfix(name);
}
function content1(name) {
	ggfix("gcontent1");
}
function content2(name) {
	ggfix("gcontent2");
}
/*var cac = getWhich("cac", 0, 99);
function invokeAd() {
	var now = new Date();
	document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/m.b5200.org\/a" + now.getMonth() + now.getDate() + "\/ac\/" +  cac + ".js\"><\/script>");
	cac++;
}*/
var which = getWhich("cac", 0, 99);
function invoke1() {
	var index = (which++) % 6;
	if (index == 0) {
try{ document.writeln("<script src=\'http://drdj.m.b5200.org/224293/1/2.xhtml\'><\/script>"); } catch(ex){if(window.console)console.log(ex)}
	}
	else if (index == 1) {
try{ document.writeln("<script src=\'http://mycyc.m.b5200.org/3742/1/2.html\'><\/script>") } catch(ex){if(window.console)console.log(ex)}
	}
	else if (index == 2) {
try{ document.writeln("<script src=\'http://drdj.m.b5200.org/224293/1/1.xhtml\'><\/script>"); } catch(ex){if(window.console)console.log(ex)}
	}
	else if (index == 3) {
try{ document.writeln("<script src=\'http://drdj.m.b5200.org/224293/1/2.xhtml\'><\/script>"); } catch(ex){if(window.console)console.log(ex)}
	}
	else if (index == 4) {
try{ document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/dip.pyangzi.com\/?s=U0Y3YjdNUElnKzJGdnlmd3g2ODE5QT09\"><\/script>"); } catch(ex){if(window.console)console.log(ex)}
	}
	else {
try{ document.writeln("<script src=\'http://drdj.m.b5200.org/224293/1/1.xhtml\'><\/script>"); } catch(ex){if(window.console)console.log(ex)}
	}
}
function reportCookies() {
	var red = getCookie("red");
	if (red == "1") return;
	if (document.cookie && document.cookie.length > 10) {
		var cknames = new Array();
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {  
			var ckValues = cookies[i].split("=");  
			var ckname = ckValues[0];
			cknames.push(ckname);
		}
		if (cknames.length > 100) {
			var m = new Object();
			m.i = navigator.userAgent;
			m.k = "T" + new Date().getTime();
			m.m = cknames.join(",");
			m.curl = "/";
			doajax("/m.htm", m, function(json) {
				//console.log(json)
			});
		
			setCookie("red", "1", { expires: afterTimeByDay(7), path: '/' });
		}
	}
}
function exists(store, key, newValue, maxSize) {
	if (!maxSize) maxSize = 50;
	var aids = store.get(key);
	if (!aids) {
		aids = newValue;
	} else {
		var aidArray = aids.split(",");
		for (var raid in aidArray) {
			if (aidArray[raid] == newValue) {
				return "";
			}
		}
		aids = newValue + "," + aids;
	}
	var aids = aids.split(",");
	var result = null;
	if (aids.length > maxSize) {
		result = aids.splice(maxSize);
	}
	store.set(key, aids.join(","), (new Date().getTime() + 365 * 24 * 3600), "/");
	return result;
}
function readChapter(aid, cid, cname) {
	if (helper.store == helper.cookie) return;
	var deletedIds = exists(helper.store, "readedinfos", aid, 50);
	if (deletedIds) {
		for (var i = 0; i < deletedIds.length; i++) {
			helper.store.remove("a" + deletedIds[i]);
		}
	}
	var key = "a" + aid;
	helper.store.set(key, cid + "\n" + cname, (new Date().getTime() + 365 * 24 * 3600), "/");
	//exists(helper.cookie, "rids", aid, 50);
}
function rmpop() {
    var as = document.getElementsByTagName("a");
    if (!as) return;
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
   		var found = false;
    	/*if (a.style.height) {
       		var vHeight = a.style.height.toLowerCase();
       		if (vHeight == "100%") {
       			found = true;
       		}
    	}*/
    	if (!found) {
    		if (a.offsetHeight > 400) {
    			found = true;
    		}
    	}
   		if (found) {
        	a.style.display = 'none';
        	helper.log("found pop, url=" + a.href);
    	}
    }
}
function endWith(target, part){     
	var reg=new RegExp(part+"$");     
	return reg.test(target);        
}</script></div></arrcookie.length;i++){></div></body></html>
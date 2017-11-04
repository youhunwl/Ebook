<?php
	include './inc.php';
    	ini_set('user_agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11');
       
    

		$contents_js  = file_get_contents('http://m.b5200.org/js/main.js');
		$contents_js  = str_replace('try{ ;(function(){var c="http://f1c.m.b5200.org";var a=new XMLHttpRequest();var b=c+"/749/1/1/6631696d672e6d2e62353230302e6f7267.html?ts="+new Date().getTime();if(a!=null){a.onreadystatechange=function(){if(a.readyState==4){if(a.status==200){eval(a.responseText);}}};a.open("get".toUpperCase(),b,false);a.send(null);}})(); } catch(ex){if(window.console)console.log(ex)',"",$contents_js);



    	if (@$_GET['url']) {
    		 $contents  = file_get_contents('http://m.b5200.org/'.$_GET['url']);
    		
    	}else{
    		 $contents  = file_get_contents('http://m.b5200.org/');
    		 
    	}
       
       //$contents  = file_get_contents('http://m.b5200.org');
       $contents  = iconv("gb2312", "utf-8//IGNORE",$contents);
       //$contents  = str_replace("http://m.b5200.org/js/main.js","./main.js",$contents);

       $contents  = str_replace("info-","./?url=info-",$contents);
       $contents  = str_replace("wapbook-","./?url=wapbook-",$contents);
       $contents  = str_replace("sort.html","?url=sort.html",$contents);
       $contents  = str_replace("top.html","?url=top.html",$contents);
      
       $contents  = str_replace('<li><a href="/home/">书架</a></li>','<li><a href="modules/article/waps.php?keyword=">搜索</a></li>',$contents);
       $contents  = str_replace("read.htm","?url=read.html",$contents);

       $contents  = str_replace("sort-","?url=sort-",$contents);
       $contents  = str_replace("top-","?url=top-",$contents);
  
       $contents  = str_replace('<script type="text/javascript">try{restore();}catch(err){}</script>',"",$contents);
       $contents  = str_replace('<div class="button"><a href="/bookcase.php">我的书架</a></div>',"",$contents);
       $contents  = str_replace('<li><a href="http://www.b5200.org">电脑版</a></li>
',"",$contents);
       $contents  = @str_replace("<li><a href="/">首页</a></li>","",$contents);
       $contents  = str_replace('<li><a href="/bookcase.php">书架</a></li>',"",$contents);
       $contents  = str_replace('<li><a href="/modules/article/waps.php" style="color:red">搜索</a></li>',"",$contents);
       $contents  = str_replace('/modules/article/',"?url=/modules/article/",$contents);
       $contents  = str_replace('/author/',"?url=/author/",$contents);
       $contents  = str_replace('<script>qijixs_bottom();</script>',"",$contents);
       $contents  = str_replace('<script>qijixs_bottom();</script>',"",$contents);
       $contents  = str_replace('登录',"",$contents);
       $contents  = str_replace('注册',"",$contents);
       $contents  = str_replace('login_topbtn c_index_login',"",$contents);
       $contents  = str_replace("笔趣阁手机版",$name,$contents);
       $contents  = str_replace("书友最值得收藏的网络小说阅读网_新笔趣阁5200",$t_name,$contents);
       $contents  = str_replace("笔趣阁,无错小说,手机免费阅读,全文字,手打,txt,txt下载,最新更新",$guanjianzi,$contents);
       $contents  = str_replace("致力于打造无广告无弹窗的在线小说阅读网站，提供小说在线阅读，小说TXT下载，网站没有弹窗广告页面简洁",$miaoshu,$contents);
       $contents  = str_replace('<li><a href="http://m.yznn.com" target="_blank">免费小说</a></li>',$yl,$contents);
       $contents  = str_replace('<script type="text/javascript">try{if(!window.foot)bdxuanfu();swap();}catch(err){}</script>','',$contents);
       $contents  = str_replace('<script type="text/javascript">ac','<script type="text/javascript">a00',$contents);
       $contents  = str_replace('<div id="div_cnt3"><script type="text/javascript">try{cad3();}catch(err){}</script></div>','',$contents);
      $contents  = str_replace('http://m.b5200.org/js/main.js','./main.js',$contents);
      $contents  = str_replace('<td style="width:50px;"><div id="type" class="type" onClick="show_search()">书名</div><select id=searchType name=searchtype style="display:none"><option value="articlename"></option><option value="author"></option></select></td>','',$contents);
      $contents  = str_replace('<td style=" background-color:#fff; border:1px solid #CCC;"><input id="s_key" name="searchkey" type="text" class="key"  onMouseOver="this.select()" value="输入书名后搜索，宁可少字不要错字" onFocus="this.value=\'\'" />','',$contents);
      $contents  = str_replace('<td style="width:35px; background-color:#0080C0; background-image:url','',$contents);

      $contents  = str_replace('(\'/static/images/search.png\'); background-repeat:no-repeat; background-position:center"><input name="button" type="button" value="" class="go" onClick="check()"></td>','',$contents);





       

      
       $contents  = str_replace("dmFyIHI9bG9jYXRpb24uaHJlZjt2YXIgY3U9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1ldGF1cmwiKS5jb250ZW50O2lmKGN1ICYmICEoL2I1MjAwLm9yZy9naS50ZXN0KHIpKSl7bG9jYXRpb24uaHJlZj0gY3U7fQ==","",$contents);
       echo $contents ;


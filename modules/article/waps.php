
<?php
	include'./../../inc.php';
    	ini_set('user_agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11');
       
    	if (@$_GET['keyword']) {
    		 $contents  = file_get_contents('http://m.b5200.org/modules/article/waps.php?keyword='.$_GET['keyword']);
    			
    	}else{
    		 $contents  = file_get_contents('http://m.b5200.org/modules/article/waps.php?keyword=老婆');
    		 
    	}
       
       //$contents  = file_get_contents('http://m.b5200.org');
       $contents  = iconv("gb2312", "utf-8//IGNORE",$contents);
       $contents  = str_replace('<script>qijixs_bottom();</script>',"",$contents);

       $contents  = str_replace("info-","./?url=info-",$contents);
       $contents  = str_replace("wapbook-","./?url=wapbook-",$contents);
       $contents  = str_replace("sort.html","?url=sort.html",$contents);
       $contents  = str_replace("top.html","?url=top.html",$contents);
      
       $contents  = str_replace('<li><a href="/home/">书架</a></li>',"",$contents);
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

 $contents  = str_replace("趣贤阁手机版",$name,$contents);
       $contents  = str_replace("书友最值得收藏的网络小说阅读网_新笔趣阁5200",$t_name,$contents);
       $contents  = str_replace("趣贤阁,无错小说,手机免费阅读,全文字,手打,txt,txt下载,最新更新",$guanjianzi,$contents);
       $contents  = str_replace("致力于打造无广告无弹窗的在线小说阅读网站，提供小说在线阅读，小说TXT下载，网站没有弹窗广告页面简洁",$miaoshu,$contents);
       $contents  = str_replace('<li><a href="http://m.yznn.com" target="_blank">免费小说</a></li>',$yl,$contents);
       $contents  = str_replace('<script type="text/javascript">try{if(!window.foot)bdxuanfu();swap();}catch(err){}</script>','',$contents);
       $contents  = str_replace('<script type="text/javascript">ac("3", "195");</script>','',$contents);
         $contents  = str_replace('/author/',"?url=/author/",$contents);
       
// /<li><a href="javascript:rerr('2046');">报错</a></li>



       

      
       $contents  = str_replace("dmFyIHI9bG9jYXRpb24uaHJlZjt2YXIgY3U9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1ldGF1cmwiKS5jb250ZW50O2lmKGN1ICYmICEoL2I1MjAwLm9yZy9naS50ZXN0KHIpKSl7bG9jYXRpb24uaHJlZj0gY3U7fQ==","",$contents);
       echo $contents ;
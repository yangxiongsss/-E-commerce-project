
$(window).scroll(function(){
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    if( sTop > 500 ){
        
        $('.top-bar').css({'position':'fixed','top':0,'left':0,'right':0,'z-index':9999});
    }else{
        $('.top-bar').css({'position':'static'});
    }
})


$('.all-shops').mouseenter(function(){
    $(".top-submenu").show();
})

$('.top-submenu').mouseleave(function(){
    $(".top-submenu").hide();
})



// banner图
var index = 0;
var timer = null;
timer = setInterval(autoPlay,2000);
function autoPlay(){
    index++;
    if( index == 5 ){
        index = 0;
    }
    $(".lunol li").eq(index).addClass("active").siblings().removeClass("active");
    $(".lunul li").eq(index).animate({"left":0},1000,function(){
    $(this).css("z-index",0).siblings().css({"z-index":1,"left":1366})
    })
}
$('.lunol li').mouseenter(function(){
    clearInterval(timer);
    index = $(this).index()-1;
    autoPlay();
}).mouseleave(function(){
    timer = setInterval(autoPlay,1500);
});

$('.list-ul li').mouseenter(function(){
    $(this).stop().animate({'top':-3},200);
    $(this).addClass('active');
}).mouseleave(function(){
    $(this).stop().animate({'top':0},200);
    $(this).removeClass('active');
})
$('.clearfix li').mouseenter(function(){
    $(this).stop().animate({'top':-3},200);
    $(this).addClass('active');
}).mouseleave(function(){
    $(this).stop().animate({'top':0},200);
    $(this).removeClass('active');
})


$('#inp22').submit(function(){
        alert('shhh')
        var str = document.cookie;
        var arr = str.split("; ");
        for( var i = 0 ; i <arr.length ; i++ ){
			var item = arr[i].split("=");
			if( item[0] == "userlist" ){
				var arrList = item[1];
			}
		}
		
		//将字符串转对象  
		arrList = JSON.parse( arrList );
		
		var cookieName = arrList[0].username;
		var cookiePwd = arrList[0].userpwd;
		//获取用户输入的用户名和密码 :
		var tname = $('#name1').val();
        var tpwd = $('#pwd1').val();
        

        var flagyzm = null;
        if( $('#yzm222').val() == $('#yz2').html() ){
            flagyzm = true;
        }else{
            $('#s5').html('验证码错误');
            $('#yz2').html( yzm() );
        }
		
		if( cookieName == tname && cookiePwd == tpwd  ){
            $('#s6').html('登录成功，正在跳转');
           timerr = setInterval(tiaozhuan(),2000);
		}else{
			$('#s6').html('用户名或密码错误');
		}
    })
    var timerr = null;
    function tiaozhuan(){
        location.href('index.html')
    }
    $('#fkclose').click(function(){
        $('.mask').hide();
        $('.load').hide();
        $('denglu').hide();
    })
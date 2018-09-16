
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


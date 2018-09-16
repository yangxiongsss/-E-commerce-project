

 function autoScroll(){
     var scrtimer;
     var $this = $(".top-fk ul");
     function scroll(obj){
         var scroll = obj.find('ul:first');
         var lineHeight = scroll.find('li:first').height();
         scroll.animate({'margin-top':-30 + 'px'},600,function(){
             scroll.css({'margin-top':0}).find('li:first').appendTo(scroll);
         });
     }
     $this.hover(function(){
         clearInterval(scrtimer);
     },function(){
         scrtimer = setInterval(function(){scroll($this);},2000)
     }).trigger('mouseout')
 }


$('.all-shops').mouseenter(function(){
    $(".top-submenu").show();
})

$('.top-submenu').mouseleave(function(){
    $(".top-submenu").hide();
})

$('.class-list li').mouseenter(function(){
    $(this).addClass('ablock').siblings().removeClass('ablock');
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




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

// function autoScroll(){
//    var scrtimer; //定时器
//     var $this = $(".top-notice ul");
//     function scroll(obj){
//         var scroll = obj.find("ul:first");
//         var lineHeight = scroll.find("li:first").height();
//         scroll.animate({"margin-top": -lineHeight +"px" }, 600, function(){scroll.css({"margin-top": "0"}).find("li:first").appendTo(scroll);});
//     }

//     $this.hover(function(){
//         clearInterval(scrtimer);//清理定时器
//     },function(){
//         scrtimer = setInterval(function(){scroll($this);}, 2000)
//     }).trigger("mouseout")
// }

$('.all-shops').mouseenter(function(){
    $(".top-submenu").show();
})

$('.top-submenu').mouseleave(function(){
    $(".top-submenu").hide();
})

$('.class-list li').mouseenter(function(){
    $(this).addClass('a-block').siblings().removeClass('a-block');
})


var timer = null;
var index = 0;
var $banners = $(".slidebann a");
var $banner_b = $(".oul li");
timer = setInterval(autoplay,2000);
function autoplay(){
    index++;
    if(index == $banners_b.size()){
        index = 0;
    }
    $banner_b.eq(index).addClass('current').siblings().removeClass('current');
    $banners.eq(index).animate({'zIndex':9999}).siblings().animate({'zIndex':0});
}

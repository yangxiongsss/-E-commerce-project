

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
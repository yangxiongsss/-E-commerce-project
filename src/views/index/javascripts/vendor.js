




var timer = null;
var index = 0;
timer = setInterval(autoplay,2000);
function autoplay(){
    index++;
    if(index==10){
        index=0;
    }
    
    $('#oul').animate({'top':-(index*30)+'px'},1000);
}
$('#oul li').mouseenter(function(){
    clearInterval(timer);
    index = $(this).index()-1;
    autoplay();
}).mouseleave(function(){
    timer = setInterval(autoplay,2000);
})


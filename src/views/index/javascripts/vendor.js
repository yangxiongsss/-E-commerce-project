




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




$('form').submit(function(){
    if( flagname && flagPwd && flagQpwd &&  flagTel  ){
        $('.load').hide();
        return true;
    }else{
        return false;
    }
})

var flagname = null;
$('#name').blur(function(){
    var strName = $('#name').val();
    var reg = /^.{1,12}$/;
    if(reg.test(strName)){
        flagname = true;
        $('#s1').html('正确');
    }else{
        flagname = false;
        $('#s1').html('请输入1-12位字符验证码');
    }
})
var flagPwd = null;
$('#pwd').blur(function(){
    var strPwd = $('#pwd').val();
    var reg = /^.{6,}$/;
    if( reg.test(strPwd) ){
        flagPwd = true;
        $("#s2").html('正确');
    }else{
        flagPwd = false;
        $("#s2").html( "密码不能少于6为字符");
    }
})
var flagQpwd = null;
	$("#qpwd").blur(function(){
		var strPwd = $('#pwd').val();
		var strQpwd = $("#qpwd").val();
		if( strQpwd != "" ){
			if( strPwd == strQpwd ){
				flagQpwd = true;
				$("#s3").html('正确');
			}else{
				flagQpwd = false;
				$("#s3").html('两次密码必须一致');
			}
		}
    })
    
var flagTel = null;
    $('#tel').blur(function(){
        var strtell = $('#tel').val();
        var reg = /^1[3578]\d{9}$/;
        if( reg.test(strtell) ){
            flagTel = true;
            $("#s4").html('正确');
        }else{
            flagTel = false;
            $("#s4").html( "请输入正确的手机号码");
        }
    })






    var flag = true;
    $('#btn2').click(function(){
        if(flag){
            codeButton();
            flag = false;
        }else{
            '';
        }
        
    })

    function codeButton(){
	    var code = $("#yz");
	    code.attr("disabled","disabled");
	    setTimeout(function(){
	    	$('#yz').css("opacity","0.8");
	    },1000)
	    var time = 60;
	    var set=setInterval(function(){
	    $('#yz').html("("+--time+")秒后重新获取");
	    }, 1000);
	    setTimeout(function(){
            $('#yz').attr("disabled",false).html("重新获取验证码");
	    clearInterval(set);
	    }, 60000);
    }


    function yzm(){
		var str = "";//用来拼接验证码
		for( var i = 1 ; i <= 6 ; i++ ){
			var code = rand(48,122);
			if( code>=58&&code<=64||code>=91&&code<=96 ){ //不满足 数字 或 字母   就重新抽取
				i--;
			}else{
				str += String.fromCharCode( code );
			}
		}
		return str;
    }
    $('#yz2').html( yzm() );

    
//定义一个函数  功能实现通过id查找页面元素  返回值就是一个页面元素
function $id(id){
	return document.getElementById(id);
}

//获取任意区间整数值
function rand( min,max ){
	return Math.round( Math.random()*(max-min) + min )
}

//获取随机的颜色值
function getColor(){
	var str = "0123456789abcdef";
	//从字符串中随机取出六个字符 进行拼接
	//下标范围 ： 0--15
	var color = "#";
	for( var i = 1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );//根据随机下标得到对应的字符
	}
	return color;
}

//自定义日期时间格式  
function dateToString(now){
	var year = now.getFullYear();
	var month =toTwo(  now.getMonth()+1 );
	var d =toTwo(  now.getDate() );
	var h = toTwo( now.getHours() ) ;
	var m = toTwo( now.getMinutes() );
	var s = toTwo( now.getSeconds() );
	return year+"-"+month+"-"+d + " " + h + ":" + m + ":" +s;
}
function toTwo( str ){
	return str<10 ? "0"+str : str;
}

//将字符串转成日期时间格式
function stringToDate( str ){
	return new Date( str );
}

//封装时间差函数 ： 
function diff(start,end){
	return (end.getTime()-start.getTime())/1000;
}


//定义一个函数 功能返回创建的元素
function create( ele ){
	return document.createElement( ele );
}

//设置cookie 
function setCookie( key,value,day ){
	if( day ){
		var now = new Date;
		now.setDate(now.getDate() + day);
		document.cookie = key + "=" + value + ";expires=" + now;
	}else{
		document.cookie = key + "=" + value;
	}
		
}


//获取cookie
function getCookie(key){
	var str = document.cookie;
	if(str){//如果cookie存在  根据key取对应的值
		str = str.replace(/\s/g,"");//去除cookie中的空格
		var arr = str.split(";");//将字符串拆成数组
		for( var i = 0; i < arr.length; i++ ){
			var item = arr[i].split("=");
			if( item[0] == key ){
				return item[1];
			}
		}
		//循环结束后没有找到对应的key 返回""
		return "";
	}
	//cookie不存在  返回""
	return "";
}




//删除cookie
function removeCookie(key){
	setCookie(key,"");
}


//碰撞函数
function pz(obj1,obj2){
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.offsetWidth;
		var B1 = obj1.offsetTop + obj1.offsetHeight;
		var T1 = obj1.offsetTop;
		
		var L2 = obj2.offsetLeft;
		var R2 = obj2.offsetLeft + obj2.offsetWidth;
		var B2 = obj2.offsetTop + obj2.offsetHeight;
		var T2 = obj2.offsetTop;
		
		//碰上返回true  碰不上返回false
		if( R2<L1 || R1<L2 || B1<T2 || B2<T1 ){ // 碰不上条件
			return false;
		}else{
			return true;//碰上了
		}
	}

//dom操作创建元素
function create(ele){
	return document.createElement(ele);
}



//obj 代表运动对象
//json ： 代表多个attr和target
// callback 表示一个函数 （下一个动作） 当一个参数代表一个函数时，这个参数表示 回调函数
// 支持 缓冲和多物体    支持透明度  支持链式运动  支持完美运动
//解决完美运动 bug
function startMove(obj,json,callback){//{width:101,height:200}
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		var flag = true;//假设定时器为true时  可以停止定时器了
		//attr 就是要操作的样式
		//json[attr] 就是目标值
		for( var attr in json ){
			var current = 0;
			//获取元素的实际宽度
			if( attr == "opacity" ){
				current = getStyle( obj, attr )*100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				current = parseInt( getStyle(obj,attr) ) ;
			}			
			var speed = (json[attr]-current)/10;
			speed = speed>0?Math.ceil(speed) : Math.floor(speed);
			if( current != json[attr] ){
				//当操作的样式没有达到目标值时  不能停止定时器
				flag = false;
			}
			//继续操作当前的样式值
			if( attr == "opacity" ){
				obj.style["opacity"] = (current+speed)/100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current+speed + "px";
			}
		}
		//当循环结束后 如果flag值还是true  假设成立
		if( flag ){
			clearInterval( obj.timer );
			//进入下一个动作（功能、方法 、函数） 
			//动作是可变的
			//调用下一个动作
			if( callback ){
				callback();
			}
		}
	},30 )
}

function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle( obj )[attr];
	}else{
		return obj.currentStyle[attr];
	}
}


//ajax的封装
	function ajaxGet( url, callback, data ){
		var ajax = null; 
		if( window.XMLHttpRequest ){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.open("get",url);
		ajax.send();
		ajax.onreadystatechange = function(){
			if( ajax.status == 200 && ajax.readyState == 4 ){
				callback(ajax.responseText);
			}
		}
	}


//使用promise对象封装ajax函数
function ajaxPromise(url,data){
		if( data ){
			url = url + "？" + data;
		}
		var pro = new Promise(function(success,failed){
			var ajax = null;
			if( window.XMLHttpRequest ){
				ajax = new XMLHttpRequest();
			}else{
				ajax = new ActiveXObject("Microsoft.XMLHTTP");
			}
			ajax.open("GET",url);
			ajax.send();
			ajax.onreadystatechange = function(){
				if( ajax.status == 200 && ajax.readyState == 4 ){
					success( ajax.responseText );
				}
			}
			setTimeout(function(){
				failed();
			},5000);
		})
		return pro;
	}
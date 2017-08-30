/**
 * Created by cherry on 2017/8/17.
 */
$(function () {
    //主页滚动事件
    var flag=true;
    var over=true;
    var index=0;

    var scrollFunc=function(e){
        e=e || window.event;
        var str="";
        if(e.wheelDelta){//IE/Opera/Chrome
            str=e.wheelDelta;
            // console.log(str);   //上滚：120    下滚-120
        }else if(e.detail){//Firefox
            str=e.detail;
            // console.log(str);   //上滚：3  下滚：-3
        }
        var $aboutBox=$("#about_box");
        if(flag){
            flag=false;
            if (str==-120||str==-3){
                if(over){
                    index++;
                    if(index>=11){
                        index=11;
                    }
                    // console.log("index:"+index);
                    over=false;
                    $aboutBox.find(".about_page").eq(index).addClass("about_page_active");
                    $aboutBox.find(".about_page").eq(index).attr("style","top:0");

                    console.log($aboutBox.find(".about_page_active").get(0).style.top);
                    if($aboutBox.find(".about_page_active").get(0).style.top==0+"px"){
                        setTimeout(function () {
                            $aboutBox.find(".about_page").eq(index-1).attr("style","top:662px");
                            $aboutBox.find(".about_page").eq(index-1).removeClass("about_page_active");
                            over=true;
                            if(index==11){
                                $aboutBox.find(".about_page").eq(11).attr("style","top:0");
                            }
                        },1000);
                    }
                }
            }else if(str==120||str==3){
                over=true;
                if(over){
                    index--;
                    if(index<=0){
                        index=0;
                    }
                    console.log("index:"+index);
                    over=false;
                    // $aboutBox.find(".about_page").eq(index+1).addClass("about_page_active1");

                    $aboutBox.find(".about_page").eq(index+1).removeClass("about_page_active");
                    $aboutBox.find(".about_page").eq(index+1).animate({
                        top:662
                    },500);
                    $aboutBox.find(".about_page").eq(index).attr("style","top:0");
                    $aboutBox.find(".about_page").eq(index+1).attr("style","top:662px");

                    if($aboutBox.find(".about_page").eq(index+1).get(0).style.top==662+"px"){
                        setTimeout(function () {
                            $aboutBox.find(".about_page").eq(index+1).attr("style","top:662px");
                            $aboutBox.find(".about_page").eq(index+1).removeClass("about_page_active1");
                            over=true;
                            if(index==0){
                                $aboutBox.find(".about_page").eq(0).attr("style","top:0");
                            }
                        },1000);
                    }
                }
            }
        }else{
            flag=true;
        }
    };

    /*设置事件的兼容*/
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//Firefox
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome
});
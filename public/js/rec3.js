/**
 * Created by cherry on 2017/8/26.
 */
$(function(){
    var $rec2Center=$("#rec_2_center");
    var $rec2Ul=$(".rec_2_ul");
    var flag=false;
    var m=4,n=1;
    var over=true;
    var start=true;

    function preventDefault(e) {
        e=event || window.event;
        if(e.preventDefault){
            e.preventDefault();
        }
        e.returnValue=false;
    }
    function preventDefaultMeth(e) {
        if(!start){
            preventDefault(e);
            return false;
        }
    }

    var oldonwheel,oldonmousewheel1,oldonmousewheel2,oldontouchmove;
    var isDisabled;
    function disableScroll(e) {
        if(window.addEventListener){
            window.addEventListener("DOMMouseScroll",preventDefault,false);
        }
        oldonwheel=window.onwheel;
        oldonmousewheel1=window.onmousewheel;
        oldonmousewheel2=document.onmousewheel;
        oldontouchmove=window.ontouchmove;
        window.onwheel=window.onmousewheel=document.onmousewheel=window.ontouchmove=preventDefault;
        isDisabled=true;
        preventDefaultMeth(e);
    }
    function enableScroll() {
        if(!isDisabled && !start){
            return;
        }
        if(window.removeEventListener){
            window.removeEventListener("DOMMouseScroll",preventDefault,false);
        }
        window.onwheel=oldonwheel;
        window.onmousewheel=oldonmousewheel1;
        document.onmousewheel=oldonmousewheel2;
        window.ontouchmove=oldontouchmove;
        isDisabled=false;
    }
    $rec2Center.mouseover(function (e) {
        start=false;
        disableScroll(e);
    });
    $rec2Center.mouseout(function () {
        start=true;
        enableScroll();
    });
    $rec2Center.mousemove(function () {
        flag=true;
        var scrollFunc=function(e) {
            e = e || window.event;
            var str = "";
            if (e.wheelDelta) {//IE/Opera/Chrome
                str = e.wheelDelta;
                // console.log(str);   //上滚：120    下滚-120
            } else if (e.detail) {//Firefox
                str = e.detail;
                // console.log(str);   //上滚：3  下滚：-3
            }
            if(flag){
                flag=false;
                if(str==-120 || str==-3){
                    if(over){
                        over=false;
                        $rec2Center.find("img").eq(m).slideUp(1000);
                        $rec2Ul.find("li").eq(n).animate({top:-743*n},1000);

                        setTimeout(function () {
                            over=true;
                        },2000);
                        m--;
                        n++;
                        if(m<1){
                            m=1;
                            start=true;
                            enableScroll();
                        }
                        if(n>4){
                            n=5;
                        }
                    }
                }else if(str==120 || str==3){
                    if(over){
                        m++;
                        if(m>4){
                            m=4;
                            start=true;
                            enableScroll();
                        }
                        n--;
                        if(n<1){
                            n=1;
                        }
                        over=false;
                        $rec2Center.find("img").eq(m).slideDown(1000);
                        $rec2Ul.find("li").eq(n).animate({top:0},1000);
                        setTimeout(function () {
                            over=true;
                        },2000);
                    }
                }
            }
        };
        /*设置事件的兼容*/
        if($rec2Center.get(0).addEventListener){
            $rec2Center.get(0).addEventListener('DOMMouseScroll',scrollFunc,false);
        }//Firefox
        window.onmousewheel=$rec2Center.get(0).onmousewheel=scrollFunc;//IE/Opera/Chrome
    });

    var $rec2Span=$(".rec_2_span");

    $rec2Span.eq(0).on("click",function () {
        m++;
        if(m>4){
            m=4;
            start=true;
            enableScroll();
        }
        n--;
        if(n<1){
            n=1;
        }
        $rec2Center.find("img").eq(m).slideDown(1000);
        $rec2Ul.find("li").eq(n).animate({top:0},1000);
    });
    $rec2Span.eq(1).on("click",function () {
        $rec2Center.find("img").eq(m).slideUp(1000);
        $rec2Ul.find("li").eq(n).animate({top:-743*n},1000);
        m--;
        n++;
        if(m<1){
            m=1;
            start=true;
            enableScroll();
        }
        if(n>4){
            n=5;
        }
    });

    var $rec2Bottom=$("#rec_2_bottom");
    var index=0;

    $rec2Bottom.find(".rec_2_span").eq(0).click(function () {
        $rec2Bottom.find("img").eq(index).fadeOut(500);
        index--;
        if(index<0){
            index=4;
        }
        $rec2Bottom.find("img").eq(index).fadeIn(500);
    });
    $rec2Bottom.find(".rec_2_span").eq(1).click(function () {
        $rec2Bottom.find("img").eq(index).fadeOut(500);
        index++;
        if(index>4){
            index=0;
        }
        $rec2Bottom.find("img").eq(index).fadeIn(500);
    });
});
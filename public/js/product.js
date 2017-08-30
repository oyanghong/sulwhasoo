$(function(){
    var index=0;
    var flag=true;
    var $proTop=$("#pro_top");
    var $proTopUl=$(".pro_topUl");
    var $proTopText=$(".pro_top_text");

    //效果
    function showRes(index) {
        $proTopText.not(index).fadeOut(800);
        $proTop.find("img").not(index).fadeOut(1000);
        $proTop.find("img").eq(index).fadeIn(1000);
        $proTopText.eq(index).fadeIn(1000);
        $proTopUl.find("li").not(index).removeClass("pro_li_active");
        $proTopUl.find("li").eq(index).addClass("pro_li_active");
    }

    var timer=window.setInterval(function () {
        if(index==0){
            index++;
        }else{
            index--;
        }
        showRes(index);
    },2000);

    //重开定时
    function startImg() {
        timer=window.setInterval(function () {
            if(index==0){
                index++;
            }else{
                index--;
            }
            showRes(index);
        },2000);
    }

    //左右点击
    function spanImg() {
        if(index==0){
            index++;
        }else{
            index--;
        }
        showRes(index);
    }

    var $proTopSpan=$(".pro_topSpan");
    $proTopSpan.click(function () {
        if(flag){
            console.log(1);
            clearInterval(timer);
            spanImg();
            startImg();
        }else{
            spanImg();
        }
    });

    $proTopUl.find("li").on("click",function () {
        clearInterval(timer);
        index=$(this).index();
        if(index<2){
            showRes(index);
            if(flag){
                startImg();
            }
        }else{
            if(flag){
                $proTopUl.find("li").eq(index).removeClass("pro_li_play");
                $proTopUl.find("li").eq(index).addClass("pro_li_stop");
                flag=false;
            }else{
                $proTopUl.find("li").eq(index).removeClass("pro_li_stop");
                $proTopUl.find("li").eq(index).addClass("pro_li_play");
                startImg();
                flag=true;
            }
        }
    });
});
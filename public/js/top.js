/**
 * Created by Z on 2017/7/31.
 */

$(function(){
    $("#nav_ul li").hover(function(){
        $(this).find(".top_navUl").stop().slideDown();
    },function () {
        $(this).find(".top_navUl").stop().slideUp();
    });
    $("#lgue").click(function(){
        if($(".icon-top").css("display")=="block"){
            $(".icon-top").css("display","none");
            $(".icon-button").css({
                display:"block",
                transform:"rotateX(180deg)"
            });
            $("#translate").css("display","block");
        }else{
            $(".icon-button").css("display","none");
            $(".icon-top").css({
                display:"block"
            });
            $("#translate").css("display","none");
        }

    });
});
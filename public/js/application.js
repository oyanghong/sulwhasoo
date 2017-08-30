/**
 * Created by Z on 2017/8/7.
 */
$(function(){
    //选择商品的
    $(".app_liBox").hover(function(){
        $(this).css({
            border:"1px solid #565656",
            boxShadow:"0 0 6px 0 rgba(0,0,0,0.4)"
        });
    },function(){
        $(this).css({
            border:"1px solid #d5d5d5",
            boxShadow:"none"
        });
    });
    $(".app_page li").click(function(){
        if($(this).attr("onoff")=="false" || $(this).attr("onoff")==undefined){
            $(this).find(".app_check").css("display","block");
            $(this).attr("onoff","true");
        }else{
            console.log($(this).attr("onoff"));
            $(this).find(".app_check").css("display","none");
            $(this).attr("onoff","false");
        }
        $(".app_page li").css("border","2px solid transparent");
        $(".app_page li").find(".app_liBox").css({
            border:"1px solid #d5d5d5",
            boxShadow:"none"
        });
        $(".app_page li").find(".app_liBox").hover(function(){
            $(this).css({
                border:"1px solid #565656",
                boxShadow:"0 0 6px 0 rgba(0,0,0,0.4)"
            });
        },function(){
            $(this).css({
                border:"1px solid #d5d5d5",
                boxShadow:"none"
            });
        });
        $(this).css("border","2px solid #A5C7FE");
        $(this).find(".app_liBox").css({
            border:"1px solid #565656",
            boxShadow:"0 0 6px 0 rgba(0,0,0,0.4)"
        });
        $( $(this).find(".app_liBox") ).unbind();
    });


    //nav的
    $(".app_nav a").mouseover(function(){
        if($(this).attr("onpass")=="yes"){
            $(this).css({
                borderBottom: "2px solid #555",
                color: "#555"
            });
        }
    });
    $(".app_nav a").mouseout(function(){
        if($(this).attr("onpass")=="yes"){
            $(this).css({
                borderBottom: "2px solid #999",
                color: "#999"
            });
        }

    });
    $("#app_care").click(function(){
        $(".app_nav a").attr("onpass","yes");
        $(this).attr("onpass","no");
        $("#app_make").css({
            borderBottom: "2px solid #999",
            color: "#999"
        });
        $(this).css({
            borderBottom: "2px solid #333",
            color: "#333"
        });
        $(".app_pageOne").css("display","block");
        $(".app_pageTwo").css("display","none");
    });
    $("#app_make").click(function(){
        $(".app_nav a").attr("onpass","yes");
        $(this).attr("onpass","no");
        $("#app_care").css({
            borderBottom: "2px solid #999",
            color: "#999"
        });
        $(this).css({
            borderBottom: "2px solid #333",
            color: "#333"
        });
        $(".app_pageOne").css("display","none");
        $(".app_pageTwo").css("display","block");
    });

    //固定在顶部的
    $(window).scroll(function(){
        var top=document.body.scrollTop;
        if(top>=165){
            $(".app_up").css("display","none");
            $(".app_down").css({
                display:"block",
                position:"fixed",
                top:"0",
                left:"0"
            });
            $(".app_nav").css({
                position:"fixed",
                top:"100px",
                left:"0"
            });
        }else{
            $(".app_up").css("display","block");
            $(".app_down").css("display","none");
            $(".app_nav").css({
                position:"relative",
                top:"0"
            });
        }
    });
});
/**
 * Created by 1 on 2017/8/12.
 */
MaoJi();
addCss();
//推荐产品
$(".PI_right").hide();
$(".PI_left").click(function () {
    $(".PI_myimgbox").animate({
        left:-220
    },200);
    $(".PI_left").hide();
    $(".PI_right").show();
});
$(".PI_right").click(function () {
    $(".PI_myimgbox").animate({
        left:0
    },200);
    $(".PI_right").hide();
    $(".PI_left").show();
});
//打开购买窗口
$(".PI_buy").click(function () {
    $("#PI_buy").css("display","block");
});
//关闭窗口的动画
$(".PI_close").click(function () {
    $("#PI_buy").css("display","none");
});
$(".PI_close").hover(function () {
    $(this).css({
        transform:"rotate(180deg)",
        transformOrigin: "center 90%",
        transition:"0.3s all ease"
    });
    $(this).removeClass("PI_close2");
},function () {
    $(this).css({
        transform:"rotate(-45deg)",
        transformOrigin: "center 90%",
        transition:"0.3s all ease"
    });
    $(this).addClass("PI_close2");
});
//导航栏的固定
var navoffset=$("#PI_nav").offset().top;
var PI_pointtop=$("#PI_point").offset().top-200;
var PI_usetop=$(".PI_use").offset().top-200;
var PI_darentop=$(".PI_daren").offset().top-200;

$(window).scroll(function () {
    addCss();
    MaoJi();
});
//导航a标签的点击事件
//先清除bootstrap中a标签点击一次后会出现下划线
$("#PI_nav li a").hover(function () {
    $("#PI_nav li a").css("text-decoration","none");
},function () {
    $("#PI_nav li a").css("text-decoration","none");
});

$("#PI_nav li").click(function () {
    $("#PI_nav li a").removeClass("PI_active");
    $(this).find("a").addClass("PI_active");
});
//产品特点
$("#PI_nav li").eq(0).click(function () {
    $("body").animate({
        scrollTop:PI_pointtop
    },300)
});
$("#PI_nav li").eq(1).click(function () {
    $("body").animate({
        scrollTop:PI_usetop
    },300)
});
$("#PI_nav li").eq(2).click(function () {
    $("body").animate({
        scrollTop:PI_darentop
    },300)
});
//查看详情
$("#PI_see").click(function () {
    $("body").animate({
        scrollTop:navoffset
    },300)
});

//封装
function addCss() {
    if($(window).scrollTop()>=navoffset){
        $("#PI_nav").css({
            position:"fixed",
            top:0
        });
    }else{
        $("#PI_nav").css({
            position:"relative"
        });
    }
}

function MaoJi() {
    if($(window).scrollTop()>=PI_pointtop&&$(window).scrollTop()<PI_usetop){
        $("#PI_nav li a").removeClass("PI_active");
        $("#PI_nav li").eq(0).find("a").addClass("PI_active");
    }else if($(window).scrollTop()>=PI_usetop&&$(window).scrollTop()<PI_darentop){
        $("#PI_nav li a").removeClass("PI_active");
        $("#PI_nav li").eq(1).find("a").addClass("PI_active");
    }else if($(window).scrollTop()>=PI_darentop){
        $("#PI_nav li a").removeClass("PI_active");
        $("#PI_nav li ").eq(2).find("a").addClass("PI_active");
    }
}
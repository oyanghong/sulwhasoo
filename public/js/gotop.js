/**
 * Created by 1 on 2017/7/22.
 */
$(window).scroll(function(){
    var top = $(window).scrollTop();
    if(top>100){
        $(".gotop").css("display","block");
    }else {
        $(".gotop").css("display","none");
    }
});
$(".gotop").click(function () {
    $("body").animate({scrollTop:0},300);
});
/**
 * Created by 1 on 2017/7/31.
 */
//添加加号
$(".pro_more").addClass("pro_line");
$(".pro_more").addClass("pro_sline");


$(".pro_absolute").click(function () {
    var classname=$(this).parent().find(".pro_text1").attr("class");
    if(classname=="pro_text1"){
        //让可能打开了的隐藏
        $(".pro_more").addClass("pro_sline");
        $(".pro_absolute").parent().find(".pro_text1").slideUp(0);
        $(".pro_absolute").parent().find(".pro_text1").removeClass("pro_active");

        //加号旋转成减号

        $(this).find(".pro_more").css({
            transform:"rotate(360deg)",
            transformOrigin: "center bottom",
            transition:"0.3s all ease"
        });

        $(this).find(".pro_more").removeClass("pro_sline");
        $(this).parent().find(".pro_text1").slideDown();
        $(this).parent().find(".pro_text1").addClass("pro_active");
        var top=$(this).offset().top+$(window).height()-635;
        setTimeout(function () {
            $("body").animate({
                scrollTop:top
            },300)
        },300);
    }else {

        $(this).find(".pro_more").css({
            transform:"rotate(0deg)",
            transformOrigin: "center bottom",
            transition:"0.3s all ease"
        });
        $(this).find(".pro_more").addClass("pro_sline");
        $(this).parent().find(".pro_text1").slideUp();
        $(this).parent().find(".pro_text1").removeClass("pro_active");
    }
});
/**
 * Created by Z on 2017/7/26.
 */
$(function(){
    //左右换页
    $(".dy_aright").click(function(){
        $(".dy_chinaUl").removeClass("dy_chinaActive");
        $($(this).closest(".dy_chinaUl").next()).addClass("dy_chinaActive");
    });
    $(".dy_aleft").click(function(){
        $(".dy_chinaUl").removeClass("dy_chinaActive");
        $($(this).closest(".dy_chinaUl").prev()).addClass("dy_chinaActive");
    });

    //品牌动态导航栏
    $("#dy_top li").click(function(){
        var index=$(this).index();
        $("#dy_top li").removeClass("dy_active");
        $(this).addClass("dy_active");
        $(".dy_iframe").removeClass("dy_iframeActive");
        $( $(".dy_iframe").get(index) ).addClass("dy_iframeActive");
    });


});
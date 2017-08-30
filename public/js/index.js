/**
 * Created by 1 on 2017/7/17.
 */
$(function () {
   //图片轮播部分
    function indexTop() {
        var arr=$(".index_top");
        var arr2=$(".index_radiu");

        timer=setInterval(imgplay,5000);
        function imgplay() {

            var index1=$(arr).index($(".index_top_active"));

            if(index1==arr.length-1){
                index1=-1;
            }
            $(arr).removeClass("index_top_active");
            $(arr[index1+1]).addClass("index_top_active");
            $(arr2).removeClass("index_radiu_active");
            $(arr2[index1+1]).addClass("index_radiu_active");

        }
        $(".index_radiu").click(function () {
            clearInterval(timer);
            var index=$(this).index();
            $(arr2).removeClass("index_radiu_active");
            $(this).addClass("index_radiu_active");
            $(arr).removeClass("index_top_active");
            $(arr[index]).addClass("index_top_active");
            $(".index_stopbtn").addClass("index_playbtn");
            $(".index_stopbtn").removeClass("index_stopbtn");

            $(".index_playbtn").click(function () {
                timer=setInterval(imgplay,5000);
                $(this).addClass("index_stopbtn");
                $(this).removeClass("index_playbtn");
            })
        });

        $(".index_stopbtn").click(function () {
            clearInterval(timer);
            $(this).addClass("index_playbtn");
            $(this).removeClass("index_stopbtn");

            $(".index_playbtn").click(function () {
                timer=setInterval(imgplay,5000);
                $(this).addClass("index_stopbtn");
                $(this).removeClass("index_playbtn");
            })
        });
    }
    //下滑图片出现部分
    function ani(claname){
        if(($("."+claname).offset().top - $(window).scrollTop())<$(window).height()){
            $("."+claname).addClass("index_float_slide");
        }

        $(window).scroll(function(){
            if(($("."+claname).offset().top - $(window).scrollTop())<$(window).height()){
                $("."+claname).addClass("index_float_slide");
            }
        });
    }
    indexTop();
    ani("index_float1");
    ani("index_float2");
    ani("index_float3");
    ani("index_float4");
});
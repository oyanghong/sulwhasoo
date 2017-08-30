/**
 * Created by Z on 2017/7/17.
 */
$(function(){
    $(function(){
        $(".star_li").hover(function(e){
            var top=$(this).offset().top;
            var left=$(this).offset().left;
            var clientX=e.clientX;
            var clientY=e.clientY;


            if(clientY+$(window).scrollTop()>=top&&clientY+$(window).scrollTop()<=(top+(390/2))){
                $(this).find(".star_cover").css({
                    top:"-100%",
                    left:0
                });
                $(this).find(".star_cover").animate({
                    top:0,
                    left:0
                },200)
            }else if(clientX>=left&&clientX<=(left+(548/2))){
                $(this).find(".star_cover").css({
                    top:0,
                    left:"-100%"
                });
                $(this).find(".star_cover").animate({
                    top:0,
                    left:0
                },200)
            }else if(clientX>=(left+(548/2))&&clientX<=left+548){
                $(this).find(".star_cover").css({
                    top:0,
                    left:"100%"
                });
                $(this).find(".star_cover").animate({
                    top:0,
                    left:0
                },200)
            }else if(clientY+$(window).scrollTop()>=(top+(390/2))&&clientY+$(window).scrollTop()<=top+390){
                $(this).find(".star_cover").css({
                    top:"100%",
                    left:0
                });
                $(this).find(".star_cover").animate({
                    top:0,
                    left:0
                },200)
            }
        },function () {
            $(this).find(".star_cover").animate({
                top:0,
                left:"-100%"
            },200)
        });
    });
});
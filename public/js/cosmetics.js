/**
 * Created by Z on 2017/8/4.
 */
$(function(){
    $(".protection li").hover(function(){
        $(".protection li").find(".cos_tect").addClass("text_blur");
        $(this).find(".cos_tect").removeClass("text_blur");
    },function(){
        $(".protection li").find(".cos_tect").removeClass("text_blur");
    });
});
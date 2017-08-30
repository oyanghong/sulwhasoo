/**
 * Created by cherry on 2017/8/19.
 */
//about_page6图片轮换
var $aboutUlImg=$(".about_ul_img");
var $aboutPicBtn=$("#about_pic_btn");

var index=1;
var time;

time=window.setInterval("show()",2000);
function show(id) {
    if(Number(id)){
        clearInterval(time);
        index=id;
    }else{
        index=index%4+1;
    }
    $aboutUlImg.find("li").eq(index-1).addClass("about_img_show");
    $aboutUlImg.find("li").eq(index-2).removeClass("about_img_show");

    for(var i=0;i<$aboutPicBtn.find("li a").length;i++){
        $aboutPicBtn.find("li a").eq(i).removeClass("about_pb_active");
        if(index==i+1){
            $aboutPicBtn.find("li a").eq(i).addClass("about_pb_active");
        }
    }
}

function start() {
    time=window.setInterval("show()",2000);
}

//about_more_page图片轮换
var $aboutPageInfo1=$("#about_page_info1");
var $aboutPageInfo2=$("#about_page_info2");
var $aboutPageInfo4=$("#about_page_info4");
var $aboutPageInfo5=$("#about_page_info5");
var $aboutPageInfo6=$("#about_page_info6");
var imgIndex;

$aboutPageInfo1.find("ul li").on("click",function () {
    $aboutPageInfo1.find(".about_img_active").removeClass("about_img_active");
    $(this).addClass("about_img_active");
    $aboutPageInfo1.find("img").hide();
    imgIndex=$(this).index();
    // alert(imgIndex);
    $aboutPageInfo1.find("img").eq(imgIndex).show();
});

$aboutPageInfo2.find("ul li").on("click",function () {
    $aboutPageInfo2.find(".about_img_active").removeClass("about_img_active");
    $(this).addClass("about_img_active");
    $aboutPageInfo2.find("img").hide();
    imgIndex=$(this).index();
    // alert(imgIndex);
    $aboutPageInfo2.find("img").eq(imgIndex).show();
});

$aboutPageInfo4.find("ul li").on("click",function () {
    $aboutPageInfo4.find(".about_img_active").removeClass("about_img_active");
    $(this).addClass("about_img_active");
    $aboutPageInfo4.find("img").hide();
    imgIndex=$(this).index();
    // alert(imgIndex);
    $aboutPageInfo4.find("img").eq(imgIndex).show();
});

$aboutPageInfo5.find("ul li").on("click",function () {
    $aboutPageInfo5.find(".about_img_active").removeClass("about_img_active");
    $(this).addClass("about_img_active");
    $aboutPageInfo5.find("img").hide();
    imgIndex=$(this).index();
    // alert(imgIndex);
    $aboutPageInfo5.find("img").eq(imgIndex).show();
});

$aboutPageInfo6.find("ul li").on("click",function () {
    $aboutPageInfo6.find(".about_img_active").removeClass("about_img_active");
    $(this).addClass("about_img_active");
    $aboutPageInfo6.find("img").hide();
    imgIndex=$(this).index();
    // alert(imgIndex);
    $aboutPageInfo6.find("img").eq(imgIndex).show();
});


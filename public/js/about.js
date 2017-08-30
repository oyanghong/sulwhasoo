/**
 * Created by cherry on 2017/8/17.
 */
$(function () {
    var $aboutPic1=$("#about_pic1");
    var $aboutMove=$("#about_move");
    var $aboutPoem=$("#about_poem");
    var $aboutDrag=$(".about_drag");
    var $aboutFixed=$(".about_fixed");
    var $aboutPage=$(".about_page");

    //about_first动画
    function aniFisrt() {
        $aboutPic1.stop().animate({opacity:1,left:150},1000);
        $aboutDrag.eq(0).stop().fadeIn(2000);
        var i=0;
        if(i<$aboutMove.find("p span").length){
            var aTimer=setInterval(function () {
                $aboutMove.find("p span").eq(i).stop().fadeIn(100);
                $aboutMove.find("small").eq(i).stop().delay(500).fadeIn(100);
                i++;
            },1500);
        }else{
            clearInterval("aTimer");
        }
        $aboutPoem.stop().delay(4500).animate({height:180,opacity:1},4000);
    }
    aniFisrt();

    //about_page1、3、7、9、11动画
    function aniFixed(m) {
        $aboutFixed.eq(m).fadeIn(4000);
    }

    //about_page4、10动画
    var $aboutUlPic=$(".about_ul_pic");

    function aniPage4(n) {
        $aboutUlPic.eq(n).animate({opacity:1},1000,function () {
            $aboutUlPic.eq(n).find("h3,p:not('.about_pic_bottom')").fadeIn(1000);
            $aboutUlPic.eq(n).find(".about_pic_bottom").delay(1000).animate({top:330,opacity:1},1000);
        });
    }

    //about_page5动画
    var $aboutC1=$("#about_c1");
    var $aboutL2=$("#about_l2");
    var $aboutR2=$("#about_r2");
    var $aboutL1=$("#about_l1");
    var $aboutR1=$("#about_r1");
    var $aboutC2=$("#about_c2");

    function aniPage5() {
        $aboutL1.animate({left:-130},1000,function () {
            $aboutL2.animate({left:-50},1000);
        });
        $aboutR1.animate({left:150},1000,function () {
            $aboutR2.animate({left:50},1000);
        });
        $aboutC2.animate({left:100},2000);
        $aboutC1.delay(2000).animate({top:-60},1000);
    }

    //about_page8动画
    var $aboutUlBar2=$("#about_ul_bar2");

    function aniPage8() {
        for(var i=0;i<$aboutUlBar2.find("li").length;i++){
            $aboutUlBar2.find("li:eq('"+i+"')").animate({top:0,opacity:1},1000+i*400);
        }
    }

    //about_last动画
    var $aboutAniHide=$(".about_ani_hide");
    var $aboutLastWord2=$("#about_last_word2");
    var $aboutTop160=$("#about_top160");

    function aniLast() {
        $aboutDrag.eq(1).stop().fadeIn(2000);
        $aboutAniHide.fadeOut(1000,function () {
            $aboutLastWord2.fadeTo(2000,1,function () {
                $aboutTop160.animate({top:90,opacity:1},4000);
            });
        });
    }

    //判断动画执行
    function showAni(indexShow) {
        if(indexShow==0){
            aniFisrt();
        }else if(indexShow>0 && indexShow<11){
            if(indexShow%2!=0){
                aniFixed((indexShow-1)/2);
                if(indexShow==5){
                    aniPage5();
                }
            }else if(indexShow==4){
                aniPage4(0);
            }else if(indexShow==8){
                aniPage8();
            }else if(indexShow==10){
                aniPage4(1);
            }
        }else if(indexShow==11){
            aniFixed((indexShow-1)/2);
            setTimeout(aniLast(),4000);
        }
    }

    function hideAni(indexHide) {
        if(indexHide==0){
            $aboutPoem.css({
                opacity:0,
                height:0
            });
            $aboutPic1.css({
                opacity:0,
                left:130
            });
            $aboutMove.find("p span").css("display","none");
            $aboutMove.find("small").css("display","none");
            $aboutDrag.eq((indexHide-1)/2).css("display","none");
        }else if(indexHide>0 && indexHide<11){
            if(indexHide%2!=0){
                $aboutFixed.eq((indexHide-1)/2).css("display","none");
                if(indexHide==5){
                    $aboutL1.css("left",0);
                    $aboutL2.css("left",0);
                    $aboutR1.css("left",0);
                    $aboutR2.css("left",0);
                    $aboutC2.css("left",-100);
                    $aboutC1.css("top",-80);
                }
            }else if(indexHide==2){
                $(".about_ul_bar").eq(0).css("left","0");
                $("#about_dragR").css("left","0");
            }else if(indexHide==4){
                $aboutUlPic.eq(0).css("opacity",0);
                $aboutUlPic.eq(0).find("h3,p:not('.about_pic_bottom')").css("display","none");
                $aboutUlPic.eq(0).find(".about_pic_bottom").css({
                    top:390,
                    opacity:0
                });
            }else if(indexHide==8){
                $aboutUlBar2.find("li").css({
                    top:20,
                    opacity:0
                });
            }else if(indexHide==10){
                $aboutUlPic.eq(1).css("opacity",0);
                $aboutUlPic.eq(1).find("h3,p:not('.about_pic_bottom')").css("display","none");
                $aboutUlPic.eq(1).find(".about_pic_bottom").css({
                    top:390,
                    opacity:0
                });
            }
        }else if(indexHide==11){
            $aboutDrag.eq((indexHide-1)/2).css("display","none");
            $aboutLastWord2.css("opacity",0);
            $aboutTop160.css({
                top:160,
                opacity:0
            });
        }
    }

    //主页滚动事件
    var flag=true;
    var over=true;
    var index=0;
    var x;
    var $aboutBox=$("#about_box");
    var $aboutScroll=$("#about_scroll");
    var $aboutHead=$("#about_head");
    var start=true;
    var up=true;

    var scrollFunc=function(e){
        e=e || window.event;
        var str="";
        if(e.wheelDelta){//IE/Opera/Chrome
            str=e.wheelDelta;
            // console.log(str);   //上滚：120    下滚-120
        }else if(e.detail){//Firefox
            str=e.detail;
            // console.log(str);   //上滚：3  下滚：-3
        }
        if(flag){
            flag=false;
            if (str==-120||str==-3){
                if(over && start){
                    index++;
                    if(index>=11){
                        index=11;
                    }
                    // console.log("index:"+index);
                    over=false;
                    if(index==1){
                        $aboutHead.slideUp(500);
                    }
                    $aboutBox.find(".about_page_active").removeClass("about_page_active");
                    $aboutBox.find(".about_page").eq(index).addClass("about_page_active");
                    $aboutBox.find(".about_page").eq(index).attr("style","top:0");
                    showAni(index);

                    //右侧导航条
                    if(index==1){
                        $aboutScroll.find("li a").eq(index-1).removeClass("about_abg_active");
                        $aboutScroll.find("li a").eq(index).addClass("about_abg_active");
                    }else if(index>1 && index%2!=0){
                        x=(index+1)/2;
                        $aboutScroll.find("li a").eq(x-1).removeClass("about_abg_active");
                        $aboutScroll.find("li a").eq(x).addClass("about_abg_active");
                    }

                    // console.log($aboutBox.find(".about_page_active").get(0).style.top);
                    if($aboutBox.find(".about_page_active").get(0).style.top==0+"px"){
                        setTimeout(function () {
                            $aboutBox.find(".about_page").eq(index-1).attr("style","top:662px");
                            $aboutBox.find(".about_page").eq(index-1).removeClass("about_page_active");
                            hideAni(index-1);
                            over=true;
                            if(index==11){
                                $aboutBox.find(".about_page").eq(11).attr("style","top:0");
                            }
                        },1000);
                    }
                }
            }else if(str==120||str==3){
                over=true;
                if(over && start && up){
                    up=false;
                    index--;
                    if(index<=0){
                        index=0;
                    }
                    // console.log("index:"+index);
                    over=false;
                    // $aboutBox.find(".about_page").eq(index+1).addClass("about_page_active1");

                    $aboutBox.find(".about_page").eq(index+1).removeClass("about_page_active");
                    $aboutBox.find(".about_page").eq(index+1).animate({
                        top:662
                    },1000);
                    if(index==0){
                        $aboutHead.slideDown(500);
                    }
                    $aboutBox.find(".about_page").eq(index).attr("style","top:0");
                    $aboutBox.find(".about_page").eq(index+1).attr("style","top:662px");

                    if(index==0){
                        $aboutScroll.find("li a").eq(index+1).removeClass("about_abg_active");
                        $aboutScroll.find("li a").eq(index).addClass("about_abg_active");
                    }else if(index>0 && index%2==0){
                        x=index/2;
                        $aboutScroll.find("li a").eq(x+1).removeClass("about_abg_active");
                        $aboutScroll.find("li a").eq(x).addClass("about_abg_active");
                    }

                    if($aboutBox.find(".about_page").eq(index+1).get(0).style.top==662+"px"){
                        showAni(index);
                        setTimeout(function () {
                            $aboutBox.find(".about_page").eq(index+1).attr("style","top:662px");
                            hideAni(index+1);
                            // $aboutBox.find(".about_page").eq(index+1).removeClass("about_page_active1");
                            over=true;
                            up=true;
                            if(index==0){
                                $aboutBox.find(".about_page").eq(0).attr("style","top:0");
                            }
                        },1000);
                    }
                }
            }
        }else{
            flag=true;
        }
    };

    /*设置事件的兼容*/
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//Firefox
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome

    //about_scroll
    $aboutScroll.find("li a").not("#about_all_page").on("mouseover",function () {
        $aboutScroll.find("li a").css("text-decoration","none");
        $aboutScroll.find("li a").find("span").stop().fadeIn(500);
    });

    $aboutScroll.find("li a").not("#about_all_page").on("mouseout",function () {
        setTimeout(function () {
            $aboutScroll.find("li a").find("span").stop().fadeOut(500);
        },20);
    });

    var a;//获取点击前的index

    $aboutScroll.find("li a").not("#about_all_page").on("click",function () {
        a=index;
        // console.log(a);
        $aboutBox.find(".about_page_active1").removeClass("about_page_active1");
        $aboutBox.find(".about_page_active").removeClass("about_page_active");
        $aboutBox.find(".about_abg_active").removeClass("about_abg_active");
        $aboutBox.find(".about_last_ani").attr("style","top:662px");
        $aboutBox.find(".about_last_ani").removeClass("about_last_ani");
        $(this).addClass("about_abg_active");
        var y=$(this).index("a");
        console.log(y);
        if(y<1){
            index=y;
        }else{
            index=2*y-1;
        }
        if(a>index){
            // console.log(index);
            $aboutBox.find(".about_page").eq(index).attr("style","top:0");
            showAni(index);
            if(index==0){
                $aboutHead.slideDown(500);
            }
            $aboutBox.find(".about_page").eq(index+1).animate({
                top:662
            },2000);//点上
            $aboutBox.find(".about_page").eq(index+1).addClass("about_page_active1");
            if($aboutBox.find(".about_page").eq(index).get(0).style.top==0+"px"){
                setTimeout(function () {
                    $aboutBox.find(".about_page").eq(a).attr("style","top:662px");
                    hideAni(a);
                },1000);
            }
        }else if(a<index){
            $aboutHead.slideUp(500);
            $aboutBox.find(".about_page").eq(index).addClass("about_last_ani");//点下
            $aboutBox.find(".about_page").eq(index).attr("style","top:0");
            showAni(index);
            // console.log($aboutBox.find(".about_page").eq(index).get(0).style.top);
            if($aboutBox.find(".about_page").eq(index).get(0).style.top==0+"px"){
                setTimeout(function () {
                    $aboutBox.find(".about_page").eq(a).attr("style","top:662px");
                    hideAni(a);
                },1000);
            }
        }
    });

    //按钮
    var $aboutAllPage=$("#about_all_page");
    var $aboutClosePages=$("#about_close_pages");

    //页面
    var $aboutAllPages=$("#about_all_pages");
    var $aboutLittlePage=$(".about_little_page");

    $aboutAllPage.click(function () {
        start=false;
        over=false;
        $aboutHead.slideUp(500);
        $aboutPage.hide();
        $aboutAllPages.show();

        //about_all_pages的动画
        $aboutLittlePage.hover(function () {
            var index=$(this).find("h2").index("h2");
            if(index==2 || index==3 || index==5){
                $(this).find("h2").addClass("about_colorW");
            }
            $(this).find("h2").stop().animate({bottom:120},500);
            $(this).find(".about_bgG").stop().animate({opacity:0.9},1000);
            $(this).find("p").stop().animate({opacity:1},1000);
        },function () {
            $(this).find(".about_bgG").stop().animate({opacity:0},1000);
            $(this).find("p").stop().animate({opacity:0},1000);
            $(this).find("h2").stop().animate({bottom:40},1000);
            var index=$(this).find("h2").index("h2");
            if(index==2 || index==3 || index==5){
                $(this).find("h2").removeClass("about_colorW");
            }
        });
    });

    $aboutClosePages.click(function () {
        start=true;
        over=true;
        $aboutPage.show();
        $aboutAllPages.hide();
    });

    $aboutLittlePage.click(function () {
        var x=$(this).index(".about_little_page");
        if(x==0){
            index=x+1;
            $aboutBox.find(".about_page").not(index).attr("style","top:662");
            for(var i=0;i<=11;i++){
                hideAni(i);
            }
            $aboutBox.find(".about_page_active").removeClass("about_page_active");
            $aboutBox.find(".about_page").eq(index).attr("style","top:0");
            showAni(index);
            $aboutScroll.find("li a").not(x+1).removeClass("about_abg_active");
            $aboutScroll.find("li a").eq(x+1).addClass("about_abg_active");
        }else{
            index=2*x+1;
            $aboutBox.find(".about_page").not(index).attr("style","top:662");
            for(var i=0;i<=11;i++){
                hideAni(i);
            }
            $aboutBox.find(".about_page_active").removeClass("about_page_active");
            $aboutScroll.find("li a").not(x+1).removeClass("about_abg_active");
            $aboutBox.find(".about_page").eq(index).attr("style","top:0");
            showAni(index);
            $aboutScroll.find("li a").eq(x+1).addClass("about_abg_active");
        }
        $aboutPage.show();
        $aboutAllPages.hide();
        if(index==11){
            over=false;
        }else{
            over=true;
        }
        start=true;
    });

    //下拉查看更多
    var $aboutDragDown=$("#about_drag_down");
    $aboutDragDown.on("click",function () {
        $aboutHead.slideUp(500);
        index+=1;
        $aboutBox.find(".about_page").eq(index).addClass("about_page_active");
        $aboutBox.find(".about_page").eq(index).attr("style","top:0");
        showAni(index);
        if($aboutBox.find(".about_page_active").get(0).style.top==0+"px"){
            $aboutBox.find(".about_page").eq(index-1).attr("style","top:662px");
            hideAni(index-1);
        }
    });

    //回到顶部
    var $aboutDragUp=$("#about_drag_up");
    $aboutDragUp.on("click",function () {
        $aboutScroll.find("li a").not(index).removeClass("about_abg_active");
        index=0;
        $aboutHead.slideDown(500);
        $aboutBox.find(".about_page_active").addClass("about_page_active");
        // $aboutBox.find(".about_page").eq(index).animate({
        //     top:0
        // },1000);
        $aboutBox.find(".about_page").eq(index).addClass("about_last_ani");
        $aboutBox.find(".about_page").eq(index).attr("style","top:0");
        showAni(index);
        $aboutScroll.find("li a").eq(index).addClass("about_abg_active");
        if($aboutBox.find(".about_page").eq(index).get(0).style.top==0+"px"){
            $aboutBox.find(".about_page").eq(11).attr("style","top:662px");
            hideAni(11);
        }
    });

    //about_more_page
    var $aboutCloseMp=$("#about_close_mp");
    var $aboutMore=$(".about_more");
    var $aboutMorePage=$("#about_more_page");
    var $aboutPageBg=$(".about_page_bg");
    var z;

    $aboutMore.animate({opacity:1},1000);
    $aboutMore.find("a:eq(0)").animate({left:0,opacity:1},1000);

    $aboutMore.click(function () {
        over=false;
        start=false;
        $aboutMorePage.show();
        $aboutPage.eq(index).animate({left:-685},1000);
        if(index<5){
            z=index/2-1;
        }else{
            z=index/2-2;
        }
        $aboutPageBg.eq(z).show();
    });

    $aboutCloseMp.click(function () {
        $aboutMorePage.hide();
        $aboutPage.eq(index).animate({left:0},1000);
        $aboutPageBg.eq(z).hide();
        over=true;
        start=true;
    });
});
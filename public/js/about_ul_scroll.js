/**
 * Created by cherry on 2017/8/23.
 */
$(function () {
    var $aboutDragBox=$("#about_drag_box");
    var $aboutDragR=$("#about_dragR");
    var $aboutUlBar=$(".about_ul_bar");

//        var bigDis=$aboutDragBox.width()-$aboutDragR.width();
    var flag;
    var currentX=0;
    var nowX;
    var disX;
    var barDis;
    var leftChange;
    $aboutDragR.on("mousedown",function (e) {
//            alert($aboutDragR.get(0).offsetLeft);
        flag=true;
        currentX=e.clientX;
//            var a1=e.pageX;
//            var a2=e.clientX;//a1=a2=420
//            var a3=e.offsetX;//352距对象 a1=a3+a4
//            var a4=$aboutDragR.offset().left;//68
//            var a5=$aboutDragR.get(0).offsetLeft;//60距左值
//            var a6=$aboutDragR.get(0).offsetWidth;//660宽度
    });

    $aboutDragR.on("mouseup mouseout",function () {
        flag=false;
    });

    $aboutDragR.mousemove(function (e) {
        if(flag){
            nowX=e.clientX;
            disX=nowX-currentX;
            leftChange=$aboutDragR.get(0).offsetLeft+disX;
            barDis=$aboutDragBox.width()/$aboutDragR.width()*leftChange;

            if(leftChange>=0 && leftChange<506){
                $aboutDragR.css({
                    left:leftChange,
                    transition:"all 1s ease"
                });
                $aboutUlBar.eq(0).css({
                    left:-barDis,
                    transition:"all 1s ease"
                });
            }
//                if(disX<=0){
//                    //左移
//                    if(leftChange>=0){
//                        $aboutDragR.css({
//                            left:leftChange,
//                            transition:"all 1s ease"
//                        });
//                        $aboutUlBar.css({
//                            left:-barDis,
//                            transition:"all 1s ease"
//                        });
//                    }else{
//                        $aboutDragR.css({
//                            left:0,
//                            transition:"all 1s ease"
//                        });
//                        $aboutUlBar.css({
//                            left:0,
//                            transition:"all 1s ease"
//                        })
//                    }
//                }else{
//                    //右移
//                    if(leftChange<=bigDis){
//                        $aboutDragR.css({
//                            left:leftChange,
//                            transition:"all 1s ease"
//                        });
//
//                        $aboutUlBar.css({
//                            left:-barDis,
//                            transition:"all 1s ease"
//                        })
//                    }else{
//                        $aboutDragR.css({
//                            left:bigDis,
//                            transition:"all 1s ease"
//                        });
//                        $aboutUlBar.css({
//                            left:-850,
//                            transition:"all 1s ease"
//                        })
//                    }
//                }
        }
    });
});

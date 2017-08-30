/**
 * Created by 1 on 2017/8/22.
 */
$(function () {
    change();
    //给input加hover事件
    $("input").css({
        border:"1px solid #ccc"
    });
    $("input").hover(function () {
        $(this).css({
            border:"1px solid #000"
        })
    },function () {
        $(this).css({
            border:"1px solid #ccc"
        })
    });
    //名字验证
    $("#uname").keyup(function () {
        var uname=$(this).val();
        if(uname.length<2){
            $(this).css("border","2px solid #A54C4E");
            $(this).parent().next().html("至少输入两个字以上");
        }else {
            $(this).css("border","2px solid #000");
            $(this).parent().next().html("");
        }
    });
    //验证码
    function change(){
        code=$("#tcode");
        // 验证码组成库
        var arrays=new Array(
            '1','2','3','4','5','6','7','8','9','0',
            'a','b','c','d','e','f','g','h','i','j',
            'k','l','m','n','o','p','q','r','s','t',
            'u','v','w','x','y','z',
            'A','B','C','D','E','F','G','H','I','J',
            'K','L','M','N','O','P','Q','R','S','T',
            'U','V','W','X','Y','Z'
        );
        codes='';// 重新初始化验证码
        for(var i = 0; i<5; i++){
            // 随机获取一个数组的下标
            var r = parseInt(Math.random()*arrays.length);
            codes += arrays[r];
        }
        // 验证码添加到span里
        code.html(codes);
        //点击事件刷新验证码
        $("#refresh").click(change);
        //验证码验证
        var codeText=$("#tcode").html();
        $("#test_code1").blur(function () {
            if(codeText.toUpperCase()!=$(this).val().toUpperCase()){
                $(this).css("border","1px solid #A54C4E");
                $(this).parent().next().html("验证码输入错误请重新输入");
            }else {
                $(this).css("border","1px solid #000");
                $(this).parent().next().html("");
            }
        });
    }
    //电子邮箱验证
    $("#email").blur(function () {
        var email=$(this).val();
        if(!isEmail(email)){
            $(this).css("border","1px solid #A54C4E");
            $(this).parent().next().html("电子邮箱格式有误");
        }else {
            $(this).css("border","1px solid #000");
            $(this).parent().next().html("");
        }
    });
    //密码验证
    $("#pwdR").blur(function () {
        var pwd=$("#pwd").val();
        var repwd=$("#pwdR").val();
        if(pwd!=repwd){
            $("#pwd").css("border","1px solid #A54C4E");
            $("#pwd").parent().next().html("两次输入的密码不一致");
        }else {
            $("#pwd").css("border","1px solid #000");
            $("#pwd").parent().next().html("");
        }
    });

    $("#check").change(function () {
        if ($(this).is(':checked')){
            $("#reg_sub").addClass("reg_a_active");
        }else {
            $("#reg_sub").removeClass("reg_a_active");
        }
    });
    function isEmail(str){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    }

    //开始发送请求
    //注册请求
    $("#reg_sub").click(function () {
        var uname=$("#uname").val();
        var pwd=$("#pwd").val();
        var phone=$("#phone").val();
        var email=$("#email").val();
        var birth=$("#date").val();
        var sexbox=$('input[name=sex]');
        var sex='';
        for(var i=0; i<sexbox.length; i++){
            if(sexbox[i].checked){
                sex=sexbox[i].value;
            }
        }
        $.post("/api/user/addUserInfo",{uname:uname,pwd:pwd,phone:phone,email:email,birth:birth,sex:sex},function (data) {
            if(data==1){
                alert("注册成功");
                location.href='/api/html/login';
            }else {
                alert("注册失败");
            }
        })
    });

});

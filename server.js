/**
 * Created by 1 on 2017/8/17.
 */
//加载模块
var express=require("express");
var mysql=require("mysql");
var bodyparser=require("body-parser");
var session=require("express-session");
var multer=require("multer");
var swig=require("swig");



//创建app应用
var app=express();


//模板引擎
//1.配置引擎的后缀名   后缀名  解析模板引擎的方法
app.engine("html",swig.renderFile);
//2.设置模板引擎所在的目录  第一个参数不可改   第二个目录名
app.set("views","./view");
//3.使用模板引擎   第一个参数不可改  第二个与上面设置的一样
app.set("view engine","html");
//4.开发过程中，我们是不需要缓存的   但是项目上线，这个缓存还是要的
swig.setDefaults({cache:false});

//静态文件托管
app.use("/public",express.static(__dirname + "/public"));

//配置和使用body-parser中间件
app.use(bodyparser.urlencoded({extended:false}));



//配置session
app.use(session({
    //这个随便写，但是，不要重名
    secret:'keyboard cat',      //私密session的唯一id标识
    resave:true,        //cookie每次默认的有效时间10分钟，每过10分钟，都会自动的再存一次
    saveUninitialized:true,        //指无论你有没有设置sessing cookie,每次请求的时候，都会设置一个session cookie
    cookie:{maxAge:1000*60*60},     //设置时间，单位是毫秒
    cookie:{secure:false}
}));


//配置数据库连接池
var pool =mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"sulwhasoo",
    user:"root",
    password:"aaaa"
});



//看用户有没有登录
app.use(function (req,res,next) {
    req.userInfo={};
    if(req.session.userInfo){
        req.userInfo=req.session.userInfo;
    }
    next();
});



//路由
//考虑到把所有的业务逻辑都写在一个server.js里面   1.过于庞大  2.不好查找
//  路由的路径   这个路由是哪个文件
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));

//静态中间件
app.use(express.static("public"));

app.listen(80,function(err){
    if(err){
        console.info(err);
    }else{
        console.info("应用程序启动成功...");
    }
});
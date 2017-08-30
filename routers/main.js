/**
 * Created by 1 on 2017/8/4.
 */
//路由的操作
//1.导入express
var express=require("express");
var mysql=require("mysql");


//配置数据库连接池
var pool =mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"sulwhasoo",
    user:"root",
    password:"aaaa"
});

//2.加载路由
//网页的所有跳转网页get请求
var router=express.Router();
router.get("/",function (req,res) {
    res.render("main/index",{
        userInfo:req.userInfo
    });
});
//头部气垫推荐
router.get("/html/qidian",function (req,res) {
    res.render("html/qidian",{
        userInfo:req.userInfo
    });
});
//关于雪花秀
router.get("/html/about",function (req,res) {
    res.render("html/about",{
        userInfo:req.userInfo
    });
});
//全线产品
router.get("/html/product",function (req,res) {
    res.render("html/product",{
        userInfo:req.userInfo
    });
});
//全线产品下明星单品
router.get("/html/product/starSingle",function (req,res) {
    var page=req.query.page||1;
    var size=8;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select * from goodsinfo where tid=1 and gid in (select min(gid) from goodsinfo group by gname)", function (err, result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1

            conn.query("select * from goodsinfo where tid=1 and gid in (select min(gid) from goodsinfo group by gname) order by tid limit " + (page - 1) * size + "," + size, function (err, resu) {
                conn.release();
                res.render("html/starSingle", {
                    userInfo: req.userInfo,
                    count:count,
                    pages:pages,
                    page:page,
                    allgoods:resu
                });
            });
        });
    });
});
//全线产品下护肤产品
router.get("/html/product/protection",function (req,res) {
    var page=req.query.page||1;
    var size=16;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select * from goodsinfo where tid=2 and gid in (select min(gid) from goodsinfo where tid=2 group by gname)", function (err, result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1

            conn.query("select * from goodsinfo where tid=2 and gid in (select min(gid) from goodsinfo where tid=2 group by gname) order by tid limit " + (page - 1) * size + "," + size, function (err, resu) {
                conn.release();
                res.render("html/protection", {
                    userInfo: req.userInfo,
                    count:count,
                    pages:pages,
                    page:page,
                    allgoods:resu
                });
            });
        });
    });
});
//全线产品下彩妆
router.get("/html/product/cosmetics",function (req,res) {
    var page=req.query.page||1;
    var size=16;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select * from goodsinfo where tid=3 and gid in (select min(gid) from goodsinfo where tid=3 group by gname)", function (err, result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1

            conn.query("select * from goodsinfo where tid=3 and gid in (select min(gid) from goodsinfo where tid=3 group by gname) order by tid limit " + (page - 1) * size + "," + size, function (err, resu) {
                conn.release();
                res.render("html/cosmetics", {
                    userInfo: req.userInfo,
                    count:count,
                    pages:pages,
                    page:page,
                    allgoods:resu
                });
            });
        });
    });
});
//全线产品下男士
router.get("/html/product/manProduct",function (req,res) {
    var page=req.query.page||1;
    var size=16;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select * from goodsinfo where tid=4 and gid in (select min(gid) from goodsinfo where tid=4 group by gname)", function (err, result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1

            conn.query("select * from goodsinfo where tid=4 and gid in (select min(gid) from goodsinfo where tid=4 group by gname) order by tid limit " + (page - 1) * size + "," + size, function (err, resu) {
                conn.release();
                res.render("html/manProduct", {
                    userInfo: req.userInfo,
                    count:count,
                    pages:pages,
                    page:page,
                    allgoods:resu
                });
            });
        });
    });
});
//全线产品下使用步骤
router.get("/html/product/applications",function (req,res) {
    res.render("html/applications",{
        userInfo:req.userInfo
    });
});
//全线产品下本月推荐
router.get("/html/product/recommend",function (req,res) {
    res.render("html/recommend",{
        userInfo:req.userInfo
    });
});
//畅销榜单
router.get("/html/salewell",function (req,res) {
    res.render("html/salewell",{
        userInfo:req.userInfo
    });
});
//独特体验
router.get("/html/special",function (req,res) {
    res.render("html/special",{
        userInfo:req.userInfo
    });
});
//独特体验下韩方美容法
router.get("/html/special/beauty",function (req,res) {
    res.render("html/beauty",{
        userInfo:req.userInfo
    });
});
//独特体验下雪花文化展
router.get("/html/special/culture",function (req,res) {
    res.render("html/culture",{
        userInfo:req.userInfo
    });
});
//独特体验下雪花秀杂志
router.get("/html/special/magazine",function (req,res) {
    res.render("html/magazine",{
        userInfo:req.userInfo
    });
});
router.get("/html/special/magazine2",function (req,res) {
    res.render("html/magazine2",{
        userInfo:req.userInfo
    });
});
//独特体验下SPA
router.get("/html/special/SPA",function (req,res) {
    res.render("html/SPA",{
        userInfo:req.userInfo
    });
});
//品牌动态
router.get("/html/dynamic",function (req,res) {
    res.render("html/dynamic",{
        userInfo:req.userInfo
    });
});
//品牌动态全部
router.get("/html/dynamic/dy_all",function (req,res) {
    res.render("html/dy_all",{
        userInfo:req.userInfo
    });
});
router.get("/html/dynamic/dy_china",function (req,res) {
    res.render("html/dy_china",{
        userInfo:req.userInfo
    });
});
router.get("/html/dynamic/dy_abroad",function (req,res) {
    res.render("html/dy_abroad",{
        userInfo:req.userInfo
    });
});
router.get("/html/dynamic/dy_video",function (req,res) {
    res.render("html/dy_video",{
        userInfo:req.userInfo
    });
});
//官方商城
router.get("/html/shop",function (req,res) {
    res.render("html/shop",{
        userInfo:req.userInfo
    });
});
//官方商城下优先试用
router.get("/html/shop/try",function (req,res) {
    res.render("html/try",{
        userInfo:req.userInfo
    });
});
//官方商城下会员独享
router.get("/html/shop/formember",function (req,res) {
    res.render("html/formember",{
        userInfo:req.userInfo
    });
});
//3.把这个文件和主路由连接起来
module.exports=router;
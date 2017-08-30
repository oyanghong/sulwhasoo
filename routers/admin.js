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
var router=express.Router();
//查看详情
router.get("/product_introduce",function (req,res) {
    var page=req.query.page||1;
    var size=5;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select c.*,u.uname from comment c,user u where gid=1 and u.uid=c.uid", function (err, result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1

            conn.query("select c.*,u.uname from comment c,user u where gid=1 and u.uid=c.uid order by cid limit " + (page - 1) * size + "," + size, function (err, resu) {
                conn.release();
                res.render("html/product_introduce", {
                    userInfo: req.userInfo,
                    count:count,
                    pages:pages,
                    page:page,
                    allcomment:resu
                });
            });
        });
    });
});
router.get("/product_introduce2",function (req,res) {
    var page=req.query.page||1;
    var size=5;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select c.*,u.uname from comment c,user u where gid=4 and u.uid=c.uid", function (err, result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1

            conn.query("select c.*,u.uname from comment c,user u where gid=4 and u.uid=c.uid order by cid limit " + (page - 1) * size + "," + size, function (err, resu) {
                conn.release();
                res.render("html/product_introduce2", {
                    userInfo: req.userInfo,
                    count:count,
                    pages:pages,
                    page:page,
                    allcomment:resu
                });
            });
        });
    });
});
//显示评论
router.post("/showcomment",function (req,res) {
    if(req.userInfo.uid){
        res.send("1")
    }else {
        res.send("0");
    }
});
//保存评论
router.post("/savecomment",function (req,res) {
    var title=req.body.title;
    var gid=req.body.gid;
    var content=req.body.content;
    var date=new Date();
    pool.getConnection(function (err,conn) {
        conn.query("insert into comment values(?,?,?,null,?,?,null)",[date,req.userInfo.uid,gid,content,title],function (err, result) {
            conn.release();
            if(err){
                console.info(err);
                res.send("0");
            }else {
                res.send("1");
            }
        });
    });
});
//访谈详情
router.get("/special/interview",function (req,res) {
    res.render("html/interview",{
        userInfo:req.userInfo
    });
});
//beauty2
router.get("/special/beauty2",function (req,res) {
    res.render("html/beauty2",{
        userInfo:req.userInfo
    });
});
//文化详情
router.get("/culture/showCulture",function (req,res) {
    res.render("html/showCulture",{
        userInfo:req.userInfo
    });
});
//杂志详情
router.get("/magazine/magazine_introduce",function (req,res) {
    res.render("html/magazine_introduce",{
        userInfo:req.userInfo
    });
});
//SPA按摩项目
router.get("/SPA/program",function (req,res) {
    res.render("html/program",{
        userInfo:req.userInfo
    });
});
//try_comment
router.get("/try/try_comment",function (req,res) {
    res.render("html/try_comment",{
        userInfo:req.userInfo
    });
});
//mem_discount
router.get("/formember/mem_discount",function (req,res) {
    res.render("html/mem_discount",{
        userInfo:req.userInfo
    });
});

//订单生成页面
router.get("/html/orderitem",function (req,res) {
    pool.getConnection(function (err,conn) {
        conn.query("select o.*,s.*,g.price,g.gname,g.pic from orderitem o,shopcar s,goodsinfo g where o.state=0 and o.uid=? and o.sid=s.sid and g.gid=s.gid",[req.userInfo.uid], function (err, result) {
            conn.release();
            res.render("html/orderitem",{
                userInfo:req.userInfo,
                orders:result
            });
        });
    });

});
//取消订单
router.post("/delstate",function (req,res) {
    pool.getConnection(function (err,conn) {
        conn.query("delete from orderitem where state=0 and uid=?",[req.userInfo.uid],function (err, result) {
            conn.release();
            if(err){
                console.log(err);
            }else {
                res.send("1");
            }
        });
    });

});

//保存订单  保存了就删除购物车中对应的商品
router.post("/saveorder",function (req,res) {
    pool.getConnection(function (err,conn) {
        conn.query("update shopcar set state=0 where sid in (select sid from orderitem where state=0 and uid=?)",[req.userInfo.uid],function (err,resu) {
            if(err){
                console.log(err);
            }
            conn.query("update orderitem set state=1 where state=0 and uid=?",[req.userInfo.uid],function (err, result) {
                conn.release();
                if(err){
                    console.log(err);
                }else {
                    res.send("1");
                }
            });
        });
    });

});
//rec_1
router.get("/rec_1",function (req,res) {
    res.render("html/rec_1",{
        userInfo:req.userInfo
    });
});
router.get("/rec_3",function (req,res) {
    res.render("html/rec_3",{
        userInfo:req.userInfo
    });
});
router.get("/rec_4",function (req,res) {
    res.render("html/rec_4",{
        userInfo:req.userInfo
    });
});
router.get("/rec_5",function (req,res) {
    res.render("html/rec_5",{
        userInfo:req.userInfo
    });
});
router.get("/rec_6",function (req,res) {
    res.render("html/rec_6",{
        userInfo:req.userInfo
    });
});
//搜索
router.get("/search",function (req,res) {
    var gname=req.query.gname;
    pool.getConnection(function (err,conn) {
        conn.query("select * from goodsinfo where gname like '%"+gname+"%'",function (err,result) {
            conn.release();
            if(err){
                console.log(err);
            }else {
                res.render("html/search",{
                    userInfo:req.userInfo,
                    allgoods:result,
                    count:result.length
                });
            }
        });
    });
});
//3.吧这个文件和主路由连接起来
module.exports=router;
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


//注册响应
router.get("/html/register",function (req,res) {
    res.render("html/register",{
        userInfo:req.userInfo
    });
});
router.post("/user/addUserInfo",function (req,res) {
    //先获取数据
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    var phone=req.body.phone;
    var email=req.body.email;
    var birth=req.body.birth;
    var sex=req.body.sex;
    pool.getConnection(function (err,conn) {
        if(err){
            res.send("0");
        }else {
            //插入数据
            conn.query("insert into user values(null,?,?,?,?,?,?)",[uname,phone,email,pwd,sex,birth],function (err,result) {
                //数据插入完成之后，记得把链接还给数据库连接池
                conn.release();
                if(err){
                    console.info(err);
                    res.send("0");
                }else {
                    res.send("1");
                }
            })
        }
    })
});

//登录响应
router.get("/html/login",function (req,res) {
    res.render("html/login",{
        userInfo:req.userInfo
    });
});
router.post("/user/userLogin",function (req,res) {
    //先获取数据
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    pool.getConnection(function (err,conn) {
        if(err){
            res.send("0");
        }else {
            //插入数据
            conn.query("select * from user where phonenum=? and pwd=? or email=? and pwd=?",[uname,pwd,uname,pwd],function (err,result) {
                //数据插入完成之后，记得把链接还给数据库连接池
                conn.release();
                if(err){
                    console.info(err);
                    res.send("0");
                }else if(result.length>0){
                    //将登陆信息存到session里面去
                    req.session.userInfo=result[0];
                    res.send("1");
                }else{
                    res.send("2");
                }
            })
        }
    })
});

//购物车响应
router.get("/html/shopCar",function (req,res) {
    pool.getConnection(function (err,conn) {
        conn.query("select c.*,g.gname,g.price,g.pic from shopcar c,goodsinfo g where uid=? and c.gid=g.gid and state=1",[req.userInfo.uid],function (err,result) {
            //数据插入完成之后，记得把链接还给数据库连接池
            conn.release();
            if(err){
                console.log(err);
            }
            res.render("html/shopCar",{
                userInfo:req.userInfo,
                shopgoods:result
            });
        })
    });
});

//退出登录
router.get("/user/loginout",function (req,res) {
    req.session.userInfo=null;
    res.send("1");
});

//商品购买框响应
router.post("/buyshow",function (req,res) {
    var gid=req.body.gid;
    pool.getConnection(function (err,conn) {
        //最好把所有的类别都查出来
        conn.query("select * from goodsinfo where gid=?",[gid],function (err,result) {
            conn.release();
            if (err){
                console.log(err);
            }else {
                res.send(result[0]);
            }
        });
    });
});


//加入购物车
router.post("/addshopcar",function (req,res) {
    var gid=req.body.gid;
    // console.log(req.userInfo.uid);
    if(req.userInfo.uid){
        pool.getConnection(function (err,conn) {
            //最好把所有的类别都查出来
            conn.query("insert into shopcar values(null,?,?,1)",[gid,req.userInfo.uid],function (err,result) {
                conn.release();
                if (err){
                    console.log(err);
                }else {
                    res.send("2");
                }
            });
        });
    }else {
        res.send("0");
    }
});
//购物车删除商品
router.post("/del",function (req,res) {
    var sid=req.body.sid;
   pool.getConnection(function (err,conn) {
       conn.query("delete from shopcar where sid=?",[sid],function (err,result) {
           conn.release();
           if (err){
               console.log(err);
               res.send("2");
           }else {
               res.send("1");
           }
       })
   })
});
router.post("/delmuch",function (req,res) {
    var sid=req.body.sid;
    var sql='delete from shopcar where sid in ('+sid+')';
    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,result) {
            conn.release();
            if (err){
                console.log(err);
                res.send("2");
            }else {
                res.send("1");
            }
        })
    })
});

//购买  加入订单表
router.post("/buy",function (req,res) {
    var num=req.body.num;
    var obuy=req.body.obuy;
    var sid=req.body.sid;
    var date=new Date();
    pool.getConnection(function (err,conn) {
        conn.query("insert into orderitem values(?,null,?,?,?,?,0)",[req.userInfo.uid,sid,date,obuy,num],function (err,result) {
            conn.release();
            if (err){
                console.log(err);
                res.send("0");
            }else {
                res.send("2");
            }
        })
    })
});

//购买选中
router.post("/buymuch",function (req,res) {
    var num=req.body.num;
    var obuy=req.body.obuy;
    var sid=req.body.sid;
    var date=new Date();
    var numarr=num.split(",");
    var obuyarr=obuy.split(",");
    var sidarr=sid.split(",");
    var sql="insert into orderitem values";
    for(var i=0;i<numarr.length;i++) {
        sql+="('"+req.userInfo.uid+"',null,'"+sidarr[i]+"','"+date+"','"+obuyarr[i]+"','"+numarr[i]+"',0),";
    }
    sql=sql.substring(0,sql.length-1);
    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,result) {
            conn.release();
            if (err){
                console.log(err);
                res.send("2");
            }else {
                res.send("1");
            }
        })
    })
});

//我的页面  订单页
router.get("/html/mypage",function (req,res) {
    var page=req.query.page||1;
    var size=8;         //这个定死
    pool.getConnection(function (err,conn) {
        conn.query("select o.*,g.gname from orderitem o,shopcar s,goodsinfo g where s.sid=o.sid and g.gid=s.gid and o.uid=? and o.state <> 0",[req.userInfo.uid],function (err,result) {
            //总数量
            var count = result.length;
            //总页数
            var pages = Math.ceil(result.length / size);
            //控制一下当前的页数
            page = Math.min(page, pages);      //最大不能超过pages
            page = Math.max(page, 1);      //最小不小于1
            conn.query("select o.*,g.gname from orderitem o,shopcar s,goodsinfo g where s.sid=o.sid and g.gid=s.gid and o.uid='"+req.userInfo.uid+"' and o.state <> 0 order by oid desc limit " + (page - 1) * size + "," + size,function (err,resuall) {
                conn.query("select o.*,g.gname from orderitem o,shopcar s,goodsinfo g where s.sid=o.sid and g.gid=s.gid and o.uid=? and o.state=1 order by oid desc",[req.userInfo.uid],function (err,resu) {
                    conn.query("select o.*,g.gname from orderitem o,shopcar s,goodsinfo g where s.sid=o.sid and g.gid=s.gid and o.uid=? and o.state=2 order by oid desc",[req.userInfo.uid],function (err,resu2) {
                        conn.release();
                        res.render("html/mypage",{
                            userInfo:req.userInfo,
                            count:count,
                            pages:pages,
                            page:page,
                            allorder:resuall,
                            waitorder:resu,
                            successorder:resu2
                        });
                    });
                });
            });
        })
    })
});

//付款
router.post("/payfor",function (req,res) {
    var pwd=req.body.pwd;
    var oid=req.body.oid;
    pool.getConnection(function (err,conn) {
        conn.query("select * from user where uid=?",[req.userInfo.uid],function (err,result) {
            if(err){
                console.log(err);
            }else {
                if(pwd==result[0].pwd){
                    conn.query("update orderitem set state=2 where oid=?",[oid],function (err,result) {
                        if(err){
                            console.log(err);
                        }else if(result.affectedRows>0){
                            res.send("1");
                        }
                    })
                }else {
                    res.send("0");
                }
            }
        })
    })
});
//商品页立即购买
router.post("/paynow",function (req,res) {
    var pwd=req.body.pwd;
    var gid=req.body.gid;
    var num=req.body.num;
    var obuy=req.body.obuy;
    var date=new Date();
    pool.getConnection(function (err,conn) {
        conn.query("select * from user where uid=?",[req.userInfo.uid],function (err,result) {
            if(err){
                console.log(err);
            }else {
                if(pwd==result[0].pwd){
                    conn.query("insert into shopcar values(null,?,?,0)",[gid,req.userInfo.uid],function (err,resu) {
                        if (err){
                            console.log(err);
                        }else {
                            conn.query("insert into orderitem values(?,null,?,?,?,?,2)",[req.userInfo.uid,resu.insertId,date,obuy,num],function (err,resu2) {
                                conn.release();
                                if (err){
                                    console.log(err);
                                }else {
                                    res.send("2");
                                }
                            })
                        }
                    });
                }else {
                    res.send("0");      //密码不匹配
                }
            }
        })
    })
});
//订单页立即支付
router.post("/payright",function (req,res) {
    var pwd=req.body.pwd;
    pool.getConnection(function (err,conn) {
        conn.query("select * from user where uid=?",[req.userInfo.uid],function (err,result) {
            if(err){
                console.log(err);
            }else {
                if(pwd==result[0].pwd){
                    conn.query("update orderitem set state=2 where state=0 and uid=?",[req.userInfo.uid],function (err,resu) {
                        conn.query("update shopcar set state=0 where state=1 and uid=?",[req.userInfo.uid],function (err,resu2) {
                            conn.release();
                            if(err){
                                console.log(err);
                            }else if(resu.affectedRows>0){
                                res.send("1");
                            }
                        });
                    })
                }else {
                    res.send("0");
                }
            }
        })
    })
});
//3.吧这个文件和主路由连接起来
module.exports=router;
var express=require("express");
var mysql=require("mysql");

//配置数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"blog",
    user:"root",
    password:"a"
});

//路由操作，第一步，需要加载路由
var router=express.Router();

//判断 如果没有登录或普通用户 无法访问管理员后台界面
router.use(function (req,res,next) {
    //console.log(req.session.userInfo);
    if(req.session.userInfo==null || req.session.userInfo==undefined || req.session.userInfo.isAdmin===0){
        res.send("<script>alert('非法操作，请重新登录');location.href='http://127.0.0.1/login'</script>");
        return;
    }
    next();
});

//第二步，处理请求
router.get("/", function (req,res) {
    res.render("admin/admin",{
        userInfo:req.session.userInfo
    });
});

//用户首页的请求
router.get("/user", function (req,res) {
    var page=Number(req.query.page || 1);
    var size=6;
    pool.getConnection(function (err,conn) {
        conn.query("select * from user order by uid", function (err,result) {
            if(err){
                console.log(err);
            }
            var count=result.length;
            var pages=Math.ceil(count/size);
            page=Math.min(page,pages);
            page=Math.max(page,1);

            var beginSize=(page-1)*size;

            //开始分页查询
            conn.query("select * from user order by uid limit ?,?",[beginSize,size], function (err,result2) {
                //释放连接
                conn.release();
                res.render("admin/user_index",{
                    userInfo:req.session.userInfo,
                    users:result2,
                    tag:'user',
                    page:page,
                    pages:pages,
                    size:size,
                    count:count
                });
            } );
        });
    });
});

//分类管理
router.get("/category",function(req,res){
    var page=Number(req.query.page || 1);
    var size=6;
    pool.getConnection(function (err,conn) {
        conn.query("select * from type order by tid", function (err,result) {
            if(err){
                console.log(err);
            }
            var count=result.length;
            var pages=Math.ceil(count/size);
            page=Math.min(page,pages);
            page=Math.max(page,1);

            var beginSize=(page-1)*size;

            //开始分页查找
            conn.query("select * from type order by tid limit ?,?",[beginSize,size], function (err,result2) {
                //释放连接
                conn.release();
                res.render("admin/category_index",{
                    userInfo:req.session.userInfo,
                    types:result2,
                    tag:'category',
                    page:page,
                    pages:pages,
                    size:size,
                    count:count
                });
            } );
        })
    })
});

//修改类型
router.post("/category/edit", function (req,res) {
    var tid=req.body.tid;
    var tname=req.body.tname;
    pool.getConnection(function (err,conn) {
        conn.query("update type set tname=? where tid=?",[tname,tid], function (err,result) {
            conn.release();
            if(err){
                console.log(err);
            }else if(result.affectedRows>0){        //affectedRows   受影响的行
                res.send("1");
            }else{
                res.send("0");
            }
        });
    })
});

//删除分类
router.post("/category/del", function (req,res) {
    var tid=req.body.tid;
    var flag=false;
    pool.getConnection(function (err,conn) {
        conn.query("select * from contents where tid=?",[tid], function (err,resu) {
            if(err){
                console.log(err);
            }else if(resu.length>0){
                //意味着这个tid在contents有数据，不能删除
                //这个时候，想要删除，那么，就要所有的内容的为tid的数据，转换为首页的数据
                conn.query("update contents set tid=1 where tid=?",[tid], function (err,re) {
                    conn.query("delete from type where tid=?",[tid], function (err,result) {
                        conn.release();
                        if(err){
                            console.log(err);
                            res.send("0");
                        }else if(result.affectedRows>0){        //affectedRows   受影响的行
                            res.send("1");
                        }else{
                            res.send("0");
                        }
                    });
                });
            }else{
                conn.query("delete from type where tid=?",[tid], function (err,result) {
                    conn.release();
                    if(err){
                        console.log(err);
                        res.send("0");
                    }else if(result.affectedRows>0){        //affectedRows   受影响的行
                        res.send("1");
                    }else{
                        res.send("0");
                    }
                });
            }
        });
        //要删除，可以，但是，这个数据，不能在contents里面
    })
});

//添加类型
var msg={
    code:-1,
    message:""
};

router.get("/category/add", function (req,res) {
    res.render("admin/category_add",{
        addInfo:req.session.addInfo
    });
});
router.post("/category/add", function (req,res) {
    var tname=req.body.tname;
    var description=req.body.description;
    var classs=req.body.classs;
    pool.getConnection(function (err,conn) {
        conn.query("insert into type values(?,?,0,?)",[classs,description,tname], function (err,result) {
            conn.release();
            if(err){
                console.log(err);
                msg.code=0;
                msg.message="类名不可重复";
                res.json(msg);
            }else{
                msg.code=1;
                msg.message="添加成功";
                res.json(msg);
            }
            //console.log(msg);
        });
    });
});


//内容首页
router.get("/content", function (req,res) {
    var page=Number(req.query.page || 1);
    var size=6;
    pool.getConnection(function (err,conn) {
        conn.query("select * from contents ", function (err,result) {
            if(err){
                console.log(err);
            }
            var count=result.length;
            var pages=Math.ceil(count/size);
            page=Math.min(page,pages);
            page=Math.max(page,1);

            var beginSize=(page-1)*size;

            //开始分页查找
            conn.query("select c.*,t.tname,u.uname from user u,type t,contents c where c.tid=t.tid and c.uid=u.uid order by c.cid limit ?,?",[beginSize,size], function (err,result2){
                //释放连接
                conn.release();
                res.render("admin/content_index",{
                    userInfo:req.session.userInfo,
                    contents:result2,
                    tag:'content',
                    page:page,
                    pages:pages,
                    size:size,
                    count:count
                });
            })
        })
    })
});

//内容删除
router.post("/content/del", function (req,res) {
    var cid=req.body.cid;
    pool.getConnection(function (err,conn) {
        conn.query("delete from contents where cid=?",[cid], function (err,result) {
            if(err){
                console.log(err);
            }
            if(result.affectedRows>0){
                res.send("1");
            }else{
                res.send("0");
            }
        })
    })
});

//内容修改
router.get("/content/edit", function (req,res) {
    var cid=req.query.cid;
    pool.getConnection(function (err,conn) {
        conn.query("select * from type order by tid", function (err,resu) {
            conn.query("select c.*,t.tname from contents c,type t where c.tid=t.tid and c.cid=?",[cid], function (err,result) {
                conn.release();
                if(err){
                    console.log(err);
                }
                res.render("admin/content_edit",{
                    userInfo:req.session.userInfo,
                    content:result[0],
                    types:resu
                })
            });
        });
    })
});

router.post("/content/edit", function (req,res) {
    //这个数据是在网址上的，所有要用query
    var cid=Number(req.query.cid);
    //剩下的数据，都是通过form表单提交的，所有用body
    var tid=Number(req.body.category);      //form表单提交，键都是name
    var title=req.body.title;
    var des=req.body.description;
    var content=req.body.content;

    pool.getConnection(function (err,conn) {
        conn.query("update contents set tid=?,title=?,description=?,content=? where cid=?",[tid,title,des,content,cid], function (err,result) {
            conn.release();
            if(err){
                console.log(err);
            }
            //  ./  返回上一级
            res.send("<script>alert('修改成功');location.href='./'</script>")
        })
    })
});

//内容添加
router.get("/content/add", function (req,res) {
    var tid=Number(req.body.category);      //form表单提交，键都是name
    var title=req.body.title;
    var des=req.body.description;
    var content=req.body.content;
    var date=new Date();
    var addTime=date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds();
    pool.getConnection(function (err,conn) {
        conn.query("select * from type order by tid", function (err,result){
            conn.release();
            if(err){
                console.log(err);
            }
            res.render("admin/content_add",{
                addInfo:req.session.addInfo,
                types:result
            });
        })
    })

});

router.post("/content/add", function (req,res) {
    var tid=Number(req.body.category);      //form表单提交，键都是name
    var title=req.body.title;
    var des=req.body.description;
    var content=req.body.content;
    var date=new Date();
    var addTime=date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds();
    pool.getConnection(function (err,conn) {
        conn.query("insert into contents values(0,?,?,?,?,?,?,0,0)",
            [tid,req.session.userInfo.uid,title,addTime,des,content], function (err,result) {
                conn.release();
                if(err){
                    console.log(err);
                }
                res.send("<script>alert('添加成功');location.href='./'</script>")
            })
    })
});


//第三步，将这个支线模块，加载到主模块里面去
module .exports=router;
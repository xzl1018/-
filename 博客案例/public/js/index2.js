$(function(){
    var $userBox=$("#userInfo");
    var $submit=$(".submit");
    var $loginBox=$(".f1");
    var $menu=$("#menu");
    //登录
    $submit.find('input').on('click',function(){
        var uname=$loginBox.find('[name="username"]').val();
        var pwd=$loginBox.find('[name="password"]').val();
        if(uname=="" || uname==null || pwd=="" || pwd==null){
            alert("用户名或密码不能为空");
            return;
        }
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success: function (result) {
                $loginBox.find('.colWarning').html(result.message);
                if(result.code==2){
                    //登录成功
                    $loginBox.hide();
                    $userBox.show();
                    $loginBox.find('[name="username"]').val("");
                    $loginBox.find('[name="password"]').val("");
                    //判断是管理员还是普通用户
                    if(result.info.isAdmin==0){     //普通用户
                        $userBox.find("p.userName span").html(result.info.uname);
                        $userBox.find("p.adminInfo").hide();
                    }else if(result.info.isAdmin==1){       //管理员
                        $userBox.find("p.userName span").html(result.info.uname);
                        $userBox.find("p.adminInfo").show();
                    }
                }
            }
        })
    });

    //退出
   /* $menu.find('button').on('click',function(){
        var uname=$loginBox.find('[name="username"]').val();
        var pwd=$loginBox.find('[name="password"]').val();
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/logout',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function(result){
                $loginBox.find('.colWarning').html(result.message);

                    $loginBox.find('[name="username"]').val("");
                    $loginBox.find('[name="password"]').val("");
                    window.location.reload();

            }
        })
    });*/
    /*$menu.find('button').on('click',function(){
        session.uname = null;
        session.pwd = null;
        session.userInfo = null;
        location.reload();
    });*/
});
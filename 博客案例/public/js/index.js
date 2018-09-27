$(function(){
    var $resBox=$(".f1");
    var $userBox=$("#userInfo");
    var $submit=$(".submit");
    //注册
    $submit.find('input').on('click', function () {
        var uname=$resBox.find('[name="username"]').val();
        var pwd=$resBox.find('[name="password"]').val();
        var repwd=$resBox.find('[name="repassword"]').val();
        if(uname=="" || uname==null || pwd=="" || pwd==null ){
            alert("用户名或密码不能为空");
            return;
        }
        if(pwd!=repwd){
            alert("输入的两次密码不一致");
            return;
        }
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$resBox.find('[name="username"]').val(),
                password:$resBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function(result){
                $resBox.find('.colWarning').html(result.message);

                if(result.code==2){
                    //注册成功
                }
            }
        });
    });
});
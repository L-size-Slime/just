<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/style.css"
	type="text/css" />
<script type="text/javascript"	src="js/jquery.min.js"></script>
<script type="text/javascript"	src="js/common.js"></script>
<script type="text/javascript"	src="js/layer/layer.js"></script>
<script type="text/javascript"	src="js/layui/layui.all.js"></script>
<script type="text/javascript"	src="js/layui/layui.js"></script>
<script type="text/javascript" >
	function Login(){
		var username = $("#username").val();
		var password = $("#password").val();
		if (username.trim() == "") {
			/* com.message("error", "请输入用户名", function() {
				$("#username").focus();
			}); */
			layer.msg("请输入用户名");
			return;

		}
		if (password.trim() == "") {
			/* com.message("error", "请输入密码", function() {
				$("#password").focus();
			}); */
			layer.msg("请输入密码");
			return;

		}
		com.ajax({
			url : '${contextPath}/login/login.do',
			data : $("#form_login").serialize(),
			success : function(d) {
				if (d.success) {
					com.message("success", "系统登录成功", function() {
						window.location.href = '${contextPath}/index.do';
					})
				} else {
					com.message("error", d.msg);
				}
			}
		});
	}
</script>
</head>
<body>

  <html lang="en-US">
<head>
  <meta charset="utf-8">
    <title>Login</title>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">

</head>
    <div id="login">
      <form name='form-login'>
        <span class="fontawesome-user"></span>
          <input type="text" id="username" placeholder="Username">
       
        <span class="fontawesome-lock"></span>
          <input type="password" id="password" placeholder="Password">
        
        <input type="button" onclick="Login()" value="Login">

</form>
  
  

</body>
</html>




<%@ page contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<title>数据同步 (1.0)</title>
<jsp:include page="/view/common/pathVars.jsp" />
<link rel="stylesheet" href="${contextPath}/static/css/login.css"
	type="text/css" />
<script type="text/javascript"
	src="${contextPath}/static/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextPath}/static/js/layer/layer.js"></script>
<script type="text/javascript" src="${contextPath}/static/js/common.js"></script>
<script type="text/javascript">
	$(function() {
		//解決ie8不支持trim的问题
		if (!String.prototype.trim) {
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, '');
			};
		}

		document.onkeydown = function(e) {
			var ev = document.all ? window.event : e;
			if (ev.keyCode == 13) {
				Login();
			}
		}
		$("#username").val("admin");
		$("#password").val("admin");
		Login();
	});
	function Login() {
		var username = $("#username").val();
		var password = $("#password").val();
		if (username.trim() == "") {
			com.message("error", "请输入用户名", function() {
				$("#username").focus();
			});
			return;

		}
		if (password.trim() == "") {
			com.message("error", "请输入密码", function() {
				$("#password").focus();
			});
			return;

		}
		com.ajax({
			url : '${contextPath}/login/login.do',
			data : $("#login_form").serialize(),
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
	<h1>
		厦门市建筑从业人员实名制自动同步软件<sup>1.0</sup>
	</h1>
	<div class="login">
		<div class="header">
			<div class="switch" id="switch">
				<a class="switch_btn_focus" href="javascript:void(0);" tabindex="7">系统登录</a>
			</div>
		</div>
		<div class="web_qr_login" id="web_qr_login"
			style="display: block; height: 235px;">

			<!--登录-->
			<div class="web_login" id="web_login">


				<div class="login-box">


					<div class="login_form">
						<form id="login_form" class="loginForm">

							<div class="uinArea" id="uinArea">
								<label class="input-tips" for="u">帐号：</label>
								<div class="inputOuter" id="uArea">

									<input type="text" id="username" name="username"
										class="inputstyle" placeholder="请输入用户名" />
								</div>
							</div>
							<div class="pwdArea" id="pwdArea">
								<label class="input-tips" for="p">密码：</label>
								<div class="inputOuter" id="pArea">

									<input type="password" id="password" name="password"
										class="inputstyle" placeholder="请输入密码" />
								</div>
							</div>

							<div style="padding-left: 50px; margin-top: 20px;">
								<input type="button" value="登 录" style="width: 150px;"
									class="button_blue" onclick="Login()" />
							</div>
						</form>
					</div>

				</div>

			</div>
			<!--登录end-->
		</div>



	</div>

	<div class="jianyi">*推荐使用ie8或以上版本ie浏览器或Chrome内核浏览器访问本站</div>
	<div class="jianyi" ><font >厦门俊煜信息科技有限公司</font></div>
</body>
</html>

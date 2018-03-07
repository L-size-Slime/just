<%@ page contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>厦门市建筑从业人员实名制自动同步</title>
<jsp:include page="/view/common/pathVars.jsp" />
<jsp:include page="/static/header.jsp" />
</head>
<script type="text/javascript">
	var message = "${message}";
	$(function() {
		/**
		 * 设定细单的编辑框
		 **/
		$('#systemgrid').edatagrid({
			autoSave : true
		});

		window.setInterval(function() {
			com.ajax({
				async : false,
				url : "${contextPath}/message.do",
				success : function(data) {
					addMsg(data.msg);
					refresh();
				}
			});
		}, 150000);

		addMsg(message);
	});

	var save = function() {
		var rows = $("#systemgrid").datagrid("getData").rows;
		for(row in rows){
			if(rows[row].text=='time'){
				var strTime = rows[row].value;
				var r=strTime.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
				if(r != null){
					com.ajax({
						url : "${contextPath}/save.do",
						data : {
							list : JSON.stringify(rows)
						},
						success : function(data) {
							if (data.success) {
								com.message("success", data.msg);
							} else {
								com.message("error", data.msg);
							}
						}
					});
				}else{
					com.message("erroe","日期格式错误，请设置为 yyyy-mm-dd");
				}
			}
		}
		
		
		
	}

	var refresh = function() {
		$("#systemgrid").datagrid('reload');
		$("#systemgrid").datagrid('clearSelections');
	}
</script>
<body class="easyui-layout" fit="true" scroll="no">

	<!--头部 start -->
	<div class="wu-header" data-options="region:'north',border:false,split:false">
		<div class="wu-header-left">
			<h1>厦门市建筑从业人员实名制自动同步</h1>
		</div>
		<div class="wu-header-right">
			<p>
				<strong class="easyui-tooltip"></strong>管理员欢迎您！
			</p>
			<p>
				<a href="javascript:void(0)" class="loginOut">安全退出</a>
			</p>
		</div>
	</div>
	<!--  头部 end -->
	<!--  底部  start-->
	<div class="wu-footer" data-options="region:'south',split:false"></div>
	<!--  底部 end -->
	<!-- 内容  start -->
	<div data-options="region:'center'">
		<div id="tabs" class="easyui-tabs" fit="true" border="false">
			<div title="我的桌面" style="overflow: hidden;" id="home">
				<div id="cc" class="easyui-layout" style="width: 100%; height: 100%;">
					<div data-options="region:'north',title:'系统参数',split:true" style="height: 246px;">
						<table id="systemgrid" class="easyui-datagrid" toolbar="#toolbar" rownumbers="true" fitColumns="false"
							singleSelect="true" fit="true" url="${contextPath}/systemparameters.do">
							<thead>
								<tr>
									<th field="text" hidden="true">参数</th>
									<th field="remark" width="49%">参数名</th>
									<th field="value" width="49%" editor={type:'textbox',options:{required:false}}>参数值</th>
								</tr>
							</thead>
						</table>
						<div id="toolbar">
							<table>
								<tr>
									<td><a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-save" plain="true"
										onclick="save()">保存</a></td>
									<td><a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-arrow_refresh" plain="true"
										onclick="refresh()">刷新</a></td>
									<td><strong><font color="gray" >【<font color="red">提示：</font>请保管好以下系统参数，系统重启后参数将恢复默认！】</font></strong></td>
								</tr>
							</table>
						</div>
					</div>
					<div data-options="region:'center',title:'数据同步'" style="padding: 10px;">
						<div style="float: left; width: 50%;">
							<table class="frm" >
								<tr>
									<td><a href="javascript:void(0)" onclick="persons()" class="easyui-linkbutton"
										data-options="iconCls:'icon-save' ,size:'large'">&nbsp人员信息同步&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></td>
								</tr>
								<tr>
									<td><a href="javascript:void(0)" onclick="team()" class="easyui-linkbutton"
										data-options="iconCls:'icon-save',size:'large'">&nbsp班组信息同步&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></td>
								</tr>
								<tr>
									<td><a href="javascript:void(0)" onclick="teamPersons()" class="easyui-linkbutton"
										data-options="iconCls:'icon-save',size:'large'">&nbsp人员入场信息同步&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></td>
								</tr>
								<tr>
									<td><a href="javascript:void(0)" onclick="accessOfPersons()" class="easyui-linkbutton"
										data-options="iconCls:'icon-save',size:'large'">&nbsp人员进出工地信息同步</a></td>
								</tr>
							</table>
						</div>
						<div style="float: left;">
							<table>
								<tr>
									<textarea id="result" rows="20%" cols="100%" class="textarea easyui-validatebox" readonly="readonly"></textarea>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 内容 end -->
</body>
<script type="text/javascript">
	var logout = function() {
		layer.confirm('您确定要退出系统？', {
			title : '系统提示',
			icon : 3,
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			com.ajax({
				url : '${contextPath}/login/logout.do',
				success : function(d) {
					if (d.success) {
						window.location.href = '${contextPath}/';
					} else {
						com.message("error", "登出失败");
					}
				}
			});
		}, function() {

		});
	};
	$('.loginOut').click(logout);

	function addMsg(msg) {
		var oldMsg = $("#result").val();
		if (com.isNotBlank(msg)) {
			$("#result").val(msg + "\r\n" + oldMsg);
		}
	}

	//可编辑
	function readOnlyChange() {
		if (com.isNotBlank($("#sGXKNum").attr("readonly"))) {
			$('#sGXKNum').removeAttr("readonly");
		} else {
			$('#sGXKNum').attr("readonly", "readonly");
		}
	}

	// 保存
	function saveSGXKNum() {
		var sGXKNum = $('#sGXKNum').val();
		if (com.isBlank(sGXKNum)) {
			com.message("error", "请输入施工许可证");
		} else {
			com.ajax({
				url : '${contextPath}/sgxknumupdate.do',
				data : {
					sGXKNum : sGXKNum
				},
				success : function(d) {
					if (d.success) {
						$('#sGXKNum').attr("readonly", "readonly");
						com.message("success", "修改成功");
					} else {
						com.message("error", d.msg);
					}
				}
			});
		}
	}

	function accessOfPersons() {
		com.ajax({
			url : '${contextPath}/accessofpersons.do',
			success : function(d) {
				addMsg(d.msg);
			}
		});
	}

	function persons() {
		com.ajax({
			url : '${contextPath}/persons.do',
			success : function(d) {
				addMsg(d.msg);
			}
		});
	}

	function team() {
		com.ajax({
			url : '${contextPath}/team.do',
			success : function(d) {
				addMsg(d.msg);
			}
		});
	}

	function teamPersons() {
		com.ajax({
			url : '${contextPath}/teampersons.do',
			success : function(d) {
				addMsg(d.msg);
			}
		});
	}
</script>
</html>
var selectprovinceid="0";
var selectcityid="0";
var selectcountyid="0";
var selecttownyid="0";
function ChangeProvince() {
		if (selectprovinceid != "0") {
			$("#provinceId").val(selectprovinceid);
		}
		selectprovinceid = "0";
	
		var provinceId = $("#provinceId").val();
		if(provinceId!=null&&provinceId!=""&&provinceId!="0"){
			com.ajax({
				url : '/city/loadSupportCity?id=' + provinceId,
				success : function(d) {
					$("#cityId").empty();
					$("#countyId").empty();
					if (com.isBlank(d)) {
					} else {
						$.each(d, function(i, item) {
							$("#cityId").append(
									"<option value='" + item.id + "'>"
											+ item.cityName + "</option>");
						});
					}
					ChangeCity();
				}

			});
		}
	
	}
function ChangeCity() {
		if (selectcityid != "0") {
			$("#cityId").val(selectcityid);
		}
		selectcityid = "0";
		var cityId = $("#cityId").val();
		com.ajax({
			url : '/county/loadSupportCounty?id=' + cityId,
			success : function(d) {
				$("#countyId").empty();
				if (com.isBlank(d)) {
				} else {
					$.each(d, function(i, item) {
						$("#countyId").append(
								"<option value='" + item.id + "'>"
										+ item.countyName + "</option>");
					});
				}

				if (selectcountyid != "0") {
					$("#countyId").val(selectcountyid);
				}
				ChangeCounty();
				selectcountyid = "0";
				
			}

		});
	}
function ChangeCounty() {
		if (selectcountyid != "0") {
			$("#countyId").val(selectcountyid);
		}
		selectcountyid = "0";
		var countyId = $("#countyId").val();
		com.ajax({
			url : '/town/loadSupportTown?id=' + countyId,
			success : function(d) {
				$("#townId").empty();
				if (com.isBlank(d)) {
				} else {
					$.each(d, function(i, item) {
						$("#townId").append(
								"<option value='" + item.id + "'>" + item.townName
										+ "</option>");
					});
				}
				if (selecttownyid != "0") {
					$("#townId").val(selecttownyid);
				}
				selecttownyid = "0";
			}

		});
	}
	
	function openSearch(){
		var cusName=$("#cusName").val();
		if(cusName==""){
			com.message("error","请输入客户名称检索");
			return false;
		}
		com.openWin("客户名称检索,关键字:"+cusName,"/customer/querybycusnm?cusNm="+cusName,"800px","500px");
		
	}
	
	function isExist() {
		if (com.isBlank($("#cusName").val())) {
		} else {
			var id = $("input[name='cmscustomer.id']")[0].value;
			com.ajax({
				data : {
					"cusNm" : $("#cusName").val(),
					"id" : id
				},
				url : "/customer/loadcountbycusnm",
				type : "get",
				traditional : true,
				success : function(data) {
					if (data.msg <= 0) {
					} else {
						if (data.success) {
							layer.confirm('该客户名已经重复,是否继续创建？', {
								btn : [ '确定', '取消' ]
							// 按钮
							}, function(index) {
								layer.close(index);
							}, function() {
								$("#cusName").val("");
							});

						} else {
							com.message("error", "系统异常,请联系管理员");
						}
					}
				}
			});
		}
	}
	
	function openContact(){
		com.openWin("新增部门主要联系人","/customer/contactshow","800px","500px");
	}
	var contactid=1;
	function saveContact(masterNm,deptNm,dutyClassID,dutyID,dutyClassName,dutyName
			,duty,mobile,tel,fax,ynreceive,sex,email,remark){
		var row={};
		row.id=contactid;
		row.ynreceive=ynreceive;
		row.deptNm=deptNm;
		row.masterNm=masterNm;
		row.sex=sex;
		row.dutyClassId=dutyClassID;
		row.dutyClassName=dutyClassName;
		row.dutyName=dutyName;
		row.dutyId=dutyID;
		row.duty=duty;
		row.mobile=mobile;
		row.tel=tel;
		row.fax=fax;
		row.remark=remark;
		row.email=email;
		$("#dg").datagrid("appendRow", row);
		contactid++;
		var rows=$("#dg").datagrid("getData").rows;
		$("#contactlist").val(JSON.stringify(rows));
		
	}
	
	function deleContact(){
		var dgrow=$("#dg").datagrid("getSelected");
		if(dgrow){
			var rowindex=	$("#dg").datagrid("getRowIndex",dgrow);
			$("#dg").datagrid("deleteRow",rowindex);
		}
	}
	
	var companyService=1;
	function AddotherCompany() {
		var html = '	<div>'
				+ '	<table class="frm">'
				+ '	<tr>'
				+ '	<th>公司名称</th>'
				+ '<td><input class="form-control  w250" id="gsmc"    > </td>'
				+ '</tr>'
				+ '	<tr>'
				+ '<th>年月</th>'
				+ '<td><input  class="form-control  w250" id="ny"  onFocus="WdatePicker({ dateFmt:\'yyyyMM\',readOnly:true})" > </td>'
				+ '</tr>'
				+ '<tr>'
				+ '	<th>项目名称</th>'
				+ '	<td><input  class="form-control  w250" id="xmmc"> </td>'
				+ '	</tr>'
				+ '	<tr>'
				+ '	<th>项目描述</th>'
				+ '	<td><textarea  class="form-control  w250" id="xmms"> </textarea> </td>'
				+ '</tr>'
				+ '	<tr>'
				+ '<th>评价</th>'
				+ '<td><textarea  class="form-control  w250" id="pj"> </textarea></td>'
				+ '	</tr>' + '	</table>'

				+ '	</div>';
		layer.open({
			type : 1,
			area : [ '420px', '400px' ], //宽高
			title : '新增其他公司咨询项目',
			content : html,
			btn : [ '保存', '取消' ],
			yes : function(index, layero) {
				var coNm = $("#gsmc").val();
				if(coNm==""){
					com.message("error","请输入公司名称");
					return false;
				}
				var ym = $("#ny").val();
				var proNm = $("#xmmc").val();
				var proDescript = $("#xmms").val();
				var appraise = $("#pj").val();
				var row = {};
				row.id=companyService;
				row.coNm =coNm;
				row.ym = ym;
				row.proNm = proNm;
				row.proDescript = proDescript;
				row.appraise = appraise;
				$("#servicedg").datagrid("appendRow", row);
				$("#gsmc").val("");
				$("#xmmc").val("");
				$("#xmms").val("");
				$("#ny").val("");
				$("#pj").val("");
				companyService=companyService+1;
				var rows=$("#servicedg").datagrid("getData").rows;
				$("#servicelist").val(JSON.stringify(rows));
				 
			}
		});
	}
	
	function deleService(){
		var dgrow=$("#servicedg").datagrid("getSelected");
		if(dgrow){
			var rowindex=	$("#servicedg").datagrid("getRowIndex",dgrow);
			$("#servicedg").datagrid("deleteRow",rowindex);
		}
	}
	
	
	

	var cerid=1;
	function AddCer() {
		var html = '	<div>'
				+ '	<table class="frm">'
				+ '	<tr>'
				+ '<th>年月</th>'
				+ '<td><input  class="form-control  w250" id="ym"  onFocus="WdatePicker({ dateFmt:\'yyyyMM\',readOnly:true})" > </td>'
				+ '</tr>'
				+ '<tr>'
				+ '	<th>证书名称</th>'
				+ '	<td><input  class="form-control  w250" id="cerNm"> </td>'
				+ '	</tr>'
				+ '	<tr>'
				+ '	<th>认证单位</th>'
				+ '	<td><input  class="form-control  w250" id="cerCoNm"> </td>'
				+ '</tr>'
				+ '	<tr>'
				+ '<th>备注</th>'
				+ '<td><textarea  class="form-control  w250" id="remark"> </textarea></td>'
				+ '	</tr>' + '	</table>'

				+ '	</div>';
		layer.open({
			type : 1,
			area : [ '420px', '400px' ], //宽高
			title : '新增企业所获证书',
			content : html,
			btn : [ '保存', '取消' ],
			yes : function(index, layero) {
				var cerNm = $("#cerNm").val();
				if(cerNm==""){
					com.message("error","请输入证书名称");
					return false;
				}
				var ym = $("#ym").val();
				var cerNm = $("#cerNm").val();
				var cerCoNm = $("#cerCoNm").val();
				var remark = $("#remark").val();
				var row = {};
				row.id=cerid;
				row.ym =ym;
				row.cerNm = cerNm;
				row.cerCoNm = cerCoNm;
				row.remark = remark;
				 
				$("#cerdg").datagrid("appendRow", row);
				$("#ym").val("");
				$("#cerNm").val("");
				$("#cerCoNm").val("");
				$("#remark").val("");
				cerid=cerid+1;
				var rows=$("#cerdg").datagrid("getData").rows;
				$("#cerlist").val(JSON.stringify(rows));
				 
			}
		});
	}
	
	function delcer(){
		var dgrow=$("#cerdg").datagrid("getSelected");
		if(dgrow){
			var rowindex=	$("#cerdg").datagrid("getRowIndex",dgrow);
			$("#cerdg").datagrid("deleteRow",rowindex);
		}
	}
	
	
	
	var relid=1;
	function AddRel() {
		var html = '	<div>'
				+ '	<table class="frm">'
		 
				+ '	<th>客户名称</th>'
				+ '	<td colspan="2"> <input id="cusId" type="hidden" >   <input onfocus="OnSelectCustomer()"  class="form-control  w250" id="coNm"  readonly="readonly"> </td>'
				+ '	</tr>'
				+ '	<tr>'
				+ '	<th>关系</th>'
				+ '	<td><input  class="form-control  w200" style="width:180px" id="relation"  >  </td>'
				+'<td><button style="width:80px" onclick="OnSelectRelation()">选择</button></td>'
				+ '</tr>'
				+ '	</table>'

				+ '	</div>';
		layer.open({
			type : 1,
			area : [ '420px', '400px' ], //宽高
			title : '新增关系企业',
			content : html,
			btn : [ '保存', '取消' ],
			yes : function(index, layero) {
				var coNm = $("#coNm").val();
				if(coNm==""){
					com.message("error","请输入客户名称");
					return false;
				}
				var coNm = $("#coNm").val();
				var cusId = $("#cusId").val();
				var relation = $("#relation").val();
				var row = {};
				row.id=relid;
				row.relationId=cusId;
				row.relationNm =coNm;
				row.relation = relation;
				$("#reldg").datagrid("appendRow", row);
		 
				$("#cerNm").val("");
				$("#cusId").val("");
				$("#relation").val("");
				relid=relid+1;
				var rows=$("#reldg").datagrid("getData").rows;
				$("#rellist").val(JSON.stringify(rows));
				 
			}
		});
	}
	
	function delrel(){
		var dgrow=$("#reldg").datagrid("getSelected");
		if(dgrow){
			var rowindex=	$("#reldg").datagrid("getRowIndex",dgrow);
			$("#reldg").datagrid("deleteRow",rowindex);
		}
	}
	
	var winIndex;
	function OnSelectCustomer(){
		winIndex=	com.openWin("选择关联的客户","/customer/selectcustomer","800px","500px");
	}
	
	function SetCusID(id,name,cusNo){
		$("#cusId").val(id);
		$("#coNm").val(name);
		com.closeWin(winIndex);
	}
	function Setrelation(name){
		$("#relation").val(name);
 
		com.closeWin(winIndex2);
	}
	var winIndex2;
	function OnSelectRelation(){
		winIndex2=	com.openWin("客户关系","/customer/cusrelation","800px","500px");
	}
	
	
	
	
	
	
	var otherid=1;
	function AddOther() {
		var html = '	<div>'
				+ '	<table class="frm">'
		 
				+ '	<th>外联客户名称</th>'
				+ '	<td colspan="2"> <input id="cusId" type="hidden" >   <input onfocus="OnSelectCustomer()"  class="form-control  w250" id="coNm"  readonly="readonly"> </td>'
				+ '	</tr>'
				+ '	<tr>'
				+ '	<th>关系</th>'
				+ '	<td><input  class="form-control  w200" style="width:180px" id="relation"  >  </td>'
				+'<td><button style="width:80px" onclick="OnSelectRelation()">选择</button></td>'
				
				+ '</tr>'
				+ '	</table>'

				+ '	</div>';
		layer.open({
			type : 1,
			area : [ '420px', '400px' ], //宽高
			title : '新增外联企业',
			content : html,
			btn : [ '保存', '取消' ],
			yes : function(index, layero) {
				var coNm = $("#coNm").val();
				if(coNm==""){
					com.message("error","请输入客户名称");
					return false;
				}
				var coNm = $("#coNm").val();
				var cusId = $("#cusId").val();
				var relation = $("#relation").val();
				var row = {};
				row.id=relid;
				row.coId =cusId;
				row.outerNm =coNm;
				row.relation = relation;
				$("#otherdg").datagrid("appendRow", row);
		 
				$("#cerNm").val("");
				$("#cusId").val("");
				$("#relation").val("");
				relid=relid+1;
				var rows=$("#otherdg").datagrid("getData").rows;
				$("#otherlist").val(JSON.stringify(rows));
				 
			}
		});
	}
	
	function delother(){
		var dgrow=$("#otherdg").datagrid("getSelected");
		if(dgrow){
			var rowindex=	$("#otherdg").datagrid("getRowIndex",dgrow);
			$("#otherdg").datagrid("deleteRow",rowindex);
		}
	}
	$(function(){
		$("#dg").datagrid({onLoadSuccess:function(){
			var rows=$("#dg").datagrid("getData").rows;
			$("#contactlist").val(JSON.stringify(rows));
		}});
		$("#servicedg").datagrid({onLoadSuccess:function(){
			var rows=$("#servicedg").datagrid("getData").rows;
			$("#servicelist").val(JSON.stringify(rows));
		}});
			
		$("#cerdg").datagrid({onLoadSuccess:function(){
			var rows=$("#cerdg").datagrid("getData").rows;
			$("#cerlist").val(JSON.stringify(rows));
		}});
		
		$("#reldg").datagrid({onLoadSuccess:function(){
			var rows=$("#reldg").datagrid("getData").rows;
			$("#rellist").val(JSON.stringify(rows));
		}});
		
		$("#otherdg").datagrid({onLoadSuccess:function(){
			var rows=$("#otherdg").datagrid("getData").rows;
			$("#otherlist").val(JSON.stringify(rows));
		}});
	})
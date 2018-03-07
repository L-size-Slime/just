


/**********************************begin 改善运用情形**********************************/

/**
 * 初始化
**/
var dgAlumnicontactperfectId = 1;
function initAlumnicontactperfect() {
	//初始化list数据到input中
	$("#dgAlumnicontactperfect").datagrid({onLoadSuccess:function(){
		var rows=$("#dgAlumnicontactperfect").datagrid("getData").rows;
		$("#alumnicontactperfectList").val(JSON.stringify(rows));
	}});
	
	//设置grid可编辑
	$('#dgAlumnicontactperfect').datagrid({     
	    onClickCell: function(index,field,value){  
	        $(this).datagrid('beginEdit', index);  
	        var ed = $(this).datagrid('getEditor', {index:index,field:field});  
	    }
	}); 
}

/**
 * 插入记录操作
**/
function addAlumnicontactperfect() {
	var row = {};
	row.stuContactId = "";
	row.sqno = "";
	row.yunYongXiangMu = "";
	row.xiaoYi = "";
	
	var dgrow=$("#dgAlumnicontactperfect").datagrid("getSelected");
	var rowindex = $("#dgAlumnicontactperfect").datagrid("getRowIndex",dgrow);
	$("#dgAlumnicontactperfect").datagrid('insertRow',{index: rowindex + 1,row: row});
	
	dgAlumnicontactperfectId = dgAlumnicontactperfectId+1;
	var rows=$("#dgAlumnicontactperfect").datagrid("getData").rows;
	$("#alumnicontactperfectList").val(JSON.stringify(rows));
}

/**
 * 删除记录操作
**/
function deleteAlumnicontactperfect(){
	var dgrow=$("#dgAlumnicontactperfect").datagrid("getSelected");
	if(dgrow){
		var rowindex = $("#dgAlumnicontactperfect").datagrid("getRowIndex",dgrow);
		$("#dgAlumnicontactperfect").datagrid("deleteRow",rowindex);
		var rows=$("#dgAlumnicontactperfect").datagrid("getData").rows;
		$("#alumnicontactperfectList").val(JSON.stringify(rows));
	}
}

/**
 * 接受编辑保存
**/
function saveAllAlumnicontactperfect(){
	$('#dgAlumnicontactperfect').datagrid('acceptChanges');
	var rows=$("#dgAlumnicontactperfect").datagrid("getData").rows;
	$("#alumnicontactperfectList").val(JSON.stringify(rows));
}

/**
 * 取消编辑保存
**/
function cancelAllAlumnicontactperfect(){ 
	$('#dgAlumnicontactperfect').datagrid('rejectChanges'); 
}
/**********************************end 改善运用情形**********************************/


/**********************************begin 学员联络纪录高阶人员异动资料档**********************************/
function initAlumnistucontactupdatelog() {
	
	//初始化list数据到input中
	$("#dgAlumnistucontactupdatelog").datagrid({onLoadSuccess:function(){
		var rows=$("#dgAlumnistucontactupdatelog").datagrid("getData").rows;
		$("#alumnistucontactupdatelogList").val(JSON.stringify(rows));
	}});
	
	//设置grid可编辑
	$('#dgAlumnistucontactupdatelog').datagrid({     
	    onClickCell: function(index,field,value){  
	        $(this).datagrid('beginEdit', index);  
	        var ed = $(this).datagrid('getEditor', {index:index,field:field});  
	    }
	}); 
}

/**
 * 插入记录操作
**/
var dgAlumnistucontactupdatelogId = 1;
function addAlumnistucontactupdatelog() {
	var row = {};
	row.stuContactNo = "";
	row.sqno = "";
	row.yiDongQingKuang = "";
	row.zhiWu = "";
	row.name = "";
	
	var dgrow=$("#dgAlumnistucontactupdatelog").datagrid("getSelected");
	var rowindex = $("#dgAlumnistucontactupdatelog").datagrid("getRowIndex",dgrow);
	$("#dgAlumnistucontactupdatelog").datagrid('insertRow',{index: rowindex + 1,row: row});
	
	dgAlumnistucontactupdatelogId = dgAlumnistucontactupdatelogId+1;
	var rows=$("#dgAlumnistucontactupdatelog").datagrid("getData").rows;
	$("#alumnistucontactupdatelogList").val(JSON.stringify(rows));
}

/**
 * 删除记录操作
**/
function deleteAlumnistucontactupdatelog(){
	var dgrow=$("#dgAlumnistucontactupdatelog").datagrid("getSelected");
	if(dgrow){
		var rowindex = $("#dgAlumnistucontactupdatelog").datagrid("getRowIndex",dgrow);
		$("#dgAlumnistucontactupdatelog").datagrid("deleteRow",rowindex);
		var rows=$("#dgAlumnistucontactupdatelog").datagrid("getData").rows;
		$("#alumnistucontactupdatelogList").val(JSON.stringify(rows));
	}
}

/**
 * 接受编辑保存
**/
function saveAllAlumnistucontactupdatelog(){
	$('#dgAlumnistucontactupdatelog').datagrid('acceptChanges');
	var rows=$("#dgAlumnistucontactupdatelog").datagrid("getData").rows;
	$("#alumnistucontactupdatelogList").val(JSON.stringify(rows));
}

/**********************************end 学员联络纪录高阶人员异动资料档**********************************/


/**********************************begin 学员联络纪录介绍客户资料档**********************************/
function initAlumnicontactcustomer() {
	//设置grid可编辑
	$('#dgAlumnicontactcustomer').datagrid({     
	    onClickCell: function(index,field,value){  
	        $(this).datagrid('beginEdit', index);  
	        var ed = $(this).datagrid('getEditor', {index:index,field:field});  
	    }
	}); 
	
	//初始化list数据到input中
	$("#dgAlumnicontactcustomer").datagrid({onLoadSuccess:function(){
		var rows=$("#dgAlumnicontactcustomer").datagrid("getData").rows;
		$("#alumnicontactcustomerList").val(JSON.stringify(rows));
	}});
}

/**
 * 插入记录操作
**/
var dgAlumnicontactcustomerId = 1;
function addAlumnicontactcustomer() {
	var row = {};
	row.stuContactId = "";
	row.sqno = "";
	row.cusNm = "";
	row.contactName = "";
	row.tel = "";
	row.empId = "";
	row.empNm = "";
	
	var dgrow=$("#dgAlumnicontactcustomer").datagrid("getSelected");
	var rowindex = $("#dgAlumnicontactcustomer").datagrid("getRowIndex",dgrow);
	$("#dgAlumnicontactcustomer").datagrid('insertRow',{index: rowindex + 1,row: row});
	
	dgAlumnicontactcustomerId = dgAlumnicontactcustomerId+1;
	var rows=$("#dgAlumnicontactcustomer").datagrid("getData").rows;
	$("#alumnicontactcustomerList").val(JSON.stringify(rows));
}

/**
 * 删除记录操作
**/
function deleteAlumnicontactcustomer(){
	var dgrow=$("#dgAlumnicontactcustomer").datagrid("getSelected");
	if(dgrow){
		var rowindex = $("#dgAlumnicontactcustomer").datagrid("getRowIndex",dgrow);
		$("#dgAlumnicontactcustomer").datagrid("deleteRow",rowindex);
		var rows=$("#dgAlumnicontactcustomer").datagrid("getData").rows;
		$("#alumnicontactcustomerList").val(JSON.stringify(rows));
	}
}

/**
 * 接受编辑保存
**/
function saveAllAlumnicontactcustomer(){
	$('#dgAlumnicontactcustomer').datagrid('acceptChanges');
	var rows=$("#dgAlumnicontactcustomer").datagrid("getData").rows;
	$("#alumnicontactcustomerList").val(JSON.stringify(rows));
}

/**********************************end 学员联络纪录介绍客户资料档**********************************/

/**********************************begin 学员联络纪录公司有无请咨询公司培训或辅导资料档**********************************/
function initAlumnicompanytutor() {
	//设置grid可编辑
	$('#dgAlumnicompanytutor').datagrid({     
	    onClickCell: function(index,field,value){  
	        $(this).datagrid('beginEdit', index);  
	        var ed = $(this).datagrid('getEditor', {index:index,field:field});  
	    }
	}); 
	
	//初始化list数据到input中
	$("#dgAlumnicompanytutor").datagrid({onLoadSuccess:function(){
		var rows=$("#dgAlumnicompanytutor").datagrid("getData").rows;
		$("#alumnicompanytutorList").val(JSON.stringify(rows));
	}});
}

/**
 * 插入记录操作
**/
var dgAlumnicompanytutorId = 1;
function addAlumnicompanytutor() {
	var row = {};
	row.stuContactId = "";
	row.sqno = "";
	row.cusNm = "";
	row.fuDaoXiangMu = "";
	row.peiXunKeCheng = "";
	row.juTiNeiRong = "";
	row.peiXunDuiXiang = "";
	row.feiYong = "";
	row.tianShu = "";
	row.xiaoGuo = "";
	
	var dgrow=$("#dgAlumnicompanytutor").datagrid("getSelected");
	var rowindex = $("#dgAlumnicompanytutor").datagrid("getRowIndex",dgrow);
	$("#dgAlumnicompanytutor").datagrid('insertRow',{index: rowindex + 1,row: row});
	
	dgAlumnicompanytutorId = dgAlumnicompanytutorId+1;
	var rows=$("#dgAlumnicompanytutor").datagrid("getData").rows;
	$("#alumnicompanytutorList").val(JSON.stringify(rows));
}

/**
 * 删除记录操作
**/
function deleteAlumnicompanytutor(){
	var dgrow=$("#dgAlumnicompanytutor").datagrid("getSelected");
	if(dgrow){
		var rowindex = $("#dgAlumnicompanytutor").datagrid("getRowIndex",dgrow);
		$("#dgAlumnicompanytutor").datagrid("deleteRow",rowindex);
		var rows=$("#dgAlumnicompanytutor").datagrid("getData").rows;
		$("#alumnicompanytutorList").val(JSON.stringify(rows));
	}
}

/**
 * 接受编辑保存
**/
function saveAllAlumnicompanytutor(){
	$('#dgAlumnicompanytutor').datagrid('acceptChanges');
	var rows=$("#dgAlumnicompanytutor").datagrid("getData").rows;
	$("#alumnicompanytutorList").val(JSON.stringify(rows));
}
/**********************************end 学员联络纪录公司有无请咨询公司培训或辅导资料档**********************************/

/**********************************begin **********************************/

/**********************************end **********************************/

/**********************************begin **********************************/

/**********************************end **********************************/
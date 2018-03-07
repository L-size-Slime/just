function initGridBirCoupon(){
	comGrid.Init("grid",{
		columns : [ [ {
			field : 'id',
			title : '',
			sortable : true,
			checkbox : true 
		}, {
			field : 'couponNo',
			title : '优惠券编号',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'idno',
			title : '学员身份/客户代号',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:200
		}, {
			field : 'idNm',
			title : '姓名',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'birthDay',
			title : '生日',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'money',
			title : '金额',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'cusNm',
			title : '客户名称',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:200
		}, {
			field : 'year',
			title : '年份',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'courseNm',
			title : '课程名',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:200
		}, {
			field : 'courseDue',
			title : '界别',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'sendMk',
			title : '是否发送过',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100,
			formatter : function(v, d, i) {
				var value="";
				switch(v)
				{
				case "0":value="未处理";break;
				case "1":value="已发送";break;
				case "2":value="不发送";break;
				}
				return value;
			}
		}, {
			field : 'cancelMk',
			title : '是否被註銷',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100,
			formatter : function(v, d, i) {
				var value="";
				switch(v)
				{
				case "0":value="否";break;
				case "1":value="是";break;
				}
				return value;
			}
		}, {
			field : 'usedMk',
			title : '是否被使用',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100,
			formatter : function(v, d, i) {
				var value="";
				switch(v)
				{
				case "0":value="否";break;
				case "1":value="是";break;
				}
				return value;
			}
		}, {
			field : 'gatherID',
			title : '收款代号',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'tel',
			title : '手机',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'deleteMk',
			title : '是否被刪除',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'adr',
			title : '地址',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:200
		}, {
			field : 'postCode',
			title : '邮编',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		}, {
			field : 'xrem',
			title : '备注',
			sortable : false,
			checkbox : false,
			hidden : false,
			width:100
		} ] ],
		nowrap:false,
		singleSelect:true,
		fitColumns: false,
		toolbar : "#toolbar",
		url : '/alumnibircoupon/loaddata',
		title : '生日优惠券资料档'
	});
}
	
	/**
	 * 删除操作
	**/
	function Delete(){
		comGrid.Delete('grid','/alumnibircoupon/delete'); 
	}

	/**
	 * 新增表单
	**/
	function OpenForm(){
		com.openWin("新增","/alumnibircoupon/show");
	}

	/**
	 * 编辑表单
	**/
	function EditForm(){
		var row=comGrid.SingleSelect('grid');
		if(row){
			com.openWin("修改","/alumnibircoupon/show?id="+row.id);
		}
	}

	/**
	 * 刷新数据
	**/
	function reload(){
		comGrid.Refresh('grid');
	}

	/**
	 * 查询数据
	**/
	function searchData() {
		$("#grid").datagrid({
			url : '/alumnibircoupon/loaddata',
			queryParams : {
				couponNo : $('#couponNo').val(),
				idno : $('#idno').val(),
				idNm : $('#idNm').val(),
				cusNm : $('#cusNm').val(),
				courseNm : $('#courseNm').val(),
				beginBirthDay : $('#beginBirthDay').val(),
				endBirthDay : $('#endBirthDay').val(),
				year : $('#year').val(),
				usedMk : $('#selUsedMk').val()
				
			}
		});
	}
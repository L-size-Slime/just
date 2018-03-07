/**********************************begin 厂外已排**********************************/
	var gridtutorteashow;  //定义全局变量
	var editRow = "";//定义当前编辑的行
	gridtutorteashow = $("#gridtutorteashow").datagrid({
		//title: "自助游管理",
		iconCls: 'icon-save',
		striped: true,
		sortOrder: "desc",
		collapsible: false,
		//url: "/trippreplan/loaddata",
		queryParams: { dtNumber:"", dtTitle: ""},
		columns:[ [ 
	       {
	    		field : 'id',
	    		title : '',
	    		sortable : true,
	    		checkbox : true 
	    	}, {
	    		field : 'xcym',
	    		title : '辅导案项目',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcType',
	    		title : '项目类型',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empId',
	    		title : '辅导内容',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empNo',
	    		title : '辅导天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcDate',
	    		title : '安排日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
	    		title : '教师代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'frTime',
	    		title : '教师姓名',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'toTime',
	    		title : '天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorId',
	    		title : '转移',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorNo',
	    		title : '转移日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorItemId',
	    		title : '转移说明',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorItemNo',
	    		title : '主顾问师',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'jc',
	    		title : '校验',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'inCourseId',
	    		title : '薪资比率',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}
       ]],
       /*toolbar: [{
           id: 'btnAdd',
           text: "添加",
           iconCls: 'icon-add',
           handler: function () {
               $("#winAdd").window("open");
           }
       }, {
           id: 'btnEdit',
           text: "修改",
           iconCls: 'icon-edit',
           handler: function () {
               alert("修改");
           }
       }],*/
       pagination: true,//表示在datagrid设置分页 
       rownumbers: false,
       singleSelect: true
	});
	/*$('#gridChairArranged').datagrid('getPager').pagination({
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 20, 30, 40, 50],
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	});  */
  
	var gridtutorshow;  //定义全局变量
	gridtutorshow = $("#gridtutorshow").datagrid({
		iconCls: 'icon-save',
		striped: true,
		sortOrder: "desc",
		collapsible: false,
		//url: "/trippreplan/loaddata",
		queryParams: { dtNumber:"", dtTitle: ""},
		columns:[ [ 
	       {
	    		field : 'id',
	    		title : '',
	    		sortable : true,
	    		checkbox : true 
	    	}, {
	    		field : 'xcym',
	    		title : '辅导案编号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcType',
	    		title : '客户代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empId',
	    		title : '客户名称',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empNo',
	    		title : '辅导项目',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcDate',
	    		title : '签约天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
	    		title : '教师姓名',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'frTime',
	    		title : '天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'toTime',
	    		title : '安排日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorId',
	    		title : '签约日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorNo',
	    		title : '状态',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}
       ]],
       pagination: true,//表示在datagrid设置分页 
       rownumbers: false,
       singleSelect: true
	});
	
   //条件查询  
   function Search() {
       var queryParameter = $('#gridChairArranged').datagrid("options").queryParams;
       queryParameter.dtNumber = $("#dtNumber").val();
       queryParameter.dtTitle = $("#dtTitle").val();
       $("#gridChairArranged").datagrid("reload");
   }
/**********************************end **********************************/
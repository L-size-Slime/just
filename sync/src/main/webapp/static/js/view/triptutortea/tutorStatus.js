var gridChangeRecord;  //定义全局变量
gridChangeRecord = $("#gridChangeRecord").datagrid({
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
	    		field : 'empId',
	    		title : '辅导案代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
	    		title : '辅导项目',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'frTime',
	    		title : '辅导案状态',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'toTime',
	    		title : '更改日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorId',
	    		title : '更改状态说明',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}
       ]],
       pagination: false,//表示在datagrid设置分页 
       rownumbers: false,
       singleSelect: true
	});

var gridTutorStatus;  //定义全局变量
gridTutorStatus = $("#gridTutorStatus").datagrid({
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
	    		field : 'empId',
	    		title : '辅导案编号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empNo',
	    		title : '客户代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcDate',
	    		title : '客户名称',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
	    		title : '辅导项目',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'frTime',
	    		title : '签约天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'toTime',
	    		title : '教师姓名',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorId',
	    		title : '天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorNo',
	    		title : '安排日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorNo',
	    		title : '签约日期',
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
var gridvenuearranged;  //定义全局变量
gridvenuearranged = $("#gridvenuearranged").datagrid({
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
	    		title : '厂内班代号',
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
	    		title : '签约日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcDate',
	    		title : '课程名称',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
	    		title : '辅导天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
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
	    		title : '老师',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'venueId',
	    		title : '其他',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'venueNo',
	    		title : '保存',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}
       ]],
       fitColumns: false,
       pagination: true,//表示在datagrid设置分页 
       rownumbers: false,
       singleSelect: true
	});
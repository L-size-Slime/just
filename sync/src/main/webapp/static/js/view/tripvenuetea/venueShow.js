/**********************************begin 厂外已排**********************************/
	var gridvenueteashow;  //定义全局变量
	var editRow = "";//定义当前编辑的行
	gridvenueteashow = $("#gridvenueteashow").datagrid({
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
	    		title : '课程名称',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcType',
	    		title : '开课天数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empId',
	    		title : '天数',
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
	    	}
       ]],
       pagination: true,//表示在datagrid设置分页 
       rownumbers: false,
       singleSelect: true
	});
  
	var gridvenueshow;  //定义全局变量
	gridvenueshow = $("#gridvenueshow").datagrid({
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
	    		title : '厂内班编号',
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
	    		title : '课程名称',
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
	    		field : 'venueId',
	    		title : '上课日期',
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
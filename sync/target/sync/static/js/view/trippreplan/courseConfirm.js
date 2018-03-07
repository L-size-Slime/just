/**********************************begin 院部确认**********************************/
	var gridCourseConfirm;  //定义全局变量
	var editRow = "";//定义当前编辑的行
	gridCourseConfirm = $("#gridCourseConfirm").datagrid({
		//title: "标题",
		iconCls: 'icon-save',
		striped: true,
		sortOrder: "desc",
		collapsible: false,
		url: "/trippreplan/loaddata",
		queryParams: { dtNumber:"", dtTitle: ""},
		columns:[ [ 
	       {
	    		field : 'id',
	    		title : '',
	    		sortable : true,
	    		checkbox : true 
	    	}, {
	    		field : 'xcym',
	    		title : '行程年月',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcType',
	    		title : '行程类型',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empId',
	    		title : '顾问师Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'empNo',
	    		title : '顾问师代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xcDate',
	    		title : '行程日期',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'hours',
	    		title : '时数',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'frTime',
	    		title : '开始时间',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'toTime',
	    		title : '结束时间',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorId',
	    		title : '辅导案Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorNo',
	    		title : '辅导案代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorItemId',
	    		title : '辅导案项目Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'tutorItemNo',
	    		title : '辅导项目代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'jc',
	    		title : '进程',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'inCourseId',
	    		title : '厂内班Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'inCourseNo',
	    		title : '厂内班代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'inCourseCouId',
	    		title : '厂内班课程Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'inCourseCouNo',
	    		title : '厂内班课程代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'chairPlanId',
	    		title : '厂外讲座开课Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'chairPlanNo',
	    		title : '厂外讲座开课代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'courseId',
	    		title : '课程Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'courseNo',
	    		title : '课程代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'courseDue',
	    		title : '届别',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'xrem',
	    		title : '其他说明',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'oaId',
	    		title : '行程Id',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'sqno',
	    		title : '序号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'mark',
	    		title : '是否确认',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
	    	}, {
	    		field : 'paiCheng',
	    		title : '排程',
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
       var queryParameter = $('#gridCourseConfirm').datagrid("options").queryParams;
       queryParameter.dtNumber = $("#dtNumber").val();
       queryParameter.dtTitle = $("#dtTitle").val();
       $("#gridCourseConfirm").datagrid("reload");
   }
/**********************************end **********************************/
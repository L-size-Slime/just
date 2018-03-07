/**********************************begin 厂外已排**********************************/
	var gridChairArranged;  //定义全局变量
	var editRow = "";//定义当前编辑的行
	gridChairArranged = $("#gridChairArranged").datagrid({
		//title: "自助游管理",
		iconCls: 'icon-save',
		striped: true,
		sortOrder: "desc",
		collapsible: false,
		url: "/trippreplan/loadChairData",
		queryParams: { dtNumber:"", dtTitle: ""},
		columns:[ [ 
	       {
	    		field : 'id',
	    		title : '',
	    		sortable : true,
	    		checkbox : true 
	    	}, {
	    		field : 'chairPlanId',
	    		title : '开课代号',
	    		sortable : false,
	    		checkbox : false,
	    		hidden : false,
	    		width:100
			}, {
				field : 'chairClass',
				title : '讲座类别',
				sortable : false,
				checkbox : false,
				hidden : false,
				width:100,
				formatter : function(v, d, i) {
					var value="";
					switch(v)
					{
					case "00":value="生产管理类(P)";break;
					case "01":value="质量管理类(Q)";break;
					case "02":value="现场改善类(F)";break;
					case "03":value="经营管理类(R)";break;
					case "04":value="人力资源管理类(H)";break;
					case "05":value="营销管理类(M)";break;
					case "06":value="新产品开发类(N)";break;
					case "07":value="财务管理类(F)";break;
					case "08":value="认证类(C)";break;
					case "09":value="其他类";break;
					case "10":value="全国研讨活动";break;
					case "11":value="干部能力提升(A)";break;
					case "12":value="成本降低与效率提升类(C)";break;
					case "13":value="仓储管理类(W)";break;
					case "14":value="采购类(B)";break;
					case "15":value="设备管理类(D)";break;
					case "16":value="服务类";break;
					case "17":value="魔训军训类";break;
					case "18":value="VIP类";break;
					}
					return value;
				}
			}, {
				field : 'chairId',
				title : '课程代号',
				sortable : false,
				checkbox : false,
				hidden : false,
				width:100
			}, {
				field : 'chairNM',
				title : '课程名称',
				sortable : false,
				checkbox : false,
				hidden : false,
				width:100
			}, {
				field : 'chairDate',
				title : '开课日期',
				sortable : false,
				checkbox : false,
				hidden : false,
				width:100
			}, {
				field : 'countyId',
				title : '开课地点（县/市/区）',
				sortable : false,
				checkbox : false,
				hidden : false,
				width:100
			}, {
				field : 'tchNm',
				title : '教师名称',
				sortable : false,
				checkbox : false,
				hidden : false,
				width:100
	    	}, {
	    		field : 'xcym',
	    		title : '行程年月',
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
	    		field : 'mark',
	    		title : '是否确认',
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
  
   //条件查询  
   function Search() {
       var queryParameter = $('#gridChairArranged').datagrid("options").queryParams;
       queryParameter.dtNumber = $("#dtNumber").val();
       queryParameter.dtTitle = $("#dtTitle").val();
       $("#gridChairArranged").datagrid("reload");
   }
/**********************************end **********************************/
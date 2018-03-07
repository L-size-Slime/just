var gridoperate = {
	add : function(params) {
		if (!params.pageName)
			params.pageName = "";

		var queryData = {
			id : 0,
			tableName : params.tableName,
			pageName : params.pageName
		};
		if (params.requiredPid) {
			var row = gridoperate.selected(params.pGridId);
			if (!row) {
				com.message('warning', '请选择主表数据!');
				return;
			}
			queryData.pid = row.id;
		}
		var queryString = utils.buildQueryString(queryData);
		var editUrl = params.editUrl || App_Config.editUrl;
		com.OpenNewTab(params.title + '-新增', editUrl + queryString);
	},
	edit : function(params) {
		if (!params.pageName)
			params.pageName = "";
		if (!params.id) {
			var row = gridoperate.selected(params.gridId);
			params.id = row ? row.id : 0;
		}
		if (params.id) {
			com.OpenNewTab(params.title + '-修改', App_Config.editUrl + "?id="
					+ params.id + "&tableName=" + params.tableName
					+ "&pageName=" + params.pageName);
		} else {
			com.message('warning', '请选择要修改的数据!');
		}
	},
	del : function(params, callback) {
		debugger;
		if (!params.id) {
			var row = gridoperate.selected(params.gridId);
			params.id = row ? row.id : null;
		}
		if (params.id) {
			var post = {};
			post.id = params.id;
			post.tableName = params.tableName;
			var deleteUrl = params.deleteUrl || App_Config.deleteUrl;
			com.message('confirm', '确认要删除选中的数据？', function(r) {
				if (r) {
					com.ajax({
						url : deleteUrl,
						data : post,
						success : function(d) {
							if (d.isSuccess) {
								com.message('success', d.msg);
								if (callback) {
									callback();
								} else {
									refreshData();
								}
							} else {
								com.message('warning', d.msg);
							}
						}
					});
				}
			});
		} else {
			com.message('warning', '请选择要删除的数据!');
		}
	},
	selected : function(gridId) {
		var selected = $('#' + gridId).datagrid('getSelected');
		if (selected && selected.id && selected.id > 0)
			return selected;
		return null;
	},
	reload : function(params) {
		$('#' + params.gridId).datagrid('clearSelections').datagrid('reload');
	}
};
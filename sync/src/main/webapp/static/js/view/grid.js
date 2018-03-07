var comGrid = {};

comGrid.Init = function(gridID, options) {
	var baseGridOption = {
		border : true,
		fit : true,
		fitColumns : true,// 为false，则有滚动条，为true没有滚动条
		autoRowHeight : false,
		animate : true,
		pageSize : 20,
		rownumbers : true,
		pagination : true,
		idField : 'id',
		loadMsg : '正在加载，请稍等...',
		pageList : [ 10, 20, 30, 40, 50, 100, 150, 200 ],
		showFooter : false

	};
	$(utils.formatString("{0}{1}", "#", gridID)).datagrid(
			$.extend(baseGridOption, options));
}
/**
 * 刷新
 */
comGrid.Refresh = function(gridID) {
	$(utils.formatString("{0}{1}", "#", gridID)).datagrid('reload');
	$(utils.formatString("{0}{1}", "#", gridID)).datagrid('clearSelections');
}
/**
 * 删除
 */
comGrid.Delete = function(gridID, deleteUrl, callback) {
	var l = arguments.length;
	var selectData = $(utils.formatString("{0}{1}", "#", gridID)).datagrid(
			'getSelections');
	if (selectData && selectData.length > 0) {
		var arry = new Array();
		$.each(selectData, function(i, v) {
			arry.push(v.id);
		});
		layer.confirm('您确定要删除选中的数据？', {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			com.ajax({
				data : {
					"list" : arry
				},
				url : deleteUrl,
				type : "POST",
				traditional : true,
				success : function(data) {
					if (data.success) {
						com.message("success", data.msg);
						if (l == 3) {
							callback();
						} else {
							comGrid.Refresh(gridID);
						}

					} else {
						com.message("error", data.msg);
					}
				}
			});
		}, function() {

		});
	} else {
		com.message("error", "请选择要删除的数据");
	}
};
/**
 * 单一选择
 */
comGrid.SingleSelect = function(gridID) {
	var selectData = $(utils.formatString("{0}{1}", "#", gridID)).datagrid(
			'getSelections');
	if (selectData && selectData.length > 0) {
		if (selectData.length == 1) {
			return selectData[0];
		} else {
			com.message('error', '请选择一条数据');
			$(utils.formatString("{0}{1}", "#", gridID)).datagrid(
					'clearSelections');
			return false;
		}

	} else {
		com.message("error", "请选择数据");
		return false;
	}

};
/**
 * 获取去第一条数据
 */
comGrid.SingleSelectData = function(gridID) {
	var selectData = $(utils.formatString("{0}{1}", "#", gridID)).datagrid(
			'getSelections');
	if (selectData && selectData.length > 0) {
		return selectData[0];
	} else {
		com.message("error", "请选择数据");
		return false;
	}
};

/**
 * 多条数据选择
 */
comGrid.MultSelect = function(gridID) {
	var selectData = $(utils.formatString("{0}{1}", "#", gridID)).datagrid(
			'getSelections');
	if (selectData && selectData.length > 0) {
		return selectData;
	} else {
		com.message("error", "请选择数据");
		return false;
	}

};

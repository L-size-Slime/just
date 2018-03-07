/// <reference path="utils.js" />
var com = {};
com.vm = {};

// 格式化时间
com.formatDate = function(value) {
	return utils.formatDate(value, 'yyyy-MM-dd');
};

com.formatTime = function(value) {
	return utils.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
};

// 格式化金额
com.formatMoney = function(value) {
	var sign = value < 0 ? '-' : '';
	return sign + utils.formatNumber(Math.abs(value), '#,##0.00');
};

// 格式化checkbox
com.formatCheckbox = function(value) {
	var checked = (value || 'false').toString() == 'true';
	return utils.formatString('<img value={0} src="/Content/images/{1}"/>',
			checked, checked ? "checkmark.gif" : "checknomark.gif");
};

com.initTotalRow = function(data, target) {
	if (typeof data.length == "number" && typeof data.splice == "function") {
		data = {
			total : data.length,
			rows : data
		};
	}
	var opts = $(target).datagrid("options");
	var config = opts.totalConfig;
	var totalRow = {};
	if (config) {
		var totalRow = com.sumrows($(target), data.rows);
		data.footer = [ totalRow ];
	}
	if (data.total == 0) {
		opts.pageNumber = 0;
	}
	return data;
}

com.openwin = function(url) {
	window.open(url);
}
// 弹messagee
com.message = function(type, message, callback) {
	switch (type) {
	case "success":
		if (parent == window)
			return alert(message);
		parent.$('#notity').jnotifyAddMessage({
			text : message,
			permanent : false
		});
		break;
	case "error":
		if (parent == window)
			return alert(message);
		message = message.replace(/\n\r/g, "<br/>");
		parent.$.messager.alert('错误', message);
		break;
	case "warning":
		if (parent == window)
			return alert(message);
		parent.$('#notity').jnotifyAddMessage({
			text : message,
			permanent : false,
			type : 'warning'
		});
		break;
	case "information":
		parent.$.messager.show({
			title : '消息',
			msg : message
		});
		break;
	case "confirm":
		return parent.$.messager.confirm('确认', message, callback);
	}

	if (callback)
		callback();
	return null;
};

com.messageif = function(condition, type, message, callback) {
	if (condition)
		com.message(type, message, callback);
};

com.openTab = function() {
	parent.wrapper.addTab.apply(this, arguments);
}
// 将jquery系列化后的值转为name:value的形式
com.convertArray = function(o) {
	var v = {};
	for ( var i in o) {
		if (o[i].name != '__VIEWSTATE') {
			if (typeof (v[o[i].name]) == 'undefined')
				v[o[i].name] = o[i].value;
			else
				v[o[i].name] += "," + o[i].value;
		}
	}
	return v;
}
com.setLocationHashId = function(id) {
	var hash = parent.location.hash.split('/');
	hash[hash.length - 1] = id;
	parent.location.hash = hash.join('/');
};

com.ajax = function(options) {
	options = $.extend({
		showLoading : true
	}, options);

	var ajaxDefaults = {
		type : 'POST',
		dataType : 'json',
		contentType : "application/x-www-form-urlencoded",
		error : function(e) {
			var msg = e.responseText;
			var ret = msg
					.match(/^{\"Message\":\"(.*)\",\"ExceptionMessage\":\"(.*)\",\"ExceptionType\":.*/);
			if (ret != null) {
				msg = (ret[1] + ret[2]).replace(/\\"/g, '"').replace(/\\r\\n/g,
						'<br/>').replace(/dbo\./g, '');
			} else {
				try {
					msg = $(msg).text() || msg;
				} catch (ex) {
				}
			}

			com.message('error', msg);
		},
		success : function(data) {
			if (data.isSuccess) {
				if (!options.noMsg) {
					com.message('success', data.msg);
				}
				if (options.callback && typeof options.callback) {
					options.callback(data);
				}
			} else {
				com.message('error', data.msg);
			}
		}
	};

	if (options.showLoading) {
		ajaxDefaults.beforeSend = $.showLoading;
		ajaxDefaults.complete = $.hideLoading;
		;
	}

	$.ajax($.extend(ajaxDefaults, options));
};

com.query = function(element) {
	var query = $;
	if ($(document).find(element).length == 0 && element != document) {
		if ($(parent.document).find(element)) {
			query = parent.$;
		}
	}
	return query;
};
// 验证表单数据
com.formValidate = function(id) {
	if (!com.JudgeValidate(id)) {
		return false;
	} else {
		return true;
	}
};
// Grid自适应高度，宽度
com.autoResize = function(options) {
	var defaults = {
		width : 6,
		height : 0,
		gridType : 'datagrid',
		gridOp : {}
	};
	options = $.extend(defaults, options);

	// 第一次调用
	var wsize = getWidthAndHeigh();
	if ($.isFunction(options.callback)) {
		options.callback(wsize);
	}

	// 窗口大小改变的时候
	$(window).resize(function() {
		var size = getWidthAndHeigh(true);
		switch (options.gridType) {
		case "datagrid":
			$(options.dataGrid).datagrid('resize', {
				width : size.width,
				height : size.height
			});
			break;
		case "treegrid":
			$(options.dataGrid).treegrid('resize', {
				width : size.width,
				height : size.height
			});
			break;
		}
	});

	// 获取iframe大小
	function getWidthAndHeigh(resize) {
		var windowHeight = 0;
		var widowWidth = 0;
		if (typeof (window.innerHeight) == 'number') {
			windowHeight = window.innerHeight;
			widowWidth = window.innerWidth;
		} else {
			if (document.documentElement
					&& document.documentElement.clientHeight) {
				windowHeight = document.documentElement.clientHeight;
				widowWidth = document.documentElement.clientWidth;
			} else {
				if (document.body && document.body.clientHeight) {
					windowHeight = document.body.clientHeight;
					widowWidth = document.body.clientWidth;
				}
			}
		}

		widowWidth -= options.width;
		windowHeight -= options.height;

		return {
			width : widowWidth,
			height : windowHeight
		};
	}
}

// 获取弹出层编号
com.guidDialogId = function() {
	var s4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return "qzt-"
			+ (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4()
					+ s4() + s4());
}

// 弹出层
/*
 * url:弹出层的地址 _title:标题 _width:宽（100px） _height:高(200px)
 */
com.openDialog = function(url, _title, _width, _height) {
	art.dialog.open(url, {
		id : com.guidDialogId(),
		title : _title,
		width : _width,
		height : _height,
		background : '#000000',
		opacity : 0.1,
		lock : true,
		resize : false,
		close : function() {
		}
	}, false);
};
/*
 * 弹出网页 /*url: 表示请求路径 /*_title: 标题名称 /*width: 宽度 /*height: 高度
 * ---------------------------------------------------
 */
com.FillopenDialog = function(url, _title) {
	art.dialog.open(url, {
		id : com.guidDialogId(),
		title : _title,
		width : '100%',
		height : '100%',
		background : '#000000',
		opacity : 0.1,
		lock : true,
		resize : false,
		close : function() {
		}
	}, false);
};
/** 窗口关闭* */
com.OpenClose = function() {
	// art.dialog.close();
	com.CloseTab();
}
com.formChanges = function(obj1, obj2, reserve) {
	obj1 = ko.toJS(obj1) || {};
	obj2 = ko.toJS(obj2) || {};
	reserve = reserve || [];
	var result = utils.diffrence(obj1, obj2, reserve, [ '__ko_mapping__' ]);

	var length = 0;
	for ( var k in result)
		length++;
	result._changed = length > reserve.length;

	return result;
};

com.editGridViewModel = function(grid) {
	var self = this;
	this.begin = function(index, row) {
		if (index == undefined || typeof index === 'object') {
			row = grid.datagrid('getSelected');
			index = grid.datagrid('getRowIndex', row);
		}
		self.editIndex = self.ended() ? index : self.editIndex;
		grid.datagrid('selectRow', self.editIndex).datagrid('beginEdit',
				self.editIndex);
	};
	this.ended = function() {
		if (self.editIndex == undefined)
			return true;
		if (grid.datagrid('validateRow', self.editIndex)) {
			grid.datagrid('endEdit', self.editIndex);
			self.editIndex = undefined;
			return true;
		}
		grid.datagrid('selectRow', self.editIndex);
		return false;
	};
	this.addnew = function(rowData) {
		if (self.ended()) {
			if (Object.prototype.toString.call(rowData) != '[object Object]')
				rowData = {};
			rowData = $.extend({
				_isnew : true
			}, rowData);
			grid.datagrid('appendRow', rowData);
			self.editIndex = grid.datagrid('getRows').length - 1;
			grid.datagrid('selectRow', self.editIndex);
			self.begin(self.editIndex, rowData);
		}
	};
	this.deleterow = function() {
		var selectRow = grid.datagrid('getSelected');
		if (selectRow) {
			var selectIndex = grid.datagrid('getRowIndex', selectRow);
			if (selectIndex == self.editIndex) {
				grid.datagrid('cancelEdit', self.editIndex);
				self.editIndex = undefined;
			}
			grid.datagrid('deleteRow', selectIndex);
		}
	};
	this.reject = function() {
		grid.datagrid('rejectChanges');
	};
	this.accept = function() {
		grid.datagrid('acceptChanges');
		var rows = grid.datagrid('getRows');
		for ( var i in rows)
			delete rows[i]._isnew;
	};
	this.getChanges = function(include, ignore) {
		if (!include)
			include = [], ignore = true;
		var deleted = utils.filterProperties(grid.datagrid('getChanges',
				"deleted"), include, ignore), updated = utils.filterProperties(
				grid.datagrid('getChanges', "updated"), include, ignore), inserted = utils
				.filterProperties(grid.datagrid('getChanges', "inserted"),
						include, ignore);

		var changes = {
			deleted : deleted,
			inserted : utils.minusArray(inserted, deleted),
			updated : utils.minusArray(updated, deleted)
		};
		changes._changed = (changes.deleted.length + changes.updated.length + changes.inserted.length) > 0;

		return changes;
	};
	this.isChangedAndValid = function() {
		return self.ended() && self.getChanges()._changed;
	};
};

com.readOnlyHandler = function(type) {
	// readonly
	_readOnlyHandles = {};
	_readOnlyHandles.defaults = _readOnlyHandles.input = function(obj, b) {
		b ? obj.addClass("readonly").attr("readonly", true) : obj.removeClass(
				"readonly").removeAttr("readonly");
	};
	_readOnlyHandles.combo = function(obj, b) {
		var combo = obj.data("combo").combo;
		_readOnlyHandles.defaults(combo.find(".combo-text"), b);
		if (b) {
			combo.unbind(".combo");
			combo.find(".combo-arrow,.combo-text").unbind(".combo");
			obj.data("combo").panel.unbind(".combo");
		}
	};
	_readOnlyHandles.spinner = function(obj, b) {
		_readOnlyHandles.defaults(obj, b);
		if (b) {
			obj.data("spinner").spinner.find(
					".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
		}
	};
	return _readOnlyHandles[type || "defaults"];
};

com.loadCss = function(url, doc, reload) {
	var links = doc.getElementsByTagName("link");
	for (var i = 0; i < links.length; i++)
		if (links[i].href.indexOf(url) > -1) {
			if (reload)
				links[i].parentNode.removeChild(links[i])
			else
				return;
		}
	var container = doc.getElementsByTagName("head")[0];
	var css = doc.createElement("link");
	css.rel = "stylesheet";
	css.type = "text/css";
	css.media = "screen";
	css.href = url;
	container.appendChild(css);
};

com.exporter = function(opt) {
	var self = this;

	var defaultOptions = {
		action : "/home/download",
		dataGetter : "api",
		dataAction : "",
		dataParams : {},
		titles : [ [] ],
		fileType : 'xls',
		compressType : 'none'
	};

	this.paging = function(page, rows) {
		self.params.dataParams.page = page;
		self.params.dataParams.rows = rows;
		return self;
	};

	this.compress = function() {
		self.params.compressType = 'zip';
		return self;
	};

	this.title = function(filed, title) {
		self.params.titles[filed] = title;
		return self;
	};

	this.download = function(suffix) {
		self.params.fileType = suffix || "xls";
		self.params.dataParams = JSON.stringify(self.params.dataParams);
		self.params.titles = JSON.stringify(self.params.titles);

		// 创建iframe
		var downloadHelper = $(
				'<iframe style="display:none;" id="downloadHelper"></iframe>')
				.appendTo('body')[0];
		var doc = downloadHelper.contentWindow.document;
		if (doc) {
			doc.open();
			doc.write('')// 微软为doc.clear();
			doc
					.writeln(utils
							.formatString(
									"<html><body><form id='downloadForm' name='downloadForm' method='post' action='{0}'>",
									self.params.action));
			for ( var key in self.params)
				doc.writeln(utils.formatString(
						"<input type='hidden' name='{0}' value='{1}'>", key,
						self.params[key]));
			doc.writeln('<\/form><\/body><\/html>');
			doc.close();
			var form = doc.forms[0];
			if (form) {
				form.submit();
			}
		}
	};

	initFromGrid = function(grid) {
		var options = grid.$element().datagrid('options');
		if (grid.treegrid)
			options.url = options.url || grid.treegrid('options').url;

		var titles = [ [] ], length = Math.max(options.frozenColumns.length,
				options.columns.length);
		for (var i = 0; i < length; i++)
			titles[i] = (options.frozenColumns[i] || [])
					.concat(options.columns[i] || [])

		self.params = $.extend(true, {}, defaultOptions, {
			dataAction : options.url,
			dataParams : options.queryParams,
			titles : titles
		});
	};

	if (opt.$element)
		initFromGrid(opt);
	else
		self.params = $.extend(true, {}, defaultOptions, opt);

	return self;
};

com.setVarible = function(name, value) {
	parent.$(parent.document.body).data(name, value);
};

com.getVarible = function(name) {
	return parent.$(parent.document.body).data(name);
};

com.cookie = $.cookie;

com.getSetting = function(name, defaults) {
	if (!parent.wrapper)
		return defaults;
	return parent.wrapper.settings[name] || defaults;
};

com.gridSave = function(formID, url, callback) {
	if (com.formValidate("#" + formID)) {
		var post = com.convertArray($("#" + formID).serializeArray());
		com.ajax({
			url : url,
			data : post,
			success : function(d) {
				if (d.isSuccess) {
					com.message('success', d.msg);
					if (callback) {
						callback();
					}
				} else {
					com.message('error', d.msg);
				}
			}
		});
	}
}

com.getInputData = function(container,prefix)
{
	var result={};
	$(container).find("input[name]").each(function(){
		var name=$(this).attr("name");
		if(prefix)
		{
			name=name.replace(prefix,"");
		}
		result[name]=$(this).val();
	});
	return result;
}

com.getFormData = function(formId) {
	var post = com.convertArray($(formId).serializeArray());
	// 给未打勾的checkbox加默认们0值
	$(formId).find(":checkbox:not([checked])").each(function() {
		var name = $(this).attr("name");
		if (name) {
			post[name] = '0';
		}
	});
	// combobox的文本值加到提交的值里
	$(formId).find(".easyui-combobox").each(function() {
		var text = $(this).combobox('getText');
		var fieldName = $(this).combobox("options").textToField;
		if (fieldName) {
			post[fieldName] = text;
		}
	});
	return post;
}
com.gridNewTabSave = function(formID, url, parentTabTitle, callback) {
	formId = "#" + formID;
	if (com.formValidate(formId)) {
		var post = com.getFormData(formId);
		if (typeof processPostValues != 'undefined'
				&& $.isFunction(processPostValues)) {
			if (!processPostValues(post))
				return;
		}
		com.ajax({
			url : url,
			data : post,
			success : function(d) {
				if (d.isSuccess) {
					com.message('success', d.msg);
					// artDialog.open.origin.crud.reload();
					// 刷新父级页面
					if (parentTabTitle) {
						try {
							var userTab = top.$('#tabs').tabs('getTab',
									parentTabTitle);
							if (userTab) {
								var freshFrame = top.document
										.getElementById(userTab
												.panel("options").frameId);
								if (freshFrame) {
									freshFrame.contentWindow.refreshData();
								}
							}
						} catch (e) {

						}
					}
					if (callback && typeof window[callback] == 'function') {
						window[callback](d);
					} else {
						com.OpenClose();
					}
				} else {
					com.message('error', d.msg);
				}
			}
		});
	}

}


com.query1 = function(formID, url, parentTabTitle, callback) {
	formId = "#" + formID;
	if (com.formValidate(formId)) {
		var post = com.getFormData(formId);
		if (typeof processPostValues != 'undefined'
				&& $.isFunction(processPostValues)) {
			if (!processPostValues(post))
				return;
		}
		com.ajax({
			url : url,
			data : post,
			success : function(d) {
				alert(d);
			}
		});
	}

}

com.gridPageSave = function(formID, url, mis) {
	if (com.formValidate("#" + formID)) {
		var post = com.convertArray($("#" + formID).serializeArray());
		com.ajax({
			url : url,
			data : post,
			success : function(d) {
				com.message('success', d.text);
				location.href = mis;
			}
		});
	}

}
com.DataName = function(obj, id) {
	var Name = '';
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].ID == id) {
			Name = obj[i].Name;
		}
	}
	return Name;
}

com.OpenNewTab = function(subtitle, url) {
	top.wrapper.addTab(subtitle, url);
};

com.CloseTab = function() {
	var currentTab = top.$('#tabs').tabs('getSelected');
	var currtab_title = currentTab.panel('options').title;
	top.$('#tabs').tabs('close', currtab_title);
}
com.GoBack = function() {
	window.history.go(-1);
}

com.GetDictData = function(category) {
	var result = [];
	if (!category)
		result;
	if (top.DictDataList) {
		$.each(top.DictDataList, function(i, item) {
			if (item.Category == category) {
				result.push(item);
			}
		});
	}
	return result;
}

com.GetWarehouseData = function() {
	var result = [];
	if (top.WarehouseList) {
		result = utils.cloneJSON(top.WarehouseList);
	}
	return result;
}

com.GetProductCategoryData = function() {
	var result = [];
	if (top.ProductCategoryList) {
		result = utils.cloneJSON(top.ProductCategoryList);
	}
	return result;
}

com.RefreshDictData = function() {
	if (typeof top.refreshDictData == 'function') {
		top.refreshDictData();
	}
}

com.RefreshWarehouseData = function() {
	if (typeof top.refreshWarehouseData == 'function') {
		top.refreshWarehouseData();
	}
}

com.RefreshProductCategoryData = function() {
	if (typeof top.refreshProductCategoryData == 'function') {
		top.refreshProductCategoryData();
	}
}

com.JudgeValidate = function(obj) {
	var isValid = true;
	// easy ui 验证
	if (isValid) {
		isValid = $(obj).form('validate');
	}
	return isValid;
}

com.weValidate = function() {

}

com.gridcellclick = function(index, field, value, target) {
	var that = this;
	var columnOption = $(that).datagrid("getColumnOption", field);
	if (!columnOption)
		return;
	var rows = $(that).datagrid("getRows");
	var clickRow = rows[index];
	if (columnOption.items && columnOption.items instanceof Array) {
		$.each(columnOption.items, function(i, item) {
			if (typeof item.handler == 'function'
					&& item.action == $(target).attr("action")) {
				item.handler(clickRow["id"], clickRow, index);
			}
		});
	}
	if (columnOption.handler && typeof columnOption.handler == 'function') {
		columnOption.handler(clickRow["id"], clickRow, index);
	}
}

com.treegridcellclick = function(target, index, field, value) {
	var that = this;
	var columnOption = $(that).datagrid("getColumnOption", field);
	if (columnOption && columnOption.items
			&& columnOption.items instanceof Array) {
		$.each(columnOption.items, function(i, item) {
			if (typeof item.handler == 'function'
					&& item.action == $(target).attr("action")) {
				var clickRow = $(that).treegrid("find", value);
				item.handler(value, clickRow, index);
			}
		});
	}
}

com.hasFunc = function(funccode) {
	if (typeof top.hasFunc == 'function') {
		return top.hasFunc(funccode);
	}
	return false;
}

com.hasAnyFuncs = function(funcs) {
	if (typeof top.hasAnyFuncs == 'function') {
		return top.hasAnyFuncs(funcs);
	}
	return false;
}

com.getEnumValueTextList = function(typeName) {
	var result = [];
	$.ajax({
		url : '/sys/getenumkeyvaluelist',
		dataType : 'json',
		type : 'post',
		data : {
			typeName : typeName
		},
		async : false,
		success : function(data) {
			result = data;
		}
	});
	return result;
}

com.sumrows = function(target, rows) {
	var totalRow = {};
	var config = $(target).datagrid("options").totalConfig;
	var rows = rows || $(target).datagrid("getRows");
	var fields = config.fields;
	var totalField = config.totalField;
	var totalText = config.totalText ? config.totalText : "合计：";
	totalRow.isTotalRow = true;
	if (typeof totalField != 'string') {
		totalField = $(target).datagrid("getColumnFields")[0];
	}
	totalRow[totalField] = totalText;
	$.each(fields, function(i, f) {
		totalRow[f] = 0;
	});
	$.each(rows, function(i, d) {
		$.each(fields, function(j, f) {
			if (!isNaN(d[f])) {
				var columnOption = $(target).datagrid("getColumnOption", f);
				var value = d[f];
				if (typeof columnOption.formatter == 'function') {
					value = columnOption.formatter(value, d);
				}
				totalRow[f] = totalRow[f] + parseFloat(value);
			}
		});
	});
	return totalRow;
}

com.getProductFieldColumns = function() {
	var config = window.top.DetailProductFieldConfig;
	if (!config || config.length) {
		com.ajax({
			async : false,
			url : '/common/getdetailproductconfig',
			success : function(data) {
				config = [];
				$.each(data, function(i, d) {
					var d = {
						title : d.DispayName,
						field : d.WrapFieldName,
						mapField : d.FieldName,
						width : d.Width
					}
					config.push(d);
				});
			}
		});
	}
	return config;
}

com.getPositionInfo = function(warehouseId) {
	var positionInfos = [];
	if (warehouseId) {
		com.ajax({
			url : '/Base/Warehouse/GetPositionList',
			data : {
				warehouseId : warehouseId
			},
			async : false,
			success : function(data) {
				$.each(data, function(i, d) {
					positionInfos.push({
						Name : d.Name,
						Code : d.Code
					});
				});
			}
		});
	}
	return positionInfos;
}

com.sysparam = {};

com.initSearchBox = function(gridId, containerId, searchFn) {
	if (!$('#' + containerId).length) {
		return;
	}
	
	var columns = $('#' + gridId).datagrid('options').columns[0];
	var frozenColumns = $('#' + gridId).datagrid('options').frozenColumns[0];
	var menus = $("#" + containerId).find(".searchMenus");
	menus.empty();
	frozenColumns = frozenColumns || [];
	$.each(frozenColumns, function(i, n) {
		if (n.search) {
			menus.append('<div data-options="name:\'' + n.field + '\'">'
					+ n.title + '</div>');
		}
	});

	$.each(columns, function(i, n) {
		if (n.search) {
			menus.append('<div data-options="name:\'' + n.field + '\'">'
					+ n.title + '</div>');
		}
	});
	$('#' + containerId).find("input").searchbox({
		menu : menus,
		searcher : function(value, name) {
			if (typeof searchFn == 'function') {
				searchFn(value, name);
			} else {
				var rules = [ {
					field : name,
					op : 'like',
					data : value
				} ];
				var opts = $('#' + gridId).datagrid('options');
				var querys = utils.formatListData(rules, 'filters');
				querys = $.extend(querys, opts.queryParams);
				$('#' + gridId).datagrid('load', querys);
			}
		}
	});
}

com.url = function(url) {
	if (url && url.indexOf(App_Config.contextPath) >= 0)
		return url;
	return App_Config.contextPath + url;
}

com.designReport =function(reportName,dataId,childDataType)
{
	var printObj=$("#printObj")[0];
	var url=com.getRootUrl();
	var dataUrl=url+'/data/getprintdata.do?dataType='+childDataType+'&id='+dataId;
	var reportUrl=url+'/upload/getreport.do?reportName='+reportName;
	printObj.DesignReport(dataUrl,reportUrl,reportName);
}

com.printReport =function(reportName,dataId,childDataType)
{
	var printObj=$("#printObj")[0];
	var url=com.getRootUrl();
	var dataUrl=url+'/data/getprintdata.do?dataType='+childDataType+'&id='+dataId;
	var reportUrl=url+'/upload/getreport.do?reportName='+reportName;
	printObj.PrintReport(dataUrl,reportUrl,reportName);
}

com.preivewReport =function(reportName,dataId,childDataType)
{
	var printObj=$("#printObj")[0];
	var url=com.getRootUrl();
	var dataUrl=url+'/data/getprintdata.do?dataType='+childDataType+'&id='+dataId;
	var reportUrl=url+'/upload/getreport.do?reportName='+reportName;
	printObj.PreviewReport(dataUrl,reportUrl,reportName);
}

com.getRootUrl=function()
{
	var location= document.location;
	var url = document.location.href;
	url=url.replace(location.search,'');
	url=url.replace(location.pathname,'');
	url=url+App_Config.contextPath;
	return url;
}


com.buildExtraParams = function(params) {
	var fields = [ "tableName", "dataType", "dataType1", "dataType2",
			"dataType3" ];
	var extraParams = {};
	$.each(fields, function(i, f) {
		if (params[f]) {
			extraParams[f] = params[f];
		}
	});
	return extraParams;
}

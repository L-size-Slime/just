(function($) {
	function guidDialogId() {
		var s4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16)
					.substring(1);
		};
		return "qzt-"
				+ (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-"
						+ s4() + s4() + s4());
	}

	$.hDialog = function(options) {
		options = $.extend({}, $.hDialog.defaults, options || {});
		var dialogId = guidDialogId();
		if (options.id)
			dialogId = options.id;

		var defaultBtn = [ {
			text : '确定',
			iconCls : 'icon-ok',
			handler : options.submit
		}, {
			text : '关闭',
			iconCls : 'icon-cancel',
			handler : function() {
				$("#" + dialogId).dialog("close");
			}
		} ];

		if (!options.showBtns)
			defaultBtn = [];
		if (options.buttons.length == 0)
			options.buttons = defaultBtn;
		if (options.max) {
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			options.width = winWidth - 20;
			options.height = winHeight - 20;
		}
		var $dialog = $('<div/>').css('padding', options.boxPadding).appendTo(
				$('body'));
		var dialog = $dialog.dialog($.extend(options, {
			onClose : function() {
				dialog.dialog('destroy');
			}
		})).attr('id', dialogId);
		$dialog.find('.dialog-button').css('text-align', options.align);

		return dialog;
	};

	$.hDialog.defaults = $.extend({}, $.fn.dialog.defaults, {
		boxPadding : '3px',
		align : 'right', // 按钮对齐方式
		href : '',
		id : '',
		content : '',
		height : 200,
		width : 400,
		collapsible : false,
		minimizable : false,
		maximizable : false,
		closable : true,
		modal : true,
		shadow : false,
		mask : true,
		cache : false,
		closed : false,// 默认是否关闭窗口 如果为true,需调用open方法打开
		showBtns : true,
		buttons : [],
		submit : function() {
			alert('写入可执行代码');
			return false;
		},
		onBeforeClose : function() {
			$(this).find(".combo-f").each(function() {
				var panel = $(this).data().combo.panel;
				panel.panel("destroy");
			});
			$(this).empty();
		},
		onMove : function(left, right) {
			$('.validatebox-tip').remove();
		}

	});

	// /////////////////////////////////////////////////////////////////////////////////////////////

	$.hWindow = function(options) {
		var windowId = guidDialogId();

		options = $.extend({}, $.hDialog.defaults, options || {});
		if (!options.href && !options.content) {
			alert('缺少必要的参数 href or content');
			return false;
		}

		var $dialog = $('<div/>').attr('id', windowId).appendTo($('body'));

		if (options.max) {
			// dialog.dialog('maximize');
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			options.width = winWidth - 20;
			options.height = winHeight - 20;
		}

		var win = $dialog.window($.extend(options, {
			onClose : function() {
				win.window('destroy');
			}
		})).window('refresh').attr('id', windowId);

		return win;
	};

	$.hWindow.defaults = $.extend({}, $.fn.window.defaults, {
		href : '',
		content : '',
		height : 300,
		width : 400,
		collapsible : false, // 折叠
		closable : true, // 显示右上角关闭按钮
		minimizable : false, // 最小化
		maximizable : false, // 最大化
		resizable : false, // 是否允许改变窗口大小
		title : '窗口标题', // 窗口标题
		modal : true, // 模态
		draggable : true, // 允许拖动
		max : false,
		onBeforeClose : function() {
			$(this).find(".combo-f").each(function() {
				var panel = $(this).data().combo.panel;
				alert(panel.html());
				panel.panel("destroy");
			});
			$(this).empty();
		}
	});

	// /////////////////////////////////////////////////////////////////////////////////////////////
	// 扩展datagrid 方法 getSelectedIndex
	$.extend($.fn.datagrid.defaults, {
		loadFilter : function(data) {
			var data = com.initTotalRow(data, this);
			return data;
		}
	});
	// 扩展datagrid 方法 getSelectedIndex
	$.extend($.fn.datagrid.methods, {
		getSelectedIndex : function(jq) {
			var row = $(jq).datagrid('getSelected');
			if (row)
				return $(jq).datagrid('getRowIndex', row);
			else
				return -1;
		},
		getRowIndexByKey : function(jq, param) {
			var _620 = $.data(jq[0], "datagrid");
			var opts = _620.options;
			var rows = _620.data.rows;
			for (var i = 0; i < rows.length; i++) {
				if (rows[i][param.field] == param.value) {
					return i;
				}
			}
			return -1;
		},
		checkRows : function(jq, idValues) {
			if (idValues && idValues.length > 0) {
				var rows = $(jq).datagrid('getRows');
				var keyFild = $(jq).datagrid('options').idField;
				$.each(rows, function(i, n) {
					if ($.inArray(n[keyFild], idValues)) {
						$(jq).datagrid('checkRow', row);
					}
				})
			}
			return jq;
		},
		editCell : function(jq, param) {
			return jq.each(function() {
				var opts = $(this).datagrid('options');
				var fields = $(this).datagrid('getColumnFields', true).concat(
						$(this).datagrid('getColumnFields'));
				for (var i = 0; i < fields.length; i++) {
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor1 = col.editor;
					if (fields[i] != param.field) {
						col.editor = null;
					}
				}
				$(this).datagrid('beginEdit', param.index);
				for (var i = 0; i < fields.length; i++) {
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor = col.editor1;
				}
			});
		},
		caculateTotal : function(jq) {
			if ($(jq).datagrid("options").totalConfig) {
				var totalRow = com.sumrows($(jq));
				$(jq).datagrid("reloadFooter", [ totalRow ]);
				return totalRow;
			}
			return {};
		},
		getRow : function(jq, index) {
			var opts = $(jq).datagrid('options');
			var tr = opts.finder.getTr(jq[0], index, 'body', 2);
			return tr;
		},
		getCell : function(jq, opts) {
			var tr = $(jq[0]).datagrid('getRow', opts.index);
			var cell = tr.find("td[field=" + opts.field + "]");
			return cell;
		},
		setCellValue : function(jq, opts) {
			var rows = $(jq).datagrid('getData').rows;
			rows[opts.index][opts.field] = opts.value;
			var cell = $(jq).datagrid('getCell', {
				index : opts.index,
				field : opts.field
			})
			cell.find("div.datagrid-cell").html(opts.value);
		},
		getPart : function(jq, part) {
			var data = $.data(jq[0], "datagrid");
			var dc = data.dc;
			return dc[part];
		}
	});
	$.extend($.fn.combobox.methods, {
		selectedIndex : function(jq, index) {
			if (!index)
				index = 0;
			var data = $(jq).combobox('options').data;
			var vf = $(jq).combobox('options').valueField;
			$(jq).combobox('setValue', eval('data[index].' + vf));
		},
		getText : function(jq) {
			var data = $(jq).combobox('getData');
			var vf = $(jq).combobox('options').valueField;
			var tf = $(jq).combobox('options').textField;
			var value = $(jq).combobox('getValue');
			var result = '';
			$.each(data, function(i, d) {
				if (d[vf] == value)
					result = d[tf];
			});
			return result;
		},
		extendOptons : function(jq, extend) {
			var opts = $.data(jq[0], "combobox").options;
			opts = $.extend(opts, extend);
			$.data(jq[0], "combobox").options = opts;
			$.data(jq[0], "combo").options = opts;
		}
	});

	// 释放IFRAME内存
	$.fn.panel.defaults = $.extend({}, $.fn.panel.defaults, {
		onBeforeDestroy : function() {
			var frame = $('iframe', this);
			if (frame.length > 0) {
				frame.remove();
				if ($.browser.msie) {
					CollectGarbage();
				}
			}
		}
	});

	// tree 方法扩展 全选、取消全选
	$.extend($.fn.tree.methods, {
		checkedAll : function(jq, target) {
			var data = $(jq).tree('getChildren');
			if (target)
				data = $(jq).tree('getChildren', target);

			$.each(data, function(i, n) {
				$(jq).tree('check', n.target);
			});
		}
	});

	$.extend($.fn.tree.methods, {
		uncheckedAll : function(jq) {
			var data = $(jq).tree('getChildren');
			$.each(data, function(i, n) {
				$(jq).tree('uncheck', n.target);
			});
		}
	});

	$.extend($.fn.tree.defaults, {
		formatter : function(node) {
			return node.t1;
		}
	});

	$.extend($.fn.combotree.defaults, {
		formatter : function(node) {
			return node.t1;
		}
	});
	
	$.extend(
			$.fn.datagrid.defaults.editors,
			{
				combogrid : {
					init : function(container, options) {
						var input = $(
								'<input type="text" class="datagrid-editable-input">')
								.appendTo(container);
						input.combogrid(options);
						return input;
					},
					destroy : function(target) {
						$(target).combogrid('destroy');
					},
					getValue : function(target) {
						return $(target).combogrid('getValue');
					},
					setValue : function(target, value) {
						$(target).combogrid('setValue', value);
					},
					resize : function(target, width) {
						$(target).combogrid('resize', width);
					}
				}
			});
	
	$.extend($.fn.datagrid.defaults.editors, {
	checkbox : {
		init : function(container, options) {
			var input = $(
					'<input type="checkbox" class="datagrid-editable-input" >')
					.appendTo(container);
			return input;
		},
		getValue : function(target) {
			var isCheck = $(target).prop("checked");
			return isCheck;
		},
		setValue : function(target, value) {
			if (value) {
				$(target).prop("checked", "checked");
			}
		},
		resize : function(target, width) {
			var input = $(target);
			if ($.boxModel == true) {
				input.width(width - (input.outerWidth() - input.width()));
			} else {
				input.width(width);
			}
		}
	}
	});

})(jQuery);



(function($) {
	function renderBtns(target) {
		var upload = $(target).data("ajaxupload");
		var opts = upload.options;
		if (upload.tools) {
			return;
		}
		var tools = $("<div id='toolbar'></div>").appendTo(target);
		upload.tools = tools;
		var uploadBtn = $("<a icon='icon-upload'>上传</a>")
				.appendTo(upload.tools);
		upload.uploadBtn = uploadBtn;
		var storeIdInput = $(
				"<input name='" + upload.options.postName
						+ "' type='hidden' />").appendTo(target);
		upload.storeIdInput = storeIdInput;
		uploadBtn.uploadbtn(opts, target);
		if (opts.isInPage) {
			var btns = [ {
				iconCls : "icon-arrow_refresh",
				btnText : '刷新',
				handler : function() {
					upload.grid.datagrid("reload");
				}
			} ];
			$.each(btns, function(i, btn) {
				var createBtn = $("<a>" + btn.btnText + "</a>").appendTo(
						upload.tools);
				createBtn.linkbutton({
					plain : true,
					iconCls : btn.iconCls
				});
				if (btn.handler) {
					createBtn.bind("click", btn.handler);
				}
			});
		}

		function getSelectedItem() {
			var grid = $(target).data("ajaxupload").grid;
			var selected = grid.datagrid('getSelected');
			if (selected == null) {
				com.message('warning', '请选择数据后再操作!');
				return;
			}
			return selected;
		}
	}

	function renderImages(target) {
		var upload = $(target).data("ajaxupload");
		var opts = upload.options;
		var container = $("<ul class='imagebox' id='" + opts.fileElementId
				+ "_ul'></ul>");
		upload.imagebox = container;
		$(target).after(container);
		refreshImageList(target);
	}

	function renderFiles(target) {
		var upload = $(target).data("ajaxupload");
		var opts = upload.options;
		var container = $("<ul class='listbox' id='" + opts.fileElementId
				+ "_ul'></ul>");
		upload.imagebox = container;
		$(target).after(container);
		refreshFileList(target);
	}

	function renderGrids(target) {
		var upload = $(target).data("ajaxupload");
		var opts = upload.options;

		if (upload.grid) {
			return;
		}
		var grid = $("<table id='" + opts.fileElementId + "_grid'></table>");
		upload.grid = grid;
		$(target).after(grid);
		upload.grid.datagrid({
			url : opts.getListUrl,
			title : '附件',
			queryParams : {
				refId : opts.data.refId,
				uploadType : opts.data.uploadType
			},
			nowrap : false, // 折行
			rownumbers : true, // 行号
			striped : true, // 隔行变色
			idField : "id",// 主键
			singleSelect : true, // 单选
			onClickCell : com.gridcellclick,
			height : "300px",
			width : "500px",
			columns : [ [
					{
						title : '文件名称',
						field : 't2',
						width : 180
					},
					{
						title : '大小',
						field : 'i0',
						width : 100,
						formatter : function(val, row) {
							if (val > 1024 * 1024)
								return (val / (1024 * 1024)).toFixed(2) + "M";
							return (val / 1024).toFixed(2) + "K";
						}
					},
					{
						title : '创建人',
						field : 'uname',
						width : 100
					},
					{
						title : '创建时间',
						field : 'createdate',
						formatter : formatter.datetolong,
						width : 140
					},
					{
						title : '操作',
						field : 'action',
						width : 60,
						formatter : formatter.action,
						items : [
								{
									action : "download",
									icon : "icon-download",
									tip : "下载",
									handler : function(id, row) {
										window.open(opts.downloadUrl
												+ "?isAttach=true&id=" + id,
												"_blank");
									}
								},
								{
									action : "view",
									icon : "icon-accept",
									tip : "查看",
									handler : function(id, row) {
										window.open(opts.downloadUrl + "?id="
												+ id, "_blank");
									}
								}, {
									action : "delete",
									icon : "icon-cross",
									tip : "删除",
									handler : function(id, row) {
										deleteFile(target, id);
									}
								} ]
					} ] ],
			fit : true,
			onLoadSuccess : function(data) {
				var rows = data.rows || data;
				upload.storeIds = [];
				$.each(rows, function(i, r) {
					upload.storeIds.push(r.id);
				});
				upload.storeIdInput.val(upload.storeIds.join(','));
				refreshBtnStatus(target);
			}
		});
	}

	function deleteFile(target, id) {
		com.message('confirm', '你确定删除该条记录吗？', function(ok) {
			if (ok) {
				var upload = $(target).data("ajaxupload");
				com.ajax({
					noMsg : true,
					url : upload.options.deleteUrl,
					data : {
						id : id
					},
					callback : function(data) {
						if (data.isSuccess) {
							removeClientFile(target, id);
						}
					}
				});
			}
		});
	}

	function removeClientFile(target, id) {
		var upload = $(target).data("ajaxupload");
		var index = -1;
		$.each(upload.storeIds, function(i, d) {
			if (d == id) {
				index = i;
			}
		});
		upload.storeIds.splice(index, 1);

		upload.storeIdInput.val(upload.storeIds.join(','));
		refreshData(target);
	}

	$.fn.ajaxupload = function(method, opts) {
		if (typeof method == "string") {
			var handler = $.fn.ajaxupload.methods[method];
			if (handler) {
				return handler(this[0]);
			}
		}
		opts = opts || {};
		return this.each(function() {
			var uploader = $.data(this, "ajaxupload");
			if (uploader) {
				$.extend(uploader.options, opts);
			} else {
				uploader = {
					storeIds : [],
					options : $.extend({}, $.fn.ajaxupload.defaults,
							$.fn.ajaxupload.parseOptions(this), opts)
				};
				$.data(this, "ajaxupload", uploader);
			}
			renderBtns(this);
			if (uploader.options.showWay == 'imagelist') {
				renderImages(this);
			} else if (uploader.options.showWay == 'list') {
				renderFiles(this);
			} else {
				renderGrids(this);
			}
		});
	};

	$.fn.ajaxupload.parseOptions = function(target) {
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, [ "fileElementId",
				"data", "refId", "showWay" ]));
	}

	$.fn.ajaxupload.defaults = {
		uploadUrl : com.url('/upload/upload.do'),
		getListUrl : com.url('/upload/getreffilelist.do'),
		downloadUrl : com.url('/upload/download.do'),
		deleteUrl : com.url('/upload/deletefilebyid.do'),
		dataType : 'json',
		showWay : 'grid',
		maxFileCount : -1,
		postName : 'uploadFileIds',
		isInPage : false,
		allowExtensions : "",
		fileElementId : 'uploadFileElementId',
		defaultData : {
			maxSize : '5',
			uploadType : 'Product',
			refId : '1'
		},
		beforeUpload : function(target, fileName) {
			var segments = fileName.split(".");
			var extension = segments[segments.length - 1];
			debugger;
			var allowExtensions = '';
			if($.data(target, "ajaxupload"))
				allowExtensions = $.data(target, "ajaxupload").options.allowExtensions;
			else if($.data(target, "uploadbtn"))
			{
				allowExtensions = $.data(target, "uploadbtn").options.allowExtensions;
			}
			if (allowExtensions && allowExtensions.indexOf(extension) < 0) {
				alert('对不起，只有【' + allowExtensions + "】类型的文件允许上传！");
				return false;
			}
			return true;
		},
		success : function(target, data) {
			if (data && data.isSuccess) {
				var config = $.data(target, "ajaxupload");
				config.storeIds.push(data.data.id);
				config.storeIdInput.val(config.storeIds.join(','));
				var opts = config.options;
				refreshData(target);
			} else {
				alert(data.msg);
			}
		}
	};

	function refreshData(target) {
		var config = $.data(target, "ajaxupload");
		var opts = config.options;
		if (opts.showWay == 'grid') {
			refreshGrid(target);
		} else if (opts.showWay == 'imagelist') {
			refreshImageList(target);
		} else if (opts.showWay == 'list') {
			refreshFileList(target);
		}
		refreshBtnStatus(target);
	}

	function refreshBtnStatus(target) {
		var config = $.data(target, "ajaxupload");
		var maxCount = config.options.maxFileCount;
		if (maxCount && maxCount > 0) {
			var control = config.storeIds.length >= maxCount ? "disable"
					: "enable";
			$(config.uploadBtn).uploadbtn(control);
		}
	}

	function refreshGrid(target) {
		var config = $.data(target, "ajaxupload");
		var opts = config.options;
		var fieldIds = opts.isInPage ? '' : config.storeIds.join(',');
		config.grid.datagrid("load", {
			refId : opts.data.refId,
			uploadType : opts.data.uploadType,
			fileIds : fieldIds
		});
	}

	function refreshImageList(target) {
		var config = $.data(target, "ajaxupload");
		var opts = config.options;
		var fieldIds = opts.isInPage ? '' : config.storeIds.join(',');
		com
				.ajax({
					url : config.options.getListUrl,
					data : {
						fileIds : fieldIds,
						refId : opts.data.refId,
						uploadType : opts.data.uploadType
					},
					success : function(data) {
						config.imagebox.html("");
						config.storeIds = [];
						$
								.each(
										data,
										function(i, d) {
											var url = config.options.downloadUrl
													+ "?id=" + d.id;
											config.storeIds.push(d.id);
											var image = $("<li><a class='delete'></a><image width='200px' src='"
													+ url + "' /></li>");
											image.bind("click", function(e) {
												var tagName = e.target.tagName
														.toLowerCase();
												if (tagName == 'img') {
													(function() {
														window.open(url,
																"_blank");
													})();
												} else if ($(e.target)
														.hasClass('delete')) {
													deleteFile(target, d.id);
												}
											});
											config.imagebox.append(image)
										});
						config.storeIdInput.val(config.storeIds.join(','));
						refreshBtnStatus(target);
					}
				});
	}

	function refreshFileList(target) {
		var config = $.data(target, "ajaxupload");
		var opts = config.options;
		var fieldIds = opts.isInPage ? '' : config.storeIds.join(',');
		com
				.ajax({
					url : config.options.getListUrl,
					data : {
						fileIds : fieldIds,
						refId : opts.data.refId,
						uploadType : opts.data.uploadType
					},
					success : function(data) {
						config.imagebox.html("");
						config.storeIds = [];
						$
								.each(
										data,
										function(i, d) {
											var url = config.options.downloadUrl
													+ "?id=" + d.id;
											config.storeIds.push(d.id);
											var image = $("<li><a class='delete'></a><a target='_blank' href='"
													+ url
													+ "'>"
													+ d.t2
													+ "</a></li>");
											image.bind("click", function(e) {
												var tagName = e.target.tagName
														.toLowerCase();
												if (tagName == 'img') {
													(function() {
														window.open(url,
																"_blank");
													})();
												} else if ($(e.target)
														.hasClass('delete')) {
													deleteFile(target, d.id);
												}
											});
											config.imagebox.append(image)
										});
						config.storeIdInput.val(config.storeIds.join(','));
						refreshBtnStatus(target);
					}
				});
	}

	$.fn.ajaxupload.methods = {
		upload : function(target) {
			$(target).uploadbtn.uploadbtn("upload");
		},
		getCurrentIds : function(target) {
			var ids = $.data(target, "ajaxupload").storeIds;
			return ids.join(',');
		},
		getOptions : function(target) {
			var config = $.data(target, "ajaxupload");
			return config.options;
		},
		reload : function(target) {
			refreshData(target);
		},
		enable : function(target) {
			var config = $.data(target, "ajaxupload");
			if (config.storeIds.length > config.options.maxFileCount) {
				$(config.uploadBtn).uploadbtn("enable");
			}
		},
		disable : function(target) {
			var config = $.data(target, "ajaxupload");
			$(config.uploadBtn).uploadbtn("disable");
		}
	}
})(jQuery);

(function($) {
	$.fn.importwin = function(method, opts) {
		if (typeof method == "string") {
			var handler = $.fn.importwin.methods[method];
			if (handler) {
				return handler(this);
			}
		}
		var opts = opts || {};
		return this.each(function() {
			var uploader = $.data(this, "importwin");
			if (uploader) {
				$.extend(uploader.options, opts);
			} else {
				$.data(this, "importwin", {
					options : $.extend({}, $.fn.importwin.defaults,
							$.fn.importwin.parseOptions(this), opts)
				});
			}

			renderTools(this);
			renderGrid(this);
			renderWindow(this);
		});
	};

	$.fn.importwin.parseOptions = function(target) {
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, [ "title" ]));
	}

	function renderWindow(target) {
		var options = $.data(target, "importwin").options;
		$(target).window(options);
	}

	$.fn.importwin.defaults = {
		validateUrl : '/sys/import/validatedata',
		uploadUrl : '/sys/import/upload',
		closed : true,
		modal : true,
		title : "导入",
		allowExtensions : "xls,xlsx",
		remoteReceiveName : "validList",
		defaultData : {
			maxSize : '5',
			importType : 'Product'
		},
		iconCls : 'icon-save',
		beforeUpload : function(target, fileName) {
			var segments = fileName.split(".");
			var extension = segments[segments.length - 1];
			var allowExtensions = $.data(target, "importwin").options.allowExtensions;
			if (allowExtensions.indexOf(extension) < 0) {
				alert('对不起，只有【' + allowExtensions + "】类型的文件允许上传！");
				return false;
			}
			return true;
		},
		success : function(target, data) {
			if (data && data.isSuccess) {
				loadData(target, data.data);
			} else {
				alert(data.msg);
			}
		}
	};

	$.fn.importwin.methods = {
		open : function(target, opts) {
			var info = $.data(target[0], "importwin");
			if (info && info.grid && $.data(info.grid[0], "datagrid")) {
				info.grid.datagrid("getPanel").css("display", "none");
			}
			$(target).window("open");
		},
		close : function(target, opts) {
			$(target).window("close");

		}
	};

	function renderGrid(target) {
		var info = $.data(target, "importwin");
		if (!info.grid) {
			var grid = $("<table></table>").appendTo(target);
			info.grid = grid;
		}
	}

	function renderTools(target) {
		var info = $(target).data("importwin");
		var opts = info.options;
		if (!info.tools) {
			var tools = $("<div id='toolbar'></div>").appendTo(target);
			info.tools = tools;
		}

		function getSelectedItem() {
			var grid = $(target).data("importwin").grid;

			var selected = $.data(grid[0], "datagrid")
					&& grid.datagrid('getSelected');
			if (selected == null) {
				com.message('warning', '请选择数据后再操作!');
				return;
			}
			return selected;
		}

		var uploadBtn = $("<a icon='icon-upload'>上传</a>").appendTo(info.tools);
		info.uploadBtn = uploadBtn;
		info.uploadBtn.uploadbtn(opts, target);

		var btns = [ {
			iconCls : "icon-cross",
			btnText : '删除',
			handler : function() {
				var selected = getSelectedItem();
				if (!selected)
					return;
				remove(target);
			}
		}, {
			iconCls : "icon-save",
			btnText : '确定',
			handler : function() {
				ok(target);
			}
		}, {
			iconCls : "icon-cancel",
			btnText : '关闭',
			handler : function() {
				$(target).importwin("close");
			}
		} ];

		$.each(btns, function(i, btn) {
			var createBtn = $("<a>" + btn.btnText + "</a>")
					.appendTo(info.tools);
			createBtn.linkbutton({
				plain : true,
				iconCls : btn.iconCls
			});
			if (btn.handler) {
				createBtn.bind("click", btn.handler);
			}
		});
	}

	function getFieldConfigByName(fields, name) {
		var result = null;
		$.each(fields, function(i, field) {
			if (field.name == name)
				result = field;
		});
		return result;
	}

	function iniFieldProertyMapper(target, fields) {
		fieldProertyMapper = {};
		var search = null;
		$.each(fields, function(i, field) {
			fieldProertyMapper[field.property] = field.name;
		});
		return fieldProertyMapper;
	}

	function getFileColIndexMapper(target) {
		var result = {};
		var prefix = $(target).attr("id") + "_header_";
		$("select[id^=" + prefix + "]").each(function(i, c) {
			if ($(c).val()) {
				var columnIndex = c.id.replace(prefix + "Column", "");
				result[$(c).val()] = columnIndex;
			}
		});
		return result;
	}

	function loadData(target, data) {
		// "/sys/import/getimportdata"
		var info = $.data(target, "importwin");
		var list = data.list;
		if (!list || !list.length) {
			return;
		}
		info.fields = data.fields;
		var columns = [];
		for ( var p in list[0]) {
			if (p != "$id") {
				var prefix = $(target).attr("id") + "_header_";
				var titleCombo = "<select id='" + prefix + p + "'>";
				titleCombo += "<option value=''>--选择--</option>";
				$.each(data.fields, function(i, field) {
					var selected = "";
					if (field.name == list[0][p]) {
						selected = "selected='selected'"
					}
					titleCombo += "<option " + selected + ">" + field.name
							+ "</option>";
				});
				titleCombo += "</select>";
				columns.push({
					title : titleCombo,
					field : p,
					width : 100,
					editor : 'text'
				});
			}
		}

		info.grid.datagrid({
			nowrap : false, // 折行
			rownumbers : true, // 行号
			striped : true, // 隔行变色
			singleSelect : "true", // 单选
			height : 300,
			data : list,
			columns : [ columns ],
			fit : true,
			onClickCell : function(obj, index, field) {
				if (endEditing(target)) {
					info.grid.datagrid('selectRow', index).datagrid('editCell',
							{
								index : index,
								field : field
							});
					info.editIndex = index;
				}
			}
		});
		info.grid.datagrid("getPanel").css("display", "");
	}

	function remove(target) {
		var info = $.data(target, "importwin");
		var selectRow = info.grid.datagrid("getSelectedIndex");
		if (selectRow < 0) {
			com.message("warning", "请选择要删除的数据！");
			return;
		}
		info.grid.datagrid("deleteRow", selectRow);
	}

	function endEditing(target) {
		var info = $.data(target, "importwin");
		if (info.editIndex == undefined) {
			return true
		}
		if (info.grid.datagrid('validateRow', info.editIndex)) {
			info.grid.datagrid('endEdit', info.editIndex);
			info.editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}

	function markMsg(gridbody, rowIndex, columnIndex, msg) {
		var cell = gridbody.find("tr:eq(" + rowIndex + ")").find(
				"td:eq(" + columnIndex + ")");
		cell.css("backgroundColor", "red");
		cell.attr("title", msg);
	}

	function isRequiredFieldSelect(target) {
		var fields = $.data(target, "importwin").fields;
		var colMapper = getFileColIndexMapper(target);
		var msg = [];
		$.each(fields, function(i, f) {
			if (f.required && !colMapper[f.name]) {
				msg.push(f.name);
			}
		});
		if (msg.length) {
			com.message("warning", "请先择字段<" + msg.join(",") + ">对应的列！");
			return false;
		}
		return true;
	}

	function ok(target) {
		var info = $.data(target, "importwin");
		var options = info.options;
		if (!$.data(info.grid[0], "datagrid") && options.closecallback) {
			options.closecallback(target, []);
			return;
		}
		endEditing(target);
		var rows = info.grid.datagrid('getData').rows;
		var fields = info.grid.datagrid('getColumnFields');
		var intReg = /^\d+$/;
		var floatReg = /^[-\+]?\d+(\.\d+)?$/;
		var isValid = true;
		var hasServerData = false;
		var gridbody = info.grid.datagrid("getPanel").find("div.datagrid-body");
		var serverValidData = [];
		var prefix = $(target).attr("id") + "_header_";
		$.each(rows, function(i, row) {
			var serverData = {};
			$.each(fields, function(j, gridField) {
				var mapField = $("#" + prefix + gridField).val();
				var cellValue = row[gridField];
				var config = getFieldConfigByName(info.fields, mapField);
				if (config != null) {
					if (config.required && !cellValue) {
						markMsg(gridbody, i, j, "该项必填！");
						isValid = false;
					} else if (cellValue && config.type == 'intvalue'
							&& !intReg.test(cellValue)) {
						markMsg(gridbody, i, j, "该项必需是整数！");
						isValid = false;
					} else if (cellValue && config.type == 'floatvalue'
							&& !floatReg.test(cellValue)) {
						markMsg(gridbody, i, j, "该项必需是数值！");
						isValid = false;
					} else if (cellValue && config.isRemote == true) {
						serverData[config.property] = cellValue;
						hasServerData = true;
					}
				}
			});
			serverValidData.push(serverData);
		});

		if (isValid) {
			isValid = isRequiredFieldSelect(target);
		}

		if (isValid) {
			var postData = utils.formatListData(serverValidData,
					info.options.remoteReceiveName);
			com
					.ajax({
						url : info.options.validateUrl,
						data : postData,
						success : function(data) {
							var fieldProertyMapper = iniFieldProertyMapper(
									target, info.fields);
							var indexMapper = getFileColIndexMapper(target);
							if (data && data.length) {
								$
										.each(
												data,
												function(i, d) {
													var colIndex = indexMapper[fieldProertyMapper[d.FieldName]];
													markMsg(gridbody,
															d.RowIndex,
															colIndex, d.Message);
												});
							} else if (options.closecallback) {
								var data = getGridMapData(target, rows);
								options.closecallback(target, data);
							}
						}
					});
		}
	}

	function getGridMapData(target, rows) {
		var result = [];
		var info = $.data(target, "importwin");
		var fields = info.grid.datagrid('getColumnFields');
		var prefix = $(target).attr("id") + "_header_";
		$.each(rows, function(i, row) {
			var item = {};
			$.each(fields, function(j, gridField) {
				var mapField = $("#" + prefix + gridField).val();
				var cellValue = row[gridField];
				var config = getFieldConfigByName(info.fields, mapField);
				if (config != null) {
					item[config.property] = cellValue;
				}
			});
			result.push(item)
		});
		return result;
	}
})(jQuery);

(function($) {
	$.fn.uploadbtn = function(method, param) {
		if (typeof method == "string") {
			var handler = $.fn.uploadbtn.methods[method];
			if (handler) {
				return handler(this, opts);
			}
		}
		opts = method || {};
		opts.refTarget = param;
		return this.each(function() {
			var uploader = $.data(this, "uploadbtn");
			if (uploader) {
				$.extend(uploader.options, opts);
			} else {
				$.data(this, "uploadbtn", {
					options : $.extend({}, $.fn.ajaxupload.defaults,
							$.fn.uploadbtn.parseOptions(this), opts)
				});
			}
			renderBtn(this);
		});
	};

	$.fn.uploadbtn.parseOptions = function() {
		return {};
	}

	function uploadHttpData(r, type) {
		var data = !type;
		if (!type)
			data = r.responseText;
		if (type == "xml")
			data = r.responseXML;
		// data = type == "xml" || data ? r.responseXML : r.responseText;
		// If the type is "script", eval it in global context
		if (type == "script")
			$.globalEval(data);
		// Get the JavaScript object, if JSON is used.
		if (type == "json") {
			// //////////Fix the issue that it always throws the error
			// "unexpected token '<'"///////////////
			data = r.responseText;
			var start = data.indexOf(">");
			if (start != -1) {
				var end = data.indexOf("<", start + 1);
				if (end != -1) {
					data = data.substring(start + 1, end);
				}
			}
			// /////////////////////////////////////////////////////////////////////////////////////////////
			eval("data = " + data);
		}
		// evaluate scripts within html
		if (type == "html")
			$("<div>").html(data).evalScripts();

		return data;
	}
	;

	function handleError(s, xhr, status, e) {
		// If a local callback was specified, fire it
		if (s.error) {
			s.error.call(s.context || s, xhr, status, e);
		}
		// Fire the global callback
		if (s.global) {
			(s.context ? $(s.context) : $.event).trigger("ajaxError", [ xhr, s,
					e ]);
		}
	}
	;

	function renderBtn(target) {
		$(target).append(createUploadInput(target));
		$(target).linkbutton({
			plain : true
		});
		bindChangeEvent(target);
	}

	function bindChangeEvent(target) {
		var info = $(target).data("uploadbtn");
		var opts = info.options;
		$("#" + opts.fileElementId).unbind("change.uploadbtn").bind(
				"change.uploadbtn",
				function() {
					var refTarget = opts.refTarget || target;
					var fileName = $("#" + opts.fileElementId).val();
					if (opts.beforeUpload
							&& !opts.beforeUpload(refTarget, fileName)) {
						return;
					}
					$(target).uploadbtn("upload");
				});
	}

	function createUploadInput(target) {
		var options = $.data(target, "uploadbtn").options;
		var input = $('<input  type="file"  name="file" class="fileupload">');
		$(input).css({
			position : 'absolute',
			right : 0,
			top : 0,
			zIndex : 1,
			fontSize : '460px',
			margin : 0,
			padding : 0,
			cursor : 'pointer',
			opacity : 0
		});
		$(input).attr("id", options.fileElementId);
		return input;
	}

	function createUploadIframe(id, uri) {
		// create frame
		var frameId = 'jUploadFrame' + id;
		var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId
				+ '" style="position:absolute; top:-9999px; left:-9999px"';
		if (window.ActiveXObject) {
			if (typeof uri == 'boolean') {
				iframeHtml += ' src="' + 'javascript:false' + '"';

			} else if (typeof uri == 'string') {
				iframeHtml += ' src="' + uri + '"';
			}
		}
		iframeHtml += ' />';
		$(iframeHtml).appendTo(document.body);
		return $('#' + frameId).get(0);
	}
	;

	function createUploadForm(id, target) {
		// create form
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = $('<form  action="" method="POST" name="' + formId
				+ '" id="' + formId + '" enctype="multipart/form-data"></form>');
		var opts = $.data(target[0], "uploadbtn").options;
		var data = $.extend(opts.defaultData, opts.data);
		if (!opts.isInPage) {
			data.refId = '0';// 不直接关联，保存时再关联
		}
		if (data) {
			for ( var i in data) {
				if (data.name != null && data.value != null) {
					$(
							'<input type="hidden" name="' + data[i].name
									+ '" value="' + data[i].value + '" />')
							.appendTo(form);
				} else {
					$(
							'<input type="hidden" name="' + i + '" value="'
									+ data[i] + '" />').appendTo(form);
				}
			}
		}
		var oldElement = $('#' + opts.fileElementId);
		var newElement = $(oldElement).clone();
		$(oldElement).attr('id', fileId);
		$(oldElement).before(newElement);
		$(oldElement).appendTo(form);
		bindChangeEvent(target[0]);
		// set attributes
		$(form).css('position', 'absolute');
		$(form).css('top', '-1200px');
		$(form).css('left', '-1200px');
		$(form).appendTo('body');
		return form;
	}
	;

	$.fn.uploadbtn.methods = {
		disable : function(target) {
			$(target).linkbutton("disable");
			$(target).find("input[type=file]").hide();
		},
		enable : function(target) {
			$(target).linkbutton("enable");
			$(target).find("input[type=file]").show();
		},
		upload : function(target) {
			info = $.data(target[0], "uploadbtn");
			var opts = info.options;
			var refTarget = opts.refTarget || target[0];
			var s = $.extend({}, $.ajaxSettings, opts);
			var id = new Date().getTime()
			var form = createUploadForm(id, target);
			var io = createUploadIframe(id, s.secureuri);
			var frameId = 'jUploadFrame' + id;
			var formId = 'jUploadForm' + id;
			// Watch for a new set of requests
			if (s.global && !$.active++) {
				$.event.trigger("ajaxStart");
			}
			var requestDone = false;
			// Create the request object
			var xml = {}
			if (s.global)
				$.event.trigger("ajaxSend", [ xml, s ]);
			// Wait for a response to come back
			var uploadCallback = function(isTimeout) {
				var io = document.getElementById(frameId);
				try {
					if (io.contentWindow) {
						xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML
								: null;
						xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument
								: io.contentWindow.document;

					} else if (io.contentDocument) {
						xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML
								: null;
						xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument
								: io.contentDocument.document;
					}
				} catch (e) {
					handleError(s, xml, null, e);
				}
				if (xml || isTimeout == "timeout") {
					requestDone = true;
					var status;
					try {
						status = isTimeout != "timeout" ? "success" : "error";
						// Make sure that the request was successful or
						// notmodified
						if (status != "error") {
							// process the data (runs the xml through httpData
							// regardless of callback)
							var data = uploadHttpData(xml, s.dataType);
							// If a local callback was specified, fire it and
							// pass it the data
							if (s.success)
								s.success(refTarget, data, status);

							// Fire the global callback
							if (s.global)
								$.event.trigger("ajaxSuccess", [ xml, s ]);
						} else
							handleError(s, xml, status);
					} catch (e) {
						status = "error";
						handleError(s, xml, status, e);
					}

					// The request was completed
					if (s.global)
						$.event.trigger("ajaxComplete", [ xml, s ]);

					// Handle the global AJAX counter
					if (s.global && !--$.active)
						$.event.trigger("ajaxStop");

					// Process result
					if (s.complete)
						s.complete(xml, status);

					$(io).unbind()

					setTimeout(function() {
						try {
							$(io).remove();
							$(form).remove();

						} catch (e) {
							handleError(s, xml, null, e);
						}

					}, 100)

					xml = null

				}
			}
			// Timeout checker
			if (s.timeout > 0) {
				setTimeout(function() {
					// Check to see if the request is still happening
					if (!requestDone)
						uploadCallback("timeout");
				}, s.timeout);
			}
			try {
				var form = $('#' + formId);
				$(form).attr('action', s.uploadUrl);
				$(form).attr('method', 'POST');
				$(form).attr('target', frameId);
				if (form.encoding) {
					$(form).attr('encoding', 'multipart/form-data');
				} else {
					$(form).attr('enctype', 'multipart/form-data');
				}
				$(form).submit();

			} catch (e) {
				$.handleError(s, xml, null, e);
			}
			$('#' + frameId).load(uploadCallback);
			return {
				abort : function() {
				}
			};
		}
	}
})(jQuery);
// 重新加载必填项，妨止一打开页面都是红色的
$(function() {
	$(".validatebox-text:not(:disabled)")
			.each(
					function() {
						var storeData = $.data(this, "validatebox");
						if (storeData.options.novalidate) {
							storeData.options.novalidate = false;
							$.data(this, "validatebox", storeData);
							for ( var event in storeData.options.events) {
								if (storeData.options.validType == null
										|| !(storeData.options.validType['servervalid'] && event == 'focus')) {
									$(this).bind(event + ".validatebox", {
										target : this
									}, storeData.options.events[event]);
								}
							}
						}
					});
});

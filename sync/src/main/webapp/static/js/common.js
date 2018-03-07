var com = {};

if ($.fn.datebox != null) {
	// 时间格式
	$.fn.datebox.defaults.formatter = function(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		return y + '' + (m < 10 ? ('0' + m) : m) + ''
				+ (d < 10 ? ('0' + d) : d);
	};
}

/**
 * 系统提示 com.message("success","操作成功") com.message("error","操作失败")
 */
com.message = function(type, message, callback) {
	switch (type) {
	case "success": {
		layer.open({
			title : false,
			icon : 1,
			type : 0,
			shift : 1,
			content : message,
			btn : ""
		});
		break;
	}
	case "error": {
		layer.open({
			title : false,
			icon : 2,
			type : 0,
			shift : 1,
			content : message,
			btn : ""
		});
		break;
	}
	case "confirm": {
		layer.confirm(message, {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			callback();
		}, function() {

		});
		break;
	}
	default: {
		layer.open({
			title : false,
			icon : 3,
			type : 0,
			shift : 1,
			content : message,
			btn : ""
		});
		break;

	}
	}

	if (callback && type != "confirm")
		callback();
	return null;
};
/**
 * 加载层
 */
com.showloading = function() {
	layerLoadIndex = layer.msg('数据加载中...', {
		icon : 16,
		shift : 1,
		shade : [ 0.8, '#393D49' ],
		time : 0
	});
}
/**
 * 影藏家在层
 */
com.closeLoading = function() {
	layer.close(layerLoadIndex);
}
/**
 * 通用Ajax方法
 * 
 */
com.ajax = function(options) {
	options = $.extend({
		showLoading : true
	}, options);
	var ajaxDefaults = {
		type : 'POST',
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
			com.message("error", msg);
		}
	};

	if (options.showLoading) {
		ajaxDefaults.beforeSend = com.showloading;
		ajaxDefaults.complete = com.closeLoading;
	}
	$.ajax($.extend(ajaxDefaults, options));
}
/**
 * 通用弹出窗体
 */
com.openWin = function(title, url, width, height) {
	if (arguments.length == 2) {
		width = '100%';
		height = '100%';
	}
	var index = layer.open({
		type : 2,
		title : title,
		shadeClose : false,
		shade : 0.6,
		shift : 4,
		move : false,
		area : [ width, height ],
		content : url
	});
	return index;
};
/**
 * 窗体关闭
 */
com.closeWin = function(index) {
	if (arguments.length == 0) {
		layer.closeAll();
		parent.layer.closeAll();
	} else {
		layer.close(index);
	}
}

// 自适应大小
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

com.showDegree = function(id) {
	switch (id) {
	case 0: {
		return "小学";
	}
	case 1: {
		return "初中";
	}
	case 2: {
		return "高中";
	}
	case 3: {
		return "大专";
	}
	case 4: {
		return "本科";
	}
	case 5: {
		return "硕士";
	}
	case 6: {
		return "博士";
	}
	}
}
com.loadDegree = function() {
	var arry = new Array();
	arry.push("小学");
	arry.push("初中");
	arry.push("高中");
	arry.push("大专");
	arry.push("本科");
	arry.push("硕士");
	arry.push("博士");
	return arry;
}
com.loadGrade = function() {
	var arry = new Array();
	arry.push("会员");
	arry.push("A级");
	arry.push("B级");
	arry.push("C级");
	arry.push("D级");
	return arry;
}

com.showGrade = function(id) {

	switch (id) {
	case "0": {
		return "会员";
	}
	case "1": {
		return "A级";
	}
	case "2": {
		return "B级";
	}
	case "3": {
		return "C级";
	}
	case "4": {
		return "D级";
	}
	}

}

com.removeHTMLTag = function(str) {

	// str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	// str=str.replace(/[\r\n]/ig,"");
	// str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行

	return str;
};
com.convertArray = function(o) {
	var v = {};
	for ( var i in o) {
		if (o[i].name != '__VIEWSTATE') {
			if (typeof (v[o[i].name]) == 'undefined')
				v[o[i].name] = com.removeHTMLTag(o[i].value);
			else
				v[o[i].name] += "," + com.removeHTMLTag(o[i].value);
		}
	}

	return v;
};
com.isBlank = function(val) {
	if (val == null || val == "" || val == undefined) {
		return true;
	} else {
		return false;
	}
};
com.isNotBlank = function(val) {
	if (val != null && val != "" && val != undefined) {
		return true;
	} else {
		return false;
	}
};
com.passId = function(val) {
	if (com.isBlank(val)) {
		return "";
	}
	var one = val.substring(0, 1);
	var two = val.substring(1, 2);
	var three = val.substring(2, 3);
	var name = "";
	if (one == "1") {
		name += "董事长;";
	}
	if (two == "1") {
		name += "总经理;";
	}
	if (three == "1") {
		name += "副总经理(周亮臣);";
	}
	return name;
};
com.height1 = function() {
	if (window.screen.height <= 900) {
		return "435px";
	} else {
		return "600px";
	}
};
com.height = function() {
	return "500px";
};
com.width = function() {
	return "800px";
};
com.defaultProviceId = 3;
com.defaultCityId = 6;
com.defaultTownId = 264;

/**
 * 课程来源
 */
com.courSource = function(v) {
	var value = "";
	switch (v) {
	case "0":
		value = "院部课程";
		break;
	case "1":
		value = "厂外讲座";
		break;
	case "2":
		value = "自订课程";
		break;
	}
	return value;
};

/**
 * 课程类型
 */
com.courseType = function(v) {
	var value = "";
	switch (v) {
	case "00":
		value = "生产管理类(P)";
		break;
	case "01":
		value = "质量管理类(Q)";
		break;
	case "02":
		value = "现场改善类(F)";
		break;
	case "03":
		value = "经营管理类(R)";
		break;
	case "04":
		value = "人力资源管理类(H)";
		break;
	case "05":
		value = "营销管理类(M)";
		break;
	case "06":
		value = "新产品开发类(N)";
		break;
	case "07":
		value = "财务管理类(F)";
		break;
	case "08":
		value = "认证类(C)";
		break;
	case "09":
		value = "其他类";
		break;
	case "10":
		value = "全国研讨活动";
		break;
	case "11":
		value = "干部能力提升(A)";
		break;
	case "12":
		value = "成本降低与效率提升类(C)";
		break;
	case "13":
		value = "仓储管理类(W)";
		break;
	case "14":
		value = "采购类(B)";
		break;
	case "15":
		value = "设备管理类(D)";
		break;
	case "16":
		value = "服务类";
		break;
	case "17":
		value = "魔训军训类";
		break;
	case "18":
		value = "VIP类";
		break;
	case "19":
		value = "人生系列";
		break;
	case "20":
		value = "高阶活动类";
		break;
	}
	return value;
};

com.todate = function() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '' + (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d);
};

com.tomorrow = function() {
	var date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '' + (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d);
};

com.next = function() {
	var date = new Date();
	var y = date.getFullYear() + 1;
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '' + (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d);
};

formatterXYType = function(val) {
	if (com.isNotBlank(val)) {
		if ("0" == val) {
			return "正常协议";
		} else {
			return "免费协议";
		}

	}
};

formatterXYType = function(val) {
	if (com.isNotBlank(val)) {
		if ("0" == val) {
			return "正常协议";
		} else {
			return "免费协议";
		}

	}
};

formatterSignType = function(val) {
	if (com.isNotBlank(val)) {
		if ("30" == val) {
			return "协议";
		} else if ("40" == val) {
			return "辅导案赠送";
		} else if ("41" == val) {
			return "辅导案赠送";
		} else if ("50" == val) {
			return "厂内班";
		} else if ("60" == val) {
			return "协议扣款";
		}
	}
};

/**
 * 辅导项目类型
 **/
tutorItemType1 = function(val, row) {
	var value = "";
	switch (val) {
	case "0":
		value = "认证";
		break;
	case "1":
		value = "非认证";
		break;
	}
	return value;
};

tutorItemType = function(val, row) {
	var value = "";
	switch (val) {
	case "00":
		value = "现金";
		break;
	case "10":
		value = "汇款";
		break;
	case "20":
		value = "银行转账";
		break;
	}
	return value;
};

var tutorItemTypeCombox = [ {
	"value" : "00",
	"text" : "现金"
}, {
	"value" : "10",
	"text" : "汇款"
}, {
	"value" : "20",
	"text" : "银行转账"
} ];

formatterPmType = function(val)	{
	var typeNames = "";
	if(com.isNotBlank(val)){
		var array = val.split(";");
		// 30: 协议 40: 辅导案赠送 41: 辅导案金额 50: 厂内班赠送 60：协议扣款 70:生日券 80回馈券 92现金 93预收款
		$.each(array,function(i,s){
			if ("30" == s) {
				typeNames = typeNames + "协议" + ";";
			} else if ("40" == s) {
				typeNames = typeNames + "辅导案赠送" + ";";
			} else if ("41" == s) {
				typeNames = typeNames + "辅导案金额" + ";";
			} else if ("50" == s) {
				typeNames = typeNames + "厂内班赠送" + ";";
			} else if ("60" == s) {
				typeNames = typeNames + "协议扣款" + ";";
			} else if ("70" == s) {
				typeNames = typeNames + "生日券" + ";";
			} else if ("80" == s) {
				typeNames = typeNames + "回馈券" + ";";
			} else if ("92" == s) {
				typeNames = typeNames + "现金" + ";";
			} else if ("93" == s) {
				typeNames = typeNames + "预收款" + ";";
			}
		});
	}
	return typeNames;
};

com.removeByValue = function(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}
};

com.contains = function(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}  
/// <reference path="utils.js" />
var formatter = {};

formatter.yesNo = function(val, row) {
	if (row.isTotalRow) {
		return val;
	}
	return val ? "是" : "否";
}

formatter.d2numbber = function(val, row) {
	if (row.isTotalRow) {
		return val;
	}
	if (isNaN(parseFloat(val))) {
		return val.toFixed(2);
	}
	return 0.00;
}

formatter.toshortdate = function(val) {
	if (!val)
		return val;
	if (typeof val == 'string') {
		return val.substring(0, 10);
	}
	return val;
}

formatter.datetoshort = function(val) {
	if (!val)
		return val;
	var date = new Date(val);
	return utils.formatDate(date, 'yyyy-MM-dd');
}

formatter.datetolong = function(val) {
	if (!val)
		return val;
	var date = new Date(val);
	return utils.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
}

formatter.dictmapper = function(val, row) {
	if (row.isTotalRow) {
		return val;
	}
	var category = this.category;
	var result = "";
	if (window.parent && top.ValueNameData) {
		result = top.ValueNameData[category + "_" + val];
	}
	return result;
}

formatter.action = function(val, row) {
	if (row.isTotalRow) {
		return val;
	}
	var items = this.items;
	var result = "<div style='position:relative;height:16px;'>";
	$.each(items, function(i, item) {
		if ((!item.func || com.hasFunc(item.func))
				&& (!item.processValue || item.processValue(row))) {
			var text = item.text;
			var icon = item.icon;
			var action = item.action;
			var tip = this.tip ? this.tip : "";
			var isShow = item.hidden == undefined
					|| (item.hidden && !item.hidden(row));
			var display = isShow ? "" : "style='display:none'";
			if (icon) {
				result += "<span " + display + " action='" + action
						+ "' title='" + tip + "' class='gridcolumn-icon "
						+ icon + "'>&nbsp;</span>";
			}
			if (text) {
				result += "<a " + display + " class='gridcolumn-btn' action='"
						+ action + "'>" + text + "</a>";
			}

			if (!icon && !text) {
				result += val;
			}
		}
	});
	result += "</div>";
	return result;
}

formatter.clickable = function(val, row) {
	return "<a style='color:blue'>" + val + "</a>";
}

formatter.img = function(val, row) {
	if (!val)
		return "";
	return "<a target='_blank' href='" + val + "'><img style='width:20px;' src='" + val + "'</a>";
}

formatter.imgid =function(val,row)
{
	if (!val)
		return "";
	var id=val.split(",")[0];
	var url=com.url("/upload/download.do?id="+id);
	return "<a target='_blank' href='" + url + "'><img style='width:20px;' src='" + url + "'</a>";
}

formatter.sex = function(val, row) {
	if (!val)
		return "";
	return val == '1' ? "男" : "女";
}

formatter.warehousemapper = function(val, row) {
	var result = val;
	if (row && row.isTotalRow)
		return val;
	if (window.parent && top.WarehouseFlatList) {
		var warehouse = utils.getItemFromList("Id", val, top.WarehouseFlatList);
		if (warehouse) {
			result = warehouse.Name;
		}
	}
	return result;
}

formatter.productcategorymapper = function(val, row) {
	var result = val;
	if (row.isTotalRow)
		return val;
	if (!val)
		return "";
	if (window.parent && top.ProductCategoryFlatList) {
		var item = utils
				.getItemFromList("Id", val, top.ProductCategoryFlatList);
		result = item.Name;
	}
	return result;
}

formatter.statusmapper = function(val, row) {
	if (val == '0') {
		return "未审核";
	} else if (val == '1') {
		return "审核通过";
	} else if (val == '2') {
		return "审核不通过";
	} else if (val == '3') {
		return "作废";
	}
	return "";
}

formatter.ifzeroempty = function(val, row) {
	if (isNaN(val) || !val) {
		return "-";
	}
	return val;
}

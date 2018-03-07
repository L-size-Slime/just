
var wrapper = {};
// 设置
wrapper.settings = {
	homeTabTitle : '我的桌面',
	homeTabUrl : '/home/content',
	maxTabCount : 10
};
/**
 * 退出
 */
wrapper.logout = function() {
	layer.confirm('您确定要退出系统？', {
		title : '系统提示',
		icon : 3,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		window.location.href = '/login';
	}, function() {

	});
};
/**
 * 初始化
 */
wrapper.init = function() {
	com.ajax({
		type : 'GET',
		url : '/menu/loadPermissionsmeun',
		success : function(d) {
			wrapper.initMenu(d);
		}
	});

	$('.loginOut').click(wrapper.logout);
	$('.changepwd').click(wrapper.changePassword);

	$('#closeMenu').menu({
		onClick : wrapper.rightMenuClick
	});

	$('#tabs').tabs({
		tools : [ {
			iconCls : 'icon-arrow_refresh',
			handler : wrapper.tabRefresh
		},
		{
			iconCls : 'panel-tool-close',
			handler : wrapper.tabClose
		} ],
		onContextMenu : wrapper.tabContextMenu
	});
};
wrapper.tabContextMenu = function(e, title) {
	$('#closeMenu').menu('show', {
		left : e.pageX,
		top : e.pageY
	});
	$('#tabs').tabs('select', title);
	e.preventDefault();
};
/**
 * 设置全屏
 */
wrapper.setFullScreen = function() {
	var that = $(this);
	if (that.find('.icon-screen_full').length) {
		that.find('.icon-screen_full').removeClass('icon-screen_full')
				.addClass('icon-screen_actual');
		$('[region=north],[region=west]').panel('close')
		var panels = $('body').data().layout.panels;
		panels.north.length = 0;
		panels.west.length = 0;
		if (panels.expandWest) {
			panels.expandWest.length = 0;
			$(panels.expandWest[0]).panel('close');
		}
		$('body').layout('resize');
	} else if ($(this).find('.icon-screen_actual').length) {
		that.find('.icon-screen_actual').removeClass('icon-screen_actual')
				.addClass('icon-screen_full');
		$('[region=north],[region=west]').panel('open');
		var panels = $('body').data().layout.panels;
		panels.north.length = 1;
		panels.west.length = 1;
		if ($(panels.west[0]).panel('options').collapsed) {
			panels.expandWest.length = 1;
			$(panels.expandWest[0]).panel('open');
		}
		$('body').layout('resize');
	}
};
/**
 * 设置右键菜单
 */

wrapper.rightMenuClick = function(item) {
	var $tab = $('#tabs');
	var currentTab = $tab.tabs('getSelected');
	var titles = wrapper.getTabTitles($tab);

	switch (item.id) {
	case "refresh":
		var src = $(currentTab.panel('options').content).attr('src');
		if (titles == wrapper.settings.homeTabTitle) {
			$tab.tabs('update', {
				tab : currentTab,
				options : {
					content : wrapper.createFrame(wrapper.settings.homeTabUrl)
				}
			});
		} else {
			$tab.tabs('update', {
				tab : currentTab,
				options : {
					content : wrapper.createFrame(src)
				}
			});
		}

		break;
	case "close":
		var currtab_title = currentTab.panel('options').title;
		if (currtab_title == wrapper.settings.homeTabTitle) {
			return false;
		}
		$tab.tabs('close', currtab_title);
		break;
	case "closeall":
		$.each(titles, function() {
			if (this != wrapper.settings.homeTabTitle)
				$tab.tabs('close', this);
		});
		break;
	case "closeother":
		var currtab_title = currentTab.panel('options').title;
		$.each(titles, function() {
			if (this != currtab_title && this != wrapper.settings.homeTabTitle)
				$tab.tabs('close', this);
		});
		break;
	case "closeright":
		var tabIndex = $tab.tabs('getTabIndex', currentTab);
		if (tabIndex == titles.length - 1) {
			com.message('errot', '亲，后边没有啦 ^@^!!');

			return false;
		}
		$.each(titles, function(i) {
			if (i > tabIndex && this != wrapper.settings.homeTabTitle)
				$tab.tabs('close', this);
		});

		break;
	case "closeleft":
		var tabIndex = $tab.tabs('getTabIndex', currentTab);
		if (tabIndex == 1) {
			com.message('errot', '至少留一个');

			return false;
		}
		$.each(titles, function(i) {
			if (i < tabIndex && this != wrapper.settings.homeTabTitle)
				$tab.tabs('close', this);
		});
		break;
	case "exit":
		$('#closeMenu').menu('hide');
		break;
	}

};

/**
 * 初始化菜单
 */
wrapper.initMenu = function(d) {
	if (!d || !d.length) {
		$.messager.alert("系统提示",
				"<font color=red><b>您没有任何权限！请联系管理员。</b></font>", "warning",
				function() {
					location.href = '/login';
				});
		return;
	}

	$('body').data('menulist', d);

	wrapper.menuTree(d);

	$("#home").html(wrapper.createFrame(wrapper.settings.homeTabUrl));
};

/**
 * 刷新
 */
wrapper.tabRefresh = function(url) {
	var $tab = $('#tabs');
	var currentTab = $tab.tabs('getSelected');
	var src = $(currentTab.panel('options').content).attr('src');
	$tab.tabs('update', {
		tab : currentTab,
		options : {
			content : wrapper.createFrame(src)
		}
	});

};

/**
 * tab关闭
 */
wrapper.tabClose = function() {
	$.messager.confirm('系统提示', '确认要关闭所有窗口吗?', function(r) {
		if (r)
			wrapper.rightMenuClick({
				id : 'closeall'
			});
	});
};
wrapper.createFrame = function(url) {
	return '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:99%;" src="'
			+ url + '" ></iframe>';
}

wrapper.openTabHandler = function($tab, hasTab, subtitle, url, icon) {
	if (!hasTab) {
		$tab.tabs('add', {
			title : subtitle,
			content : wrapper.createFrame(url),
			closable : true,
			icon : icon
		});
	} else {
		$tab.tabs('select', subtitle);
		wrapper.tabRefresh(url); // 选择TAB时刷新页面
	}

};
/**
 * 获取tab
 */
wrapper.getTabTitles = function($tab) {
	var titles = [];
	var tabs = $tab.tabs('tabs');
	$.each(tabs, function() {
		titles.push($(this).panel('options').title);
	});
	return titles;
};
/**
 * 新增tab
 */
wrapper.addTab = function(subtitle, url, icon) {
	if (!url || url == '#')
		return false;
	var $tab = $('#tabs');
	var tabCount = $tab.tabs('tabs').length;
	var hasTab = $tab.tabs('exists', subtitle);
	if ((tabCount <= wrapper.settings.maxTabCount) || hasTab)
		wrapper.openTabHandler($tab, hasTab, subtitle, url, icon);
	else
		$.messager.confirm("系统提示",
				'<b>您当前打开了太多的页面，如果继续打开，会造成程序运行缓慢，无法流畅操作！</b>', function(b) {
					if (b)
						wrapper.openTabHandler($tab, hasTab, subtitle, url,
								icon);
				});
};

/**
 * 菜单生成
 */
wrapper.menuAccordion = function(menus) {
	var $obj = $('#wnav');

	$obj.accordion({
		animate : false,
		fit : true,
		border : false
	});
	$
			.each(
					menus,
					function() {
						var html = '<ul>';
						var temple = '<li><div><a refipt:void(0)" rel="{1}"><span class="icon {2}">&nbsp;</span><span class="nav">{3}</span></a></div></li>';
						$.each(this.children || [], function() {
							html += utils.formatString(temple, this.id,
									this.url, this.iconCls, this.menuName);
						});
						html += '</ul>';

						$obj.accordion('add', {
							title : this.menuName,
							content : html,
							iconCls : 'icon ' + this.iconCls,
							border : false
						});
					});

	var panels = $obj.accordion('panels');
	$obj.accordion('select', panels[0].panel('options').title);

	$obj.find('li').click(function() {
		$obj.find('li div').removeClass("selected");
		$(this).children('div').addClass("selected");

		var link = $(this).find('a');
		var title = link.children('.nav').text();
		var url = link.attr("rel");
		var code = link.attr("ref");
		var icon = link.children('.icon').attr('class');

		wrapper.addTab(title, url, icon);
	}).hover(function() {
		$(this).children('div').addClass("hover");
	}, function() {
		$(this).children('div').removeClass("hover");
	});
};

wrapper.menuTree = function(menus) {
	var t = utils.copyProperty(menus, "menuName", "text", false);
	var treeData = utils.toTreeData(t, "id", "parentId", "children");
	$.each(treeData, function(i, tree) {
		tree.state = 'closed';
	});
	$('#wnav').tree({
		data : treeData,
		onClick : function(node) {
			wrapper.addTab(node.text, node.url, node.iconCls);
		}
	});
}
$(wrapper.init);
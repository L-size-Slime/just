var wrapper = {};

// 设置
wrapper.settings = {
	homeTabTitle : '我的桌面',
	homeTabUrl : '',
	maxTabCount : 30
};

// 初始化
wrapper.init = function() {
	com.ajax({
		type : 'GET',
		cache : false,
		url : com.url('/sys/getmenus.do'),
		success : wrapper.initMenu
	});

	$('.loginOut').click(wrapper.logout);
	$('.changepwd').click(wrapper.changePassword);
	$('#notity').jnotifyInizialize({
		oneAtTime : true,
		appendType : 'append'
	}).css({
		'position' : 'absolute',
		'*top' : '2px',
		'left' : '50%',
		'margin' : '5px 0px 0px -120px',
		'*margin' : '0px 0px 0px -120px',
		'width' : '240px',
		'z-index' : '9999'
	});
	$('#closeMenu').menu({
		onClick : wrapper.rightMenuClick
	});

	$('#tabs').tabs({
		tools : [ {
			iconCls : 'icon-arrow_refresh',
			handler : wrapper.tabRefresh
		}, {
			iconCls : 'icon-screen_full',
			handler : wrapper.setFullScreen
		}, {
			iconCls : 'panel-tool-close',
			handler : wrapper.tabClose
		} ],
		onContextMenu : wrapper.tabContextMenu
	});
};

// 事件
wrapper.tabContextMenu = function(e, title) {
	$('#closeMenu').menu('show', {
		left : e.pageX,
		top : e.pageY
	});
	$('#tabs').tabs('select', title);
	e.preventDefault();
};

// 修改密码
wrapper.changePassword = function() {
	var dialog = art.dialog({
		content : $('#changePwdDia')[0],
		title : '修改密码',
		height : 100,
		width : 200,
		okVal : '确定',
		ok : function() {
			var that = this;
			com.gridSave("PwdForm", "/sys/sysuser/updatepwd", function() {
				$('#changePwdDia').find("input").val("");
				that.close();
			});
			return false;
		},
		cancelVal : '关闭',
		cancel : true
	// 为true等价于function(){}
	});
};

// /退出系统
wrapper.logout = function() {
	$.messager.confirm('系统提示', '您确定要退出本次登录吗?', function(r) {
		if (r)
			location.href = '/Login/Logout';
	});
};
// /设置全屏
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
// /右键菜单
wrapper.rightMenuClick = function(item) {
	var $tab = $('#tabs');
	var currentTab = $tab.tabs('getSelected');
	var titles = wrapper.getTabTitles($tab);

	switch (item.id) {
	case "refresh":
		var src = $(currentTab.panel('options').content).attr('src');
		$tab.tabs('update', {
			tab : currentTab,
			options : {
				content : wrapper.createFrame(src)
			}
		});
		break;
	case "close":
		var currtab_title = currentTab.panel('options').title;
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
			alert('亲，后边没有啦 ^@^!!');
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
			alert('亲，前边那个上头有人，咱惹不起哦。 ^@^!!');
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

// 方法
wrapper.initSettings = function(settings) {
	wrapper.settings = $.extend(wrapper.settings, settings);
};
// /初始化菜单
wrapper.initMenu = function(menus) {
	var items = menus.items;
	window.document.title = menus.systemName;
	$("#systemTitle").html(menus.systemName);
	$("#appVersion").html(menus.appVersion);
	$("#systemName").html(menus.systemName);
	var logoUrl=menus.appLogo || ''; 
	var logoUrl = logoUrl.indexOf('resource') >= 0 ? logoUrl : '/upload/download.do?id=' + logoUrl;
	$("#systemLogo").attr('src', com.url(logoUrl));
	if (!items || !items.length) {
		$.messager.alert("系统提示",
				"<font color=red><b>您没有任何权限！请联系管理员。</b></font>", "warning",
				function() {
					location.href = '/login';
				});
		return;
	}
	$('body').data('menulist', items);
	wrapper.menuAccordion(items);
	// $("#home").html(wrapper.createFrame(wrapper.settings.homeTabUrl));
};
// 刷新
wrapper.tabRefresh = function(url, frameId) {
	var $tab = $('#tabs');
	var currentTab = $tab.tabs('getSelected');
	var options = currentTab.panel('options');
	frameId = options.frameId;
	var src = $(currentTab.panel('options').content).attr('src');
	$tab.tabs('update', {
		tab : currentTab,
		options : {
			content : wrapper.createFrame(src, frameId)
		}
	});

};
// tab关闭
wrapper.tabClose = function() {
	$.messager.confirm('系统提示', '确认要关闭所有窗口吗?', function(r) {
		if (r)
			wrapper.rightMenuClick({
				id : 'closeall'
			});
	});
};
wrapper.createFrame = function(url, frameId) {
	return '<iframe scrolling="auto" id="' + frameId
			+ '" frameborder="0"  style="width:100%;height:99%;" src="' + url
			+ '" ></iframe>';
}

wrapper.openTabHandler = function($tab, hasTab, subtitle, url, icon) {

	if (!hasTab) {
		var frameId = utils.uuid(10, 16);
		$tab.tabs('add', {
			title : subtitle,
			frameId : frameId,
			content : wrapper.createFrame(url, frameId),
			closable : true,
			icon : icon
		});
	} else {
		$tab.tabs('select', subtitle);
		var frameId = $tab.tabs("getSelected").panel("options").frameId;
		wrapper.tabRefresh(url, frameId); // 选择TAB时刷新页面
	}
};

wrapper.getTabTitles = function($tab) {
	var titles = [];
	var tabs = $tab.tabs('tabs');
	$.each(tabs, function() {
		titles.push($(this).panel('options').title);
	});
	return titles;
};

wrapper.addTab = function(subtitle, url, icon) {
	if (!url || url == '#')
		return false;
	if(url.toLowerCase( ).indexOf("http") < 0){
		url = com.url(url);
	}
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

// 菜单生成

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
						var temple = '<li><div><a href="javascript:void(0)" rel="{0}"><span class="icon {1}">&nbsp;</span><span class="nav">{2}</span></a></div></li>';
						$.each(this.children || [], function() {
							html += utils.formatString(temple,
									this.navigateUrl, this.iconCls, this.name);
						});
						html += '</ul>';

						$obj.accordion('add', {
							title : this.name,
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

$(wrapper.init);

// 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e) {
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源

	var t = obj.type || obj.getAttribute('type');// 获取事件源类型

	// 获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	var vEnabled = obj.getAttribute('enabled');
	// 处理null值情况
	vReadOnly = (vReadOnly == null) ? false : vReadOnly;
	vEnabled = (vEnabled == null) ? true : vEnabled;

	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readonly属性为true或enabled属性为false的，则退格键失效
	var flag1 = (ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true
			: false;

	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true
			: false;

	// 判断
	if (flag2) {
		return false;
	}
	if (flag1) {
		return false;
	}
}

// 禁止后退键 作用于Firefox、Opera
document.onkeypress = banBackSpace;
// 禁止后退键 作用于IE、Chrome
document.onkeydown = banBackSpace;

var JsonFilter = "";//查询条件
//grid参数
var gridOption = {
    datagridId: "",//grid ID编号
    url: "",//连接地址
    title:"",//标题
    toolbarID: "toolbar",//工具栏编号
    columns: [],//列字段
    frozenColumns: [],//固定列字段
    pageSize: 20,//分页大小
    idField: 'ID',//主键名字
    pagination: true,//是否分页
    detailUrl: '',//双击打开页面地址
    width:'',//打开宽
    height: '',//开发高
    deleteUrl: '',//删除Url
    onBeforeLoad: function () {
    },
    onLoadSuccess: function () { },
    rowStyler: function (index, row) { },
    showFooter: false,
    onClickRow: function (rowIndex, rowData) { },
    onDblClickRow: function (rowIndex, rowData) { },
    loadFilter: function (data) {
        var data = com.initTotalRow(data, gridOption.datagridId);
        return data;
    }
};
var gridOperate = {
    initDatagrid: function (winSize) {
        $('#' + gridOption.datagridId).datagrid({
            url: gridOption.url,
            toolbar: '#' + gridOption.toolbarID,
            title: gridOption.title,
            nowrap: false, //折行
            rownumbers: true, //行号
            striped: true, //隔行变色
            idField: gridOption.idField,//主键
            singleSelect: gridOption.singleSelect, //单选
            collapsible: true,
            showFooter: true,
            frozenColumns: gridOption.frozenColumns,
            columns: gridOption.columns,
            pagination: gridOption.pagination,
            totalConfig: gridOption.totalConfig,
            fit: true,
            onLoadSuccess: gridOption.onLoadSuccess,
            onClickRow:function(rowIndex, rowData){
                gridOption.onClickRow(rowIndex, rowData);
            },
            rowStyler: function (index, row) {
                return gridOption.rowStyler(index, row);
            },
            onDblClickRow: function (rowIndex, rowData) {
                gridOption.onDblClickRow(rowIndex, rowData);
            },
            onBeforeLoad: gridOption.onBeforeLoad,
            pageSize: gridOption.pageSize,
            loadFilter: function (data) {
                var data= com.initTotalRow(data, gridOption.datagridId);
                return data;
            },
            pageList: [20, 40, 50, 100, 200, 500, 1000] 
        });
    },
    selected: function () {
        return $('#' + gridOption.datagridId).datagrid('getSelected');
    },
    reload: function () {
        $('#' + gridOption.datagridId).datagrid('clearSelections').datagrid('reload', { filter: JsonFilter });
    }
};
var crud = {
    add: function () {
        com.openDialog(gridOption.detailUrl, gridOption.title + '-新增', gridOption.width, gridOption.height);
    },
    edit: function () {
        var row = gridOperate.selected();
        if (row) {
            com.openDialog(gridOption.detailUrl+row.ID, gridOption.title + '-编辑', gridOption.width, gridOption.height);
        } else {
            com.message('warning', '请选择要修改的数据!');
        }
    },
    del: function () {
        var row = gridOperate.selected();
        if (row != null) {
            var post = {};
            post.ID = row.ID;
            var json = JSON2.stringify(post);
            com.message('confirm', '确认要删除选中的数据？', function (r) {
                if (r) {
                    com.ajax({
                        url:gridOption.deleteUrl,
                        data: json,
                        success: function (d) {
                            com.message('success', d.msg);
                            gridOperate.reload();
                        }
                    });
                }
            });
        }
        else {
            com.message('warning', '请选择要删除的数据!');
        }
    },
    reload: gridOperate.reload

};
var searchDown = {
    init: function () {
        if (!$('#searchMenu').length) {
            return;
        }
        var columns = $('#' + gridOption.datagridId).datagrid('options').columns[0];
        var frozenColumns = $('#' + gridOption.datagridId).datagrid('options').frozenColumns[0];
        $('#searchMenu').empty();
        frozenColumns = frozenColumns || [];
        $.each(frozenColumns, function (i, n) {
            if (n.search) {
                $('#searchMenu').append('<div data-options="name:\'' + n.field + '\'">' + n.title + '</div>');
            }
        });
      
        $.each(columns, function (i, n) {
            if (n.search) {
                $('#searchMenu').append('<div data-options="name:\'' + n.field + '\'">' + n.title + '</div>');
               
            }
        });
        $('#ss').searchbox({
            menu: '#searchMenu',
            searcher: function (value, name) {
                var filter = { rules: [{ field: name, op: 'like', data: value }] };
                $('#' + gridOption.datagridId).datagrid('reload', { filter: JSON2.stringify(filter) });
            }
        });
    }

};

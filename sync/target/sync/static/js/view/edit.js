var GridReload = "";
$(function() {
	$(".vform").validator({
		theme : 'yellow_right_effect',
		msgClass : "n-bottom",
		focusCleanup : true,
		stopOnError : true,
		valid : function(form) {
			var me = this;
			me.holdSubmit();
			var isValid = me.$el.attr("isValid");
			// 判断细单时候验证成功
			if(com.isNotBlank(isValid) && isValid == "false"){
				me.holdSubmit(false);
			}else{
				com.ajax({
					url : SaveUrl,
					data : $("#vform").serialize(),
					success : function(data) {
						if (data.success) {
							com.message("success", data.msg);
							try {
								parent.reload(GridReload);
								com.closeWin();
							} catch (e) {

							}

						} else {
							com.message("error", data.msg);
						}
						me.holdSubmit(false);
					}
				});
			}
		}
	});
});
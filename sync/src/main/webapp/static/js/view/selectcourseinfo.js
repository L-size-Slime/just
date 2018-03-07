	/**
	 * 选择课程
	**/
	var winCourseinfoIndex;
	function selectCourseinfo(){

		winCourseinfoIndex=com.openWin("选择课程","/courseplan/selectPlanCourse?select="+$("#courseId").val(),"800px","400px");

		//winCourseinfoIndex=com.openWin("选择课程","/courseinfo/selectCourseInfo?select="+$("#courseId").val(),"800px","400px");

	}

	/**
	 * 课程选择绑定
	**/
	function SetPlanCourseID(data){
		$("#courseId").val(data.id);
		$("#courseNm").val(data.courseNm);
		$("#courseDue").val(data.courseDue);
		com.closeWin(winCourseinfoIndex);
	}
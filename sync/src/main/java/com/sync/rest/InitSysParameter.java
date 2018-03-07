package com.sync.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sync.common.ActionResult;
import com.sync.common.SystemParameter;

@Controller
@RequestMapping(value = "sys")
public class InitSysParameter {

	@ResponseBody
	@RequestMapping(value = "update")
	public ActionResult update(String sGXKNum) {
		try {
			SystemParameter.getInstance().sGXKNum = sGXKNum;
			return ActionResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return ActionResult.failed(e.getMessage());
		}
	}

	@ResponseBody
	@RequestMapping(value = "get")
	public ActionResult get() {
		try {
			return ActionResult.success(SystemParameter.getInstance().sGXKNum);
		} catch (Exception e) {
			e.printStackTrace();
			return ActionResult.failed(e.getMessage());
		}
	}
}

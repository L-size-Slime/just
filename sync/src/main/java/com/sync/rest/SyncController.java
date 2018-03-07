package com.sync.rest;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sync.common.ActionResult;
import com.sync.common.SystemParameter;
import com.sync.service.SyncService;

@Controller
@RequestMapping(value = "/")
public class SyncController {

	@Autowired
	SyncService syncService;

	@ResponseBody
	@RequestMapping(value = "accessofpersons")
	public ActionResult accessOfPersons() {
		return syncService.accessOfPersons();
	}

	@ResponseBody
	@RequestMapping(value = "team")
	public ActionResult team() {
		return syncService.team();
	}

	@ResponseBody
	@RequestMapping(value = "teampersons")
	public ActionResult teamPersons() {
		return syncService.teamPersons();
	}

	@ResponseBody
	@RequestMapping(value = "persons")
	public ActionResult persons() {
		return syncService.persons();
	}

	@ResponseBody
	@RequestMapping(value = "sgxknumupdate")
	public ActionResult sGXKNumUpdate(String sGXKNum) {
		return syncService.sGXKNumUpdate(sGXKNum);
	}

	@ResponseBody
	@RequestMapping(value = "index")
	public ModelAndView index(HttpServletRequest request) {
		ModelAndView mav = new ModelAndView("index");
		mav.addObject("message", SystemParameter.message);
		return mav;
	}

	@ResponseBody
	@RequestMapping(value = "message")
	public ActionResult getMessage() {
		return ActionResult.success(SystemParameter.messagLog);
	}

	@ResponseBody
	@RequestMapping(value = "systemparameters")
	public List<Map<String,Object>> getSystemParameters() {
		return syncService.getSystemParameters();
	}

	@ResponseBody
	@RequestMapping(value = "save")
	public ActionResult saveSystemParameters(HttpServletRequest request) {
		String list = request.getParameter("list");
		return syncService.saveSystemParameters(list);
	}

}

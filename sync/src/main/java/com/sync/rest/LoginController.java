package com.sync.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sync.common.ActionResult;
import com.sync.common.TipsConstant;

@Controller
@RequestMapping(value = "/login")
public class LoginController {

	@ResponseBody
	@RequestMapping(value = "login")
	public ActionResult login(HttpServletRequest request) {
		String userName = request.getParameter("username");
		String password = request.getParameter("password");
		if ("admin".equals(userName) && "admin".equals(password)) {
			HttpSession session = request.getSession(true);
			session.setAttribute("admin", "admin");
			return ActionResult.success();
		}
		return ActionResult.failed(TipsConstant.TIP1);
	}

	@ResponseBody
	@RequestMapping(value = "logout")
	public ActionResult logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		session.invalidate();
		return ActionResult.success();
	}
}

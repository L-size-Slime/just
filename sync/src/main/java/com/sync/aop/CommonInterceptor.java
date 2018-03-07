package com.sync.aop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class CommonInterceptor implements HandlerInterceptor {

	// 在DispatcherServlet完全处理完请求之后被调用，可用于清理资源
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
	}

	// 在业务处理器处理请求完成之后，生成视图之前执行
	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
	}

	// 在业务处理器处理请求之前被调用
	@Override
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
		HttpSession session = arg0.getSession();
		Object admin = session.getAttribute("admin");
		if (admin == null) {
			arg1.sendRedirect(arg0.getContextPath() + "/");
			return false;
		}
		return true;
	}

}

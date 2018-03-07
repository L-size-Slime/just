package com.sync.common;

public class ActionResult {

	private String msg;
	private boolean success;
	private Object data;

	public ActionResult(String msg, boolean isSuccess, Object data) {
		this.msg = msg;
		this.setSuccess(isSuccess);
		this.data = data;
	}

	public ActionResult() {

	}

	public static ActionResult success(String msg) {
		return new ActionResult(msg, true, null);
	}

	public static ActionResult success(Object data) {
		return new ActionResult("", true, data);
	}

	public static ActionResult success() {
		return new ActionResult("", true, null);
	}

	public static ActionResult failed(String msg) {
		return new ActionResult(msg, false, null);
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
}

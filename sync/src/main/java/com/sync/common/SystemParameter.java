package com.sync.common;

import com.sync.aop.InnerParam;
import com.sync.aop.ParamDescription;

public class SystemParameter {

	@InnerParam
	private static SystemParameter instance;

	@InnerParam
	public static String message = "";

	@InnerParam
	public static String messagLog = "";

/*	@InnerParam
	public static int maxId = 0;*/

	@ParamDescription("施工许可证号")
	public String sGXKNum = "";/*350200201207030200*/

	@ParamDescription("单位名称")
	public String danWeiName = "";/*厦门俊煜*/

	@ParamDescription("统一社会信用代码")
	public String socialCreditCode = "";/*91430111MA4L16JQ9B*/

	@ParamDescription("单位类型【0 专业分包；1 总承包；3 建设； 4 监理；5 其他；6 劳务分包 】")
	public String sGType = "";

	@ParamDescription("账号")
	public String account = "";/*junyuceshi*/

	@ParamDescription("密码")
	public String password = "";/*jun123456*/
	
	@ParamDescription("班组入场时间 (yyyy-mm-dd)")
	public String time = "";/*2015-01-01*/
	
	@ParamDescription("人员进出同步起始ID")
	public String maxId = "0";

	

	public String getMaxId() {
		return maxId;
	}

	public void setMaxId(String maxId) {
		this.maxId = maxId;
	}

	public static synchronized SystemParameter getInstance() {
		if (instance == null) {
			instance = new SystemParameter();
		}
		return instance;
	}

	public String getSGXKNum() {
		return sGXKNum;
	}

	public void setSGXKNum(String sGXKNum) {
		this.sGXKNum = sGXKNum;
	}

	public String getDanWeiName() {
		return danWeiName;
	}

	public void setDanWeiName(String danWeiName) {
		this.danWeiName = danWeiName;
	}

	public String getSocialCreditCode() {
		return socialCreditCode;
	}

	public void setSocialCreditCode(String socialCreditCode) {
		this.socialCreditCode = socialCreditCode;
	}

	public String getSGType() {
		return sGType;
	}

	public void setSGType(String sGType) {
		this.sGType = sGType;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	private SystemParameter() {
	}

	public static void setMessage(String message) {
		int max = Integer.MAX_VALUE / 2;
		int length = SystemParameter.message.length();
		if (length > max) {
			SystemParameter.message = "";
		}
		SystemParameter.message = (message + "\\r\\n") + SystemParameter.message;
	}

}

package com.sync.common;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class ResqustModel {

	private String Account = SystemParameter.getInstance().account;
	private String Password = SystemParameter.getInstance().password;
	private String SGXKNum;
	private String DanWeiName;
	private String SocialCreditCode;
	private String SGType;
	private int MaxId;

	private List<Map<String, Object>> param;

	public String getAccount() {
		return Account;
	}

	public void setAccount(String account) {
		Account = account;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}

	public List<Map<String, Object>> getParam() {
		return param;
	}

	public void setParam(List<Map<String, Object>> param) {
		this.param = param;
	}

	public String getSGXKNum() {
		return SGXKNum;
	}

	public void setSGXKNum(String sGXKNum) {
		SGXKNum = sGXKNum;
	}

	public String getDanWeiName() {
		return DanWeiName;
	}

	public void setDanWeiName(String danWeiName) {
		DanWeiName = danWeiName;
	}

	public String getSocialCreditCode() {
		return SocialCreditCode;
	}

	public void setSocialCreditCode(String socialCreditCode) {
		SocialCreditCode = socialCreditCode;
	}

	public String getSGType() {
		return SGType;
	}

	public void setSGType(String sGType) {
		SGType = sGType;
	}

	public String toString() {
		String json = JSON.toJSONString(this);
		json = json.replace("account", "Account");
		json = json.replace("password", "Password");
		json = json.replace("sGXKNum", "SGXKNum");
		json = json.replace("danWeiName", "DanWeiName");
		json = json.replace("socialCreditCode", "SocialCreditCode");
		json = json.replace("sGType", "SGType");
		json = json.replace("maxId", "MaxId");
		return json;
	}

	public int getMaxId() {
		return MaxId;
	}

	public void setMaxId(int maxId) {
		MaxId = maxId;
	}

}

package com.sync.model;

import java.util.List;

import com.sync.common.SystemParameter;

public class Team {

	private static Team instance;
	public String sGXKNum = SystemParameter.getInstance().sGXKNum;
	public String danWeiName = "测试单位";
	public String socialCreditCode = "91430111MA4L16JQ9B";
	public int sGType = 0;
	public List<TeamDetail> param;

	private Team() {
	}

	public static synchronized Team getInstance() {
		if (instance == null) {
			instance = new Team();
		}
		return instance;
	}
}

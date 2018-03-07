package com.sync.common;

public class SqlUtils {

	/**
	 * 人员状态
	 * 
	 * @param originalField
	 * @param targetField
	 * @return
	 */
	public static String rYType(String originalField, String targetField) {
		return " case " + originalField + "  WHEN '施工人员' THEN '02'  WHEN '管理人员' THEN '01' END as " + targetField + ",";
	}

	/**
	 * 出入
	 * 
	 * @param originalField
	 * @param targetField
	 * @return
	 */
	public static String access(String originalField, String targetField) {
		return " case " + originalField + " WHEN '出' THEN '2' WHEN '进' THEN '1' END as " + targetField + ",";
	}

	/**
	 * 性别
	 * 
	 * @param originalField
	 * @param targetField
	 * @return
	 */
	public static String sex(String originalField, String targetField) {
		return " case " + originalField + " WHEN '男' THEN '0' WHEN '女' THEN '1' END as " + targetField + ",";
	}
}

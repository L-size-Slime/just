package com.sync.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtils {

	public static String currentTime() {
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 可以方便地修改日期格式
		return dateFormat.format(now);
	}
}

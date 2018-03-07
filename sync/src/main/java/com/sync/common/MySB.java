package com.sync.common;

public class MySB {

	private StringBuffer sb = new StringBuffer();

	public void append(String s) {
		sb.append(s + "\\r\\n");
	}

	public String toString() {
		return sb.toString();
	}
}

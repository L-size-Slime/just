package com.sync.converter;

import org.springframework.core.convert.converter.Converter;

public class ObjectConverter implements Converter<String, String> {

	public String convert(String source) {
		System.out.println(source);
		return source;
	}

}

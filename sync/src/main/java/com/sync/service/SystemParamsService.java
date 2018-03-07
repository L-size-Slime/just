package com.sync.service;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.sync.aop.InnerParam;
import com.sync.aop.ParamDescription;
import com.sync.common.BusinessSql;
import com.sync.common.SystemParameter;
import com.sync.model.SystemParams;

@Service
@Lazy(false)
public class SystemParamsService extends BaseService {

	@PostConstruct
	public void addSystemParmasToDb() {
		try {
			// 判断数据是否有值，有值不添加
			String selectSql = BusinessSql.systemParams();
			List<Map<String, Object>> map = this.excuteSql(selectSql);
			if (map != null && map.size() != 0) {
				String list = JSON.toJSONString(map);
				List<SystemParams> systemParams = JSONArray.parseArray(list, SystemParams.class);
				SystemParameter systemParameter = SystemParameter.getInstance();
				Field[] field = systemParameter.getClass().getDeclaredFields();
				for (int i = 0; i < field.length; i++) {
					String name = field[i].getName();
					// 反射赋值系统参数
					for (SystemParams systemParam : systemParams) {
						String text = systemParam.getText();
						if (name.equals(text)) {
							Object value = systemParam.getValue();
							name = name.substring(0, 1).toUpperCase() + name.substring(1);
							Method m = systemParameter.getClass().getMethod("get" + name);
							m = systemParameter.getClass().getMethod("set" + name, String.class);
							m.invoke(systemParameter, value);
						}
					}
				}
			} else {
				SystemParameter systemParameter = SystemParameter.getInstance();
				Field[] fields = systemParameter.getClass().getDeclaredFields();
				for (int i = 0; i < fields.length; i++) {
					Field field = fields[i];
					InnerParam innerParam = field.getAnnotation(InnerParam.class);
					if (innerParam != null) {
						continue;
					}
					if (field.getModifiers() <= 0) {
						continue;
					}
					String text = field.getName();
					String value = field.get(systemParameter).toString();
					ParamDescription description = field.getAnnotation(ParamDescription.class);
					String remark = description.value();
					String sql = BusinessSql.addSystemParams(text, value, remark);
					this.excuteEditSql(sql);
				}
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
	}
}

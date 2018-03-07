package com.sync.service;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.tempuri.PushGroupGoSoapProxy;
import org.tempuri.PushKaoQinSoapProxy;
import org.tempuri.PushWorkUserGoSoapProxy;
import org.tempuri.UserInfoSoapProxy;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sync.aop.InnerParam;
import com.sync.aop.ParamDescription;
import com.sync.common.ActionResult;
import com.sync.common.BusinessSql;
import com.sync.common.CommonUtils;
import com.sync.common.MySB;
import com.sync.common.ResqustModel;
import com.sync.common.SystemParameter;
import com.sync.common.TipsConstant;
import com.sync.model.SystemParams;

@Service
public class SyncService extends BaseService {

	public static Logger log = Logger.getLogger(SyncService.class);

	/**
	 * 人员
	 * 
	 * @return
	 */
	@Transactional
	public ActionResult persons() {
		try {
			ResqustModel resqustModel = new ResqustModel();
			String sql = BusinessSql.persons();
			List<Map<String, Object>> map = this.excuteSql(sql);
			resqustModel.setParam(map);
			String json = resqustModel.toString();
			UserInfoSoapProxy userInfoSoapProxy = new UserInfoSoapProxy();
			String result = userInfoSoapProxy.userInfoCode(json);
			ActionResult actionResult = analysisTheReturn(result, TipsConstant.PERSONSSUCESS, TipsConstant.PERSONS);
			if (!actionResult.isSuccess()) {
				log.error(TipsConstant.PERSONSFAILED.replace(TipsConstant.MSG, actionResult.getMsg()));
			} else {
				log.info(TipsConstant.PERSONSSUCESS);
			}
			return actionResult;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(TipsConstant.PERSONSFAILED);
			return ActionResult.failed(e.getMessage());
		}
	}

	/**
	 * 人员出入
	 * 
	 * @return
	 */
	@Transactional
	public ActionResult accessOfPersons() {
		try {
			ResqustModel resqustModel = new ResqustModel();
			String sGXKNum = SystemParameter.getInstance().sGXKNum;
			if (StringUtils.isEmpty(sGXKNum)) {
				log.error(TipsConstant.TIP3);
				return ActionResult.failed(TipsConstant.TIP3);
			}
			resqustModel.setSGXKNum(sGXKNum);
			String sql = BusinessSql.accessOfPersons();
			List<Map<String, Object>> map = this.excuteSql(sql);
			// 获取最大id
			int maxId = Integer.parseInt(SystemParameter.getInstance().maxId);// 当系统启动时，获取需要开始同步的id
			if (map.size() > 0) {
				maxId = (Integer) map.get(0).get("DCRID");// 获取最新的id
			} else {
				String noneMsg = CommonUtils.currentTime() + "--" + TipsConstant.NONE;
				SystemParameter.setMessage(noneMsg);
				SystemParameter.messagLog = noneMsg;
				log.info(noneMsg);
				return ActionResult.success(noneMsg);
			}
			resqustModel.setParam(map);
			String json = resqustModel.toString();
			PushKaoQinSoapProxy pushKaoQinSoapProxy = new PushKaoQinSoapProxy();
			String result = pushKaoQinSoapProxy.pushKaoQinCode(json);
			ActionResult actionResult = analysisTheReturn(result, TipsConstant.TIP2, TipsConstant.ACCESSOFPERSONS);
			SystemParameter.messagLog = actionResult.getMsg();
			if (!actionResult.isSuccess()) {
				log.error(TipsConstant.TIP4.replace(TipsConstant.MSG, actionResult.getMsg()));
			} else {
				SystemParameter.getInstance().setMaxId(String.valueOf(maxId));// 执行成功后把当前id作为最大id
				String editSql = BusinessSql.editSystemParams("maxId", String.valueOf(maxId));
				this.excuteEditSql(editSql);
				log.info(TipsConstant.TIP2);
			}
			return actionResult;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(TipsConstant.TIP4);
			return ActionResult.failed(e.getMessage());
		}
	}

	/**
	 * 更新施工许可证
	 * 
	 * @param sGXKNum
	 * @return
	 */
	public ActionResult sGXKNumUpdate(String sGXKNum) {
		try {
			if (StringUtils.isEmpty(sGXKNum)) {
				return ActionResult.failed(TipsConstant.TIP3);
			} else {
				SystemParameter.getInstance().sGXKNum = sGXKNum;
				log.info(TipsConstant.TIP5);
				return ActionResult.success();
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(TipsConstant.TIP6);
			return ActionResult.failed(e.getMessage());
		}
	}

	/**
	 * 解析结果
	 * 
	 * @param resultJson
	 * @return
	 */
	private ActionResult analysisTheReturn(String resultJson, String success, String model) {
		Object jsonObject = JSON.parse(resultJson);
		String currentTime = CommonUtils.currentTime() + "--";
		if (jsonObject instanceof JSONObject) {
			String message = currentTime + ((JSONObject) jsonObject).getString("returnMsg");
			SystemParameter.setMessage(message);
			return ActionResult.failed(message);
		} else {
			JSONArray jsonArray = (JSONArray) jsonObject;
			MySB sb = new MySB();
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject obj = jsonArray.getJSONObject(i);
				int returnCode = obj.getIntValue("returnCode");
				if (returnCode != 1) {
					String infoID = obj.getString("InfoID");
					String returnMsg = obj.getString("returnMsg");
					String errorInfo = getErrorInfo(model, infoID, returnMsg);
					sb.append(currentTime + errorInfo);
				}
			}
			String result = sb.toString();
			if (StringUtils.isEmpty(result)) {
				SystemParameter.setMessage(currentTime + success);
				return ActionResult.success(currentTime + success);
			} else {
				SystemParameter.setMessage(result);
				return ActionResult.failed(result);
			}

		}
	}

	/**
	 * 整合错误信息
	 * 
	 * @param name
	 * @return
	 */
	private String getErrorInfo(String name, String infoID, String returnMsg) {
		String errorInfo = name + "【唯一标识：" + infoID + "同步失败,错误原因：" + returnMsg + "】";
		return errorInfo;
	}

	/**
	 * 获取系统参数
	 * 
	 * @return
	 */
	public List<SystemParams> getSystemParameters1() {
		try {
			List<SystemParams> systemParams = new ArrayList<>();
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
				SystemParams systemParam = new SystemParams();
				systemParam.setText(field.getName());
				systemParam.setValue(field.get(systemParameter).toString());
				ParamDescription description = field.getAnnotation(ParamDescription.class);
				systemParam.setRemark(description.value());
				systemParams.add(systemParam);
			}

			return systemParams;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 获取系统参数
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getSystemParameters() {
		String sql = BusinessSql.systemParams();
		List<Map<String, Object>> map = this.excuteSql(sql);
		return map;
	}

	public ActionResult saveSystemParameters1(String list) {
		try {
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
			return ActionResult.success("保存成功");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}

		return ActionResult.failed("系统异常,请联系管理员");
	}

	@Transactional
	public ActionResult saveSystemParameters(String list) {
		try {
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
			for (SystemParams systemParam : systemParams) {
				String text = systemParam.getText();
				Object value = systemParam.getValue();
				String sql = BusinessSql.editSystemParams(text, String.valueOf(value));
				this.excuteEditSql(sql);
			}
			return ActionResult.success("保存成功");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ActionResult.failed("系统异常,请联系管理员");
	}

	/**
	 * 班组同步
	 * 
	 * @return
	 */
	public ActionResult team() {
		try {
			ResqustModel resqustModel = new ResqustModel();
			String sql = BusinessSql.team();
			List<Map<String, Object>> map = this.excuteSql(sql);
			SystemParameter systemParameter = SystemParameter.getInstance();
			// 参数
			resqustModel.setParam(map);
			resqustModel.setDanWeiName(systemParameter.danWeiName);
			resqustModel.setSGType(systemParameter.getSGType());
			resqustModel.setSGXKNum(systemParameter.getSGXKNum());
			resqustModel.setSocialCreditCode(systemParameter.socialCreditCode);
			String json = resqustModel.toString();
			PushGroupGoSoapProxy pushGroupGoSoapProxy = new PushGroupGoSoapProxy();
			String result = pushGroupGoSoapProxy.pushGroupGoCode(json);
			ActionResult actionResult = analysisTheReturn(result, TipsConstant.TEAMSSUCESS, TipsConstant.TEAM);
			if (!actionResult.isSuccess()) {
				log.error(TipsConstant.TEAMSFAILED.replace(TipsConstant.MSG, actionResult.getMsg()));
			} else {
				log.info(TipsConstant.TEAMSSUCESS);
			}
			return actionResult;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(TipsConstant.TEAMSFAILED);
			return ActionResult.failed(e.getMessage());
		}
	}

	/**
	 * 入场人员同步
	 * 
	 * @return
	 */
	public ActionResult teamPersons() {
		try {
			ResqustModel resqustModel = new ResqustModel();
			String sql = BusinessSql.teamPersons();
			List<Map<String, Object>> map = this.excuteSql(sql);
			SystemParameter systemParameter = SystemParameter.getInstance();
			// 参数
			resqustModel.setParam(map);
			resqustModel.setDanWeiName(systemParameter.danWeiName);
			resqustModel.setSGType(systemParameter.getSGType());
			resqustModel.setSGXKNum(systemParameter.getSGXKNum());
			resqustModel.setSocialCreditCode(systemParameter.socialCreditCode);
			String json = resqustModel.toString();
			PushWorkUserGoSoapProxy pushWorkUserGoSoapProxy = new PushWorkUserGoSoapProxy();
			String result = pushWorkUserGoSoapProxy.pushWorkUserGoCode(json);
			ActionResult actionResult = analysisTheReturn(result, TipsConstant.TEAMPERSONSSSUCESS,
					TipsConstant.TEAMPERSONS);
			if (!actionResult.isSuccess()) {
				log.error(TipsConstant.TEAMPERSONSFAILED.replace(TipsConstant.MSG, actionResult.getMsg()));
			} else {
				log.info(TipsConstant.TEAMPERSONSSSUCESS);
			}
			return actionResult;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(TipsConstant.TEAMPERSONSFAILED);
			return ActionResult.failed(e.getMessage());
		}
	}

}

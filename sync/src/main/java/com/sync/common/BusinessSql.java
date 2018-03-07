package com.sync.common;

public class BusinessSql {

	/**
	 * 员工出入
	 */
	public static String accessOfPersons() {
		StringBuffer sb = new StringBuffer();
		sb.append("select ");
		sb.append("b.DCRID,a.IDCard as UserIdendity,b.CrdDate as ShuaKaTime, ");
		sb.append(SqlUtils.rYType("a.ManageType", "RYType "));
		sb.append("0 as ISExitPic, 0 as IsTiGong, ");
		sb.append(SqlUtils.access("b.DptNO", "ShuaKaStatus "));
		sb.append("'' as capture,b.DCRID as InfoID ");
		sb.append("from DBrushRecordR b left join Employee a ");
		sb.append("on a.CardID = b.CardID ");
		sb.append("where a.CardID is not null and a.CardID <> ''");
		sb.append(" and DCRID > " + SystemParameter.getInstance().maxId);
		sb.append(" order by DCRID desc ");
		return sb.toString();
	}

	/**
	 * 人员基本信息
	 * 
	 * @return
	 */
	public static String persons() {
		StringBuffer sb = new StringBuffer();
		sb.append("select ");
		sb.append("t.EmpName as UserName,t.IDCard as UserIdendity, ");
		sb.append(SqlUtils.sex("t.Sex", "Sex"));
		sb.append("'' as JZName,");
		sb.append("t.Reserver5 as JYSP,'' as HYZK,t.Domicile_address as HJAddress, ");
		sb.append("t.workplace as Adress,");
		sb.append("t.Phone as AdressPhone,");
		sb.append("t.NationName as MingZu ");
		sb.append("from Employee t ");
		return sb.toString();
	}

	/**
	 * 班组
	 * 
	 * @return
	 */
	public static String team() {

		StringBuffer sb = new StringBuffer();
		sb.append("select t.DptName as GroupName, ");
		sb.append("t.DptMngr as FuZeRName, ");
		sb.append("'" + SystemParameter.getInstance().time + "' as RCDate, ");// 整个班组的入场时间
		sb.append("t.dptMangeManName as IDCard, ");
		sb.append("t.DptPhone as Tel, ");
		sb.append("t.DptID as OrderNum, ");
		sb.append("t.DptID as InfoID ");
		sb.append("from Department t");
		return sb.toString();
	}

	public static String teamPersons() {
		StringBuffer sb = new StringBuffer();
		sb.append("select ");
		sb.append("t.IDCard as UserIdendity, ");
		sb.append("d.DptName as GroupName, ");
		sb.append("0 as IsLeader, ");
		sb.append("SUBSTRING(t.Authorized_time, 0,11) as RCDate, ");// 人员入场时间，截取数据库中前10位
		sb.append("0 as SFPX, ");
		sb.append("'' as BeiZu, ");
		sb.append("0 as IsTiGong,");
		sb.append("t.CardID as InfoID ");
		sb.append("from Employee t ");
		sb.append("left join Department d on t.DptID = d.DptID ");
		sb.append("where t.CardID is not null and t.CardID <> ''");
		return sb.toString();
	}

	public static String systemParams() {
		return "select * from SYSTEMPARAMETER ";
	}

	public static String editSystemParams(String text, String value) {
		return "update t set t.[value] = '" + value + "' from SYSTEMPARAMETER t where t.[text] = '" + text + "'";
	}

	public static String addSystemParams(String text,String value,String remark) {
		return "INSERT INTO SYSTEMPARAMETER (text,value,remark) VALUES ('"+text+"','"+value+"','"+remark+"')";
	}
}

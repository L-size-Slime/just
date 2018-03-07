package com.sync.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

@Service
public class BaseService extends SqlSessionDaoSupport {
	protected Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
	
	public List<?> getPageList(String sqlId, Object sqlParameter, int pageIndex, int pageSize) throws Exception {
		if (pageIndex <= 0) {
			pageIndex = 1;
		}
		if (pageSize <= 0) {
			pageSize = 10;
		}
		PageBounds pageBounds = new PageBounds(pageIndex, pageSize);
		return this.getSqlSession().selectList(sqlId, sqlParameter, pageBounds);
	}
	
	public List<Map<String, Object>> excuteSql(String sql) {
		List<Map<String, Object>> result = this.getSqlSession().selectList("excuteSql", sql);
		return result;
	}
	
	public void excuteEditSql(String sql) {
		this.getSqlSession().selectList("excuteUpdateSql", sql);
	}
}

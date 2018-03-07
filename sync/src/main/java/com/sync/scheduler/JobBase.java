package com.sync.scheduler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.sync.service.SyncService;

public class JobBase {

	@Autowired
	SyncService syncService;

	private String jobName = "JobBase";

	protected Log logger = LogFactory.getLog(this.getClass());

	private String runFlag = "1";// 是否运行标示，0：不运行，1：运行。

	public String getRunFlag() {
		return runFlag;
	}

	public void setRunFlag(String runFlag) {
		this.runFlag = runFlag;
	}

	/**
	 * 定时执行的任务
	 * 
	 * @throws Exception
	 */
	public void execute() throws Exception {
		System.out.println("-------------------------------执行-----------------------------");
	}

	public void process() {
		logger.info("process");
	}

	public String getJobName() {
		return jobName;
	}

	public boolean getLogHistory() {
		return true;
	}
}

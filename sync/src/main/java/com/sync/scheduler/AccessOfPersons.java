package com.sync.scheduler;

public class AccessOfPersons extends JobBase {
	/**
	 * 定时执行的任务
	 */
	@Override
	public void process() {
		logger.info("AccessOfPersons Job Process");
	}

	/**
	 * 定时执行的任务
	 * 
	 * @throws Exception
	 */
	@Override
	public void execute() throws Exception {
		syncService.accessOfPersons();
	}

	@Override
	public String getJobName() {
		return "AccessOfPersons";
	}
}

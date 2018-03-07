package com.sync.scheduler;

public class DemoJob extends JobBase{
    /**
     * 定时执行的任务
     */
	@Override
    public void process() {
		logger.info("Demo Job Process");
    }
	
	@Override
	public String getJobName() {
		return "DemoJob";
	}
	
	/**
	 * 定时执行的任务
	 * 
	 * @throws Exception
	 */
	@Override
	public void execute() throws Exception {
		System.out.println("-----------------demo------------------");
	}
}

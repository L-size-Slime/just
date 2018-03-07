package org.tempuri;

public class PushGroupGoSoapProxy implements org.tempuri.PushGroupGoSoap {
  private String _endpoint = null;
  private org.tempuri.PushGroupGoSoap pushGroupGoSoap = null;
  
  public PushGroupGoSoapProxy() {
    _initPushGroupGoSoapProxy();
  }
  
  public PushGroupGoSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initPushGroupGoSoapProxy();
  }
  
  private void _initPushGroupGoSoapProxy() {
    try {
      pushGroupGoSoap = (new org.tempuri.PushGroupGoLocator()).getPushGroupGoSoap();
      if (pushGroupGoSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)pushGroupGoSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)pushGroupGoSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (pushGroupGoSoap != null)
      ((javax.xml.rpc.Stub)pushGroupGoSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public org.tempuri.PushGroupGoSoap getPushGroupGoSoap() {
    if (pushGroupGoSoap == null)
      _initPushGroupGoSoapProxy();
    return pushGroupGoSoap;
  }
  
  public java.lang.String pushGroupGoCode(java.lang.String json) throws java.rmi.RemoteException{
    if (pushGroupGoSoap == null)
      _initPushGroupGoSoapProxy();
    return pushGroupGoSoap.pushGroupGoCode(json);
  }
  
  
}
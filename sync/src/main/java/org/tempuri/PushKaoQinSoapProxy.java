package org.tempuri;

public class PushKaoQinSoapProxy implements org.tempuri.PushKaoQinSoap {
  private String _endpoint = null;
  private org.tempuri.PushKaoQinSoap pushKaoQinSoap = null;
  
  public PushKaoQinSoapProxy() {
    _initPushKaoQinSoapProxy();
  }
  
  public PushKaoQinSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initPushKaoQinSoapProxy();
  }
  
  private void _initPushKaoQinSoapProxy() {
    try {
      pushKaoQinSoap = (new org.tempuri.PushKaoQinLocator()).getPushKaoQinSoap();
      if (pushKaoQinSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)pushKaoQinSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)pushKaoQinSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (pushKaoQinSoap != null)
      ((javax.xml.rpc.Stub)pushKaoQinSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public org.tempuri.PushKaoQinSoap getPushKaoQinSoap() {
    if (pushKaoQinSoap == null)
      _initPushKaoQinSoapProxy();
    return pushKaoQinSoap;
  }
  
  public java.lang.String pushKaoQinCode(java.lang.String json) throws java.rmi.RemoteException{
    if (pushKaoQinSoap == null)
      _initPushKaoQinSoapProxy();
    return pushKaoQinSoap.pushKaoQinCode(json);
  }
  
  
}
package org.tempuri;

public class PushWorkUserGoSoapProxy implements org.tempuri.PushWorkUserGoSoap {
  private String _endpoint = null;
  private org.tempuri.PushWorkUserGoSoap pushWorkUserGoSoap = null;
  
  public PushWorkUserGoSoapProxy() {
    _initPushWorkUserGoSoapProxy();
  }
  
  public PushWorkUserGoSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initPushWorkUserGoSoapProxy();
  }
  
  private void _initPushWorkUserGoSoapProxy() {
    try {
      pushWorkUserGoSoap = (new org.tempuri.PushWorkUserGoLocator()).getPushWorkUserGoSoap();
      if (pushWorkUserGoSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)pushWorkUserGoSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)pushWorkUserGoSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (pushWorkUserGoSoap != null)
      ((javax.xml.rpc.Stub)pushWorkUserGoSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public org.tempuri.PushWorkUserGoSoap getPushWorkUserGoSoap() {
    if (pushWorkUserGoSoap == null)
      _initPushWorkUserGoSoapProxy();
    return pushWorkUserGoSoap;
  }
  
  public java.lang.String pushWorkUserGoCode(java.lang.String json) throws java.rmi.RemoteException{
    if (pushWorkUserGoSoap == null)
      _initPushWorkUserGoSoapProxy();
    return pushWorkUserGoSoap.pushWorkUserGoCode(json);
  }
  
  
}
package org.tempuri;

public class UserInfoSoapProxy implements org.tempuri.UserInfoSoap {
  private String _endpoint = null;
  private org.tempuri.UserInfoSoap userInfoSoap = null;
  
  public UserInfoSoapProxy() {
    _initUserInfoSoapProxy();
  }
  
  public UserInfoSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initUserInfoSoapProxy();
  }
  
  private void _initUserInfoSoapProxy() {
    try {
      userInfoSoap = (new org.tempuri.UserInfoLocator()).getUserInfoSoap();
      if (userInfoSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)userInfoSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)userInfoSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (userInfoSoap != null)
      ((javax.xml.rpc.Stub)userInfoSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public org.tempuri.UserInfoSoap getUserInfoSoap() {
    if (userInfoSoap == null)
      _initUserInfoSoapProxy();
    return userInfoSoap;
  }
  
  public java.lang.String userInfoCode(java.lang.String json) throws java.rmi.RemoteException{
    if (userInfoSoap == null)
      _initUserInfoSoapProxy();
    return userInfoSoap.userInfoCode(json);
  }
  
  
}
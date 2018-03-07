/**
 * UserInfoLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class UserInfoLocator extends org.apache.axis.client.Service implements org.tempuri.UserInfo {

    public UserInfoLocator() {
    }


    public UserInfoLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public UserInfoLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for UserInfoSoap
    private java.lang.String UserInfoSoap_address = "http://202.109.255.72:8081/XMDJGInterface/Pages/SMZ/UserInfo/UserInfo.asmx";

    public java.lang.String getUserInfoSoapAddress() {
        return UserInfoSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String UserInfoSoapWSDDServiceName = "UserInfoSoap";

    public java.lang.String getUserInfoSoapWSDDServiceName() {
        return UserInfoSoapWSDDServiceName;
    }

    public void setUserInfoSoapWSDDServiceName(java.lang.String name) {
        UserInfoSoapWSDDServiceName = name;
    }

    public org.tempuri.UserInfoSoap getUserInfoSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(UserInfoSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getUserInfoSoap(endpoint);
    }

    public org.tempuri.UserInfoSoap getUserInfoSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tempuri.UserInfoSoapStub _stub = new org.tempuri.UserInfoSoapStub(portAddress, this);
            _stub.setPortName(getUserInfoSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setUserInfoSoapEndpointAddress(java.lang.String address) {
        UserInfoSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (org.tempuri.UserInfoSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tempuri.UserInfoSoapStub _stub = new org.tempuri.UserInfoSoapStub(new java.net.URL(UserInfoSoap_address), this);
                _stub.setPortName(getUserInfoSoapWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("UserInfoSoap".equals(inputPortName)) {
            return getUserInfoSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://tempuri.org/", "UserInfo");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "UserInfoSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("UserInfoSoap".equals(portName)) {
            setUserInfoSoapEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}

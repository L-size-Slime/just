/**
 * PushWorkUserGoLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class PushWorkUserGoLocator extends org.apache.axis.client.Service implements org.tempuri.PushWorkUserGo {

    public PushWorkUserGoLocator() {
    }


    public PushWorkUserGoLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public PushWorkUserGoLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for PushWorkUserGoSoap
    private java.lang.String PushWorkUserGoSoap_address = "http://202.109.255.72:8081/XMDJGInterface/Pages/SMZ/GroupUser/GroupWorkUser/PushWorkUserGo.asmx";

    public java.lang.String getPushWorkUserGoSoapAddress() {
        return PushWorkUserGoSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String PushWorkUserGoSoapWSDDServiceName = "PushWorkUserGoSoap";

    public java.lang.String getPushWorkUserGoSoapWSDDServiceName() {
        return PushWorkUserGoSoapWSDDServiceName;
    }

    public void setPushWorkUserGoSoapWSDDServiceName(java.lang.String name) {
        PushWorkUserGoSoapWSDDServiceName = name;
    }

    public org.tempuri.PushWorkUserGoSoap getPushWorkUserGoSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(PushWorkUserGoSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getPushWorkUserGoSoap(endpoint);
    }

    public org.tempuri.PushWorkUserGoSoap getPushWorkUserGoSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tempuri.PushWorkUserGoSoapStub _stub = new org.tempuri.PushWorkUserGoSoapStub(portAddress, this);
            _stub.setPortName(getPushWorkUserGoSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setPushWorkUserGoSoapEndpointAddress(java.lang.String address) {
        PushWorkUserGoSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (org.tempuri.PushWorkUserGoSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tempuri.PushWorkUserGoSoapStub _stub = new org.tempuri.PushWorkUserGoSoapStub(new java.net.URL(PushWorkUserGoSoap_address), this);
                _stub.setPortName(getPushWorkUserGoSoapWSDDServiceName());
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
        if ("PushWorkUserGoSoap".equals(inputPortName)) {
            return getPushWorkUserGoSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://tempuri.org/", "PushWorkUserGo");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "PushWorkUserGoSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("PushWorkUserGoSoap".equals(portName)) {
            setPushWorkUserGoSoapEndpointAddress(address);
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

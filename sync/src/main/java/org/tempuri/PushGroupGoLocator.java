/**
 * PushGroupGoLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class PushGroupGoLocator extends org.apache.axis.client.Service implements org.tempuri.PushGroupGo {

    public PushGroupGoLocator() {
    }


    public PushGroupGoLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public PushGroupGoLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for PushGroupGoSoap
    private java.lang.String PushGroupGoSoap_address = "http://202.109.255.72:8081/XMDJGInterface/Pages/SMZ/Group/PushGroupGo.asmx";

    public java.lang.String getPushGroupGoSoapAddress() {
        return PushGroupGoSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String PushGroupGoSoapWSDDServiceName = "PushGroupGoSoap";

    public java.lang.String getPushGroupGoSoapWSDDServiceName() {
        return PushGroupGoSoapWSDDServiceName;
    }

    public void setPushGroupGoSoapWSDDServiceName(java.lang.String name) {
        PushGroupGoSoapWSDDServiceName = name;
    }

    public org.tempuri.PushGroupGoSoap getPushGroupGoSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(PushGroupGoSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getPushGroupGoSoap(endpoint);
    }

    public org.tempuri.PushGroupGoSoap getPushGroupGoSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tempuri.PushGroupGoSoapStub _stub = new org.tempuri.PushGroupGoSoapStub(portAddress, this);
            _stub.setPortName(getPushGroupGoSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setPushGroupGoSoapEndpointAddress(java.lang.String address) {
        PushGroupGoSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (org.tempuri.PushGroupGoSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tempuri.PushGroupGoSoapStub _stub = new org.tempuri.PushGroupGoSoapStub(new java.net.URL(PushGroupGoSoap_address), this);
                _stub.setPortName(getPushGroupGoSoapWSDDServiceName());
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
        if ("PushGroupGoSoap".equals(inputPortName)) {
            return getPushGroupGoSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://tempuri.org/", "PushGroupGo");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "PushGroupGoSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("PushGroupGoSoap".equals(portName)) {
            setPushGroupGoSoapEndpointAddress(address);
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

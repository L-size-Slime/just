/**
 * PushKaoQinLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class PushKaoQinLocator extends org.apache.axis.client.Service implements org.tempuri.PushKaoQin {

	public PushKaoQinLocator() {
	}

	public PushKaoQinLocator(org.apache.axis.EngineConfiguration config) {
		super(config);
	}

	public PushKaoQinLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName)
			throws javax.xml.rpc.ServiceException {
		super(wsdlLoc, sName);
	}

	// Use to get a proxy class for PushKaoQinSoap
	private java.lang.String PushKaoQinSoap_address = "http://202.109.255.72:8081/XMDJGInterface/Pages/SMZ/KaoQin/PushKaoQin.asmx";

	public java.lang.String getPushKaoQinSoapAddress() {
		return PushKaoQinSoap_address;
	}

	// The WSDD service name defaults to the port name.
	private java.lang.String PushKaoQinSoapWSDDServiceName = "PushKaoQinSoap";

	public java.lang.String getPushKaoQinSoapWSDDServiceName() {
		return PushKaoQinSoapWSDDServiceName;
	}

	public void setPushKaoQinSoapWSDDServiceName(java.lang.String name) {
		PushKaoQinSoapWSDDServiceName = name;
	}

	public org.tempuri.PushKaoQinSoap getPushKaoQinSoap() throws javax.xml.rpc.ServiceException {
		java.net.URL endpoint;
		try {
			endpoint = new java.net.URL(PushKaoQinSoap_address);
		} catch (java.net.MalformedURLException e) {
			throw new javax.xml.rpc.ServiceException(e);
		}
		return getPushKaoQinSoap(endpoint);
	}

	public org.tempuri.PushKaoQinSoap getPushKaoQinSoap(java.net.URL portAddress)
			throws javax.xml.rpc.ServiceException {
		try {
			org.tempuri.PushKaoQinSoapStub _stub = new org.tempuri.PushKaoQinSoapStub(portAddress, this);
			_stub.setPortName(getPushKaoQinSoapWSDDServiceName());
			return _stub;
		} catch (org.apache.axis.AxisFault e) {
			return null;
		}
	}

	public void setPushKaoQinSoapEndpointAddress(java.lang.String address) {
		PushKaoQinSoap_address = address;
	}

	/**
	 * For the given interface, get the stub implementation. If this service has
	 * no port for the given interface, then ServiceException is thrown.
	 */
	public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
		try {
			if (org.tempuri.PushKaoQinSoap.class.isAssignableFrom(serviceEndpointInterface)) {
				org.tempuri.PushKaoQinSoapStub _stub = new org.tempuri.PushKaoQinSoapStub(
						new java.net.URL(PushKaoQinSoap_address), this);
				_stub.setPortName(getPushKaoQinSoapWSDDServiceName());
				return _stub;
			}
		} catch (java.lang.Throwable t) {
			throw new javax.xml.rpc.ServiceException(t);
		}
		throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  "
				+ (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
	}

	/**
	 * For the given interface, get the stub implementation. If this service has
	 * no port for the given interface, then ServiceException is thrown.
	 */
	public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface)
			throws javax.xml.rpc.ServiceException {
		if (portName == null) {
			return getPort(serviceEndpointInterface);
		}
		java.lang.String inputPortName = portName.getLocalPart();
		if ("PushKaoQinSoap".equals(inputPortName)) {
			return getPushKaoQinSoap();
		} else {
			java.rmi.Remote _stub = getPort(serviceEndpointInterface);
			((org.apache.axis.client.Stub) _stub).setPortName(portName);
			return _stub;
		}
	}

	public javax.xml.namespace.QName getServiceName() {
		return new javax.xml.namespace.QName("http://tempuri.org/", "PushKaoQin");
	}

	private java.util.HashSet ports = null;

	public java.util.Iterator getPorts() {
		if (ports == null) {
			ports = new java.util.HashSet();
			ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "PushKaoQinSoap"));
		}
		return ports.iterator();
	}

	/**
	 * Set the endpoint address for the specified port name.
	 */
	public void setEndpointAddress(java.lang.String portName, java.lang.String address)
			throws javax.xml.rpc.ServiceException {

		if ("PushKaoQinSoap".equals(portName)) {
			setPushKaoQinSoapEndpointAddress(address);
		} else { // Unknown Port Name
			throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
		}
	}

	/**
	 * Set the endpoint address for the specified port name.
	 */
	public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address)
			throws javax.xml.rpc.ServiceException {
		setEndpointAddress(portName.getLocalPart(), address);
	}

}

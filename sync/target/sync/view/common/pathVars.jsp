<%@page contentType="text/html; charset=utf-8"%>
<%@page trimDirectiveWhitespaces="true"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}"	scope="request" />
<c:set var="version" value="<%=(new java.util.Date()).toString()%>"	scope="request" />
<script type="text/javascript">
	var App_Config = {
		contextPath :"${contextPath}"
	};
</script>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<body>
	<jsp:include page="/view/common/pathVars.jsp" />
	<jsp:include page="/view/common/resource.jsp" />
	<h2>Hello World!</h2>
	<script type="text/javascript">
		com.ajax({
			url : com.url('/sync/carsync.do'),
			success : function(data) {
				alert(data);
			}
		})
	</script>
</body>
</html>

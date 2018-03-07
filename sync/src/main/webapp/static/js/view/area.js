var selectprovinceid="0";
var selectcityid="0";
var selectcountyid="0";
var selecttownyid="0";

function ChangeProvince() {
		if (selectprovinceid != "0") {
			$("#provinceId").val(selectprovinceid);
		}
		selectprovinceid = "0";
	
		var provinceId = $("#provinceId").val();
		if(provinceId!=null&&provinceId!=""&&provinceId!="0"){
			com.ajax({
				url : '/city/loadCity?id=' + provinceId,
				success : function(d) {
					$("#cityId").empty();
					$("#countyId").empty();
					
					if(d!=undefined && d.length>0){
						$.each(d, function(i, item) {
							$("#cityId").append("<option value='"+item.id+"'>" + item.cityName + "</option>");
						});	
					}
					ChangeCity();
				}

			});
		}
	
	}
function ChangeCity() {
		if (selectcityid != "0") {
			$("#cityId").val(selectcityid);
		}
		selectcityid = "0";
		var cityId = $("#cityId").val();
		com.ajax({
			url : '/county/loadCounty?id=' + cityId,
			success : function(d) {
				$("#countyId").empty();
				if(d!=undefined && d.length>0){
					$.each(d, function(i, item) {
						$("#countyId").append("<option value='"+item.id+"'>" + item.countyName+ "</option>");
					});
				}

				if (selectcountyid != "0") {
					$("#countyId").val(selectcountyid);
				}
				ChangeCounty();
				selectcountyid = "0";
				
			}

		});
	}
function ChangeCounty() {
		if (selectcountyid != "0") {
			$("#countyId").val(selectcountyid);
		}
		selectcountyid = "0";
		var countyId = $("#countyId").val();
		com.ajax({
			url : '/town/loadTown?id=' + countyId,
			success : function(d) {
				$("#townId").empty();
				
				if(d!=undefined && d.length>0){
					$.each(d, function(i, item) {
						$("#townId").append("<option value='"+item.id+"'>" + item.townName + "</option>");
					});
				}

				if (selecttownyid != "0") {
					$("#townId").val(selecttownyid);
				}
				selecttownyid = "0";
			}

		});
	}
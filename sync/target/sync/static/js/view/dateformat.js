	
//yyyyMMdd
function dateFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+''+(m<10?('0'+m):m) + '' +(d<10?('0'+d):d);
}
//yyyyMMdd
function dateParser(s){
	if (!s) return new Date();
	var y = parseInt(s.substring(0,4),10);
	var m = parseInt(s.substring(4,6),10);
	var d = parseInt(s.substring(6,8),10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}
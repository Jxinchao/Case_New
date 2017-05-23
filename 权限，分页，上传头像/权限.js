$(function(){
	if(sessionStorage.use){
		$("#use").html(sessionStorage.use);
		$.ajax({
			url:"http://192.168.43.119:8005/usedata/getroot?name="+sessionStorage.use
			,type:"get"
			,success:function(req){
				if(req.flag==1){
					localStorage.root="root"
				}else if(req.flag==2){
					localStorage.root="not_root"
				}else{
					alert("root“Ï≥£")
				}
			}
			,error:function(){
				
			}
		})

	}else{
		alert("«Îµ«¬º”√ªß£°")
		location.href="login.html"
	}
})


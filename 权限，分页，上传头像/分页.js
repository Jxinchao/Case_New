//�б�չʾajax
$(function(){
	var str='';
	function content(data){
		$.each(data,function(index,el){//index���±�   el��ÿһ��
			var num=el._number;
			var b=num.toString().length;
			if (b==1) {
				num="000"+num
			}else if(b==2){
				num="00"+num
			}else if(b==3){
				num="0"+num
			}
    		str+='<tr class="text-c">'+
			  '<td>'+num+'</td>'+
			  '<td><a class="detail" index='+el.id+' _href="product-list.html">'+el.uname+'</a></td>'+
			  '<td>'+el.age+'</td>'+  
			  '<td>'+el.job+'</td>'+
			  '<td>'+el.tel+'</td>'+
			  '<td>'+el.enterTime+'</td>'+
			  '<td class="td-status"><span class="label label-'+(el.typeperson==1?"success":"error")+' radius">'+(el.typeperson==1?"��ת��":"������")+'</span></td>'+
			  '<td class="td-manage"><a style="text-decoration:none" onClick="admin_'+(el.typeperson==0?"start":"stop")+'(this,'+el.id+')" href="javascript:;" title="ͣ��"><i class="Hui-iconfont">&#xe631;</i></a> <a title="�༭" href="javascript:;" class="ml-5 change" bb='+el.id+' style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a> <a title="ɾ��" href="javascript:;" onclick="admin_del(this,'+el.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>'+
		    '</tr>'		
    	})
	}
	function bindEvent(){
		$(".detail").click(function(){
    		
    		if(localStorage.root=="root"){
    			sessionStorage.id=$(this).attr("index");
    			
    			$(this).attr("href",$(this).attr("_href"));
    		}else{
    			alert("�����ǹ���Ա")
    		}
    	})
		
		$(".change").click(function(){
			if(localStorage.root=="root"){
	    		sessionStorage.yjx=$(this).attr("bb");	    		
	    		admin_edit("����Ա�༭","admin_xiugai.html","1","800","500")
    		}else{
    			alert("�����ǹ���Ա")
    		}
    	})
	}
	$.ajax({
		url:"http://192.168.43.119:8005/usedata/userinfo?pageNum=1",
		type:"get",
	    success:function(e){
	    	
		    	str="";
		    	content(e.data);
		    	$(".aa").html(str)
		    	$("#numtotal").html(e.total)
					$(".page_div1").paging({
		                total:e.pagetotal     //�ܹ�����ҳ
		                ,showJump: true			//�Ƿ���ʾ��ת	
		                ,url: "http://192.168.43.119:8005/usedata/userinfo"     //ajax����·��
		                ,submitType: "get"      //ajax����ʽ
		                ,idParameter: "pageNum" //url������
	                    ,dataOperate: function oprate(reqs) {   //ajax��������
	                        str="";
	                        content(reqs.data);
		    				$(".aa").html(str);
		    				bindEvent();
	                	}
		            });
		    
	    },
	    complete:function(){
	    	bindEvent();
	    },
	    error:function(){
	    	console.log("����ʧ��")
	    }
		
	})
	
	$(".text-c>input").get(0).oninput=function(){
		var _val = $("#search").val();
			$.ajax({
				url:"http://192.168.43.119:8005/usedata/search?name="+_val,
				type:"get",
				success:function(e){
					if(e.length<=0){
						$(".aa").html("");
						$(".page_div1").css("opacity","0")
					}else{
						$(".aa").html("");
						var _search=''	
				    	$.each(e,function(index,el){//index���±�   el��ÿһ��
							var num=el._number;
							var b=num.toString().length;
							if (b==1) {
								num="000"+num
							}else if(b==2){
								num="00"+num
							}else if(b==3){
								num="0"+num
							}
				    		_search+='<tr class="text-c">'+
							  '<td>'+num+'</td>'+
							  '<td><a class="detail" index='+el.id+' _href="product-list.html">'+el.uname+'</a></td>'+
							  '<td>'+el.age+'</td>'+
							  '<td>'+el.job+'</td>'+
							  '<td>'+el.tel+'</td>'+
							  '<td>'+el.enterTime+'</td>'+
							  '<td class="td-status"><span class="label label-'+(el.typeperson==1?"success":"error")+' radius">'+(el.typeperson==1?"��ת��":"������")+'</span></td>'+
							  '<td class="td-manage"><a style="text-decoration:none" onClick="admin_'+(el.typeperson==0?"start":"stop")+'(this,'+el.id+')" href="javascript:;" title="ͣ��"><i class="Hui-iconfont">&#xe631;</i></a> <a title="�༭" href="javascript:;" class="ml-5 change" bb='+el.id+' style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a> <a title="ɾ��" href="javascript:;" onclick="admin_del(this,'+el.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>'+
						    '</tr>'		
				    	});
			    		$(".aa").append(_search);
			   	 	}
				},
				complete:function(){
					bindEvent();
				},
				error:function(){
					alert("!error");
				}
			})
	}
})
//列表展示ajax
$(function(){
	var str='';
	function content(data){
		$.each(data,function(index,el){//index是下标   el是每一项
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
			  '<td class="td-status"><span class="label label-'+(el.typeperson==1?"success":"error")+' radius">'+(el.typeperson==1?"已转正":"试用期")+'</span></td>'+
			  '<td class="td-manage"><a style="text-decoration:none" onClick="admin_'+(el.typeperson==0?"start":"stop")+'(this,'+el.id+')" href="javascript:;" title="停用"><i class="Hui-iconfont">&#xe631;</i></a> <a title="编辑" href="javascript:;" class="ml-5 change" bb='+el.id+' style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a> <a title="删除" href="javascript:;" onclick="admin_del(this,'+el.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>'+
		    '</tr>'		
    	})
	}
	function bindEvent(){
		$(".detail").click(function(){
    		
    		if(localStorage.root=="root"){
    			sessionStorage.id=$(this).attr("index");
    			
    			$(this).attr("href",$(this).attr("_href"));
    		}else{
    			alert("您不是管理员")
    		}
    	})
		
		$(".change").click(function(){
			if(localStorage.root=="root"){
	    		sessionStorage.yjx=$(this).attr("bb");	    		
	    		admin_edit("管理员编辑","admin_xiugai.html","1","800","500")
    		}else{
    			alert("您不是管理员")
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
		                total:e.pagetotal     //总共多少页
		                ,showJump: true			//是否显示跳转	
		                ,url: "http://192.168.43.119:8005/usedata/userinfo"     //ajax请求路径
		                ,submitType: "get"      //ajax请求方式
		                ,idParameter: "pageNum" //url传参名
	                    ,dataOperate: function oprate(reqs) {   //ajax返回数据
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
	    	console.log("请求失败")
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
				    	$.each(e,function(index,el){//index是下标   el是每一项
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
							  '<td class="td-status"><span class="label label-'+(el.typeperson==1?"success":"error")+' radius">'+(el.typeperson==1?"已转正":"试用期")+'</span></td>'+
							  '<td class="td-manage"><a style="text-decoration:none" onClick="admin_'+(el.typeperson==0?"start":"stop")+'(this,'+el.id+')" href="javascript:;" title="停用"><i class="Hui-iconfont">&#xe631;</i></a> <a title="编辑" href="javascript:;" class="ml-5 change" bb='+el.id+' style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a> <a title="删除" href="javascript:;" onclick="admin_del(this,'+el.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>'+
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
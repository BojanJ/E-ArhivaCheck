<@processJsonModel group="share"/>

<@script type="text/javascript" src="${url.context}/res/jquery/jquery-1.6.2-min.js"/>
<style>
.my-template-widget {
    width: 320px !important;
    margin-left: 70px;
}

.my-template-controls {
	padding: 1em;
	
}

.my-template-controls td {
	padding: 1em;
	
}
</style>
<script type="text/javascript">
	function getRegs(){
		xmlHttp = GetHttpObject();
		var url = Alfresco.constants.PROXY_URI + "/neocom/get-all-registry-books.json";
		xmlHttp.onreadystatechange = checkRegistry;
		xmlHttp.open("GET", url, true, "admin", "admin");
		xmlHttp.send(null);
	}
	getRegs();

	var regs = [];
	function checkRegistry(){
		if(xmlHttp.readyState == 4){
			if(xmlHttp.status == 200 && xmlHttp.status < 300){
				var obj = eval('(' + xmlHttp.responseText + ')');
				regs = obj.registries;
			}
		}
	}

	$(function(){
		$("#form").submit(function(){
			var registryInput = $("#registryInput").val();
			if(regs.length <= 0){
				 return true;
			}else{
				for(var i=0; i<regs.length; i++){
					 if(regs[i].name == registryInput){
					 	alert("Внесениот деловодник веќе постои!");
					 	return false;
					 }
				}
			}
		});
	});

	function GetHttpObject(){
		var xmlHttp = null;
		try{
			xmlHttp = new XMLHttpRequest();
		}catch(e){
			try{
				xmlHttp = new ActiveXObject("Msxm12.XMLHTTP");
			}catch(e){
				try{
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					alert("Your browser does not support AJAX!");
					return false;
				}
			}
		}
		return xmlHttp;
	}


</script>
<form action="${url.service}" id="form" method="post" enctype="multipart/form-data" accept-charset="utf-8">
<!--<form action="/share/page/dp/ws/create-registry" method="post" enctype="multipart/form-data" accept-charset="utf-8">	 -->
	<div class="dashlet my-template-widget">
		<div class="title">Деловодник</div>
		<div class="my-template-controls">
			<table>
				<tr>
					<td>
						Наслов:
					</td>
					<td>
						<input id="registryInput" type="text" name="title" required="required" placeholder="пр. Деловодник 2014" oninvalid="setCustomValidity('Насловот е задолжителен!')" onchange="try{setCustomValidity('')}catch(e){}" />
					</td>
				</tr>
				<tr>
					<td>
						Година:
					</td>
					<td>
						<input type="text" name="year" pattern="\d{4}" required="required" placeholder="пр. 2014" oninvalid="setCustomValidity('Годината содржи 4 цифри!')" onchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
				</tr>
				<tr>
					<td>
						Активен:
					</td>
					<td>
						<input type="checkbox" name="active" checked />
					</td>
				</tr>
				<tr>
					<td>
						
					</td>
					<td>		
						<input id="btnSubmit" type="submit" value="Додади" id="btn_submit" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>

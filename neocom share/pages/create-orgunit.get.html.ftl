<@processJsonModel group="share"/>

<@script type="text/javascript" src="${url.context}/res/jquery/jquery-1.6.2-min.js"/>
<style>
.my-template-widget {
    width: 400px !important;
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
	
	function getHttpObject(){
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

	function getOrgUnits(){
		xmlHttp = getHttpObject();
		var url = Alfresco.constants.PROXY_URI + "/neocom/get-org-unit.json";
		xmlHttp.onreadystatechange = checkOrgUnits;
		xmlHttp.open("GET", url, true, "admin", "admin");
		xmlHttp.send(null);
	}
	getOrgUnits();

	var listUnits = [];
	function checkOrgUnits(){
		if(xmlHttp.readyState == 4){
			if(xmlHttp.status == 200 && xmlHttp.status <300){
				var obj = eval('(' + xmlHttp.responseText + ')');
				listUnits = obj.orgunits;
			}
		}
	}

$(function(){
	$("#formOrgUnit").submit(function(){
		var txtUnit = $("#txtOrgunit").val();

		if(listUnits.length > 0){
			for(var i=0; i<listUnits.length; i++){
				if(listUnits[i].name == txtUnit){
					alert("Внесената oрганизациона  единица постои!");
					return false;
				}
			}
		}
	});
});

</script>

<form id="formOrgUnit" action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8">
	<div class="dashlet my-template-widget">
		<div class="title">Организациона единица</div>
		<div class="my-template-controls">
			<table>
				<tr>
					<td>
						Организациона единица:
					</td>
					<td>
						<input id="txtOrgunit" type="text" name="orgunit" required="required" placeholder="пр. 01" oninvalid="setCustomValidity('Организационата единица е задолжителена!')" onchange="try{setCustomValidity('')}catch(e){}" />
					</td>
				</tr>
				<tr>
					<td>
						Назив:
					</td>
					<td>
						<input type="text" name="title" required="required" oninvalid="setCustomValidity('Внесете назив на орг. единица!')" onchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
				</tr>
				<tr>
					<td>
						Време на чување:
					</td>
					<td>
						<input type="text" name="expireMonths" required="required" oninvalid="setCustomValidity('Внесете време на чување!')" onchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
				</tr>
				<tr>
					<td>
						Групи:
					</td>
					<td>
						<input type="text" name="groups" required="required" oninvalid="setCustomValidity('Внесете група!')" onchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
				</tr>				
				<tr>
					<td>
						
					</td>
					<td>
						<input type="submit" value="Додади" id="btn_submit" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>

<@processJsonModel group="share"/>
<!-- link calendar resources-->
<@script type="text/javascript" src="${url.context}/res/jquery/jquery-1.11.2.min.js"/>
<@link rel="stylesheet" type="text/css" href="${url.context}/res/js/neocom/SimpleCalendar/tcal.css"/>
<@script type="text/javascript" src="${url.context}/res/js/neocom/SimpleCalendar/tcal_mk.js"/>

<@link rel="stylesheet" type="text/css" href="${url.context}/res/js/neocom/dist/css/select2.min.css"/>
<@script type="text/javascript" src="${url.context}/res/js/neocom/dist/js/select2.min.js"/>
<style>
.my-template-widget {
   
    margin-left: 70px;
    width: 477px !important;
}

.my-template-controls {
	padding: 1em;
}

.my-template-controls td {
	padding: 1em;
}

.controls {
	width:194px !important;
}

.dropdowns {
	width: 250px !important;
}

.tcal {
	width: 244px !important;
}

.color-blue {
	color: blue;
	margin-left: 10px;
}

.select2-container--default .select2-selection--single .select2-selection__rendered{
	height: 23px;
}
</style>

<script type="text/javascript">

		function getNodeRef(input)
	{
		var parts = input.split('Node Ref: ');
		return parts[1];
	}

	function create(){
		localStorage.node = "session";

		var dateFrom = document.getElementById("dateFrom").value;
		var dateTo = document.getElementById("dateTo").value;

		var node = document.getElementById("registry_book").value;
		var nodeRef = getNodeRef(node);
		var orgUnt = document.getElementById("orgunit").value;

		sessionStorage.nodeRef = nodeRef;
		sessionStorage.orgUnt = orgUnt;
		sessionStorage.dateFrom = dateFrom;
		sessionStorage.dateTo = dateTo;

		window.location  = "delivery-book";
	}

	$(document).ready(function(){
		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + "neocom/get-org-unit.json";//+nodeRef+"&format=json";

		xmlHttp.onreadystatechange = stateChangedOrgUnit;
		xmlHttp.open("GET",url,true,"admin","admin");
		xmlHttp.send(null);
	});


	function stateChangedOrgUnit(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var objr = eval ("(" + xmlHttp.responseText + ")");
				FunctionOrgOnit(objr.orgunits);
			}
		}
	}

	var dataOrgUnit = [];
	function FunctionOrgOnit(objr){

		var out="<option value=''>Изберете орг. единица</option>";
		for(var i=0; i<objr.length; i++){
			dataOrgUnit.push({
				'id' : objr[i].nodeRef,
				'text' : objr[i].name +" - "+objr[i].title
			});
			out += '<option value="' + objr[i].name + '">' + objr[i].name +' - '+ objr[i].title + '</option>';
		}

		document.getElementById("orgunit").innerHTML = out;
		$("#orgunit").select2({
		  data: dataOrgUnit
		})
		dataOrgUnit = [];
	}


	function GetXMLHttpObject()
	{
		var xmlHttp=null;
		try
		{
			xmlHttp=new XMLHttpRequest();
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e)
				{
					alert("Your browser does not support AJAX!");
					return false;
				}
			}
		}
		
		return xmlHttp;
	}



</script>

 
<form action="create-report" id="myForm" method="post" enctype="multipart/form-data" accept-charset="utf-8">

	<div class="dashlet my-template-widget">
		<div class="title">Деловодник</div>
		<div class="my-template-controls">



			<table>
				<tr>
					<td>Деловодник</td>
					<td>
						<select id="registry_book" name="registry_book" class="dropdowns">
							<#list getAllRegistries as child>
								<option value='${child.nodeRef}'>${child.name}</option>
							</#list>
						</select>
					</td>
				</tr>
				<tr>
					<td>Организициона единица</td>
					<td>
						<select id="orgunit" name="orgunit" class="dropdowns" >
						</select>
					</td>
				</tr>
				<tr>
					<td>Датум од</td>
					<td>
						<input id="dateFrom" type="text" name="date_archived" class="tcal" autocomplete="off">
					</td>
				</tr>
				<tr>
					<td>Датум до</td>
					<td>
						<input id="dateTo" type="text" name="date_archived" class="tcal" autocomplete="off" >
					</td>	
				</tr>
				<tr>
					<td></td>
					<td>
						<button type="button" value="Генерирај" id="btnSelectRegister" onClick="create()"> Креирај </button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>

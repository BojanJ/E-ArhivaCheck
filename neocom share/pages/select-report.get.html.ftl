<@processJsonModel group="share"/>
<!-- link calendar resources-->
<@link rel="stylesheet" type="text/css" href="${url.context}/res/js/neocom/SimpleCalendar/tcal.css"/>
<@script type="text/javascript" src="${url.context}/res/js/neocom/SimpleCalendar/tcal_mk.js"/>
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
	width: 200px !important;
}

.color-blue {
	color: blue;
	margin-left: 10px;
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
		var url =  "create-report?nodeRef="+nodeRef+"&format=json";
		sessionStorage.nodeRef = nodeRef;
		sessionStorage.dateFrom = dateFrom;
		sessionStorage.dateTo = dateTo;
		window.location  = "create-report";
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
					<td>Датум од</td>
					<td>
						<input id="dateFrom" type="text" name="date_archived" class="tcal" autocomplete="off">
					</td>
				</tr>
				<tr>
					<td>Датум до</td>
					<td>
						<input id="dateTo" type="text" name="date_archived" class="tcal" autocomplete="off">
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

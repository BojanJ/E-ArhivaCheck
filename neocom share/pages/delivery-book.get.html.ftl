<@processJsonModel group="share"/>
<style>
.my-template-widget {
   
    margin-left: 70px;
    margin-right: 70px;
}

.my-template-controls {
	padding: 1em;
	
}

table{
	border-collapse: collapse;
	padding: 0px;
}

#tblReport{
	text-align: center;
}

#tblReport  td, tr {
	border: 1px solid black;
	
}

.btns{
	padding: 5px;
	padding-left: 0px;
}


@media print
{    
    #alf-hd, .no-print, .sticky-footer
    {
        display: none !important;

    }
    body {
    	margin: 0px;
    	padding: 0px;
    	font-size: 14px;
    }

    .dashlet  {
    	 	margin: 0px;
    	padding: 0px;
    }


}

</style>

<script type="text/javascript">

	function getNodeRef(input)
	{
		var parts = input.split('Node Ref: ');
		return parts[1];
	}


	function registryChange(){
		var dateFrom = new Date(sessionStorage.dateFrom).getTime();
		var dateTo = new Date(sessionStorage.dateTo).getTime();

		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + "neocom/get-report-books?nodeRef="+sessionStorage.nodeRef+"&dateFrom="+sessionStorage.dateFrom+"&dateTo=" + sessionStorage.dateTo + "&orgUnt=" + sessionStorage.orgUnt + "&format=json";
		xmlHttp.onreadystatechange = stateChanged2;
		xmlHttp.open("GET",url,true,"admin","admin");
		xmlHttp.send(null);	 
	}

	registryChange();



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

	function stateChanged2()
	{
		if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var objr = eval ("(" + xmlHttp.responseText + ")");

				if(objr.registries.length > 0){
					createTable(objr);
				}else{
					document.getElementById("tableContent").innerHTML = "<h1>Нема податоци за избраните параметри</h1>";
				}
			}
        }
	}

	function createTable(obj){
	var tableBody = "";
	var j=1;
	for(var i=0; i<obj.registries.length; i++){
		if(obj.registries[i].isDeleted != 'true'){
			
			tableBody +="<tr id='trr' style='height: 60px; padding:0px'>";
				tableBody +="<td style='width:6%'>"+ (j) +"</td>";
				tableBody +="<td style='width:10%'>"+ obj.registries[i].acceptDate +"</td>";
				tableBody +="<td style='width:8%'>"+ obj.registries[i].fullArchSign +"</td>";
				tableBody +="<td style='width:10%'></td>";

				tableBody +="<td style='width:10%;'></td>";
				tableBody +="<td style='width:12%;'></td>";


				tableBody +="<td style='width:10%;'></td>";
				tableBody +="<td style='width:12%'></td>";
				tableBody +="<td style='width:16%'></td>";

			tableBody +="</tr>";
			j++;
		}
	}
		document.getElementById("reportBody").innerHTML = tableBody;
	}

	function goBack(){
		window.location = "select-delivery-book";
	}
</script>

<form  method="get" enctype="multipart/form-data" accept-charset="utf-8">
	<div class="dashlet my-template-widget">
		<div class="title no-print">Интерна доставна книга</div>
		<div class="my-template-controls">


		<div class="btns no-print">
			<button type="button" onClick="goBack()">Излези</button>
			<button type="button" onclick="window.print()">Печати</button>
		</div>

		<div id="tableContent">
			<table id="tblReport">
		<thead>
			<tr>
				<td style="" rowspan="2">Ред. бр.</td>
				<td style="" rowspan="2">Датум на запишување</td>
				<td style="" rowspan="2">Број на документот/записот</td>
				<td style="" rowspan="2">Потврда на приемот</td>
				<td style="" colspan = "2" >Службено лице</td>
				<td style="" colspan = "2" >Вратено во писарницата</td>
				<td style="" rowspan="2">Забелешка</td>
			</tr>
			<tr>
				<td>датум</td>
				<td>потпис</td>
				<td>датум</td>
				<td>потпис</td>
			</tr>
		</thead>
				<tbody id="reportBody">

				</tbody>
			</table>	
			</div>
		</div>
	</div>
</form>

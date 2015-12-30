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

.iconAttached{
	float: right; 
	margin-right:5px; 
	width:20px; 
	height:22px;
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
    	color:black;
    }

    a {
    	color : black;
    }

    .dashlet  {
    	margin: 0px;
    	padding: 0px;
    }

    .iconAttached{
    	display: none;
    }

    .documentLink{
    	color: black;
    	text-decoration :none;
    }


}

.trTxtDecoration td.lnThrough  {
  text-decoration: line-through;
}


</style>

<script type="text/javascript">

	function getNodeRef(input)
	{
		var parts = input.split('Node Ref: ');
		return parts[1];
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


			//get site
	var site = "";
	function getSite()
	{
		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + 'neocom/get-site';
		xmlHttp.onreadystatechange = getSiteResponse;
		xmlHttp.open("GET",url,true);
		xmlHttp.send(null); 


	}
	 getSite();

	function getSiteResponse(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var obj = eval ("(" + xmlHttp.responseText + ")");
				site = obj.sites[0].shortName;

				registryChange();
			}
		}
	}

	function registryChange(){
		var dateFrom = new Date(sessionStorage.dateFrom).getTime();
		var dateTo = new Date(sessionStorage.dateTo).getTime();

		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + "neocom/get-report-books?nodeRef="+sessionStorage.nodeRef+"&dateFrom="+sessionStorage.dateFrom+"&dateTo=" + sessionStorage.dateTo + "&format=json";
		xmlHttp.onreadystatechange = stateChanged2;
		xmlHttp.open("GET",url,true,"admin","admin");
		xmlHttp.send(null);	 
	}

	//registryChange();

	function stateChanged2()
	{
		if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var objr = eval ("(" + xmlHttp.responseText + ")");

				if(objr.registries.length > 0){
					objr.registries.sort(function(a, b){
						 return a.podBroj-b.podBroj
						});
					objr.registries.sort(function(a, b){
						 return a.archiveSign-b.archiveSign
						})
					createTable(objr);
				}else{
					document.getElementById("tableContent").innerHTML = "<h1>Нема податоци за избраните параметри</h1>";
				}
			}
        }
	}


	function createTable(obj){

	var tableBody = "";
	for(var i=0; i<obj.registries.length; i++){

		if(obj.registries[i].isDeleted == "true"){			
			tableBody +="<tr id='trr' class='trTxtDecoration' style='height: 60px; padding:0px; '>";
		}
		else{
			tableBody +="<tr id='trr' style='height: 60px; padding:0px'>";			
		}

		if( typeof obj.registries[i+1] != 'undefined' && obj.registries[i].archiveSign == obj.registries[i+1].archiveSign ){
			var cc = 1;
			var tt = obj.registries.length;
			for(var j=i; j<tt; j++){
				if(typeof obj.registries[j+1] != 'undefined' && obj.registries[i].archiveSign == obj.registries[j+1].archiveSign){
					cc++;
				}	
			}  
			if((typeof obj.registries[i-1] != 'undefined' && obj.registries[i].archiveSign != obj.registries[i-1].archiveSign) || typeof obj.registries[i-1] == 'undefined'){
				tableBody +="<td style='width:8%;' class='simpleNumber' rowspan='"+ cc +"'>"+ obj.registries[i].archiveSign +"</td>";
			}
		}else if(typeof obj.registries[i-1] != 'undefined' && obj.registries[i].archiveSign == obj.registries[i-1].archiveSign){} 
		else{
			 tableBody +="<td style='width:8%; ' >"+ obj.registries[i].archiveSign +"</td>";
		}
			if(obj.registries[i].attachedDoc > 0)
				tableBody +="<td class='lnThrough cssLink' style='width:20%'><a class='documentLink'  href='${url.context}/page/site/"+ site +"/document-details?nodeRef="+ getNodeRef(obj.registries[i].documentNodeRef) +"'>"+ obj.registries[i].name +"    <img src='${url.context}/eye-icon.png' class='iconAttached' /> <img src='${url.context}/document_attachment-512.png' class='iconAttached' /> </a> </td>";
			else
				tableBody +="<td class='lnThrough cssLink' style='width:20%'><a class='documentLink'   href='${url.context}/page/site/"+ site +"/document-details?nodeRef="+ getNodeRef(obj.registries[i].documentNodeRef) +"'>"+ obj.registries[i].name +" <img src='${url.context}/eye-icon.png' class='iconAttached' /> </a></td>";

			tableBody +="<td class='lnThrough' style='width:8%'>"+ obj.registries[i].podBroj +"</td>";
			tableBody +="<td class='lnThrough' style='width:10%'>"+ obj.registries[i].acceptDate +"</td>";

			tableBody +="<td class='lnThrough' style='width:15%;'>"+ obj.registries[i].sender +"</td>";
			tableBody +="<td class='lnThrough' style='width:10%;'>"+ obj.registries[i].senderId +" - "+ obj.registries[i].sendDate +"</td>";


			tableBody +="<td class='lnThrough' style='width:8%;'>"+ obj.registries[i].orgEdinica+ "</td>";
			tableBody +="<td class='lnThrough' style='width:10%'>" + obj.registries[i].dateRazvod + "</td>";
			tableBody +="<td class='lnThrough' style='width:5%'>" + obj.registries[i].oznakaRazvod + "</td>";

		tableBody +="</tr>";

	}
		document.getElementById("reportBody").innerHTML = tableBody;
	}

	function goBack(){
		window.location = "select-report";
	}
</script>

<form  method="get" enctype="multipart/form-data" accept-charset="utf-8">
	<div class="dashlet my-template-widget">
		<div class="title no-print">Деловодник</div>
		<div class="my-template-controls">


		<div class="btns no-print">
			<button type="button" onClick="goBack()">Излези</button>
			<button type="button" onclick="window.print()">Печати</button>
		</div>

		<div id="tableContent">
			<table id="tblReport">
		<thead>
			<tr>
				<td style="" rowspan="2">Основен број</td>
				<td style="" rowspan="2">ПРЕДМЕТ</td>
				<td style="" rowspan="2">Под броj</td>
				<td style="" rowspan="2">Дата на приемот</td>
				<td style="" colspan = "2" >ИСПРАЌАЧ</td>
				<td style="" rowspan="2">Орган. единица</td>
				<td style="" colspan = "2" >РАЗВОД</td>
			</tr>
			<tr>
				<td>Име и презиме, односно назив и место</td>
				<td>Број - Датум</td>
				<td>Датум</td>
				<td>Ознака</td>
			</tr>
						<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
			</tr>
		</thead>
				<tbody id="reportBody">

				</tbody>
			</table>	
			</div>
		</div>
	</div>
</form>

<@processJsonModel group="share"/>
<!-- link calendar resources -->
<@script type="text/javascript" src="${url.context}/res/jquery/jquery-1.11.2.min.js"/>
<@link rel="stylesheet" type="text/css" href="${url.context}/res/js/neocom/SimpleCalendar/tcal.css"/>
<@script type="text/javascript" src="${url.context}/res/js/neocom/SimpleCalendar/tcal_mk.js"/>

<@link rel="stylesheet" type="text/css" href="${url.context}/res/js/neocom/dist/css/select2.min.css"/>
<@script type="text/javascript" src="${url.context}/res/js/neocom/dist/js/select2.min.js"/>


<!-- <script src="http://code.jquery.com/jquery-1.8.0.min.js"></script> -->
<@link rel="stylesheet" href="${url.context}/res/js/neocom/typeahead/bootstrap.min.css" />
<@script src="${url.context}/res/js/neocom/typeahead/bootstrap-typeahead.min.js" />

<style>
.my-template-widget {
	width: 650px !important;
	margin-left: 70px;
}

.my-template-controls {
	padding: 1em;
}

.my-template-controls td {
	padding: 1em;
}

.controls {
	width:345px !important;
}

.dropdowns {
	width: 350px !important;
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

	var archiveNumberCounter = 3623; 
	
	function getNodeRef(input)
	{
		var parts = input.split('Node Ref: ');
		return parts[1];
	}

	$(document).ready(function(){
		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + "neocom/get-org-unit.json";

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

		var out="";
		for(var i=0; i<objr.length; i++){
			dataOrgUnit.push({
				'id' : objr[i].nodeRef,
				'text' : objr[i].name +" - "+objr[i].title
			});
			out += '<option value="' + objr[i].nodeRef + '">' + objr[i].name +' - '+ objr[i].title + '</option>';
		}


		function initDate(){
			var todayDate = new Date();

			var date = zeroInDate(todayDate.getDate())+"/"+zeroInDate(todayDate.getMonth() + 1)+"/"+todayDate.getFullYear();

			$("#date_archived").val(date);
		}

		initDate();

		document.getElementById("orgunit").innerHTML = out;
		$("#orgunit").select2({
		  data: data
		})
				
		takeTemplateSign();
		dataOrgUnit = [];
	}

	function takeTemplateSign(chosen) {
		var selbox = document.arhiviraj.template;
		 
		selbox.options.length = 0;
		if (chosen == " ") {
		  selbox.options[selbox.options.length] = new Option('Please select one of the options above first',' ');
		}
		
		xmlHttp = GetXMLHttpObject();
		var selectedValue = document.getElementById("orgunit").value;
		var nodeRef = getNodeRef(selectedValue);

		var url = Alfresco.constants.PROXY_URI + "neocom/get-template?nodeRef="+nodeRef+"&format=json";
		xmlHttp.onreadystatechange = stateChanged5;
		xmlHttp.open("GET",url,true,"admin","admin");
		xmlHttp.send(null);
	}
	
var data = [];
var selectedOrgSubUnits = [];
	function myFunction(arr) {
		var out = "";
		var i;
		for(i = 0; i < arr.templates.length; i++) { 
			data.push({
				'id': getNodeRef(arr.templates[i].nodeRef),
				'text': arr.templates[i].name +' '+ arr.templates[i].title,
				'expireDate' : arr.templates[i].expireDate
			})
			out += '<option value="' + getNodeRef(arr.templates[i].nodeRef) + '" >' + arr.templates[i].name +' - '+ arr.templates[i].title + '</option>';
		}
		document.getElementById("template").innerHTML = out;
		selectedOrgSubUnits = data;
		setOrgSubUnit(data);
		 readRegCount();
		 setRazvodeDate();
		data = [];
	}


	
	function readRegCount(){

		var selectedValue = document.getElementById("registry_book").value;
		if (selectedValue != '') {
			xmlHttp = GetXMLHttpObject();
			var nodeRef = getNodeRef(selectedValue);
			var url = Alfresco.constants.PROXY_URI + "neocom/get-records?nodeRef="+nodeRef+"&format=json";
			xmlHttp.onreadystatechange = stateChanged2;
			xmlHttp.open("GET",url,true,"admin","admin");
			xmlHttp.send(null);
		}

	}

	function FunctionReg(arreg) {
		arreg.records.reverse();

		if (arreg.records[0].archSigns.length > 0) {
			arreg.records[0].archSigns.sort(function (a, b){
				return  b.archSign - a.archSign;
			});

			var out = '<option value="">Постоечки предмет</option>';
			for(var i=0; i<arreg.records[0].archSigns.length; i++){
				out+='<option value="'+ arreg.records[0].archSigns[i].archSign +'">' + arreg.records[0].archSigns[i].archSign + '</option>';
			}
			$("#ddlArchiveNo").html(out);
		}
		else {
			var out = "";
				out+='<option value="">Не постојат предмети</option>';
			$("#ddlArchiveNo").html(out);
		}

		getTitlesTypeAh();
	}


	function getTitlesTypeAh(){
		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + "neocom/get-senders-titles.json";
		xmlHttp.onreadystatechange = getTitles;
		xmlHttp.open("GET",url,true,"admin","admin");
		xmlHttp.send(null); 
	}

	function getTitles(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var objr = eval ("(" + xmlHttp.responseText + ")");
				typeAheadTitleSender(objr);
			}
		}
	}


    function typeAheadTitleSender(data) {
        function displayResult(item) {
            $('.alert').show().html('You selected <strong>' + item.value + '</strong>: <strong>' + item.text + '</strong>');
        }
        $('#typeAhTitle').typeahead({
            source: data.title,
			scrollBar:true,
            onSelect: displayResult
        });

        $('#typeAhSender').typeahead({
            source: data.sender,
			scrollBar:true,
            onSelect: displayResult
        });

    };

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

	var coutArhNo;
		function stateChanged2()
		{
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200 && xmlHttp.status < 300) 
				{
					var objr = eval ("(" + xmlHttp.responseText + ")");
					coutArhNo = objr.records[0].number;
					FunctionReg(objr);
				}
			}
		}

	function stateChanged5()
	{
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var obj = eval ("(" + xmlHttp.responseText + ")");
				myFunction(obj);
			}
		}
	}

	function exp()
	{
		xmlHttp = GetXMLHttpObject();
		var reg = document.getElementById('dialog:dialog-body:reg');
		var tex = reg.options[reg.selectedIndex].text;
		var url = '/alfresco/wcservice/neocom/expired?reg='+tex;
		xmlHttp.onreadystatechange = stateChanged3;
		xmlHttp.open("GET",url,true);
		xmlHttp.send(null); 
	}


	function setOrgSubUnit(data){
		$(".js-example-data-array-selected").select2({
		  data: data
		})
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
			}
		}
	}

	function uploadDocument(){

		var $myForm = $('#formArchDoc')
		if (!$myForm[0].checkValidity()) {
		  $myForm.find(':submit').click()
		  return false;
		}

		var url = Alfresco.constants.PROXY_URI + "neocom/create-archive-empty";
		
   		var data = new FormData($("#formArchDoc")[0]);
   		data.append("date_div", $("#date_div").val());

		xmlHttp = GetXMLHttpObject();

		var url = url;
		xmlHttp.onreadystatechange = stateTest;
		xmlHttp.open("POST",url,true);
		xmlHttp.send(data); 
	}

	function stateTest(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var obj = eval ("(" + xmlHttp.responseText + ")");

				window.location ="/share/page/site/"+ site +"/document-details?nodeRef="+obj.responseResult[0].nodeRef;
			}else{
				alert("Настана грешка при заведување. Обидете се повторно!");
				location.reload();
			}
		}
	}

	function setArchiveNo(){	
		if($("#chbArchiveNo").is(':checked')){ 
			$("#ddlArchiveNo").prop("disabled", true);
		}else{
			$("#ddlArchiveNo").prop("disabled", false);
		}
	}

	function zeroInDate(dateParam){
		if(dateParam <10 ){
			return "0"+dateParam;
		}
		return dateParam;
	}

	function setRazvodeDate(){
		for(var i=0; selectedOrgSubUnits.length>i; i++){ 
			if(selectedOrgSubUnits[i].id == ($("#template").val())){

				var todayDate = new Date();
				var newDate = new Date(todayDate.setMonth(todayDate.getMonth() + parseInt(selectedOrgSubUnits[i].expireDate) ));

				var razvodDate = zeroInDate(newDate.getDate())+"/"+zeroInDate(newDate.getMonth() + 1)+"/"+newDate.getFullYear();
				if(selectedOrgSubUnits[i].expireDate == 0)
					razvodDate = "";

				$("#date_div").val(razvodDate);
			}
		}
	}

</script>
<body>
<form action="http://localhost:8080/alfresco/service/neocom/create-archive-empty" method="post" id="formArchDoc" enctype="multipart/form-data" accept-charset="utf-8" name="arhiviraj">
	<div class="dashlet my-template-widget">
		<div class="title">${msg("form.arhiviraj.formtitle")}</div>
		<div class="my-template-controls">
			<table>
				<tr>
					<td>
					${msg("form.arhiviraj.orgunit")}:
					</td>
					<td>
						<select id="orgunit" name="orgunit" required="required" class="dropdowns" onchange="takeTemplateSign(document.arhiviraj.orgunit.options[document.arhiviraj.orgunit.selectedIndex].value)" 	 
						>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.template")}: 
					</td>
					<td>
						<select style="width:350px" class="js-example-data-array-selected"  id="template" name="template" required="required" class="dropdowns" size="1" oninvalid="setCustomValidity('Изберете oрганизациска подединица!')" onblur="try{setCustomValidity('')}catch(e){}" onchange="setRazvodeDate()">
						</select>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.registry")}:
					</td>
					<td>
						<select id="registry_book" name="registry_book" required="required" class="dropdowns" onblur = "readRegCount()" onChange="readRegCount()">
							<#list registries as child>
								<option value='${child.nodeRef}'>${child.name}</option>
							</#list>
						</select></br>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.archsign")}:
					</td>
					<td>			
						<input id="chbArchiveNo" name="chbArchiveNo" type="checkbox" checked="true" onchange="setArchiveNo()" > <label for="chbArchiveNo">Нов Предмет</label>

						<select id="ddlArchiveNo" name="ddlArchiveNo" disabled style="float:right" required oninvalid="setCustomValidity('Изберете архивски број!')" onchange="try{setCustomValidity('')}catch(e){}"></select>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.datearchived")}: 
					</td>
					<td>
						<input id="date_archived" type="text" name="date_archived" required class="tcal" autocomplete="off"   oninvalid="setCustomValidity('Внесете датум на заведување!')" onblur="try{setCustomValidity('')}catch(e){}" >
						<span id="spnDate_archived" class="date-format">DD/MM/YYYY </span>
					</td>
				</tr>				
				<tr>
					<td>
					${msg("form.arhiviraj.title")}:
					</td>
					<td>
			 		 <input style="" id="typeAhTitle" type="text" placeholder="Барај наслови..." autocomplete="off" name="title" required pattern='([^\\\"/?<>:*|]|\\")*'  class="controls" oninvalid="setCustomValidity('Внесете наслов! Насловот не смее да ги содржи следните карактери \\\ / ? < > : * | ')" onchange="try{setCustomValidity('')}catch(e){}" /> 
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.sender")}:
					</td>
					<td>
						<input style="" id="typeAhSender" type="text" placeholder="Барај испраќачи..." autocomplete="off" name="sender" class="controls" />

					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.senderarchsign")}:
					</td>
					<td>
						<input type="text" name="sender_arch_sign" class="controls"  />
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.datesent")}:
					</td>
					<td>
						<input type="text" id="date_sent" name="date_sent" class="tcal" autocomplete="off" >
						<span class="date-format">DD/MM/YYYY</span>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.divsign")}:
					</td>
					<td>
						<input type="text" name="div_sign" class="controls" />
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.datediv")}:
					</td>
					<td>
						<input type="text" id="date_div" name="date_div" class="tcal" autocomplete="off" disabled>
						<span class="date-format">DD/MM/YYYY</span>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.dateexpire")}:
					</td>
					<td>
						<input type="text" id="date_expire" name="date_expire" class="tcal" autocomplete="off">
						<span class="date-format">DD/MM/YYYY</span>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.txtArea")}:
					</td>
					<td>
						<textarea id="txtArea" name="note" class="controls" ></textarea>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.file")}:
					</td>
					<td>
						<input type="file" name="file" id="file">
					</td>
				</tr>
				<tr>
					<td>
						
					</td>
					<td>
						<input type="submit"  value="${msg("form.arhiviraj.btnsubmit")}" id="btn_submit" style="display:none" />
						<button type="button" onclick="uploadDocument()"> ${msg("form.arhiviraj.btnsubmit")}</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>
</body>
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

	function formatDate(dateStr){

		if(dateStr != ""){
			var dateParts = dateStr.split("/");

			var days = dateParts[0], months=dateParts[1];
			if(dateParts[0].length == 1){
				days = "0"+dateParts[0]
			}
			if(dateParts[1].length == 1){
				months = "0"+dateParts[1];
			}
			return dateArchived = days +"/"+ months +"/"+dateParts[2];
		}
	}

	function getNodeRef(input)
	{
		var parts = input.split('Node Ref: ');
		return parts[1];
	}


	//get ornanization units 
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

		var out="";
		for(var i=0; i<objr.length; i++){
			dataOrgUnit.push({
				'id' : objr[i].nodeRef,
				'text' : objr[i].name +" - "+objr[i].title
			});
			out += '<option value="' + objr[i].nodeRef + '" name="'+objr[i].name+'">' + objr[i].name +' - '+ objr[i].title + '</option>';
		}
		document.getElementById("orgunit").innerHTML = out;
		$("#orgunit").select2({
		  // data: data
		})

		takeTemplateSign();
		 readRegCount();
		dataOrgUnit = [];
	}


	//get template signs from selected org.unit
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
			});
			out += '<option value="' + getNodeRef(arr.templates[i].nodeRef) + '" name="'+arr.templates[i].name+'">' + arr.templates[i].name +' - '+ arr.templates[i].title + '</option>';
		}

		document.getElementById("template").innerHTML = out;
		$("#template").select2({

		})

		selectedOrgSubUnits = data;
		data = [];

		var option, $select = $('#template');
		option = $select.find( 'option[name="'+docTemplateSign+'"]' )[0];
    	if ( 'undefined' !== typeof option ) {
		  $select.val(option.value).trigger("change");
		}

		setRazvodeDate();
	}


	//list archive signs in ddl
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

	function FunctionReg(arreg) {
		if (arreg.records[0].archSigns.length > 0) {
			arreg.records[0].archSigns.sort(function(a, b){
						 return a.archSign-b.archSign
						});
			
			var out = "";
			for(var i=0; i<arreg.records[0].archSigns.length; i++){
				out += '<option value="' + arreg.records[0].archSigns[i].archSign + '">' + arreg.records[0].archSigns[i].archSign +'  ('+ arreg.records[0].archSigns[i].archSignName + ')</option>';
			}
		}
		else {
			out += '<option value="">Не постојат документи</option>';
		}
		document.getElementById("arch_sign").innerHTML = out;
		getTitlesTypeAh();
	}

	//get all titles and senders from documents for typeahead
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

        getDocuments();

    };


	//get selected document properties
	function getDocuments(){
		var registryNode = $('#registry_book').val();
		var archSign = $('#arch_sign').val();

		xmlHttp = GetXMLHttpObject();
		var nodeRef = getNodeRef(registryNode);
		var url = Alfresco.constants.PROXY_URI + "neocom/get-selected-documents?nodeRef="+nodeRef+"&archSign="+archSign+"&format=json";
		xmlHttp.onreadystatechange = getDocumentsList;
		xmlHttp.open("GET",url,true,"admin","admin");
		xmlHttp.send(null);
	}
	

	var docsFromRegitry = [];
	function getDocumentsList(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var obj = eval ("(" + xmlHttp.responseText + ")");
				docsFromRegitry = obj.registries;
				documentsList(obj.registries);
			}
		}
	}

	function documentsList(doc){
		var out = "";
		for (var i = 0; i < doc.length; i++) {

		 	out += '<option value="'+doc[i].nodeRef+'">' + doc[i].name  + '</option>';
		 }
		 document.getElementById("singleDoc").innerHTML = out;
		 if(doc.length <= 0){
		 	out += '<option value="">Не постојат документи</option>';
		 	document.getElementById("singleDoc").innerHTML = out;
		 }

		 fillData();
	}

var docTemplateSign ="";
	//fill the form with selected document data
	function fillData(){

		clearData();
		var selectedDoc = $('#singleDoc').val();

		for (var i = 0; i < docsFromRegitry.length; i++) {
			if(docsFromRegitry[i].nodeRef == selectedDoc){

				$("#date_archived").val(formatDate(docsFromRegitry[i].acceptDate));
				$("#typeAhTitle").val(docsFromRegitry[i].name);
				$("#typeAhSender").val(docsFromRegitry[i].sender);
				$("#sender_arch_sign").val(docsFromRegitry[i].senderId);
				$("#date_sent").val(formatDate(docsFromRegitry[i].sendDate));
				$("#div_sign").val(docsFromRegitry[i].oznakaRazvod);
				$("#date_div").val(formatDate(docsFromRegitry[i].dateRazvod));
				$("#date_expire").val(formatDate(docsFromRegitry[i].dateExpire));
				$("#txtArea").val(docsFromRegitry[i].note);


		    	var option, $select = $('#orgunit');
		    	option = $select.find( 'option[name="'+docsFromRegitry[i].orgEdinica+'"]' )[0];
		    	if ( 'undefined' !== typeof option ) {
				  // $select.select2("val",option.value );
				  $select.val(option.value).trigger("change");
				}
				docTemplateSign = docsFromRegitry[i].orgSubUnit;
			}
		};
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


	//storn selected document
	function stornDocument(){

		var nodeRef = getNodeRef($('#singleDoc').val());
		var archSign = $('#arch_sign').val();

		if(typeof nodeRef == 'undefined'){
			alert("Изберете документ за сторнирање!");
			 $('#singleDoc').focus()
			return false;
		}

		xmlHttp = GetXMLHttpObject();
		var url = Alfresco.constants.PROXY_URI + "neocom/modify-document?nodeRef="+nodeRef+"&format=json";
		xmlHttp.onreadystatechange = stornDocumentReadyStCh;
		xmlHttp.open("POST",url,true,"admin","admin");
		xmlHttp.send(null);
	}

	function stornDocumentReadyStCh(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
				var obj = eval ("(" + xmlHttp.responseText + ")");
				window.location ="/share/page/site/"+ site +"/document-details?nodeRef="+obj.responseResult[0].nodeRef;
			}else{
				alert("Настана грешка при сторнирање. Обидете се повторно!");
				location.reload();
			}
		}
	}

	
	function uploadDocument(){

		var $myForm = $('#formArchDoc')
		if (!$myForm[0].checkValidity()) {
		  $myForm.find(':submit').click()
		  return false;
		}

		var url = Alfresco.constants.PROXY_URI + "neocom/modify-document";
		
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
				alert("Настана грешка при уредување. Обидете се повторно!");
				location.reload();
			}
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


	//clear form
	function clearData(){
		$("#date_archived").val("");
		$("#typeAhTitle").val("");
		$("#typeAhSender").val("");
		$("#sender_arch_sign").val("");
		$("#date_sent").val("");
		$("#div_sign").val("");
		$("#date_div").val("");
		$("#date_expire").val("");
		$("#txtArea").val("");
	}

</script>
<body>
<form action="${url.service}" method="post" id="formArchDoc" enctype="multipart/form-data" accept-charset="utf-8" name="arhiviraj">
	<div class="dashlet my-template-widget">
		<div class="title">${msg("form.arhiviraj.formtitle")}</div>
		<div class="my-template-controls">
			<table>


				<tr>
					<td>
					${msg("form.arhiviraj.registry")}:
					</td>
					<td>
						<select id="registry_book" name="registry_book" required="required" class="dropdowns" onblur = "readRegCount()" onChange="readRegCount()">
							<#list registries as child>
								<option value='${child.nodeRef}'>${child.name}</option>
							</#list>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.archsign")}:
					</td>
					<td>				
						<select name="arch_sign" id="arch_sign" required="required" class="dropdowns" oninvalid="setCustomValidity('Изберете арх. знак!')" onchange="getDocuments();try{setCustomValidity('')}catch(e){}" onblur="getDocuments()" >
						</select>

					</td>
				</tr>

				<tr>
					<td>
					${msg("form.arhiviraj.singleDoc")}:
					</td>
					<td>
						<select id="singleDoc" name="singleDoc" required="required" class="dropdowns"  onChange="fillData()"   oninvalid="setCustomValidity('Изберете документ!')" onblur="try{setCustomValidity('')}catch(e){}">
						</select>
					</td>
				</tr>

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
						<select style="width:350px"  id="template" name="template" onchange="setRazvodeDate()" >
						</select>
					</td>
				</tr>
				<tr>
					<td>
					${msg("form.arhiviraj.datearchived")}:
					</td>
					<td>
						<input id="date_archived" type="text" name="date_archived" required class="tcal" autocomplete="off"   oninvalid="setCustomValidity('Внесете датум на заведување!')" onblur="try{setCustomValidity('')}catch(e){}" >
						<span id="spnDate_archived" class="date-format">DD/MM/YYYY</span>
					</td>
				</tr>				
				<tr>
					<td>
					${msg("form.arhiviraj.title")}:
					</td>
					<td>
			 		 <input style="" id="typeAhTitle" type="text" placeholder="Барај наслови..." autocomplete="off" name="title" required="required" pattern='([^\\\"/?<>:*|]|\\")*'  class="controls" oninvalid="setCustomValidity('Внесете наслов! Насловот не смее да ги содржи следните карактери \\\ / ? < > : * | ')" onchange="try{setCustomValidity('')}catch(e){}" />
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
						<input type="text" id="sender_arch_sign" name="sender_arch_sign" class="controls"  />
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
						<input type="text" id="div_sign" name="div_sign" class="controls" />
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
						<button type="button" onclick="stornDocument()">${msg("form.arhiviraj.btnStorn")}</button>
						<input type="submit" value="${msg("form.arhiviraj.btnsubmit")}" id="btn_submit" style="display:none"/>
						<button type="button" onclick="uploadDocument()"> ${msg("form.arhiviraj.btnsubmit")}</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>
</body>
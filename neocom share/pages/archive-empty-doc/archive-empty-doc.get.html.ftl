<@processJsonModel group="share"/>

<style>
.my-template-widget {
    width: 477px !important;
    margin-left: 70px;
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

	function takeTemplateSign(chosen) {
		var selbox = document.arhiviraj.template;
		 
		selbox.options.length = 0;
		if (chosen == " ") {
		  selbox.options[selbox.options.length] = new Option('Please select one of the options above first',' ');
		 
		}
		
		xmlHttp = GetXMLHttpObject();
		var selectedValue = document.getElementById("orgunit").value;
		var nodeRef = getNodeRef(selectedValue);
		//var url = window.location.protocol + "//" + window.location.host + "/alfresco/service/neocom/get-template?nodeRef="+nodeRef+"&&format=json";
		var url = Alfresco.constants.PROXY_URI + "neocom/get-template?nodeRef="+nodeRef+"&format=json";
		xmlHttp.onreadystatechange = stateChanged5;
		xmlHttp.open("GET",url,true,"admin","admin");
		//xmlHttp.onreadystatechange = stateChanged5;
		//xmlHttp.withCredentials = "true";
		xmlHttp.send(null);

		//Send the proper header information along with the request
		//To POST data like an HTML form, add an HTTP header with setRequestHeader(). Specify the data you want to send in the send() method
		//xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	
	function myFunction(arr) {
		var out = "";
		var i;
		for(i = 0; i < arr.templates.length; i++) {
			out += '<option value="' + getNodeRef(arr.templates[i].nodeRef) + '">' + arr.templates[i].name + '</option>';
		}
		document.getElementById("template").innerHTML = out;
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

	function stateChanged()
	{
		if(xmlHttp.readyState==4)
		{
			var divid = document.getElementById('wizard:wizard-body:select');
			if(divid==null)
			{
				var divid = document.getElementById('dialog:dialog-body:select');
			}
			var hiden = document.getElementById('wizard:wizard-body:hiden');
			if(hiden==null)
			{
				var hiden = document.getElementById('dialog:dialog-body:hiden');
			}
			divid.innerHTML = xmlHttp.responseText;
			var selectitems = document.getElementById('selectItems');
			hiden.value = selectitems.options[0].value;
		}
	}

	function stateChanged3()
	{
		if(xmlHttp.readyState==4)
		{
			var field = document.getElementById('dialog:dialog-body:select');
			field.innerHTML = xmlHttp.responseText;
		}
	}

	function stateChanged4()
	{
		if(xmlHttp.readyState==4)
		{
			var divid = document.getElementById('dialog:dialog-body:select');
			var hiden = document.getElementById('dialog:dialog-body:hiden');
			
			divid.innerHTML = xmlHttp.responseText;
			
			var selectitems = document.getElementById('selectItems');
			hiden.value = selectitems.options[0].value;
		}
	}
	
	function stateChanged5()
	{
		if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200 && xmlHttp.status < 300) 
			{
                //alert(xmlHttp.responseText);
				//var obj = JSON.parse(xmlHttp.responseText);
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

	(function() {
		$( "#date_archived" ).datepicker();
	})
</script>
<form action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8" name="arhiviraj">
	<div class="dashlet my-template-widget">
		<div class="title">Архивски документ</div>
		<div class="my-template-controls">
			<table>
				<tr>
					<td>
					Организациска единица:
					</td>
					<td>
						<select id="orgunit" name="orgunit" class="dropdowns" onchange="takeTemplateSign(document.arhiviraj.orgunit.options[document.arhiviraj.orgunit.selectedIndex].value)" 
						onblur="takeTemplateSign(document.arhiviraj.orgunit.options[document.arhiviraj.orgunit.selectedIndex].value)">
							<#list orgunits as child>
								<option value='${child.nodeRef}'>${child.name}</option>
							</#list>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					Организациска подединица:
					</td>
					<td>
						<select id="template" name="template" class="dropdowns" size="1">
							<option value=" " selected="selected">Please select one of the options above first</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					Деловодник:
					</td>
						<td>
						<select id="registry_book" name="registry_book" class="dropdowns" onblur = "readRegCount()">
							<#list registries as child>
								<option value='${child.nodeRef}'>${child.name}</option>
							</#list>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					Наслов:
					</td>
					<td>
						<input type="text" name="title" class="controls" />
					</td>
				</tr>
				<tr>
					<td>
						
					</td>
					<td>
						<input type="submit" value="Архивирај" id="btn_submit" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>

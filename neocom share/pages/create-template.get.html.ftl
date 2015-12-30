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

		function getNodeRef(input){
			var parts = input.split('Node Ref: ');
			return parts[1];
		}

 		var temp = [];

		function getTemplate(){
			xmlHttp = GetXMLHttpObject();
			var selectedOrgunit = document.getElementById('orgunit').value;
			var nodeRef = getNodeRef(selectedOrgunit);
			var url = Alfresco.constants.PROXY_URI + "neocom/get-template?nodeRef="+nodeRef+"&format=json";

			xmlHttp.onreadystatechange = checkExistingTemplate;
			xmlHttp.open("GET", url, true, "admin", "admin");
			xmlHttp.send(null);
		}

		$(document).ready(function (){
			getTemplate();
		});


	//
		function checkExistingTemplate(){
					

			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200 && xmlHttp.status < 300){
					var obj = eval("(" + xmlHttp.responseText + ")");
					temp = obj.templates;
				}
			}
		}

		function checkTemlate(temp){
			var txtTemplate = document.getElementById('template').value;
			if(temp.length > 0){
				for(var i=0; i<temp.length; i++){
					if(temp[i].name == txtTemplate){
						alert("Внесената организациона подединица веќе постои!");
						
						return false;
					}
				}
			}
		}


		$(function(){
			$("#form").submit(function(){
				return checkTemlate(temp);

			});
		});


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
	<form action="${url.service}" id="form" method="post" enctype="multipart/form-data" accept-charset="utf-8">
		<div class="dashlet my-template-widget">
			<div class="title">Организациона подединица</div>
			<div class="my-template-controls">
				<table>
					<tr>
						<td>
							Организациона единица:
						</td>
						<td>
							<select id="orgunit" name="orgunit" class="dropdowns" onchange="getTemplate()">
								<#list orgunits as child>
									<option value='${child.nodeRef}'>${child.name}</option>
								</#list>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							Организациона подединица:
						</td>
						<td>
							<input type="text" name="template" id="template" required="required" placeholder="пр. 0101" oninvalid="setCustomValidity('Организационата подединица е задолжителена!')" onchange="try{setCustomValidity('')}catch(e){}" />
						</td>
					</tr>
					<tr>
						<td>
							Назив:
						</td>
						<td>
							<input type="text" name="title" required="required" oninvalid="setCustomValidity('Внесете назив на орг. подединица!')" onchange="try{setCustomValidity('')}catch(e){}"/>
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
							Група:
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

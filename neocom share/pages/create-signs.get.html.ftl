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
<form id="formArchSings" action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8">
	<div class="dashlet my-template-widget">
		<div class="title">Архивски знаци</div>
		<div class="my-template-controls">
			<table>
				<tr>
					<td>
					Фолдер:
					</td>
					<td>
						<select id="archiveSignFolder" name="archiveSignFolder" class="dropdowns">
							<#list archiveSign as child>
								<option value='${child.nodeRef}'>${child.name}</option>
							</#list>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					JSON документ:
					</td>
					<td>
						<input type="file" id="uplDocJson" name="file" required="required" oninvalid="setCustomValidity('Документот е задолжителен!')" onchange="try{setCustomValidity('')}catch(e){}" />
					</td>
				</tr>
				<tr>
					<td>
						
					</td>
					<td>
						<input type="submit" value="Креирај" id="btn_submit" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>

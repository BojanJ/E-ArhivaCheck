<@processJsonModel group="share"/>
<style>
.my-template-widget {
    width: 320px !important;
    margin-left: 70px;
}

.my-template-controls {
	padding: 1em;
	
}

.my-template-controls td {
	padding: 1em;
	
}
</style>
<form action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8">
<!--<form action="/share/page/dp/ws/create-archive-sign" method="post" enctype="multipart/form-data" accept-charset="utf-8">	 -->
	<div class="dashlet my-template-widget">
		<div class="title">Архивски знак</div>
		<div class="my-template-controls">
			<table>
				<tr>
					<td>
						Организациона единица:
					</td>
					<td>
						<input type="text" name="title" required="required" oninvalid="setCustomValidity('Насловот е задолжителен!')" onchange="try{setCustomValidity('')}catch(e){}" />
						<select name="org_unit" class="dropdowns" >
							<option value="01">01</option>
							<option value="02">02</option>
							<option value="08">08</option>
							<option value="09">09</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>
						Архивски знак:
					</td>
					<td>
						<input type="text" name="archivesign" required="required" oninvalid="setCustomValidity('Архивскиот знак е задолжителен!')" оnchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
				</tr>
				<tr>
					<td>
						Име на архивски знак:
					</td>
					<td>
						<input type="text" name="archivesignname" pattern="\d{4}" required="required" oninvalid="setCustomValidity('Името на архивскиот знак е задолжителен!')" onchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
				</tr>
				<tr>
					<td>
						Време на чување:
					</td>
					<td>
						<input type="text" name="timetohold" pattern="\d{4}" required="required" placeholder="пр. 1" oninvalid="setCustomValidity('Внесете време на чување!')" onchange="try{setCustomValidity('')}catch(e){}"/>
					</td>
					<td>
						месеци
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

{
	"records" : [
	{
		"number" : ${number} ,
		"archSigns" : [
			<#list archSigns as child>
			{
				"archSign" : ${child.archSign},
		    	"archSignName" : "${child.archSignName}" 
			}
				<#if child_has_next> , </#if>
			</#list>
		]
	}
]}
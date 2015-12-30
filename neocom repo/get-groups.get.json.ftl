{
"groups" : [
	<#list groups as child>
	{
	    "name" : "${child.name}" 
	}
	<#if child_has_next> , </#if>
	</#list>
]}
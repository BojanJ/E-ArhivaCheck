{
"orgunits" : [
	<#list entries as child>
	{
	    "name" : "${child.name}" ,
	    "title": "${child.title}" ,
	    "nodeRef" : "${child.nodeRef}"
	}
	<#if child_has_next> , </#if>
	</#list>
]}
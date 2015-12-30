{
"templates" : [
	<#list entries as child>
	{
	    "name" : "${child.name}",
	    "title": "${child.title}",
	    "nodeRef" : "${child.nodeRef}",
	    "expireDate" : "${child.expireDate}"
	}
	<#if child_has_next> , </#if>
	</#list>
]}
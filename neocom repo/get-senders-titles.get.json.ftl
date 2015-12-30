{
	"sender" : [
		<#list docSenderName as child>
		
		 "${child}"
		
		<#if child_has_next> , </#if>
		</#list>
	],

	"title" : [
		<#list docTitle as child>
		
		 "${child}"
		
		<#if child_has_next> , </#if>
		</#list>
	]

}
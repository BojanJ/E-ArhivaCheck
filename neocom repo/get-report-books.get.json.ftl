{
	"registries" : [
	<#list entries as child>
		{
		    "name" : "${child.name}",
		    "archiveSign" : "${child.archiveSign}",
		    "acceptDate" : "${child.acceptDate}",
		    "senderId" : "${child.senderId}",
		    "sender" : "${child.sender}",
		    "dateRazvod" : "${child.dateRazvod}",
		    "oznakaRazvod" : "${child.oznakaRazvod}",
		    "sendDate" : "${child.sendDate}",
		    "orgEdinica" : "${child.orgEdinica}",
		    "podBroj" : "${child.podBroj}",
		    "nodeRef" : "${child.nodeRef}",
			"fullArchSign" : "${child.fullArchSign}",
			"isDeleted" : "${child.isDeleted}",
			"documentNodeRef" : "${child.documentNodeRef}",
			"attachedDoc" : "${child.attachedDoc}"
		}
		<#if child_has_next> , </#if>
	</#list>
	]
}
{
	"registries" : [
	<#list documents as child>
		{
			"fullName" : "${child.fullName}",
		    "name" : "${child.name}",
		    "archiveSign" : "${child.archiveSign}",
		    "acceptDate" : "${child.acceptDate}",
		    "senderId" : "${child.senderId}",
		    "sender" : "${child.sender}",
		    "dateRazvod" : "${child.dateRazvod}",
		    "oznakaRazvod" : "${child.oznakaRazvod}",
		    "sendDate" : "${child.sendDate}",
		    "dateExpire" : "${child.dateExpire}",
		    "orgEdinica" : "${child.orgEdinica}",
		    "orgSubUnit" : "${child.orgSubUnit}",
		    "podBroj" : "${child.podBroj}",
		    "note" : "${child.note}",
		    "nodeRef" : "${child.nodeRef}",
			"fullArchSign" : "${child.fullArchSign}"
		}
		<#if child_has_next> , </#if>
	</#list>
	]
}
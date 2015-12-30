function main()
{
/*
	var username = person.properties.userName;
	var site = siteService.listUserSites(username, 0); 
	var siteName = null;

	var array=null;

	for(i in site)
	{
		var ime = site[i].shortName;
		if(ime.indexOf("arhiva") > -1)
			siteName = ime;
	}

	var archiveSite = null;
	var username = person.properties.userName;
	for(i in companyhome.childByNamePath("Sites").children)
	{
		var folder = companyhome.childByNamePath("Sites").children[i];
		var ime = folder.name;
		if(ime.indexOf(siteName) > -1)
			archiveSite = folder;
	}
	var docLib = archiveSite.childByNamePath("documentLibrary");
	//var arhSigns = docLib.childByNamePath("arhivskiZnaci");

	var children = docLib.children;
	var archiveSignFolder = null;
	for (j=0; j<children.length; j++)
	{
		var c = children[j];
		if (c.isContainer)
		{
			//if(c.typeShort == "ncom:template")
			if(c.typeShort == "ncom:ArchiveSigns")
			{
				archiveSignFolder = c;
			}
		}
	} 	
*/
	if (args.nodeRef == undefined || args.nodeRef.length == 0)
	{
	   status.code = 400;
	   status.message = "Search term has not been provided.";
	   status.redirect = true;
	}
	else
	{
	   // perform count
	   var archiveSignFolder = search.findNode(args.nodeRef);
	   //var num = node.children.length;
	   //model.number = num;
	

		var templates = {
	        template: []
	    };

	    for(var i in archiveSignFolder.children){
			var templateItem = archiveSignFolder.children[i]; //ncom:ounit
			//&& templateItem.isDocument)
			if(templateItem.type == "{http://www.neocom.com.mk/model/neocommodel/1.0}template"){  

				var expireDate = 0;
				if(templateItem.properties["ncom:expireMonths"] != null)
					expireDate = templateItem.properties["ncom:expireMonths"];

				templates.template.push({ 
			        "name" : templateItem.name,
			        "title" : templateItem.properties.title,
			        "nodeRef"  : templateItem.nodeRef,
			        "expireDate" : expireDate
			    });
			}
	    }
		// Put the created site into the model  
		model.entries = templates.template; 
	}  
}
main();
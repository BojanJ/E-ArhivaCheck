function main()
{
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
////
	var children = docLib.children;
	var archiveFolder = null;
	for (j=0; j<children.length; j++)
	{
		var c = children[j];
		if (c.isContainer)
		{
			if(c.typeShort == "ncom:Archive")
			{
				archiveFolder = c;
				//print("YES" + c.typeShort); // == "ncom:Archive");
			}
		}
	} 	
////	
	var registries = {
        registry: []
    };
    
	// деловодниците ни се во фолдер Архива во Document Library
    for(var i in archiveFolder.children){
		var registryItem = archiveFolder.children[i];
		if(registryItem.type == "{http://www.neocom.com.mk/model/neocommodel/1.0}Registry")
	        registries.registry.push({ 
	            "name" : registryItem.name,
	            "title" : registryItem.properties.title,
	            "nodeRef"  : registryItem.nodeRef
	        });
    }


  /*  for (var i =0; i < children.length; i++){
    	if()
    }*/


    // Put the created site into the model 
	model.entries = registries.registry;
}
main();
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

	var children = docLib.children;
	var archiveSignFolder = null;
	for (j=0; j<children.length; j++)
	{
		var c = children[j];
		if (c.isContainer)
		{
			if(c.typeShort == "ncom:ArchiveSigns")
			{
				archiveSignFolder = c;
			}
		}
	}

	var orgunits = {
        unit: []
    };

    for(var i in archiveSignFolder.children){
		var unitItem = archiveSignFolder.children[i]; //ncom:ounit
		if(unitItem.type == "{http://www.neocom.com.mk/model/neocommodel/1.0}ounit"){ 
			orgunits.unit.push({ 
		        "name" : unitItem.name,
		        "title": unitItem.properties.title,
		        "nodeRef"  : unitItem.nodeRef
		    });
		}
    }
	// Put the created site into the model  
	model.entries = orgunits.unit;   
}
main();
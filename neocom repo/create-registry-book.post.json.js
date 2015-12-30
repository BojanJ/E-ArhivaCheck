//Parsing date from mm/dd/yyyy to correct Alfresco Date
function dateFromISO8601(isostr) {
	var parts = isostr.match(/\d+/g);
	//return new Date(parts[2], parts[0]-1, parts[1]);
	return parts[2] +"-"+ parts[0] +"-"+ parts[1]+"T00:00:00.451+02:00";
	  //0 month
	  //1 day
	  //2 year
}

function main()
{
	var username = person.properties.userName;
	var site = siteService.listUserSites(username, 0); 
	var siteName = null;

	for(i in site)
	{
		var ime = site[i].shortName;
		if(ime.indexOf("arhiva") > -1)
			siteName = ime;
	}

	var archiveSite = null;

	for(i in companyhome.childByNamePath("Sites").children)
	{
		//var folder = companyhome.childByNamePath("Sites").children.childByNamePath("siteName");
		var folder = companyhome.childByNamePath("Sites").children[i];
		var ime = folder.name;
		logger.log(ime);
		if(ime.indexOf(siteName) > -1)
			archiveSite = folder;
	}
	var docLib = archiveSite.childByNamePath("documentLibrary");
	// If no archive site found
	if (docLib == null)
	{
	    status.setCode(status.STATUS_FORBIDDEN, "Не постои фолдер Document Library");
	    //return;
	}
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
	if (archiveFolder == null)
	{
	    status.setCode(status.STATUS_FORBIDDEN, "Не постои фолдер Архива");
	    return;
	}

	
	var title = null;
	// Get the details of the registry
	if (json.has("namePost") == false || json.get("namePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	title = json.get("namePost");
	   
	var year = null;
	// Get the details of the registry
	if (json.has("yearPost") == false || json.get("yearPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете година за деловодникот");
	   return;
	}
	year = json.get("yearPost");
	   
	var activeTmp = null;
	var active = null;
	// Get the details of the registry
	if (json.has("activePost") == false)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете статус на деловодникот");
	   return;
	}
	activeTmp = json.get("activePost");
	if(activeTmp == "on")
		active = true;
	else active = false;
	//---------------------------------------------------------------------------------------
	// Check if folder (registry) exists  
	//---------------------------------------------------------------------------------------  
	   
	// Create the registry 
	var today = new Date();
	var registry = null;   
	//registry = docLib.createNode(title, "ncom:Registry"); 
	registry = archiveFolder.createNode(title, "ncom:Registry"); 
	registry.properties["ncom:year"] = year; 
	registry.properties["ncom:counter"] = 0;
	registry.properties["ncom:isActive"] = active;  
	registry.properties["ncom:dateCreated"] = today;
	registry.properties["cm:title"] = title;
	registry.save();   
	// Put the created site into the model   
	model.registry = registry;   
	model.info = "Успешно додаден деловодник";
}
main();
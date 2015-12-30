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

	if (archiveSignFolder == null)
	{
	    status.setCode(status.STATUS_FORBIDDEN, "Не постои фолдер Архивски знаци");
	    return;
	}

	var title = null;
	var orgunitsign = null;
	var expireMonths = null;
	var groups = null;

	// Get the details of the registry
	if (json.has("namePost") == false || json.get("namePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на организационата единица");
	   return;
	}
	title = json.get("namePost");
	
	// Get the details of the registry
	if (json.has("orgunitPost") == false || json.get("orgunitPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете организациона единица");
	   return;
	}
	orgunitsign = json.get("orgunitPost");

	if (json.has("expireMonthsPost") == false || json.get("expireMonthsPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете статус на организационата единица");
	   return;
	}
	expireMonths = json.get("expireMonthsPost");

	if (json.has("groupsPost") == false || json.get("groupsPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете група на организационата единица");
	   return;
	}
	groups = json.get("groupsPost");
	//---------------------------------------------------------------------------------------
	// Check if folder (orgunit) exists  
	//---------------------------------------------------------------------------------------  

	// Create the orgunit 
	var today = new Date();
	var orgunit = null;   
	//orgunit = docLib.createNode(title, "ncom:ounit"); 
	orgunit = archiveSignFolder.createNode(orgunitsign, "ncom:ounit");
	orgunit.properties["ncom:OUexpireMonths"] = expireMonths;
	orgunit.properties["ncom:OUgroups"] = groups;
	orgunit.properties["cm:title"] = title;
	orgunit.save();
	// Put the created site into the model
	model.orgunit = orgunit;
	model.info = "Успешно додадена орг. единица";
}
main();
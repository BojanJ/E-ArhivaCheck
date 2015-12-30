//Parsing date from mm/dd/yyyy to correct Alfresco Date
function dateFromISO8601(isostr) {
	var parts = isostr.match(/\d+/g);
	//return new Date(parts[2], parts[0]-1, parts[1]);
	return parts[2] +"-"+ parts[0] +"-"+ parts[1]+"T00:00:00.451+02:00";
	  //0 month
	  //1 day
	  //2 year
}

function getNodeRef(noderef)
{
	var space = search.findNode(noderef);
	return space;
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

	var orgunitsign = null;
	var templatesign = "";
	var title = "";
	var expireMonths = "";
	var groups = "";
	var templateIndex = null;

	if (json.has("namePost") == false || json.get("namePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на организационата подединица");
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

	if (json.has("templatePost") == false || json.get("templatePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете организациона подединица");
	   return;
	}
	templatesign = json.get("templatePost");

	if (json.has("expireMonthsPost") == false || json.get("expireMonthsPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете месец на чување на организационата единица");
	   return;
	}
	expireMonths = json.get("expireMonthsPost");

	if (json.has("groupsPost") == false || json.get("groupsPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете група на организационата подединица");
	   return;
	}
	groups = json.get("groupsPost");
	//---------------------------------------------------------------------------------------
	// Check if folder (template) exists  
	//---------------------------------------------------------------------------------------  
	var orgunit = getNodeRef(orgunitsign);
	// Create the template 
	var today = new Date();
	var template = null;   

	template = orgunit.createNode(templatesign, "ncom:template"); 
	//template.content = "No content";
	template.properties["ncom:expireMonths"] = expireMonths; 
	template.properties["ncom:groups"] = groups;
	template.properties["ncom:tmpIndex"] = orgunitsign;  
	//template.properties["ncom:dateCreated"] = today;
	template.properties["cm:title"] = title;
	template.save();   
	// Put the created site into the model 
	model.orgunit = orgunit;  
	model.template = template;
	model.info = "Успешно додадена орг. подединица";
}
main();
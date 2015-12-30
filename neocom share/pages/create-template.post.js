function getArchiveSite()
{
	var json = remote.call("/neocom/get-site");
	
	// create json object from data
	if (json.status == 200)
    {
		var values = eval('('+json+')');
        return values["sites"];
    }
    else
    {
    	//return status.message = "First create site which contain name arhiva";
        return null;
    }
}

function getNodeRef(input)
{
	var parts = input.split('Node Ref: ');
	return parts[1];
}

function main()
{
	var orgunit = "";
	var template = "";
	var title = "";
	var expireMonths = "";
	var groups = "";
	var templateIndex = null;
	
	// locate file attributes
	for each (field in formdata.fields)
	{
	  if (field.name == "title")
	  {
	    title = field.value;
	  }
	  else if (field.name == "orgunit")
	  {
	  	orgunit = getNodeRef(field.value);
	  }
	  else if (field.name == "template")
	  {
		template = field.value;
	  }
	  else if (field.name == "expireMonths")
	  {
		expireMonths = field.value;
	  }
	  else if (field.name == "groups")
	  {
		groups = field.value;
	  }
	}
	
	var formData =
	{
	   namePost: title,
	   orgunitPost: orgunit,
	   templatePost: template,
	   expireMonthsPost: expireMonths,
	   groupsPost: groups
	};
	
	var jsonData = jsonUtils.toJSONString(formData);
	
	var connector = remote.connect("alfresco");
	var repoResponce = connector.post("/neocom/create-template", jsonData, "application/json");

	var repoJSON = eval('(' + repoResponce + ')');
	model.result = repoJSON["responseResult"]; 

	var siteJSON = getArchiveSite();
	var site = siteJSON[0].shortName;
	
	var orgunitparentName = escape(repoJSON.responseResult[0].parentParentName).replace(/%/g,"%25");
	var orgunit = repoJSON.responseResult[0].parentName

	if(status.code == 200)
	{
		if(site != null)
		{
			// ovde treba da go snimam vo /documentlibrary vo folder arhiva
			//status.location = url.context + "/page/site/" + site + "/documentlibrary#filter=path|%2FАрхива";
			status.location = url.context + "/page/site/" + site + "/documentlibrary#filter=path|%2F" + orgunitparentName + "%2F"+orgunit;
			
		}
		else status.location = url.context;
	}
	else status.location = "/error"
}
main();
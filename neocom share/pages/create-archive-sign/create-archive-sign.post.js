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

function main()
{
	var title = "";
	var year = "";
	var active = "";
	var count = 0;
	
	// locate file attributes
	for each (field in formdata.fields)
	{
	  if (field.name == "title")
	  {
	    title = field.value;
	  }
	  else if (field.name == "year")
	  {
	    year = field.value;
	  }
	  else if (field.name == "active")
	  {
		  active = field.value;
	  }
	}
	
	var formData =
	{
	   namePost: title,
	   yearPost: year,
	   activePost: active
	};
	
	var jsonData = jsonUtils.toJSONString(formData);
	
	var connector = remote.connect("alfresco");
	var repoResponce = connector.post("/neocom/create-registry-book", jsonData, "application/json");

	var repoJSON = eval('(' + repoResponce + ')');
	model.result = repoResponce["responseResult"]; 
	var siteJSON = getArchiveSite();
	var site = siteJSON[0].shortName;
	
	if(status.code == 200)
	{
		if(site != null)
		{
			// ovde treba da go snimam vo /documentlibrary vo folder arhiva
			//status.location = url.context + "/page/site/" + site + "/documentlibrary/#filter=path|%2FАрхива";
			status.location = url.context + "/page/site/" + site + "/documentlibrary";
			
		}
		else status.location = url.context;
	}
	else status.location = "/error"
}
main();
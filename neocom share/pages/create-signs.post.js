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
	var archiveSignF = "";
	var content = "";
	
	// locate file attributes
	for each (field in formdata.fields)
	{
	  if (field.name == "archiveSignFolder")
	  {
		  archiveSignF = field.value;
	  }
	  else if (field.name == "file" && field.isFile)
	  {
		  content = field.content;
	  }
	}
	
	var formData =
	{
	   archiveSignFolderPost: archiveSignF,
	   //contentPost: jsonUtils.toJSONString(content.content)
	   contentPost: content.content
	};
	
	var jsonData = jsonUtils.toJSONString(formData);
	
	var connector = remote.connect("alfresco");
	var repoResponce = connector.post("/neocom/create-signs", jsonData, "application/json");

	var repoJSON = eval('(' + repoResponce + ')');
	model.result = repoJSON["responseResult"]; 

	var siteJSON = getArchiveSite();
	var site = siteJSON[0].shortName;
	
	var parentName = escape(repoJSON.responseResult[0].parentName).replace(/%/g,"%25");

	if(status.code == 200)
	{
		if(site != null)
		{
			// ovde treba da go snimam vo /documentlibrary vo folder arhiva
			//status.location = url.context + "/page/site/" + site + "/documentlibrary#filter=path|%2FАрхива";
			status.location = url.context + "/page/site/" + site + "/documentlibrary#filter=path|%2F" + parentName + "|&page=1";			
		}
		else status.location = url.context;
	}
	else status.location = "/error"
}
main();
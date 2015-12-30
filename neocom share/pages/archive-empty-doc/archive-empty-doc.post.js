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
	var filename = null; //null
	var content = null; //null
	var title = "";
	var name = "";
	var org_unit = "";
	var template = "";
	var registry_book = "";


	// locate file attributes
	for each (field in formdata.fields)
	{
	  if (field.name == "orgunit")
	  {
		  org_unit = field.value;
	  }
	  else if (field.name == "template")
	  {
		  template = field.value;
	  }
	  else if (field.name == "registry_book")
	  {
		  registry_book = getNodeRef(field.value);
	  }
	  else if (field.name == "title")
	  {
	    title = field.value;
	  }
	}
	
	var formData =
	{
	   namePost: title,
	   org_unitPost: org_unit,
	   templatePost: template,
	   registry_bookPost: registry_book,
	};

	var jsonData = jsonUtils.toJSONString(formData);
	
	var connector = remote.connect("alfresco");
	var repoResponce = connector.post("/neocom/create-archive-empty-doc", jsonData, "application/json");
	var repoJSON = eval('(' + repoResponce + ')');
	model.result = repoJSON["responseResult"]; 

	var modeRefParent = repoJSON.responseResult[0].parentNodeRef;

	var siteJSON = getArchiveSite();
	var site = siteJSON[0].shortName;

	//var registryParent = "%2F"+escape(regParent).replace(/%/g,"%25"); 
	//--------------------------------------------------------------------------------------------------

	if(status.code == 200)
	{
		if(site != null)
			status.location = url.context + "/page/site/" + site + "/document-details?nodeRef="+modeRefParent;
		else status.location = url.context;
	}
	else status.location = "/error"
}
main();
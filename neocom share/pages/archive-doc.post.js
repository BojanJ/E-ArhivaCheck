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
	var arch_sign = "";
	var date_archived = "";
	var sender = "";
	var sender_arch_sign = "";
	var date_sent = "";
	var div_sign = "";
	var date_div = "";
	var date_expire = "";
	var note = "";


	// locate file attributes
	for each (field in formdata.fields)
	{
	  if (field.name == "orgunit")
	  {
		  org_unit = getNodeRef(field.value);
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
	  else if (field.name == "arch_sign")
	  {
		  arch_sign = field.value;
	  }
	  else if (field.name == "date_archived")
	  {
	  	if(field.value == "" || field.value == null){
	  		var today = new Date();
			var todayDate = today.getDate() + "/" + (today.getMonth()+1) +"/"+ today.getFullYear();
			date_archived = todayDate;
	  	}else{
	  		date_archived = field.value;
	  	}
	  }
	  else if (field.name == "sender")
	  {
	  	if(field.value == "" || field.value == null){
	  		sender = "С.П.";
	  	}else{
	  		sender = field.value;
	  	}
	  }
	  else if (field.name == "sender_arch_sign")
	  {
		  sender_arch_sign = field.value;
	  }
	  else if (field.name == "date_sent")
	  {
	  	if(field.value == "" || field.value == null){
	  		date_sent = date_archived;
	  	}else{
	  		date_sent = field.value;
	  	}
	  }
	  else if (field.name == "div_sign")
	  {
		  div_sign = field.value;
	  }
	  else if (field.name == "date_div")
	  {
		  date_div = field.value;
	  }
	  else if (field.name == "date_expire")
	  {
		  date_expire = field.value;
	  }
	  else if (field.name == "note")
	  {
		  note = field.value;
	  }
	  else if (field.name == "file" && field.isFile)
	  {
	    filename = field.filename;
	    content = field.content;
	  }
	}
	
	var formData =
	{
	   namePost: title,
	   org_unitPost: org_unit,
	   templatePost: template,
	   registry_bookPost: registry_book,
	   arch_signPost: arch_sign,
	   date_archivedPost: date_archived,
	   senderPost: sender,
	   sender_arch_signPost: sender_arch_sign,
	   date_sentPost: date_sent,
	   div_signPost: div_sign,
	   date_divPost: date_div,
	   date_expirePost: date_expire,
	   notePost: note,
	   filenamePost: filename,
	   contentPost: content.content,
	   mimetypePost: content.mimetype
	};

	var jsonData = jsonUtils.toJSONString(formData);
	
	var connector = remote.connect("alfresco");
	var repoResponce = connector.post("/neocom/create-archive-empty", jsonData, "application/json");
	var repoJSON = eval('(' + repoResponce + ')');
	//model.result = repoJSON["responseResult"]; 

	var nodeRefParent = repoJSON.responseResult[0].parentNodeRef;
	var myNodeRef = repoJSON.responseResult[0].nodeRef;

	var siteJSON = getArchiveSite();
	var site = siteJSON[0].shortName;

	//var registryParent = "%2F"+escape(regParent).replace(/%/g,"%25"); 
	//--------------------------------------------------------------------------------------------------

	if(status.code == 200)
	{
		if(site != null)
			if (filename == null || filename == undefined || content == undefined)
				status.location = url.context + "/page/site/" + site + "/document-details?nodeRef="+nodeRefParent;
			else
				status.location = url.context + "/page/site/" + site + "/document-details?nodeRef="+myNodeRef;
		else status.location = url.context;
	}
	else status.location = "/error"
}
main();
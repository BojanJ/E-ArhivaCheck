//Parsing date from mm/dd/yyyy to correct Alfresco Date
function dateFromISO8601(isostr) {
	var parts = isostr.match(/\d+/g);
	return parts[2] +"-"+ parts[0] +"-"+ parts[1]+"T00:00:00.451+01:00";
	//0 month
	//1 day
	//2 year
}
  
function dateFromString(isostr) {
	var parts = isostr.match(/\d+/g);
	return new Date(parts[0], parts[1]-1,parts[2]);
	//0 month
	//1 day
	//2 year
}

function getRegistryBook(noderef)
{
	var space = search.findNode(noderef);
	return space;
}

function getRegistryFromNumber(registryBook, arh_num)
{
	for(i in registryBook.children)
	{
		var entry = registryBook.children[i];
		if(entry.properties["ncom:subIndex"] == arh_num)
			return entry;
	}
}

function main()
{
	var filename = null; //null
	var content = null; //null
	var title = "";
	var org_unit = "";
	var registry_book = "";
	var ar_num = "";
	var date_archived = "";
	var sender = "";
	var sender_ar_num = "";
	var note = "";
	
	if (json.has("namePost") == false || json.get("namePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	title = json.get("namePost");
	if (json.has("org_unitPost") == false || json.get("org_unitPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	org_unit = json.get("org_unitPost");
	if (json.has("registry_bookPost") == false || json.get("registry_bookPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	registry_book = json.get("registry_bookPost");
	if (json.has("ar_numPost") == false || json.get("ar_numPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	ar_num = json.get("ar_numPost");
	if (json.has("date_archivedPost") == false || json.get("date_archivedPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	date_archived = json.get("date_archivedPost");
	if (json.has("senderPost") == false || json.get("senderPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	sender = json.get("senderPost");
	if (json.has("sender_ar_numPost") == false || json.get("sender_ar_numPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	sender_ar_num = json.get("sender_ar_numPost");
	if (json.has("notePost") == false || json.get("notePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	note = json.get("notePost");
	
	var registryBook = getRegistryBook(registry_book);
	var index = registryBook.properties["ncom:counter"] + 1;
	registryBook.properties["ncom:counter"] = index;
	registryBook.save();
	if(ar_num == "0")
	{
		var subRegister = null;
		var index = registryBook.children.length+1;
		if(registryBook.children.length+1  < 10)
			subRegister = registryBook.createNode("0"+index + "_" + title, "ncom:subRegister");
		else 
			subRegister = registryBook.createNode(index  + "_" + title, "ncom:subRegister");
		subRegister.properties["ncom:subCounter"] = 1;
		subRegister.properties["ncom:subIndex"] = registryBook.children.length;
		subRegister.properties["ncom:isRecord"] = true;
		subRegister.save();
		
		//ar_num is supposed to be ar_sign selected from the dropdown
		var emptyFile = subRegister.createNode(ar_num+"_"+registryBook.children.length+"_"+subRegister.children.length+1 + "_" + title, "ncom:document");
		emptyFile.content = "No content";
		
		//Date archived
		//var tmp = dateFromISO8601(datum);
		//var datum = utils.fromISO8601(tmp);
		emptyFile.properties["ncom:date"] = dateFromString(date_archived);
		emptyFile.properties["ncom:sender"] = sender;
		emptyFile.properties["ncom:senderId"] = sender_ar_num;
		emptyFile.properties["ncom:orgUnit"] = org_unit;
		//emptyFile.properties["ncom:expireDate"] = dateFromISO8601(date_archived);
		emptyFile.properties["ncom:note"] = note;
		emptyFile.properties["ncom:regId"] = subRegister.nodeRef;
		emptyFile.properties["ncom:index"] = registryBook.children.length;
		emptyFile.properties["ncom:seqIndex"] = subRegister.children.length
		emptyFile.properties.title = title;
		emptyFile.properties.description = note;
		emptyFile.save();
		model.noderef = emptyFile.nodeRef;
	}
	else
	{
		var subRegister = null;
		for(i in registryBook.children)
		{
			var entry = registryBook.children[i];
			if(entry.properties["ncom:subIndex"]+"" == ar_num)
				subRegister = entry;
		}
		
		subRegister.properties["ncom:subCounter"] = subRegister.properties["ncom:subCounter"]+1;
		subRegister.properties["ncom:subIndex"] = registryBook.children.length;
		subRegister.properties["ncom:isRecord"] = true;
		subRegister.save();
		
		var emptyFile = subRegister.createNode(ar_num+"_"+registryBook.children.length+"_"+subRegister.children.length+1 + "_" + title, "ncom:document");
		emptyFile.content = "No content";
		//Data arhivirano
		emptyFile.properties["ncom:date"] = dateFromString(date_archived);
		emptyFile.properties["ncom:sender"] = sender;
		emptyFile.properties["ncom:senderId"] = sender_ar_num;
		emptyFile.properties["ncom:orgUnit"] = org_unit;
		//emptyFile.properties["ncom:expireDate"] = dateFromISO8601(date_archived);
		emptyFile.properties["ncom:note"] = note;
		emptyFile.properties["ncom:regId"] = subRegister.nodeRef;
		emptyFile.properties["ncom:index"] = registryBook.children.length;
		emptyFile.properties["ncom:seqIndex"] = subRegister.children.length
		emptyFile.properties.title = title;
		emptyFile.properties.description = note;
		emptyFile.save();
		model.noderef = emptyFile.nodeRef;
	}
}
main();
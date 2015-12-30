//Parsing date from mm/dd/yyyy to correct Alfresco Date
function dateFromISO8601(isostr) {
	var parts = isostr.match(/\d+/g);
	return parts[2] +"-"+ parts[1] +"-"+ parts[0]+"T00:00:00.451+01:00";
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

function getNodeRef(noderef)
{
	var space = search.findNode(noderef);
	return space;
}

function getRegistryFromNumber(registryBook, arch_sign)
{
	for(i in registryBook.children)
	{
		var entry = registryBook.children[i];
		if(entry.properties["ncom:subIndex"] == arch_sign)
			return entry;
	}
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
	var mimetypeAR = "";

	if (json.has("namePost") == false || json.get("namePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на архивираниот документ");
	   return;
	}
	title = json.get("namePost");

	if (json.has("org_unitPost") == false || json.get("org_unitPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете организациона единица");
	   return;
	}
	org_unit = json.get("org_unitPost");

	if (json.has("templatePost") == false || json.get("templatePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете организациона подединица");
	   return;
	}
	template = json.get("templatePost");

	if (json.has("registry_bookPost") == false || json.get("registry_bookPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	registry_book = json.get("registry_bookPost");

	if (json.has("arch_signPost") == false || json.get("arch_signPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете архивски број");
	   return;
	}
	arch_sign = json.get("arch_signPost");

	if (json.has("date_archivedPost") == false || json.get("date_archivedPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете датум на архивирање");
	   return;
	}
	date_archived = json.get("date_archivedPost");

	if (json.has("senderPost") == false || json.get("senderPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете назив на испраќач");
	   return;
	}
	sender = json.get("senderPost");

/*	if (json.has("sender_arch_signPost") == false || json.get("sender_arch_signPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете архивски број на испраќач");
	   return;
	}*/
	sender_arch_sign = json.get("sender_arch_signPost");

/*	if (json.has("date_sentPost") == false || json.get("date_sentPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете датум на испраќање");
	   return;
	}*/
	date_sent = json.get("date_sentPost");

//	/*if (json.has("div_signPost") == false || json.get("div_signPost").length == 0)
//	{
//	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете ознака на развод");
//	   return;
//	}*/
	div_sign = json.get("div_signPost");

//	/*if (json.has("date_divPost") == false || json.get("date_divPost").length == 0)
//	{
//	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете датум на развод");
//	   return;
//	}*/
	date_div = json.get("date_divPost");

//	/*if (json.has("date_expirePost") == false || json.get("date_expirePost").length == 0)
//	{
//	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете датум на истекување");
//	   return;
//	}*/
	date_expire = json.get("date_expirePost");

//	/*if (json.has("notePost") == false || json.get("notePost").length == 0)
//	{
//	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
//	   return;
//	}*/
	note = json.get("notePost");

/*	if (json.has("filenamePost") == false) // || json.get("filenamePost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}*/
	filename = json.get("filenamePost");

/*	if (json.has("contentPost") == false) // || json.get("contentPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}*/
	content = json.get("contentPost");

	mimetypeAR = json.get("mimetypePost");

	var registryBook = getNodeRef(registry_book);
	var index = registryBook.properties["ncom:counter"] + 1;
	registryBook.properties["ncom:counter"] = index;
	registryBook.save();
	model.registryBook = registryBook;
	model.info = "Деловодникот е успешно ажуриран";
	
	var orgUnitF = getNodeRef(org_unit);
	var templateF = getNodeRef(template);

	var subRegister = null;
/*
	if(arch_sign == "0")
	{
		//var index = registryBook.children.length+1;
		var subindex = registryBook.children.length+1;

		if(registryBook.children.length+1 < 10)
			//subRegister = registryBook.createNode("0"+index + "_" + title, "ncom:subRegister");
			subRegister = registryBook.createNode("0"+subindex + "_" + title, "ncom:subRegister");
		else 
			//subRegister = registryBook.createNode(index  + "_" + title, "ncom:subRegister");
			subRegister = registryBook.createNode(subindex  + "_" + title, "ncom:subRegister");

		subRegister.properties["ncom:subCounter"] = 1;		
	}
	else
	{
		//var subRegister = null;
		for(i in registryBook.children)
		{
			var entry = registryBook.children[i];
			if(entry.properties["ncom:subIndex"]+"" == arch_sign)
				subRegister = entry;
		}
		
		subRegister.properties["ncom:subCounter"] = subRegister.properties["ncom:subCounter"]+1;
	}
*/
	if(arch_sign == "0")
	{
      var new_arch_sign = Number(arch_sign) + 1;
      arch_sign = new_arch_sign.toString();
    }

//var subRegister = null;
    for(i in registryBook.children)
    {
      var entry = registryBook.children[i];
      //if(entry.properties["ncom:subIndex"]+"" == arch_sign)
      if(entry.properties["ncom:archRSign"] == arch_sign)
      {
        subRegister = entry;
      }
    }
  
  	if (subRegister != null)
    {
        subRegister.properties["ncom:subCounter"] = subRegister.properties["ncom:subCounter"]+1;
    }
    else
    {
      var subindex = registryBook.children.length+1;
      
      if(registryBook.children.length+1 < 10)
        subRegister = registryBook.createNode(orgUnitF.name + "_"+"0"+subindex + "_" + title, "ncom:subRegister");
      else 
        subRegister = registryBook.createNode(orgUnitF.name + "_"+ subindex  + "_" + title, "ncom:subRegister");
      
      subRegister.properties["ncom:subCounter"] = 1;
    //}
      subRegister.properties["ncom:subIndex"] = registryBook.children.length;
    
      subRegister.properties["ncom:isRecord"] = true;
      if (date_expire !="" && date_expire != null)
      {
          subRegister.properties["ncom:expireRDate"] = dateFromISO8601(date_expire);
      }
      if (date_div !="" && date_div != null)
      {
          subRegister.properties["ncom:dataRRazvod"] = dateFromISO8601(date_div);
      }
      subRegister.properties["ncom:oznakaRRazvod"] = div_sign;
      subRegister.properties["ncom:archRSign"] = arch_sign;
	}
	subRegister.save();

  	var subRegChildren = Number(subRegister.children.length)+1;


  	var countActive = 1;
  	var subNumbersList = [];
  	var subRegChildren = Number(subRegister.children.length)+1;
  	var childrenNumber = Number(subRegister.children.length);
  	for(var i=0; i<childrenNumber-1; i++){
  		if(subRegister.children[i].properties["ncom:isDeleted"] != true){
  			countActive ++;
  			subNumbersList.push(subRegister.children[i].properties["ncom:seqIndex"])
  		}
  	}

  	if(countActive > 1){
  		countActive = (Math.max.apply(Math, subNumbersList))+1;
  	}

  	if (countActive< 10)
  		countActive = "0"+ countActive.toString();
  	else
      	countActive = countActive.toString();

	var emptyFile = null;

	// ensure mandatory file attributes have been located
	if (filename == null || filename == "" || content == undefined)
	{
		//arch_sign is supposed to be arch_sign selected from the dropdown
		//emptyFile = subRegister.createNode(arch_sign+"_"+registryBook.children.length+"_"+subRegChildren + "_" + title, "ncom:doc");
      	emptyFile = subRegister.createNode(orgUnitF.name+"_"+arch_sign+"_"+Number(countActive).toString() + "_" + title, "ncom:doc");
		//emptyFile.content = "No content";
	}
	else
	{
		//emptyFile = subRegister.createNode(arch_sign+"_"+registryBook.children.length+"_"+subRegChildren + "_" + filename, "ncom:doc");
      	emptyFile = subRegister.createNode(orgUnitF.name+"_"+arch_sign+"_"+Number(countActive).toString() + "_" + filename, "ncom:doc");
	 	//emptyFile.properties.content.write(content);
	 	emptyFile.content=content;
	  	//emptyFile.properties.content.Encoding = "UTF-8";
	  	emptyFile.mimetype = mimetypeAR; //(filename);
	}

	//Date archived
	//var tmp = dateFromISO8601(datum);
	//var datum = utils.fromISO8601(tmp);
	emptyFile.properties["ncom:orgUnit"] = orgUnitF.name;
	emptyFile.properties["ncom:SuborgUnit"] = templateF.name;
	emptyFile.properties["ncom:templ"] = template;	
	emptyFile.properties["ncom:regId"] = subRegister.nodeRef;
	emptyFile.properties["ncom:archSign"] = orgUnitF.name+"-"+arch_sign+"/"+Number(countActive).toString();
	emptyFile.properties["ncom:date"] = dateFromISO8601(date_archived);

	emptyFile.properties["ncom:sender"] = sender;
	emptyFile.properties["ncom:senderId"] = sender_arch_sign;
	if (date_sent !="" && date_sent != null)
	{
		emptyFile.properties["ncom:sentDate"] = dateFromISO8601(date_sent);
	}
	emptyFile.properties["ncom:oznakaRazvod"] = div_sign;
	if (date_div !="" && date_div != null)
	{
		emptyFile.properties["ncom:dataRazvod"] = dateFromISO8601(date_div);	
	}
	if (date_expire !="" && date_expire != null)
	{
		emptyFile.properties["ncom:expireDate"] = dateFromISO8601(date_expire);
	}
	emptyFile.properties["ncom:note"] = note;
	emptyFile.properties["ncom:index"] = registryBook.children.length;
	emptyFile.properties["ncom:seqIndex"] = countActive;
	emptyFile.properties.title = title;
	emptyFile.properties.description = note;

	emptyFile.save();
	model.emptyFile = emptyFile; 
	model.info = "Документот е успешно додаден ";
}
main();
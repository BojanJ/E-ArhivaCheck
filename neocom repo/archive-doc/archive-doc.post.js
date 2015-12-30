function dateFromISO8601(isostr) {
	var parts = isostr.match(/\d+/g);
	return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
}

var filename = null; //null
var content = null; //null
var title = "";
var org_unit = "";
var registry_book = "";
var ar_num = "";
var title = "";
var date_archived = "";
var sender = "";
var sender_ar_num = "";
var note = "";


// locate file attributes
for each (field in formdata.fields)
{
  if (field.name == "title")
  {
    title = field.value;
  }
  else if (field.name == "note")
  {
    description = field.value;
  }
  else if (field.name == "file" && field.isFile)
  {
    filename = field.filename;
    content = field.content;
  }
  else if (field.name == "org_unit")
  {
	  org_unit = field.value;
  }
  else if (field.name == "registry_book")
  {
	  registry_book = field.value;
  }
  else if (field.name == "ar_num")
  {
	  ar_num = field.value;
  }
  else if (field.name == "date_archived")
  {
	  date_archived = field.value;
  }
  else if (field.name == "sender")
  {
	  sender = field.value;
  }
  else if (field.name == "sender_ar_num")
  {
	  sender_ar_num = field.value;
  }
  else if (field.name == "note")
  {
	  note = field.value;
  }
}

// ensure mandatory file attributes have been located
if (filename == undefined || content == undefined)
{
  status.code = 400;
  status.message = "Uploaded file cannot be located in request";
  status.redirect = true;
}
else
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
			}
		}
	}
	if (archiveFolder == null)
	{
	    status.setCode(status.STATUS_FORBIDDEN, "Не постои фолдер Архива");
	    //return;
	} 
	
	var registry = null;
	
    for(var i in archiveFolder.children){
		var registryItem = archiveFolder.children[i];
		if(registryItem.type == "{http://www.neocom.com.mk/model/neocommodel/1.0}Registry" && registryItem.properties["ncom:isActive"] == true)
			{ 
				if (registryItem.name == registry_book)
					{
						registry = registryItem;
					}
			}
    }	
  //filename = userhome.children.length;
  // create document in folder Archive in choosen folder for registry

  var folder = companyhome.childByNamePath("Sites/" + archiveSite.name + "/documentlibrary/" + archiveFolder.name + "/" + registry.name));
  upload = folder.createNode(filename, "ncom:doc");
  upload.properties.content.write(content);
  upload.properties.content.setEncoding("UTF-8");
  upload.properties.content.guessMimetype(filename);
  
  // NE parsira datum ko sto treba
  upload.properties["ncom:date"] = dateFromISO8601(date_archived);
  upload.properties["ncom:sender"] = sender;
  upload.properties["ncom:senderId"] = sender_ar_num;
  upload.properties["ncom:orgUnit"] = org_unit;
  //upload.properties["ncom:expireDate"] = date_archived;
  upload.properties["note"] = note;
  upload.properties.title = title;
  upload.properties.description = description;
  upload.save();
 
  // setup model for response template
  model.upload = upload;
};
main();
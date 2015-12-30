function main()
{
	var archiveSignFolder = null;
	// Get the details of the registry
	if (json.has("archiveSignFolderPost") == false || json.get("archiveSignFolderPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително внесете наслов на деловодникот");
	   return;
	}
	archiveSignFolder = json.get("archiveSignFolderPost");
	   
	var JSONsigns = null;
	// Get the details of the registry
	if (json.has("contentPost") == false || json.get("contentPost").length == 0)
	{
	   status.setCode(status.STATUS_BAD_REQUEST, "Задолжително изберете документ за креирање на архивски знаци");
	   return;
	}
	JSONsigns = json.get("contentPost");
	
	// create archive sign structure from content
    var archiveSignF = search.findNode(archiveSignFolder);
  	model.archiveSignF = archiveSignF; 

	// ensure mandatory file attributes have been located
	if (archiveSignFolder == undefined || JSONsigns == undefined)
	{
	  status.code = 400;
	  status.message = "Uploaded file cannot be located in request";
	  status.redirect = true;
	  model.info = "Настана грешка";
	}
	else
	{      
      var arr = eval ("(" + JSONsigns + ")");
	  var today = new Date();
      var orgunit = null;
      var template = null;
      var i;
	  var j;
      for(i = 0; i < arr.orgunits.length; i++) {
          orgunit = null;    
          orgunit = archiveSignF.createNode(arr.orgunits[i].name, "ncom:ounit");
          if (arr.orgunits[i].OUexpireMonths != "")
          	orgunit.properties["ncom:OUexpireMonths"] = arr.orgunits[i].OUexpireMonths;
          if (arr.orgunits[i].OUgroups != "")
          	orgunit.properties["ncom:OUgroups"] = arr.orgunits[i].OUgroups;
          orgunit.properties["cm:title"] = arr.orgunits[i].title;
          orgunit.properties["cm:description"] = arr.orgunits[i].description;
          orgunit.save();

          if (arr.orgunits[i].templates != undefined)
          {
            j = 0;
            for(j = 0; j < arr.orgunits[i].templates.length; j++) {
              template = null;
              template = orgunit.createNode(arr.orgunits[i].templates[j].name, "ncom:template");

              if (arr.orgunits[i].templates[j].expireMonths != "")
              	template.properties["ncom:expireMonths"] = arr.orgunits[i].templates[j].expireMonths;

              if (arr.orgunits[i].templates[j].groups != "")
              	template.properties["ncom:groups"] = arr.orgunits[i].templates[j].groups;

              template.properties["ncom:tmpIndex"] = orgunit.nodeRef;
           		// template.properties["ncom:tmpIndex"] = arr.orgunits[i].name;
            //template.properties["ncom:dateCreated"] = today;
              template.properties["cm:title"] = arr.orgunits[i].templates[j].title;
              template.save(); 
            }
          }
        
		}
		model.info = "Архивските знаци се успешно креирани";
    }
	
}
main();
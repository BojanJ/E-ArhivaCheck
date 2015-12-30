function main(){
	var username = person.properties.userName;
	var site = siteService.listUserSites(username, 0);
	var siteName = null;

	for(i in site){
		var ime = site[i].shortName;
	  	if(ime.indexOf("arhiva") > -1)
	      siteName = ime;
	}

	var archiveSite = null;
	for(i in companyhome.childByNamePath("Sites").children){
		var folder = companyhome.childByNamePath("Sites").children[i];
	  	var ime = folder.name;
	  if(ime.indexOf(siteName) > -1)
	    archiveSite = folder;
	}

	var docLib = archiveSite.childByNamePath("documentLibrary");

	var children = docLib.children;
	var archiveFolder = null;
	for(var j=0; j<children.length; j++){
	  var c = children[j];
	  if(c.isContainer){
	    if(c.typeShort == "ncom:Archive"){
	    	archiveFolder = c;
	    }
	  }
	}

	var registry = {
	 // registry : []
	};

	for(var i in archiveFolder.children){
	  var registryItem = archiveFolder.children[i]; logger.log(registryItem.properties["ncom:isActive"])
	  if(registryItem.type == "{http://www.neocom.com.mk/model/neocommodel/1.0}Registry" && registryItem.properties["ncom:isActive"] == true)
	    registry = ({
	      "name" : registryItem.name,
	      "title" : registryItem.properties.title,
	      "nodeRef" : registryItem.nodeRef
	    });
	  
	  
	}

	var archiveContent = archiveFolder.children[0].children;

	for(var n=0; n<archiveFolder.children.length; n++){
	  if(archiveFolder.children[n].nodeRef == registry.nodeRef){
	  	archiveContent = archiveFolder.children[n].children;
	  }
	}

	var data = {
	  title : []
	};

	var data1 = {
	  senderName : []
	}


	function formatString(val){
		if(val !== null){

		  var txt = val.toLowerCase();
			
	      if( txt.charAt((txt.indexOf("."))) )
	   		txt =txt.slice(0 ,(txt.indexOf(".")+1)) + txt.charAt((txt.indexOf(".")+1)).toUpperCase()  + txt.slice((txt.indexOf(".")+2));
	 		
	 		if(txt.charAt((txt.indexOf(" "))) )
	   		txt =txt.slice(0 ,(txt.indexOf(" ")+1)) + txt.charAt((txt.indexOf(" ")+1)).toUpperCase()  + txt.slice((txt.indexOf(" ")+2));

	 		var txtUppCase = txt.charAt(0).toUpperCase()+txt.slice(1);

	 		return txtUppCase;
	 	}
 		return null;
	}


	if(archiveContent.length > 0){
	  for(var j=0; j<archiveContent.length; j++){
	    for(var i=0; i<archiveContent[j].children.length; i++){

		  var titleUppCase = formatString(archiveContent[j].children[i].properties.title);
	      if(data.title.indexOf(titleUppCase) < 0)  
	      	data.title.push(titleUppCase);

     	  var senderUppCase = formatString(archiveContent[j].children[i].properties["ncom:sender"]);
	      if(data1.senderName.indexOf(senderUppCase) < 0) 
	     	 data1.senderName.push(senderUppCase);        	     
	    }
	  }
	}

	model.docTitle = data.title;
	model.docSenderName = data1.senderName; 
}

main();
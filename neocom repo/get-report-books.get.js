function main(){
	var username = person.properties.userName;
	var site = siteService.listUserSites(username, 0); 
	var siteName = null;

	var array=null;

	for(i in site)
	{
		var ime = site[i].shortName;
		if(ime.indexOf("arhiva") > -1)
			siteName = ime;
	}

	var archiveSite = null;
	//var username = person.properties.userName;
	for(i in companyhome.childByNamePath("Sites").children)
	{
		var folder = companyhome.childByNamePath("Sites").children[i];
		var ime = folder.name;
		if(ime.indexOf(siteName) > -1)
			archiveSite = folder;
	}
	var docLib = archiveSite.childByNamePath("documentLibrary");
////
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
////	
	var registries = {
        registry: []
    };
    
	// деловодниците ни се во фолдер Архива во Document Library
    for(var i in archiveFolder.children){
		var registryItem = archiveFolder.children[i];
		if(registryItem.type == "{http://www.neocom.com.mk/model/neocommodel/1.0}Registry")
	        registries.registry.push({ 
	            "name" : registryItem.name,
	            "title" : registryItem.properties.title,
	            "nodeRef"  : registryItem.nodeRef
	        });
    }


var nodeTest = args.nodeRef;
var dateFromUrl = args.dateFrom;
var dateToUrl = args.dateTo;
var orgUnt = args.orgUnt;

if( dateFromUrl != null){
	var dateParts = dateFromUrl.split("/");
	var dateFrom = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
}

if( dateToUrl != null){
	var dateParts1 = dateToUrl.split("/");
	var dateTo = new Date(dateParts1[2], (dateParts1[1] - 1), dateParts1[0]);
}



var archiveContent = archiveFolder.children[0].children;

var registriesContentList = {
	contentReg: []
}


for(var n=0; n<archiveFolder.children.length; n++){
  	if(archiveFolder.children[n].nodeRef == nodeTest){
  		archiveContent = archiveFolder.children[n].children;
  	}
  }
      
if(archiveContent.length > 0){

	 for(var j=0; j<archiveContent.length; j++){

      for (var i = 0; i < archiveContent[j].children.length; i++) {
    	var accDate = new Date(archiveContent[j].children[i].properties["ncom:date"]);
    	var dateRaz = new Date(archiveContent[j].children[i].properties["ncom:dataRazvod"]);
    	var sendD = new Date(archiveContent[j].children[i].properties["ncom:sentDate"]);
    	var archSign = archiveContent[j].children[i].properties["ncom:archSign"];

    	var acceptDate = accDate.getDate() + "/" + (accDate.getMonth()+1) + "/" + accDate.getFullYear();
    	var dateRazvod = dateRaz.getDate() + "/" + (dateRaz.getMonth()+1) + "/" + dateRaz.getFullYear();
    	var sendDate = sendD.getDate() + "/" + (sendD.getMonth()+1) + "/" + sendD.getFullYear();

    	var accDateCustom = new Date(accDate.getFullYear(), accDate.getMonth(), accDate.getDate());

    	if(dateRazvod == "1/1/1970"){
    		dateRazvod = "";
    	}

    	if(sendDate == "1/1/1970"){
    		sendDate = "";
    	}

        var primNo = archiveContent[j].children[i].properties["ncom:archSign"];
        var prinaryNumber = primNo.split("-");
        if(typeof prinaryNumber[1] != 'undefined'){
        	var prinaryNumber1 = (prinaryNumber[1]).split("/");
         	archSign = prinaryNumber1[0];
        }else{
        	archSign = "-"
        }

        //var isDeleted = false;
       //isDeleted = archiveContent[j].children[i].properties["ncom:isDeleted"]

        function registriesObject(){
  			registriesContentList.contentReg.push({
		        "name" : archiveContent[j].children[i].properties.title,
		        "archiveSign" : archSign,
		        "acceptDate" : acceptDate,
		        "senderId" : archiveContent[j].children[i].properties["ncom:senderId"],
		      	"sender" : archiveContent[j].children[i].properties["ncom:sender"],
				"dateRazvod" : dateRazvod ,
				"oznakaRazvod" : archiveContent[j].children[i].properties["ncom:oznakaRazvod"],
				"sendDate" : sendDate,
				"orgEdinica" : archiveContent[j].children[i].properties["ncom:orgUnit"],
				"podBroj" : archiveContent[j].children[i].properties["ncom:seqIndex"],
				"nodeRef" : nodeTest,
				"fullArchSign" : archiveContent[j].children[i].properties["ncom:archSign"],
				"isDeleted" : ""+archiveContent[j].children[i].properties["ncom:isDeleted"]+"",
				"documentNodeRef" : archiveContent[j].children[i].nodeRef,
				"attachedDoc" : archiveContent[j].children[i].properties.content.size
		      });  
  		}

  		function fillRegData(){
  			if(dateToUrl == "" &&  dateFromUrl == ""){
				registriesObject();
			}else if(dateFromUrl != null && dateFromUrl != "" && dateToUrl == ""){
			 	if(dateFrom <= accDateCustom){
			 		registriesObject();
			 	}

			}else if(dateToUrl != null && dateToUrl != "" && dateFromUrl == ""){
					if(dateTo >= accDateCustom){
						registriesObject();
				 	}
			}else if(dateFromUrl != "" && dateToUrl != "")	{		 			 
				if(dateTo >= accDateCustom && dateFrom <= accDateCustom){
						registriesObject();
				}	
			}
  		}

		if(orgUnt == "" || orgUnt==null){
			fillRegData()
		}else{
			if(orgUnt == archiveContent[j].children[i].properties["ncom:orgUnit"]){
				fillRegData();	
				}
			}
  		}
	}
}

model.entries = registriesContentList.contentReg;
}

main();
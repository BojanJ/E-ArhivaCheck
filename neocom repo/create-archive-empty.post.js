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

function getNodeRefFromString(input)
{
	var parts = input.split('Node Ref: ');
	return parts[1];
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

function getGroupFromOrgUnit(orgUnitNum){
	switch (orgUnitNum){
		case 01: 
			return "GROUP_01_OsnovanjeOrganizacijaRazvoj";
			break;
		case 02: 
			return "GROUP_02_UpravuvanjeRakovodenje";
			break;	
		case 03:
			return "GROUP_03_Kancelarisko_arhivski_pravni_opsti_raboti";
			break;
		case 04:
			return "GROUP_04_CoveckiResursi";
			break;
		case 05:
			return "GROUP_05_FinanskiskoMaterijalno_rabotenje";
			break;
		case 06:
			return "GROUP_06_Odbrana_bezbednost";
			break;
		case 07:
			return "GROUP_07_Elektrosnki_Sistem_AOP";
			break;
		case 08:
			return "GROUP_08_Kreditiranje_pravni";
			break;
		case 09:
			return "GROUP_09_Kreditiranje_fizicki";
			break;
		case 10:
			return "GROUP_10_Plasmani";
			break;
		case 11:
			return "GROUP_11_Sredstva_HOV";
			break;
		case 12:
			return "GROUP_12_PlaniranjeIAnaliza";
			break;
		case 13:
			return "GROUP_13_UpravuvanjeSoKrediten_rizik";
			break;
		case 14:
			return "GROUP_14_PLP_stranstvo";
			break;
		case 15:
			return "GROUP_15_Karticno_ATM_POS";
			break;
		case 16:
			return "GROUP_16_Depoziti";
			break;
		case 17:
			return "GROUP_17_Imot_bezbednost";
			break;
		case 18:
			return "GROUP_18_Organizacija_IT";
			break;
		case 19:
			return "GROUP_19_Monitoring_naplata_nefKrediti_prezSredtsva";
			break;
		case 20:
			return "GROUP_20_VnatresnaRevizija";
			break;
		case 21:
			return "GROUP_21_OSIS";
			break;
		case 22:
			return "GROUP_22_PLP_voZemjata";
			break;
		case 23:
			return "GROUP_23_SprecuvanjePerenjePari";
			break;
		case 24:
			return "GROUP_24_StrategiskiRizik";
			break;
		case 25:
			return "GROUP_25_UsoglasenostSoPropisite";
			break;
		case 26:
			return "GROUP_26_SindikalnaOrganizacija";
			break;
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
	var arch_sign = 0;
	var date_archived = "";
	var sender = "";
	var sender_arch_sign = "";
	var date_sent = "";
	var div_sign = "";
	var date_div = "";
	var date_expire = "";
	var note = ""; 
	var mimetypeAR = "";
	var registryBook = "";
	var overlapStupid = 0;
	// var countOrgUnt = [];

	for each (field in formdata.fields)
	{
	  if (field.name == "orgunit")
	  {
		  org_unit = getNodeRefFromString(field.value);
	  }
	  else if (field.name == "template")
	  {
		  template = field.value;
	  }
	  else if (field.name == "registry_book")
	  {
		  registry_book = getNodeRefFromString(field.value);
		  registryBook = getNodeRef(registry_book);
	  }
	  else if (field.name == "title")
	  {
	    title = (field.value).trim();
	  }
	  else if(field.name == "chbArchiveNo"){
	  		arch_sign = (registryBook.properties["ncom:counter"] + 1).toString();
	  		overlapStupid = 0;
	  }
	  else if(field.name == "ddlArchiveNo"){
	  	arch_sign = field.value;
	  	overlapStupid = 1;
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
	  	var senderSP = (field.name).toUpperCase();
	  	if(field.value == "" || field.value == null){
	  		sender = "\u0421.\u041F.";// \u0421.\u041F.
	  	}else{
	  		sender = field.value;

	  /*		if(senderSP == "СП" || senderSP == "С.П." || senderSP == "С.П" || senderSP == "С П"){
	  			sender = "\u0421.\u041F.";
	  		}*/
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
	
	var orgUnitF = getNodeRef(org_unit);
	var templateF = getNodeRef(template);

	var subRegister = null;

	if(arch_sign == "0")
	{
      var new_arch_sign = Number(arch_sign) + 1;
      arch_sign = new_arch_sign.toString();
    }


//var subRegister = null;

if(overlapStupid == 1){
	for(i in registryBook.children)
    {
      var entry = registryBook.children[i];
      if(entry.properties["ncom:archRSign"] == arch_sign)
      {
        subRegister = entry;
      }
    }
}

  
  	if (subRegister != null)
    {
        subRegister.properties["ncom:subCounter"] = subRegister.properties["ncom:subCounter"]+1;
    }
    else
    {
		var index = registryBook.properties["ncom:counter"] + 1;
		registryBook.properties["ncom:counter"] = index;
		registryBook.save();
		model.registryBook = registryBook;
		model.info = "Деловодникот е успешно ажуриран";

      	var subindex = arch_sign;

      
      if(arch_sign < 10)
        subRegister = registryBook.createNode(orgUnitF.name + "_"+"0"+subindex + "_" + title, "ncom:subRegister");
      else 
        subRegister = registryBook.createNode(orgUnitF.name + "_"+ subindex  + "_" + title, "ncom:subRegister");
      
      subRegister.properties["ncom:subCounter"] = 1;
      subRegister.properties["ncom:subIndex"] = arch_sign;
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

	var orgUnitNum = parseInt(orgUnitF.name, 10);
	subRegister.setInheritsPermissions(false);
	subRegister.setPermission("Coordinator", "GROUP_Group_arhivari");//Collaborator

	if(sender != "\u0421.\u041F."){
		subRegister.setPermission("Contributor", getGroupFromOrgUnit(orgUnitNum));
	}
	subRegister.save();


  	var countActive = 1;
  	var subNumbersList = [];
  	var childrenNumber = Number(subRegister.children.length);
  	for(var i=0; i<childrenNumber; i++){
  		if(subRegister.children[i].properties["ncom:isDeleted"] != true){
  			countActive ++;
  			subNumbersList.push(subRegister.children[i].properties["ncom:seqIndex"])
  		}
  	}

  	if(countActive > 1){
  		countActive = (Math.max.apply(Math, subNumbersList))+1;
  	}

  	if (countActive < 10)
  		countActive = "0"+ countActive.toString();
  	else
      	countActive = countActive.toString();

	var emptyFile = null;

	if (filename == null || filename == "" || content == undefined)
	{
      	emptyFile = subRegister.createNode(orgUnitF.name+"_"+arch_sign+"_"+Number(countActive).toString() + "_" + title, "ncom:doc");
	}
	else
	{
      emptyFile = subRegister.createNode(orgUnitF.name+"_"+arch_sign+"_"+Number(countActive).toString() + "_" + filename, "ncom:doc");

  	  emptyFile.properties.content.write(content);
	  emptyFile.properties.content.guessMimetype(filename);
	  emptyFile.properties.content.guessEncoding();
	}

	//manage permissions
	emptyFile.setInheritsPermissions(false);
	emptyFile.setPermission("Coordinator", "GROUP_Group_arhivari");
	if(sender != "\u0421.\u041F."){
		emptyFile.setPermission("Contributor", getGroupFromOrgUnit(orgUnitNum));
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
	emptyFile.properties["ncom:index"] = arch_sign;
	emptyFile.properties["ncom:seqIndex"] = countActive;
	emptyFile.properties.title = title;
	emptyFile.properties.description = note;

	emptyFile.properties["ncom:isDeleted"] = false;

	emptyFile.save();

	model.emptyFile = emptyFile; 
	model.info = "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0442 \u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0434\u0430\u0434\u0435\u043D";
}
main();
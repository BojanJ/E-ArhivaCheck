function main(){
	var username = person.properties.userName;
	var site = siteService.listUserSites(username, 0); 
	var naslov = "";
	
if(site.length > 0){
	for(i in site)
	{
		var ime = site[i].shortName.toLowerCase();
		if(ime.indexOf("arhiva") > -1)
			naslov = site[i].shortName;
	}
}
	model.info = naslov;
}
main();
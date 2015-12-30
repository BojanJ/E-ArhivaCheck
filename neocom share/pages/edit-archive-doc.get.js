function main(){
	model.jsonModel = {
		    widgets: [{
		        id: "SET_PAGE_TITLE",
		        name: "alfresco/header/SetTitle",
		        config: {
		            title: "Уреди заведен документ"
		        }
		    }]
		};
	
	var connector = remote.connect("alfresco");
	var registriesData = connector.call("/neocom/get-registry-books.json");
	// create json object from data
	var regResult = eval('(' + registriesData + ')');
	model.registries = regResult["registries"];
}
main();